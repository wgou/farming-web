"use client"

export default function MinimalistContentCards() {
  const cards = [
    {
      title: "简约设计",
      description: "移除一切不必要的元素，专注于内容和功能，创造出简洁而有力的用户体验。",
      image: "/abstract-geometric-simplicity.png",
    },
    {
      title: "用户体验",
      description: "通过简化界面和交互流程，提高用户体验，让用户能够轻松完成任务。",
      image: "/user-centric-flow.png",
    },
    {
      title: "响应式布局",
      description: "确保在所有设备上都能提供一致且优雅的体验，从手机到桌面设备。",
      image: "/adaptable-web-display.png",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">我们的服务</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white">
              <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-light text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
