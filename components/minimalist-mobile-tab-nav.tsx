"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, RefreshCw, ArrowDownToLine, Share2 } from "lucide-react"

export function MinimalistMobileTabNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: <Home size={20} />, ariaLabel: "Farm" },
    { href: "/account", icon: <User size={20} />, ariaLabel: "Account" },
    { href: "/swap", icon: <RefreshCw size={20} />, ariaLabel: "Swap" },
    { href: "/withdraw", icon: <ArrowDownToLine size={20} />, ariaLabel: "Withdraw" },
    { href: "/share", icon: <Share2 size={20} />, ariaLabel: "Share" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgb(var(--dark-bg-secondary))] border-t border-[rgb(var(--dark-border))] z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-4 px-2 w-full relative",
                isActive
                  ? "text-[rgb(var(--dark-accent))]"
                  : "text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))]",
              )}
              aria-label={item.ariaLabel}
            >
              <div>{item.icon}</div>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-[rgb(var(--dark-accent))]"></div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
