"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Bell } from "lucide-react"

export default function MicroInteractionsExample() {
  const [isLiked, setIsLiked] = useState(false)
  const [isNotified, setIsNotified] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold text-center mb-8">Micro-interactions</h1>

        {/* Like Button */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Like Animation</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Tap the heart to like</p>
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              whileTap={{ scale: 0.8 }}
              className="focus:outline-none"
            >
              <motion.div
                animate={
                  isLiked
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
              >
                <Heart size={28} fill={isLiked ? "#f43f5e" : "none"} color={isLiked ? "#f43f5e" : "#6b7280"} />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Add to Cart Animation</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Items in cart: {cartCount}</p>
            <div className="relative">
              <motion.button
                onClick={() => {
                  setCartCount(cartCount + 1)
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white p-2 rounded-full focus:outline-none"
              >
                <ShoppingCart size={20} />
              </motion.button>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Notification Animation</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Tap the bell for notifications</p>
            <div className="relative">
              <motion.button onClick={() => setIsNotified(!isNotified)} className="focus:outline-none">
                <motion.div
                  animate={
                    isNotified
                      ? {
                          rotate: [-10, 10, -10, 10, 0],
                          transition: { duration: 0.5 },
                        }
                      : {}
                  }
                >
                  <Bell size={24} color={isNotified ? "#8b5cf6" : "#6b7280"} />
                </motion.div>
              </motion.button>
              {isNotified && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  1
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
