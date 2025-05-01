"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import WalletConnectButton from "@/components/wallet-connect-button"
import { cn } from "@/lib/utils"
import { PlatformLogoWithText } from "./platform-logo-with-text"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="py-3 bg-cyber-bg/80 backdrop-blur-md sticky top-0 z-40 border-b border-cyber-neon-blue/30">
      <div className="container mx-auto px-3 flex items-center justify-between flex-nowrap">
        <div className="flex items-center space-x-2 shrink-0">
          <Link href="/" className="flex items-center">
            <PlatformLogoWithText size={32} />
          </Link>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { href: "/", label: "Farm" },
            { href: "/account", label: "Account" },
            { href: "/swap", label: "Swap" },
            { href: "/withdraw", label: "Withdraw" },
            { href: "/share", label: "Share" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors uppercase tracking-wider",
                isActive(item.href)
                  ? "cyber-glow-text font-medium"
                  : "text-cyber-text hover:text-cyber-neon-blue hover:shadow-cyber-sm",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side: Wallet button only */}
        <div className="flex items-center shrink-0">
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  )
}
