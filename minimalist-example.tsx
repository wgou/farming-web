"use client"

import { Button } from "@/components/ui/button"

export default function MinimalistExample() {
  return (
    <div className="bg-white min-h-screen">
      <header className="py-6 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light text-gray-900">Brand</h1>
        </div>
      </header>
      <main className="px-4">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-light text-gray-900">Simple. Intuitive. Effective.</h2>
            <p className="text-gray-600">Clean design that focuses on what matters most to your customers.</p>
          </div>
          <Button className="w-full bg-black text-white rounded-none hover:bg-gray-800">Explore Products</Button>
          <img src="/single-white-cube.png" alt="Minimalist product showcase" className="w-full h-auto" />
        </div>
      </main>
    </div>
  )
}
