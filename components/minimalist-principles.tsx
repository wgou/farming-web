"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function MinimalistPrinciples() {
  const principles = [
    {
      title: "减法而非加法",
      description: "移除所有非必要元素，只保留真正重要的内容和功能。",
      icon: "−",
    },
    {
      title: "留白空间",
      description: "充分利用留白创造呼吸空间，提高可读性和视觉舒适度。",
      icon: "□",
    },
    {
      title: "有限的色彩",
      description: "使用有限的色彩方案，通常是单色或双色加一个强调色。",
      icon: "◯",
    },
    {
      title: "精简排版",
      description: "使用清晰、简洁的字体，注重字体大小和行高的层次结构。",
      icon: "T",
    },
    {
      title: "视觉层次",
      description: "通过大小、权重和间距创建清晰的视觉层次，引导用户注意力。",
      icon: "≡",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-light mb-12 text-gray-900">极简主义设计原则</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {principles.map((principle, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="text-4xl font-light text-gray-300 mb-4">{principle.icon}</div>
              <h3 className="text-xl font-light text-gray-900 mb-2">{principle.title}</h3>
              <p className="text-gray-600">{principle.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
