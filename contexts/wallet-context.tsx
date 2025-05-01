"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// ETH主网的链ID
const ETH_CHAIN_ID = "0x1"

// 定义钱包上下文的类型
type WalletContextType = {
  address: string | null
  isConnecting: boolean
  isConnected: boolean
  chainId: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchToEthChain: () => Promise<void>
  walletError: string | null
  clearWalletError: () => void
}

// 创建上下文
const WalletContext = createContext<WalletContextType | undefined>(undefined)

// 钱包提供者组件
export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<string | null>(null)
  const [walletError, setWalletError] = useState<string | null>(null)

  // 清除错误信息
  const clearWalletError = () => {
    setWalletError(null)
  }

  // 检查是否有window.ethereum
  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })

        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)

          // 获取当前链ID
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          setChainId(chainId)

          // 如果不是ETH链，自动切换
          if (chainId !== ETH_CHAIN_ID) {
            await switchToEthChain()
          }
        }
      }
    } catch (error) {
      console.error("检查钱包连接时出错:", error)
    }
  }

  // 连接钱包
  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      setWalletError(null)

      if (typeof window !== "undefined" && window.ethereum) {
        // 请求连接钱包
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)

          // 获取当前链ID
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          setChainId(chainId)

          // 如果不是ETH链，自动切换
          if (chainId !== ETH_CHAIN_ID) {
            await switchToEthChain()
          }
        }
      } else {
        setWalletError("Please install MetaMask or another compatible wallet!")
      }
    } catch (error: any) {
      console.error("连接钱包时出错:", error)
      if (error.code === 4001) {
        // 用户拒绝连接
        setWalletError("You rejected the connection request. Please connect your wallet to continue.")
      } else {
        setWalletError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // 断开钱包连接
  const disconnectWallet = () => {
    setAddress(null)
    setIsConnected(false)
    setChainId(null)
    setWalletError(null)
  }

  // 切换到ETH链
  const switchToEthChain = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ETH_CHAIN_ID }],
        })

        // 更新链ID
        setChainId(ETH_CHAIN_ID)
      }
    } catch (error: any) {
      console.error("切换到ETH链时出错:", error)

      // 如果链未添加到钱包，则添加它
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: ETH_CHAIN_ID,
                chainName: "Ethereum Mainnet",
                nativeCurrency: {
                  name: "Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://mainnet.infura.io/v3/"],
                blockExplorerUrls: ["https://etherscan.io"],
              },
            ],
          })
          setChainId(ETH_CHAIN_ID)
        } catch (addError: any) {
          console.error("添加ETH链时出错:", addError)
          setWalletError("Failed to add Ethereum Mainnet to your wallet. Please add it manually.")
        }
      } else if (error.code === 4001) {
        // 用户拒绝切换网络
        setWalletError("You rejected the network switch request. This application requires Ethereum Mainnet.")
      } else {
        setWalletError("Failed to switch to Ethereum Mainnet. Please switch manually.")
      }
    }
  }

  // 自动连接钱包
  useEffect(() => {
    const autoConnect = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          setIsConnecting(true)
          // 尝试获取已连接的账户
          const accounts = await window.ethereum.request({ method: "eth_accounts" })

          if (accounts.length > 0) {
            // 用户已经授权过，可以直接连接
            setAddress(accounts[0])
            setIsConnected(true)

            // 获取当前链ID
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            setChainId(chainId)

            // 如果不是ETH链，自动切换
            if (chainId !== ETH_CHAIN_ID) {
              await switchToEthChain()
            }
          } else {
            // 用户未授权，尝试请求连接
            await connectWallet()
          }
        } else {
          setWalletError("No Ethereum wallet detected. Please install MetaMask or another compatible wallet.")
        }
      } catch (error) {
        console.error("自动连接钱包时出错:", error)
      } finally {
        setIsConnecting(false)
      }
    }

    // 页面加载时自动连接
    autoConnect()
  }, [])

  // 监听账户变化
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
          setWalletError(null)
        } else {
          // 用户断开了所有账户
          disconnectWallet()
        }
      })

      // 监听链变化
      window.ethereum.on("chainChanged", async (newChainId: string) => {
        setChainId(newChainId)

        // 如果切换到非ETH主网，提示并尝试切换回ETH主网
        if (newChainId !== ETH_CHAIN_ID) {
          setWalletError("This application requires Ethereum Mainnet. Switching networks...")
          try {
            await switchToEthChain()
          } catch (error) {
            console.error("自动切换回ETH主网失败:", error)
          }
        } else {
          setWalletError(null)
        }
      })
    }

    // 清理监听器
    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("chainChanged")
      }
    }
  }, [])

  const value = {
    address,
    isConnecting,
    isConnected,
    chainId,
    connectWallet,
    disconnectWallet,
    switchToEthChain,
    walletError,
    clearWalletError,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

// 使用钱包上下文的钩子
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
