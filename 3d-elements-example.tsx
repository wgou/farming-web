"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ThreeDElementsExample() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-8">3D Elements</h1>

        {/* 3D Card */}
        <motion.div
          className="w-full h-64 relative cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative preserve-3d transition-all duration-500"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front of card */}
            <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-white text-xl font-medium">Premium Card</h2>
                <p className="text-blue-100 mt-1">Click to flip</p>
              </div>
              <div>
                <div className="text-white font-mono text-lg">•••• •••• •••• 4242</div>
                <div className="flex justify-between mt-2">
                  <span className="text-blue-100 text-sm">John Doe</span>
                  <span className="text-blue-100 text-sm">05/25</span>
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute w-full h-full backface-hidden rounded-xl bg-gray-800 shadow-xl p-6 flex flex-col justify-between rotate-y-180">
              <div className="h-10 bg-gray-700 mt-4"></div>
              <div className="flex justify-end">
                <div className="bg-white text-gray-800 px-2 py-1 rounded font-mono">123</div>
              </div>
              <p className="text-gray-400 text-sm text-center">Click to flip back</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Buttons */}
        <div className="mt-12 space-y-6">
          <motion.button
            className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg shadow-lg transform transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            3D Button Effect
          </motion.button>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center"
                whileHover={{
                  rotateX: 10,
                  rotateY: 10,
                  scale: 1.1,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-2xl">🎮</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
