"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-center cyber-glow-text uppercase tracking-wider">FAQ</h2>

      <div className="w-full space-y-4">
        {/* ROI FAQ Item */}
        <div className="cyber-card border border-cyber-neon-blue/30 overflow-visible">
          <button onClick={() => toggleItem("roi")} className="w-full flex items-center justify-between p-4 text-left">
            <span className="font-medium text-base text-cyber-text uppercase tracking-wider">
              What is the return of investment (ROI)?
            </span>
            <ChevronRight
              className={`h-5 w-5 text-cyber-neon-blue shrink-0 transition-transform duration-300 ${
                openItem === "roi" ? "rotate-90" : ""
              }`}
            />
          </button>

          {openItem === "roi" && (
            <div className="p-4 pt-0 text-cyber-text-secondary">
              <div className="cyber-divider"></div>
              <div className="py-2">
                <p className="mb-4 font-mono">
                  After successfully joining, the system will start to calculate the amount of USDC you hold through the
                  smart contract. The reward will be distributed every 6 hours.
                </p>
                <p className="mb-4 font-mono">The expected daily production income:</p>
                <ol className="list-decimal pl-6 space-y-2 font-mono mb-4">
                  <li className="cyber-glow-text">100 - 4,999 USDC: 1.3% - 1.6%</li>
                  <li className="cyber-glow-text">5,000 - 19,999 USDC: 1.6% - 1.9%</li>
                  <li className="cyber-glow-text">20,000 - 49,999 USDC: 1.9% - 2.2%</li>
                  <li className="cyber-glow-text">50,000 - 99,999 USDC: 2.2% - 2.5%</li>
                  <li className="cyber-glow-text">100,000 - 199,999 USDC: 2.5% - 2.8%</li>
                  <li className="cyber-glow-text">200,000 - 499,999 USDC: 2.8% - 3.1%</li>
                  <li className="cyber-glow-text">500,000 - 999,999 USDC: 3.1% - 3.5%</li>
                  <li className="cyber-glow-text">1,000,000 - 1,999,999 USDC: 3.5% - 3.8%</li>
                  <li className="cyber-glow-text">2,000,000+ USDC: 4.1%</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* How to earn reward FAQ Item */}
        <div className="cyber-card border border-cyber-neon-purple/30 overflow-visible">
          <button onClick={() => toggleItem("earn")} className="w-full flex items-center justify-between p-4 text-left">
            <span className="font-medium text-base text-cyber-text uppercase tracking-wider">How to earn reward?</span>
            <ChevronRight
              className={`h-5 w-5 text-cyber-neon-purple shrink-0 transition-transform duration-300 ${
                openItem === "earn" ? "rotate-90" : ""
              }`}
            />
          </button>

          {openItem === "earn" && (
            <div className="p-4 pt-0 text-cyber-text-secondary">
              <div className="cyber-divider"></div>
              <div className="py-2">
                <p className="font-mono">
                  The cryptocurrency mined every day generates ETH revenue and gives us a certain percentage of revenue
                  in accordance with contract standards.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Referral FAQ Item */}
        <div className="cyber-card border border-cyber-neon-pink/30 overflow-visible">
          <button
            onClick={() => toggleItem("referral")}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-medium text-base text-cyber-text uppercase tracking-wider">
              Is there a reward for inviting friends?
            </span>
            <ChevronRight
              className={`h-5 w-5 text-cyber-neon-pink shrink-0 transition-transform duration-300 ${
                openItem === "referral" ? "rotate-90" : ""
              }`}
            />
          </button>

          {openItem === "referral" && (
            <div className="p-4 pt-0 text-cyber-text-secondary">
              <div className="cyber-divider"></div>
              <div className="py-2">
                <p className="font-mono">
                  Yes, you can invite your friends to join the mining pool through your referral link. You will get a
                  30% ETH reward everytime your friends receive their reward.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
