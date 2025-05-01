"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  HomeIcon,
  UserIcon,
  ArrowUpDownIcon as ArrowsUpDownIcon,
  ArrowDownIcon as ArrowDownTrayIcon,
  ShareIcon,
  FileTextIcon,
} from "lucide-react"
import { motion } from "framer-motion"

// Update the mobile tab nav to ensure it doesn't overlap content
export default function MobileTabNav() {
  const pathname = usePathname()

  // Update the navigation items array to include Whitepaper
  const navItems = [
    { href: "/", label: "Farm", icon: HomeIcon },
    { href: "/account", label: "Account", icon: UserIcon },
    { href: "/swap", label: "Swap", icon: ArrowsUpDownIcon },
    { href: "/withdraw", label: "Withdraw", icon: ArrowDownTrayIcon },
    { href: "/share", label: "Share", icon: ShareIcon },
    { href: "/whitepaper", label: "Whitepaper", icon: FileTextIcon }, // Replace Share2 with appropriate icon if available
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgba(var(--dark-bg-secondary),0.9)] backdrop-blur-md border-t border-[rgba(var(--dark-border),0.6)] z-50 md:hidden mobile-safe-bottom">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-2 w-full relative",
                isActive
                  ? "text-[rgb(var(--dark-accent))]"
                  : "text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))]",
              )}
              aria-label={item.label}
            >
              <div className="relative">
                {isActive ? (
                  <div className="absolute -inset-3 bg-[rgba(var(--dark-accent),0.1)] rounded-xl"></div>
                ) : (
                  <div className="absolute -inset-3 bg-[rgba(var(--dark-text-primary),0.03)] rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
                )}
                <Icon size={24} className={cn("relative z-10", isActive ? "glow-accent" : "")} />
              </div>
              {isActive && (
                <motion.div
                  layoutId="bottomIndicator"
                  className="h-1 w-6 bg-[rgb(var(--dark-accent))] rounded-full mt-1"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
