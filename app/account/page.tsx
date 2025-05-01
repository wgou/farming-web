"use client"

import { useWallet } from "@/contexts/wallet-context"
import { USDCIcon } from "@/components/icons/usdc-icon"
import { EthIcon } from "@/components/icons/eth-icon"
import { useEffect, useState, useRef } from "react"
import { getWalletIndex, WalletData, getFarmingRewards, FarmingReward } from "../lib/api"

export default function AccountPage() {
  const { isConnected, address } = useWallet()
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [rewards, setRewards] = useState<FarmingReward[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const initialLoadDone = useRef(false)

  // 获取钱包数据
  const fetchWalletData = async () => {
    try {
      const response = await getWalletIndex();
      if (response.success && response.data) {
          setWalletData(response.data);
      } else {
        console.error('Failed to get wallet data:', response);
        setWalletData(null);
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
      setWalletData(null);
    }
  };

  // 获取奖励数据
  const loadMoreRewards = async (isFirstPage = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getFarmingRewards(isFirstPage ? 1 : currentPage + 1);
      if (response.success) {
        const newRewards = response.data.records;
        setRewards(prev => isFirstPage ? newRewards : [...prev, ...newRewards]);
        setTotal(response.data.total);
        const currentTotal = isFirstPage ? newRewards.length : rewards.length + newRewards.length;
        setHasMore(currentTotal < response.data.total);
        if (!isFirstPage) {
          setCurrentPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    if (isConnected && !initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchWalletData();
      loadMoreRewards(true);
    }
  }, [isConnected]);

  // Format number with fallback
  const formatNumber = (value: number | undefined | null, decimals: number = 2) => {
    if (typeof value === 'number') {
      return value.toFixed(decimals);
    }
    return '0';
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6 pb-20 overflow-y-auto">
        {isConnected ? (
          <section className="py-8">
            <h2 className="text-xl font-medium mb-6 text-center">My Wallet</h2>

            <div className="dark-card">
              <div className="grid grid-cols-2 gap-2 p-3 border-b border-[rgba(var(--dark-border),0.4)]">
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex flex-col justify-center rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <EthIcon size={20} className="mr-2" />
                      <span className="text-sm text-[rgb(var(--dark-text-primary))]">ETH</span>
                    </div>
                    <div className="text-[rgb(var(--dark-text-primary))]">{formatNumber(walletData?.eth, 4)}</div>
                  </div>
                </div>
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex flex-col justify-center rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <USDCIcon size={20} className="mr-2" />
                      <span className="text-sm text-[rgb(var(--dark-text-primary))]">USDC</span>
                    </div>
                    <div className="text-[rgb(var(--dark-text-primary))]">{formatNumber(walletData?.usdc, 2)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-3">
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center justify-between rounded-lg">
                  <div className="flex items-center">
                    <EthIcon size={20} className="mr-2" />
                    <span className="text-sm text-[rgb(var(--dark-text-primary))]">ETH Revenue(ETH)</span>
                  </div>
                  <div className="text-[rgb(var(--dark-text-primary))]">{formatNumber(walletData?.totalReward, 4)}</div>
                </div>

                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center justify-between rounded-lg">
                  <div className="flex items-center">
                    <EthIcon size={20} className="mr-2" />
                    <span className="text-sm text-[rgb(var(--dark-text-primary))]">Exchangeable(ETH)</span>
                  </div>
                  <div className="text-[rgb(var(--dark-text-primary))]">{formatNumber(walletData?.exchangeable, 4)}</div>
                </div>

                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 flex items-center justify-between rounded-lg">
                  <div className="flex items-center">
                    <USDCIcon size={20} className="mr-2" />
                    <span className="text-sm text-[rgb(var(--dark-text-primary))]">Account Balance</span>
                  </div>
                  <div className="text-[rgb(var(--dark-text-primary))]">{formatNumber(walletData?.accountBalance, 2)} USDC</div>
                </div>
              </div>
            </div>

            {/* Farming Rewards Section */}
            <section className="mt-6">
              <h2 className="text-lg font-medium mb-4 text-center">Farming Rewards</h2>
              <div className="dark-card">
                <div className="bg-[rgb(var(--dark-bg-tertiary))] p-3 border-b border-[rgb(var(--dark-border))] flex justify-between sticky top-0">
                  <div className="text-sm text-[rgb(var(--dark-text-primary))]">Date(UTC)</div>
                  <div className="text-sm text-[rgb(var(--dark-text-primary))]">Reward</div>
                </div>

                {rewards.length > 0 ? (
                  <>
                    <div>
                      {rewards.map((reward, index) => (
                        <div
                          key={`${reward.id}-${reward.created}-${index}`}
                          className="flex justify-between p-3 border-b border-[rgba(var(--dark-border),0.4)] hover:bg-[rgba(var(--dark-bg-tertiary),0.3)] transition-colors"
                        >
                          <div className="text-sm text-[rgb(var(--dark-text-secondary))]">
                            {new Date(reward.created).toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false
                            })}
                          </div>
                          <div className="text-sm text-[rgb(var(--dark-accent))] font-medium">{reward.rewardEth.toFixed(5)} ETH</div>
                        </div>
                      ))}
                    </div>
                    {hasMore && (
                      <div className="p-4 text-center border-t border-[rgba(var(--dark-border),0.4)]">
                        <button
                          onClick={() => loadMoreRewards(false)}
                          disabled={loading}
                          className="text-[rgb(var(--dark-accent))] text-sm hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-[rgb(var(--dark-accent))] border-t-transparent rounded-full animate-spin"></div>
                              Loading...
                            </span>
                          ) : (
                            `Show more (${rewards.length}/${total})`
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[160px] flex flex-col items-center justify-center text-[rgb(var(--dark-text-secondary))] p-6">
                    <div className="w-12 h-12 bg-[rgb(var(--dark-bg-tertiary))] rounded-full flex items-center justify-center mb-3">
                      <EthIcon size={24} />
                    </div>
                    <p className="text-center text-sm">No rewards yet</p>
                    <p className="text-xs text-[rgb(var(--dark-text-tertiary))] mt-1 text-center">
                      Start farming to earn ETH
                    </p>
                  </div>
                )}
              </div>
            </section>
          </section>
        ) : (
          <section className="py-10 text-center">
            <p className="text-[rgb(var(--dark-text-secondary))] mb-4">Connect your wallet to view your account</p>
            <button className="dark-button py-2 px-6">Connect Wallet</button>
          </section>
        )}
      </div>
    </div>
  )
}
