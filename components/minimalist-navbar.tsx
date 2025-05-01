"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import WalletConnectButton from "@/components/wallet-connect-button"
import { PlatformLogoWithText } from "./platform-logo-with-text"

export default function MinimalistNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="py-3 px-4 bg-[rgba(var(--dark-bg-secondary),0.8)] backdrop-blur-md sticky top-0 z-40 border-b border-[rgba(var(--dark-border),0.6)] mobile-safe-top">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
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
            { href: "/whitepaper", label: "Whitepaper" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors relative py-2",
                isActive(item.href)
                  ? "text-[rgb(var(--dark-accent))] glow-accent"
                  : "text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))]",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[rgb(var(--dark-accent))]"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right side: Wallet button only */}
        <div className="flex items-center">
          <WalletConnectButton />
        </div>
      </div>
    </nav>
  )
}
