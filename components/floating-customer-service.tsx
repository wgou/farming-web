"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ImageIcon } from "lucide-react"
import { getWalletData } from "../app/lib/api"

// Define message types to include images
type MessageContent = {
  type: "text" | "image"
  content: string // text content or image URL
}

type Message = {
  sender: "user" | "agent"
  content: MessageContent
  time: string
}

interface WalletData {
  id: number
  poolsId: number
  poolsOwnerId: number
  wallet: string
}

const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const FloatingCustomerService = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [wsRetries, setWsRetries] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected')
  const maxRetries = 3
  const reconnectDelay = 3000 // 3 seconds
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      sender: "agent",
      content: { type: "text", content: "Hello! I'm your customer service assistant. How can I help you today?" },
      time: getCurrentTime(),
    },
  ])
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Add useRef for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Initialize WebSocket connection
  const initializeWebSocket = (userId: number) => {
    try {
      setConnectionStatus('connecting')
      
      // Use relative WebSocket URL to match the current protocol and host
      
      const wsUrl = `ws://43.198.89.173:8082/ws/${userId}`
      
      console.log('Attempting WebSocket connection to:', wsUrl)
      const socket = new WebSocket(wsUrl)

      socket.onopen = () => {
        console.log('WebSocket Connected Successfully')
        setConnectionStatus('connected')
        setWsRetries(0)
        
        // Send a test message to verify connection
        try {
          socket.send(JSON.stringify({
            type: 'ping',
            content: 'Connection test'
          }))
        } catch (error) {
          console.error('Error sending test message:', error)
        }
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received message:', data)
          setChatHistory(prev => [...prev, {
            sender: "agent",
            content: { type: "text", content: data.content },
            time: getCurrentTime()
          }])
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error)
        setConnectionStatus('error')
        
        // Log detailed connection information for debugging
        console.log('Connection Details:', {
          url: wsUrl,
          readyState: socket.readyState,
          protocol: socket.protocol,
          retryCount: wsRetries,
          timestamp: new Date().toISOString()
        })
      }

      socket.onclose = (event) => {
        console.log('WebSocket Closed:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean
        })
        setConnectionStatus('disconnected')
        
        // Attempt to reconnect if not at max retries and the closure wasn't clean
        if (wsRetries < maxRetries && !event.wasClean) {
          console.log(`Attempting reconnection ${wsRetries + 1}/${maxRetries}...`)
          setTimeout(() => {
            setWsRetries(prev => prev + 1)
            initializeWebSocket(userId)
          }, reconnectDelay)
        } else if (wsRetries >= maxRetries) {
          console.log('Max reconnection attempts reached')
          // Add a message to the chat about connection issues
          setChatHistory(prev => [...prev, {
            sender: "agent",
            content: { 
              type: "text", 
              content: "Connection to customer service is currently unavailable. Please try again later." 
            },
            time: getCurrentTime()
          }])
        }
      }

      setWs(socket)
    } catch (error) {
      console.error('Error initializing WebSocket:', error)
      setConnectionStatus('error')
    }
  }

  // Fetch wallet data and initialize WebSocket
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await getWalletData()
        if (response.success && response.data) {
          console.log('Wallet data received:', response.data)
          setWalletData(response.data)
          initializeWebSocket(response.data.id)
        } else {
          console.error('Failed to get wallet data:', response)
          setChatHistory(prev => [...prev, {
            sender: "agent",
            content: { 
              type: "text", 
              content: "Unable to initialize chat. Please try again later." 
            },
            time: getCurrentTime()
          }])
        }
      } catch (error) {
        console.error('Failed to fetch wallet data:', error)
      }
    }

    if (isOpen) {
      initializeChat()
    }

    return () => {
      if (ws) {
        console.log('Cleaning up WebSocket connection')
        ws.close(1000, 'User closed chat')
        setWs(null)
        setWsRetries(0)
        setConnectionStatus('disconnected')
      }
    }
  }, [isOpen, wsRetries])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const sendMessage = () => {
    if (message.trim() === "" || !ws || !walletData) return

    const messageData = {
      id: `${walletData.id}-${new Date().getTime()}`,
      type: "text",
      senderId: walletData.id,
      reciverId: walletData.poolsId,
      content: message,
      created: getCurrentTime()
    }

    // Send message through WebSocket
    ws.send(JSON.stringify(messageData))

    // Add user message to chat
    const userMessage: Message = {
      sender: "user",
      content: { type: "text", content: message },
      time: getCurrentTime(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0 || !ws || !walletData) return

    const file = files[0]
    if (!file.type.startsWith("image/")) return

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file)

    const messageData = {
      id: `${walletData.id}-${new Date().getTime()}`,
      type: "image",
      senderId: walletData.id,
      reciverId: walletData.poolsId,
      content: imageUrl,
      created: getCurrentTime()
    }

    // Send image through WebSocket
    ws.send(JSON.stringify(messageData))

    // Add image message to chat
    const imageMessage: Message = {
      sender: "user",
      content: { type: "image", content: imageUrl },
      time: getCurrentTime(),
    }

    setChatHistory((prev) => [...prev, imageMessage])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Trigger file input click
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatHistory])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node) &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".floating-cs-button")
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Render message content based on type
  const renderMessageContent = (content: MessageContent) => {
    if (content.type === "text") {
      return <div className="text-sm">{content.content}</div>
    } else if (content.type === "image") {
      return (
        <div className="image-container">
          <img
            src={content.content || "/placeholder.svg"}
            alt="Uploaded"
            className="max-w-full rounded-md max-h-48 object-contain cursor-pointer"
            onClick={() => window.open(content.content, "_blank")}
          />
        </div>
      )
    }
    return null
  }

  // Add this style element for mobile height adjustment
  const mobileHeightStyle = `
  @media (max-width: 768px) {
    .chat-container {
      height: 320px !important;
    }
    .chat-header {
      padding: 6px 12px !important;
      min-height: 36px !important;
    }
    .chat-messages {
      padding: 8px !important;
    }
  }
`

  return (
    <>
      <style jsx global>
        {mobileHeightStyle}
      </style>
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[rgba(18,18,28,0.7)] text-white flex items-center justify-center shadow-lg hover:bg-[rgba(18,18,28,0.85)] border border-[rgba(94,92,230,0.3)] transition-colors floating-cs-button"
        onClick={toggleOpen}
        aria-label="Customer Service"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Customer service representative with headset icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12V13H5.5C6.32843 13 7 13.6716 7 14.5V18.5C7 19.3284 6.32843 20 5.5 20H5C3.89543 20 3 19.1046 3 18V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V18C21 19.1046 20.1046 20 19 20H18.5C17.6716 20 17 19.3284 17 18.5V14.5C17 13.6716 17 13 18.5 13H20V12C20 7.58172 16.4183 4 12 4Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M12 8C10.3431 8 9 9.34315 9 11V15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15V11C15 9.34315 13.6569 8 12 8Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-[rgb(var(--dark-bg-secondary))] rounded-lg shadow-xl border border-[rgba(var(--dark-border),0.6)] overflow-hidden chat-container"
            style={{ height: "400px" }}
          >
            <div className="flex flex-col h-full">
              {/* Chat header */}
              <div className="flex justify-between items-center p-3 border-b border-[rgba(var(--dark-border),0.6)] chat-header">
                <div className="flex items-center">
                  <h3 className="text-[rgb(var(--dark-text-primary))] font-medium">Customer Service</h3>
                </div>
                <button
                  onClick={toggleOpen}
                  className="text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-messages">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-[rgb(var(--dark-accent))] text-white"
                          : "bg-[rgba(var(--dark-bg-tertiary),0.7)] text-[rgb(var(--dark-text-primary))]"
                      }`}
                    >
                      {renderMessageContent(msg.content)}
                      <div className="text-xs mt-1 opacity-70 text-right">{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 border-t border-[rgba(var(--dark-border),0.6)] chat-input">
                <div className="flex items-center bg-[rgba(var(--dark-bg-tertiary),0.5)] rounded-lg">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none resize-none p-3 text-[rgb(var(--dark-text-primary))] placeholder-[rgb(var(--dark-text-secondary))] focus:outline-none max-h-20"
                    rows={1}
                  />

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Image upload button */}
                  <button
                    onClick={openFileSelector}
                    className="p-3 text-[rgb(var(--dark-text-secondary))] hover:text-[rgb(var(--dark-text-primary))]"
                    title="Upload Image"
                  >
                    <ImageIcon size={18} />
                  </button>

                  {/* Send button */}
                  <button
                    onClick={sendMessage}
                    disabled={message.trim() === ""}
                    className={`p-3 rounded-r-lg ${
                      message.trim() === ""
                        ? "text-[rgb(var(--dark-text-tertiary))]"
                        : "text-[rgb(var(--dark-accent))] hover:text-[rgb(var(--dark-text-primary))]"
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingCustomerService
