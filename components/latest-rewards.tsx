"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getRewards } from "../app/lib/api"

interface Reward {
  address: string;
  reward: string;
}

export default function LatestRewards() {
  const [rewards, setRewards] = useState<Reward[]>([])

  // 获取初始数据
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await getRewards(30); // 获取30条数据
        if (response.success && response.data.length > 0) {
          // 将API返回的数据格式化为组件需要的格式
          const formattedData = response.data.map(item => ({
            address: `${item.wallet.slice(0, 8)}...${item.wallet.slice(-8)}`,
            reward: item.eth.toFixed(5)
          }));
          setRewards(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
      }
    };

    fetchInitialData();
  }, []);

  // 轮换显示效果
  useEffect(() => {
    const interval = setInterval(() => {
      setRewards(prevRewards => {
        const newRewards = [...prevRewards];
        const lastItem = newRewards.pop();
        if (lastItem) {
          newRewards.unshift(lastItem);
        }
        return newRewards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-center text-[rgb(var(--dark-text-primary))] glow-text">
            Latest Rewards
          </h2>

          <div className="dark-card overflow-hidden">
            <div className="grid grid-cols-2 p-4 border-b border-[rgb(var(--dark-border))] bg-[rgb(var(--dark-bg-tertiary))]">
              <div className="font-medium text-[rgb(var(--dark-text-primary))]">Wallet Address</div>
              <div className="font-medium text-right text-[rgb(var(--dark-text-primary))]">ETH Reward</div>
            </div>

            <div className="h-[300px] overflow-hidden">
              <div className="rewards-scroll-container">
                {rewards.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="grid grid-cols-2 p-4 border-b border-[rgba(var(--dark-border),0.4)] hover:bg-[rgba(var(--dark-bg-tertiary),0.3)] transition-colors"
                  >
                    <div className="text-[rgb(var(--dark-text-secondary))]">{item.address}</div>
                    <div className="text-right text-[rgb(var(--dark-accent))] font-medium">{item.reward}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
