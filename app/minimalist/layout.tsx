import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

// 使用 Inter 字体，这是一个非常适合极简主义设计的无衬线字体
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "极简主义设计 | ETH Farming",
  description: "探索极简主义设计风格，专注于内容和用户体验",
}

export default function MinimalistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className="bg-white antialiased">{children}</body>
    </html>
  )
}
