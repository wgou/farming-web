"use client"

import { useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { AlertCircle, X } from "lucide-react"

export default function WalletErrorAlert() {
  const { walletError, clearWalletError } = useWallet()

  // 自动关闭错误提示（5秒后）
  useEffect(() => {
    if (walletError) {
      const timer = setTimeout(() => {
        clearWalletError()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [walletError, clearWalletError])

  if (!walletError) return null

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div className="bg-[rgba(var(--dark-error),0.15)] border border-[rgb(var(--dark-error))] text-[rgb(var(--dark-text-primary))] p-4 rounded-lg shadow-lg backdrop-blur-sm flex items-start">
        <AlertCircle className="h-5 w-5 text-[rgb(var(--dark-error))] mr-3 shrink-0 mt-0.5" />
        <div className="flex-1">{walletError}</div>
        <button
          onClick={clearWalletError}
          className="ml-3 text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
