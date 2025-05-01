"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowDown, RefreshCw } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { USDCIcon } from "@/components/icons/usdc-icon"
import { EthIcon } from "@/components/icons/eth-icon"
import { getExchangeIndex, toUsdc, submitExchange, getSwapHistory, SwapHistoryItem } from "../lib/api"
import { useMessage } from "../components/root-layout"

const PAGE_SIZE = 5;

export default function SwapPage() {
  const { isConnected } = useWallet()
  const { setMessage } = useMessage()
  const [ethAmount, setEthAmount] = useState("")
  const [usdcAmount, setUsdcAmount] = useState("")
  const [exchangeIndex, setExchangeIndex] = useState<number>(0.00)
  const [isMaxClicked, setIsMaxClicked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [swapHistory, setSwapHistory] = useState<SwapHistoryItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)
  const initialLoadDone = useRef(false)

  useEffect(() => {
    const fetchExchangeIndex = async () => {
      try {
        const response = await getExchangeIndex();
        if (response.success) {
          setExchangeIndex(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch exchange index:', error);
      }
    };

    fetchExchangeIndex();
  }, []);

  // Fetch swap history
  const loadMoreHistory = async (isFirstPage = false) => {
    if (isLoadingMore) return;
    
    // 防止初始加载重复请求
    if (isFirstPage && initialLoadDone.current) return;
    if (isFirstPage) initialLoadDone.current = true;
    
    setIsLoadingMore(true);
    try {
      const response = await getSwapHistory(isFirstPage ? 1 : currentPage + 1, PAGE_SIZE);
      if (response.success) {
        const newHistory = response.data.records;
        setSwapHistory(prev => isFirstPage ? newHistory : [...prev, ...newHistory]);
        setTotal(response.data.total);
        const currentTotal = isFirstPage ? newHistory.length : swapHistory.length + newHistory.length;
        setHasMore(currentTotal < response.data.total);
        if (!isFirstPage) {
          setCurrentPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch swap history:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Initialize data
  useEffect(() => {
    const initData = async () => {
      try {
        const response = await getExchangeIndex();
        if (response.success) {
          setExchangeIndex(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch exchange index:', error);
      }
      // Load initial swap history
      loadMoreHistory(true);
    };

    initData();
  }, []);

  const handleMaxClick = async () => {
    setIsMaxClicked(true);
    const ethValue = Number(exchangeIndex).toFixed(5);
    setEthAmount(ethValue);
    
    try {
      const response = await toUsdc();
      if (response.success) {
        setUsdcAmount(response.data.toFixed(2));
      }
    } catch (error) {
      console.error('Failed to convert to USDC:', error);
    }
  };

  const handleExchange = async () => {
    if (!isConnected || !ethAmount || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await submitExchange();
      if (response.success) {
        setMessage({ type: 'success', text: 'Exchange Success!' });
        // Reset form after successful exchange
        setEthAmount("");
        setUsdcAmount("");
        setIsMaxClicked(false);
        // Refresh available balance
        const indexResponse = await getExchangeIndex();
        if (indexResponse.success) {
          setExchangeIndex(indexResponse.data);
        }
      } else {
        setMessage({ type: 'error', text: 'Exchange Failed!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Exchange Failed!' });
      console.error('Exchange error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6 pb-20 overflow-y-auto">
        {/* ETH Exchange Section */}
        <section className="py-8">
          <h1 className="text-2xl font-medium mb-4 text-center">ETH Exchange</h1>

          <div className="dark-card p-5">
            <div className="space-y-3">
              {/* ETH Input */}
              <div>
                <div className="text-xs text-[rgb(var(--dark-text-tertiary))] mb-2 px-3">
                  Available Balance: <span className="text-[rgb(var(--dark-text-secondary))]">{Number(exchangeIndex).toFixed(5)} ETH</span>
                </div>
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center rounded-md h-14">
                  <div className="flex items-center">
                    <EthIcon size={20} className="mr-2" />
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={ethAmount}
                    readOnly={isMaxClicked}
                    disabled={isMaxClicked}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                        setEthAmount(value)
                        setUsdcAmount("")
                      }
                    }}
                    className="bg-transparent border-none focus:outline-none flex-1 text-right text-[rgb(var(--dark-text-primary))] text-lg font-medium font-mono disabled:opacity-100 disabled:cursor-not-allowed"
                  />
                  <button 
                    className="ml-3 text-[rgb(var(--dark-accent))] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={handleMaxClick}
                    disabled={isMaxClicked}
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-0.5">
                <div className="w-6 h-6 rounded-full bg-[rgba(var(--dark-bg-tertiary),0.5)] flex items-center justify-center">
                  <ArrowDown className="h-3 w-3 text-[rgb(var(--dark-text-secondary))]" />
                </div>
              </div>

              {/* USDC Input */}
              <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center rounded-md h-14">
                <div className="flex items-center">
                  <USDCIcon size={20} className="mr-2" />
                </div>
                <input
                  type="text"
                  placeholder="0"
                  value={usdcAmount}
                  readOnly
                  disabled
                  className="bg-transparent border-none focus:outline-none flex-1 text-right text-[rgb(var(--dark-text-primary))] text-lg font-medium font-mono disabled:opacity-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Exchange Button */}
              <button
                className="w-full py-4 bg-[rgb(var(--dark-accent))] text-white font-medium rounded-md hover:bg-[rgba(var(--dark-accent),0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isConnected || !ethAmount || isSubmitting}
                onClick={handleExchange}
              >
                {isSubmitting ? 'Processing...' : 'Exchange'}
              </button>
            </div>
          </div>
        </section>

        {/* Swap History Section */}
        <section className="py-8 border-t border-[rgba(var(--dark-border),0.6)] mt-6">
          <h2 className="text-xl font-medium mb-6 text-center">Swap History</h2>

          <div className="dark-card overflow-hidden">
            {/* Table Header - Improved alignment and spacing */}
            <div className="grid grid-cols-3 bg-[rgb(var(--dark-bg-tertiary))] p-3 border-b border-[rgb(var(--dark-border))] sticky top-0">
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm">Date(UTC)</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm text-center">ETH</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm text-right">USDC</div>
            </div>

            {swapHistory.length > 0 ? (
              <>
                <div>
                  {swapHistory.map((swap, index) => (
                    <div
                      key={`${swap.id}-${swap.created}-${index}`}
                      className="grid grid-cols-3 p-3 border-b border-[rgba(var(--dark-border),0.4)] hover:bg-[rgba(var(--dark-bg-tertiary),0.3)] transition-colors"
                    >
                      {/* Date Column */}
                      <div className="text-[rgb(var(--dark-text-secondary))] text-sm">
                        {new Date(swap.created).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </div>
                      {/* ETH Column */}
                      <div className="text-center">
                        <span className="text-[rgb(var(--dark-text-primary))] text-sm">
                          {swap.eth.toFixed(5)}
                        </span>
                      </div>
                      {/* USDC Column */}
                      <div className="text-right">
                        <span className="text-[rgb(var(--dark-accent))] text-sm">
                          {swap.usdc.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {hasMore && (
                  <div className="p-4 text-center border-t border-[rgba(var(--dark-border),0.4)]">
                    <button
                      onClick={() => loadMoreHistory(false)}
                      disabled={isLoadingMore}
                      className="text-[rgb(var(--dark-accent))] text-sm hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      {isLoadingMore ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-[rgb(var(--dark-accent))] border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </span>
                      ) : (
                        `Show more (${swapHistory.length}/${total})`
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Empty state
              <div className="min-h-[200px] flex flex-col items-center justify-center text-[rgb(var(--dark-text-secondary))] p-8">
                <div className="w-12 h-12 bg-[rgba(var(--dark-bg-tertiary),0.5)] rounded-full flex items-center justify-center mb-4">
                  <RefreshCw className="h-5 w-5 text-[rgb(var(--dark-text-tertiary))]" />
                </div>
                <p className="text-center text-sm font-medium">No swap history yet</p>
                <p className="text-center text-xs text-[rgb(var(--dark-text-tertiary))] mt-1">
                  Your swap transactions will appear here
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
