"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getIndexStats } from "../app/lib/api"

interface Stats {
  nodes: number;
  participants: number;
  usdcVerified: string;
  ethReward: string;
}

interface StatsProps {
  initialStats?: Stats | null;
}

export default function StatsSection({ initialStats }: StatsProps) {
  const [stats, setStats] = useState<Stats | null>(initialStats || null);
  const [loading, setLoading] = useState(!initialStats);

  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await getIndexStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [initialStats]);

  const statsItems = [
    { label: "Nodes", value: stats?.nodes?.toLocaleString() || "0" },
    { label: "Participants", value: stats?.participants?.toLocaleString() || "0" },
    { label: "USDC Verified", value: stats?.usdcVerified || "0" },
    { label: "ETH Reward", value: stats?.ethReward || "0" },
  ];

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
            Farming Statistics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsItems.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="dark-card p-4 text-center h-[100px] flex flex-col justify-center"
              >
                <div className={`text-2xl md:text-3xl font-bold mb-2 text-[rgb(var(--dark-accent))] glow-accent ${loading ? 'animate-pulse' : ''}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-[rgb(var(--dark-text-secondary))] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
