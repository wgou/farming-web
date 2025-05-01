"use client"
import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Loader2 } from "lucide-react"

export default function WalletConnectButton() {
  const { address, isConnecting, isConnected, connectWallet } = useWallet()
  const [copied, setCopied] = useState(false)

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 4)}...${address.substring(address.length - 2)}`
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnecting) {
    return (
      <button className="px-4 py-2 h-10 sm:h-auto bg-[rgb(var(--dark-bg-tertiary))] text-[rgb(var(--dark-text-primary))] rounded-lg flex items-center space-x-2">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <span>Connecting...</span>
      </button>
    )
  }

  if (isConnected && address) {
    return (
      <button
        onClick={copyAddress}
        className="px-4 py-2 h-10 sm:h-auto bg-[rgb(var(--dark-bg-tertiary))] text-[rgb(var(--dark-text-primary))] rounded-lg flex items-center space-x-2 hover:bg-[rgb(var(--dark-hover))] transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-[rgb(var(--dark-success))] mr-2"></span>
        <span>{copied ? "Copied!" : formatAddress(address)}</span>
      </button>
    )
  }

  return (
    <button className="dark-button h-10 sm:h-auto" onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  )
}
