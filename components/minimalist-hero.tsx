"use client"

import { Button } from "@/components/ui/button"

export default function MinimalistHero() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
          简约而不简单的设计
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          专注于内容和用户体验，移除一切不必要的元素，创造出优雅而高效的用户界面。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-none px-8 py-6 h-auto">了解更多</Button>
          <Button variant="outline" className="border-gray-300 text-gray-900 rounded-none px-8 py-6 h-auto">
            查看案例
          </Button>
        </div>
      </div>
    </section>
  )
}
