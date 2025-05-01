import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MinimalistMobileTabNav } from "@/components/minimalist-mobile-tab-nav"
import { WalletProvider } from "@/contexts/wallet-context"
import { ReferralProvider } from "@/contexts/referral-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ETH Farming - Minimalist",
  description: "Farm daily interest on USDC by providing liquidity for ETH farming pool",
}

export default function RootLayoutMinimalist({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900">
        <WalletProvider>
          <ReferralProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
              <div className="h-16 md:h-0"></div> {/* Spacer for mobile nav */}
              <MinimalistMobileTabNav />
            </div>
          </ReferralProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
