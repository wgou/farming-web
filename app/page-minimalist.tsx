"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { useReferral } from "@/contexts/referral-context"
import { Button } from "@/components/ui/button"
import MinimalistNavbar from "@/components/minimalist-navbar"
import MinimalistFooter from "@/components/minimalist-footer"

export default function HomeMinimalist() {
  const { isConnected } = useWallet()
  const { referralCode } = useReferral()

  // Log referral code if present
  useEffect(() => {
    if (referralCode) {
      console.log(`User was referred by: ${referralCode}`)
    }
  }, [referralCode])

  return (
    <div className="bg-white text-gray-900">
      <MinimalistNavbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Liquidity Farming</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Farm daily interest on USDC by providing liquidity for ETH farming pools
          </p>

          {isConnected && (
            <div className="mt-6 mb-8">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-none px-8 py-6 h-auto">
                Start Farming
              </Button>
            </div>
          )}

          {referralCode && (
            <div className="mt-2 text-sm text-gray-600">
              You were referred by a friend! You'll both earn rewards when you start farming.
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Liquidity Farming</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-light text-gray-900 mb-2">182</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Nodes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-gray-900 mb-2">62,923</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Participants</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-gray-900 mb-2">43.87 M</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">USDC Verified</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-gray-900 mb-2">19.64 K</p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">ETH Reward</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Yield Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Latest Yield</h2>

          <div className="bg-white border border-gray-200">
            <div className="grid grid-cols-2 p-4 border-b border-gray-200">
              <div className="font-light text-gray-900">Wallet Address</div>
              <div className="font-light text-right text-gray-900">ETH Reward</div>
            </div>

            <div>
              {[
                { address: "0x0Dd690...35e6280c", reward: "0.01326" },
                { address: "0x5f2238...0C7B2126", reward: "0.15728" },
                { address: "0xc4C06f...c34f251D", reward: "0.00029" },
                { address: "0xCB6C11...3A2f1f7F", reward: "0.0053" },
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-2 p-4 border-b border-gray-100">
                  <div className="text-gray-600">{item.address}</div>
                  <div className="text-right text-gray-900">{item.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="#"
            className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-900 transition-colors"
          >
            <div className="flex items-center">
              <span className="mr-2">📄</span>
              <span className="text-gray-900 uppercase tracking-wider">Whitepaper</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-900" />
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Partners</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["CoinMarketCap", "CoinGecko", "TrustWallet", "crypto.com"].map((partner, index) => (
              <div key={index} className="border border-gray-200 bg-white p-4 flex items-center justify-center">
                <div className="text-gray-900 font-light uppercase tracking-wider">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Using a simplified version */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">FAQ</h2>

          <div className="space-y-6">
            <div className="border border-gray-200">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-light text-gray-900">What is the return of investment (ROI)?</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </button>
            </div>

            <div className="border border-gray-200">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-light text-gray-900">How to earn reward?</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </button>
            </div>

            <div className="border border-gray-200">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-light text-gray-900">Is there a reward for inviting friends?</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <MinimalistFooter />
    </div>
  )
}
