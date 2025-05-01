import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayoutClient from "./components/root-layout"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Liquidity Farming",
  description: "Farm daily interest on USDC by providing liquidity for ETH farming pool",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[rgb(var(--dark-bg-primary))]">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
