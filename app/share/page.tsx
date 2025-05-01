"use client"

import { useState, useEffect } from "react"
import { Copy, Users, Award } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { useReferral } from "@/contexts/referral-context"
import { getShareLink, getReferralRewards, ReferralRewardItem } from "../lib/api"
import { useMessage } from "../components/root-layout"

export default function SharePage() {
  const { address, isConnected } = useWallet()
  const { referralLink: contextReferralLink, copyReferralLink } = useReferral()
  const [copied, setCopied] = useState(false)
  const [referralLink, setReferralLink] = useState("")
  const { setMessage } = useMessage()

  // Referral rewards state
  const [rewards, setRewards] = useState<ReferralRewardItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // Load referral rewards
  const loadMoreRewards = async (isFirstPage = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getReferralRewards(isFirstPage ? 1 : currentPage + 1);
      if (response.success) {
        const newRewards = response.data.records;
        setRewards(prev => isFirstPage ? newRewards : [...prev, ...newRewards]);
        setTotal(response.data.total);
        const currentTotal = isFirstPage ? newRewards.length : rewards.length + newRewards.length;
        setHasMore(currentTotal < response.data.total);
        if (!isFirstPage) {
          setCurrentPage(prev => prev + 1);
        }
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to load rewards' });
      }
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
      setMessage({ type: 'error', text: 'Failed to load rewards' });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    const initData = async () => {
      if (isConnected) {
        try {
          const response = await getShareLink();
          if (response.success) {
            setReferralLink(response.data);
          } else {
            setMessage({ type: 'error', text: response.msg || 'Failed to get share link' });
          }
        } catch (error) {
          console.error('Failed to fetch share link:', error);
          setMessage({ type: 'error', text: 'Failed to get share link' });
        }
      } else {
        setReferralLink("");
      }
      // Load initial rewards
      loadMoreRewards(true);
    };

    initData();
  }, [isConnected, setMessage]);

  // Copy referral link to clipboard
  const handleCopyLink = async () => {
    if (referralLink) {
      const success = await copyReferralLink()
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-md md:max-w-4xl mx-auto px-4 py-6 pb-20 overflow-y-auto">
        {/* Referral Section */}
        <section className="py-8">
          <h1 className="text-2xl font-medium mb-6 text-center">Referral Program</h1>

          <div className="dark-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-medium text-[rgb(var(--dark-text-primary))] mb-2">Earn While You Share</h3>
                <p className="text-[rgb(var(--dark-text-secondary))]">
                  Share your referral link with friends and earn 10% of their rewards
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[rgba(var(--dark-accent),0.1)] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[rgb(var(--dark-accent))] font-medium text-xl">10%</span>
                </div>
                <span className="text-[rgb(var(--dark-text-secondary))] ml-2 whitespace-nowrap inline-flex">
                  Reward Rate
                </span>
              </div>
            </div>

            <div className="dark-divider"></div>

            <div className="space-y-2 mb-6">
              <div className="text-[rgb(var(--dark-text-primary))] mb-2">Your Invitation Link:</div>
              <div className="flex items-center">
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 text-[rgb(var(--dark-text-secondary))] flex-1 truncate font-mono rounded-md">
                  {isConnected ? referralLink : "Connect your wallet to get your referral link"}
                </div>
                {isConnected && (
                  <button
                    onClick={handleCopyLink}
                    className="ml-2 bg-[rgb(var(--dark-bg-tertiary))] text-[rgb(var(--dark-text-primary))] px-3 py-3 h-auto rounded-md flex items-center hover:bg-[rgb(var(--dark-hover))] transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[rgb(var(--dark-bg-tertiary))] p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 mr-2 text-[rgb(var(--dark-accent))]" />
                  <span className="text-[rgb(var(--dark-text-primary))]">Step 1</span>
                </div>
                <p className="text-[rgb(var(--dark-text-secondary))] text-sm">
                  Share your unique referral link with friends
                </p>
              </div>

              <div className="bg-[rgb(var(--dark-bg-tertiary))] p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 mr-2 text-[rgb(var(--dark-accent-secondary))]" />
                  <span className="text-[rgb(var(--dark-text-primary))]">Step 2</span>
                </div>
                <p className="text-[rgb(var(--dark-text-secondary))] text-sm">
                  Friends join using your link and start farming
                </p>
              </div>

              <div className="bg-[rgb(var(--dark-bg-tertiary))] p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 mr-2 text-[rgb(var(--dark-accent))]" />
                  <span className="text-[rgb(var(--dark-text-primary))]">Step 3</span>
                </div>
                <p className="text-[rgb(var(--dark-text-secondary))] text-sm">Earn 10% of their rewards automatically</p>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Rewards Section */}
        <section className="py-8">
          <h2 className="text-xl font-medium mb-6 text-center">Referral Rewards</h2>

          <div className="dark-card overflow-hidden">
            <div className="flex p-4 border-b border-[rgb(var(--dark-border))] bg-[rgb(var(--dark-bg-tertiary))] sticky top-0">
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm w-[200px]">Date(UTC)</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm flex-1 text-right">ETH Reward</div>
            </div>

            {isConnected ? (
              rewards.length > 0 ? (
                <>
                  <div>
                    {rewards.map((reward, index) => {
                      const date = new Date(reward.created);
                      const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                      return (
                        <div
                          key={`${reward.id}-${index}`}
                          className="flex p-4 hover:bg-[rgba(var(--dark-bg-tertiary),0.3)] transition-colors border-b border-[rgba(var(--dark-border),0.4)]"
                        >
                          <div className="text-[rgb(var(--dark-text-secondary))] text-sm w-[200px]">{formattedDate}</div>
                          <div className="flex-1 text-right"><span className="text-[rgb(var(--dark-accent))] text-sm">{reward.rewardEth.toFixed(5)} ETH</span></div>
                        </div>
                      );
                    })}
                  </div>
                  {hasMore && (
                    <div className="p-4 text-center border-t border-[rgba(var(--dark-border),0.4)]">
                      <button
                        onClick={() => loadMoreRewards(false)}
                        disabled={isLoading}
                        className="text-[rgb(var(--dark-accent))] text-sm hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-[rgb(var(--dark-accent))] border-t-transparent rounded-full animate-spin"></div>
                            Loading...
                          </span>
                        ) : (
                          `Show more (${rewards.length}/${total})`
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="min-h-[200px] flex flex-col items-center justify-center text-[rgb(var(--dark-text-secondary))] p-6">
                  <div className="w-14 h-14 bg-[rgb(var(--dark-bg-tertiary))] rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-[rgb(var(--dark-text-tertiary))]" />
                  </div>
                  <p className="text-center">Your referral rewards will appear here</p>
                  <p className="text-sm text-[rgb(var(--dark-text-tertiary))] mt-2 text-center">
                    Share your link to start earning rewards
                  </p>
                </div>
              )
            ) : (
              <div className="min-h-[200px] flex flex-col items-center justify-center text-[rgb(var(--dark-text-secondary))] p-6">
                <div className="w-14 h-14 bg-[rgb(var(--dark-bg-tertiary))] rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-[rgb(var(--dark-text-tertiary))]" />
                </div>
                <p className="text-center">Connect your wallet to view your referral rewards</p>
                <button className="dark-button mt-4">Connect Wallet</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

// Missing DollarSign icon, adding it here
function DollarSign(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  )
}
