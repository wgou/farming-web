"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { USDCIcon } from "@/components/icons/usdc-icon"
import { getWithdrawAvailable, submitWithdraw, getWithdrawHistory, WithdrawHistoryItem } from "../lib/api"
import { useMessage } from "../components/root-layout"

export default function WithdrawPage() {
  const { isConnected } = useWallet()
  const [usdcAmount, setUsdcAmount] = useState("")
  const [availableUsdc, setAvailableUsdc] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setMessage } = useMessage()
  
  // 提现记录状态
  const [withdrawHistory, setWithdrawHistory] = useState<WithdrawHistoryItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // 加载提现记录
  const loadMoreHistory = async (isFirstPage = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getWithdrawHistory(isFirstPage ? 1 : currentPage + 1);
      if (response.success) {
        const newHistory = response.data.records;
        setWithdrawHistory(prev => isFirstPage ? newHistory : [...prev, ...newHistory]);
        setTotal(response.data.total);
        setHasMore(response.data.total > (isFirstPage ? newHistory.length : withdrawHistory.length + newHistory.length));
        if (!isFirstPage) {
          setCurrentPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to load withdraw history:', error);
      setMessage({ type: 'error', text: 'Failed to load withdraw history' });
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    const initData = async () => {
      if (isConnected) {
        try {
          const response = await getWithdrawAvailable();
          if (response.success) {
            setAvailableUsdc(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch available USDC:', error);
        }
      }
      // 不管钱包是否连接，都加载提现记录
      loadMoreHistory(true);
    };

    initData();
  }, [isConnected]);

  // 获取状态文本和样式
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 1:
        return {
          text: "Completed",
          className: "text-[rgb(var(--dark-success))]"
        };
      case 0:
        return {
          text: "Processing",
          className: "text-[rgb(var(--dark-warning))]"
        };
      default:
        return {
          text: "Failed",
          className: "text-[rgb(var(--dark-error))]"
        };
    }
  };
 
  const handleUsdcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimals
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setUsdcAmount(value)
    }
  }

  const handleWithdraw = async () => {
    if (!usdcAmount || parseFloat(usdcAmount) <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    if (parseFloat(usdcAmount) > availableUsdc) {
      setMessage({ type: "error", text: "Insufficient balance" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitWithdraw(usdcAmount);
      if (response.success) {
        setMessage({ type: "success", text: "Withdrawal submitted successfully" });
        setUsdcAmount("");
        // 刷新可用余额
        const availableResponse = await getWithdrawAvailable();
        if (availableResponse.success) {
          setAvailableUsdc(availableResponse.data);
        }
      } else {
        setMessage({ type: "error", text: response.msg || "Withdrawal failed" });
      }
    } catch (error) {
      console.error('Withdraw error:', error);
      setMessage({ type: "error", text: "Failed to process withdrawal" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-md md:max-w-4xl mx-auto px-4 py-6 pb-20 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-4 text-center">Withdraw</h1>

        <div className="dark-card p-5">
          {/* Available USDC display */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-[rgb(var(--dark-text-secondary))]">Available USDC</div>
            <div className="text-[rgb(var(--dark-text-primary))]">{availableUsdc.toFixed(2)}</div>
          </div>

          {/* USDC Input */}
          <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center mb-3 rounded-md">
            <div className="flex items-center mr-2">
              <USDCIcon size={24} />
            </div>
            <input
              type="text"
              placeholder="0"
              value={usdcAmount}
              onChange={handleUsdcChange}
              className="bg-transparent border-none focus:outline-none flex-1 text-right text-[rgb(var(--dark-text-primary))] text-xl font-medium font-mono"
            />
          </div>

          {/* Withdrawal Button */}
          <button
            className="w-full py-3 bg-[rgb(var(--dark-accent))] text-white font-medium rounded-md hover:bg-[rgba(var(--dark-accent),0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isConnected || !usdcAmount || isSubmitting}
            onClick={handleWithdraw}
          >
            {isSubmitting ? "Processing..." : "Withdraw"}
          </button>
        </div>

        {/* Withdrawal History Section */}
        <div className="mt-4 border-t border-[rgba(var(--dark-border),0.6)] pt-8">
          <h2 className="text-xl font-medium mb-6 text-center">Withdrawal History</h2>

          <div className="dark-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_80px_120px_1fr] bg-[rgb(var(--dark-bg-tertiary))] p-3 border-b border-[rgb(var(--dark-border))] sticky top-0">
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm">Date(UTC)</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm text-right">USDC</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm text-center">Status</div>
              <div className="font-medium text-[rgb(var(--dark-text-primary))] text-sm text-right">Remark</div>
            </div>

            {withdrawHistory.length > 0 ? (
              <>
                <div>
                  {withdrawHistory.map((withdrawal, index) => {
                    const statusInfo = getStatusInfo(withdrawal.status);
                    const date = new Date(withdrawal.created);
                    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                    return (
                      <div key={`${withdrawal.id}-${index}`} className="grid grid-cols-[1fr_80px_120px_1fr] p-3 border-b border-[rgba(var(--dark-border),0.4)] hover:bg-[rgba(var(--dark-bg-tertiary),0.3)] transition-colors">
                        <div className="text-[rgb(var(--dark-text-secondary))] text-sm">{formattedDate}</div>
                        <div className="text-right"><span className="text-[rgb(var(--dark-accent))] text-sm">{withdrawal.usdc.toFixed(2)}</span></div>
                        <div className="flex justify-center"><span className={`text-sm px-2 py-0.5 rounded-full ${statusInfo.text === "Completed" ? "bg-[rgba(var(--dark-success),0.1)] text-[rgb(var(--dark-success))]" : statusInfo.text === "Processing" ? "bg-[rgba(var(--dark-warning),0.1)] text-[rgb(var(--dark-warning))]" : "bg-[rgba(var(--dark-error),0.1)] text-[rgb(var(--dark-error))]"}`}>{statusInfo.text}</span></div>
                        <div className="text-right text-sm text-[rgb(var(--dark-text-secondary))]">{withdrawal.remark || '-'}</div>
                      </div>
                    );
                  })}
                </div>
                {hasMore && (
                  <div className="p-4 text-center border-t border-[rgba(var(--dark-border),0.4)]">
                    <button
                      onClick={() => loadMoreHistory(false)}
                      disabled={isLoading}
                      className="text-[rgb(var(--dark-accent))] text-sm hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-[rgb(var(--dark-accent))] border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </span>
                      ) : (
                        `Show more (${withdrawHistory.length}/${total})`
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="min-h-[200px] flex flex-col items-center justify-center text-[rgb(var(--dark-text-secondary))] p-8">
                <div className="w-12 h-12 bg-[rgba(var(--dark-bg-tertiary),0.5)] rounded-full flex items-center justify-center mb-4">
                  <USDCIcon size={20} className="text-[rgb(var(--dark-text-tertiary))]" />
                </div>
                <p className="text-center text-sm font-medium">No withdrawal history yet</p>
                <p className="text-center text-xs text-[rgb(var(--dark-text-tertiary))] mt-1">Your withdrawal transactions will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
