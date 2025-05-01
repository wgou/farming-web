"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"

interface HeroSectionProps {
  onStartNow: () => Promise<void>;
  hideStartNow: boolean;
}

export default function HeroSection({ onStartNow, hideStartNow }: HeroSectionProps) {
  const { isConnected } = useWallet()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[rgb(var(--dark-text-primary))]">
            Liquidity Farming
            <div className="h-1 w-16 bg-[rgb(var(--dark-accent))] mx-auto mt-4"></div>
          </h1>

          <p className="text-lg md:text-xl text-[rgb(var(--dark-text-secondary))] mb-8 max-w-2xl mx-auto">
            Farm daily interest on USDC by providing liquidity for ETH farming pools
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block text-[rgb(var(--dark-accent))] text-sm md:text-base">
              Join the Liquidity Farming pool and get 88 USDC
            </span>
          </motion.div>

          {!hideStartNow && (
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="dark-button px-8 py-3"
              onClick={isConnected ? onStartNow : undefined}
            >
              {isConnected ? "Start Now" : "Connect Wallet"}
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
