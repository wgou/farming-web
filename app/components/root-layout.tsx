"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { WalletProvider } from "@/contexts/wallet-context"
import { ReferralProvider } from "@/contexts/referral-context"
import MinimalistNavbar from "@/components/minimalist-navbar"
import MobileTabNav from "@/components/mobile-tab-nav"
import EthSpaceBackground from "@/components/eth-space-background"
import WalletErrorAlert from "@/components/wallet-error-alert"
import SimpleFooter from "@/components/simple-footer"
import FloatingCustomerService from "@/components/floating-customer-service"

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface MessageContextType {
  message: Message | null;
  setMessage: (message: Message | null) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null)

  // Auto dismiss message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`px-6 py-3 rounded-lg shadow-lg ${
            message.type === 'success' 
              ? 'bg-[rgba(var(--dark-accent),0.9)] text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {message.text}
          </div>
        </div>
      )}
    </MessageContext.Provider>
  )
}

export function useMessage() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null)

  return (
    <MessageProvider>
      <WalletProvider>
        <ReferralProvider>
          <div className="min-h-screen bg-[rgb(var(--dark-bg-primary))] text-[rgb(var(--dark-text-primary))]">
            <MinimalistNavbar />
            {children}
            <FloatingCustomerService />
            <MobileTabNav />
          </div>
        </ReferralProvider>
      </WalletProvider>
    </MessageProvider>
  )
} 