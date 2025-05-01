"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "./wallet-context"

type ReferralContextType = {
  referralCode: string | null
  setReferralCode: (code: string | null) => void
  referralLink: string
  copyReferralLink: () => Promise<boolean>
  referralRewards: ReferralReward[]
}

type ReferralReward = {
  date: string
  reward: string
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined)

export function ReferralProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useWallet()
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [referralLink, setReferralLink] = useState("")
  const [referralRewards, setReferralRewards] = useState<ReferralReward[]>([])

  // Check for referral code in URL on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const refCode = urlParams.get("ref")
      if (refCode) {
        setReferralCode(refCode)
        // Store in localStorage for persistence
        localStorage.setItem("referralCode", refCode)
      } else {
        // Check if we have a stored referral code
        const storedRefCode = localStorage.getItem("referralCode")
        if (storedRefCode) {
          setReferralCode(storedRefCode)
        }
      }
    }
  }, [])

  // Generate referral link when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
      setReferralLink(`${baseUrl}?ref=${address}`)
    } else {
      setReferralLink("")
    }
  }, [isConnected, address])

  // Copy referral link to clipboard
  const copyReferralLink = async (): Promise<boolean> => {
    if (referralLink) {
      try {
        await navigator.clipboard.writeText(referralLink)
        return true
      } catch (error) {
        console.error("Failed to copy referral link:", error)
        return false
      }
    }
    return false
  }

  // In a real application, you would fetch referral rewards from your backend
  // This is a mock implementation
  useEffect(() => {
    if (isConnected && address) {
      // Mock data - in a real app, you would fetch this from your API
      setReferralRewards([
        // Empty for now - would be populated from API
      ])
    } else {
      setReferralRewards([])
    }
  }, [isConnected, address])

  const value = {
    referralCode,
    setReferralCode,
    referralLink,
    copyReferralLink,
    referralRewards,
  }

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>
}

export function useReferral() {
  const context = useContext(ReferralContext)
  if (context === undefined) {
    throw new Error("useReferral must be used within a ReferralProvider")
  }
  return context
}
