"use client"

import { useState } from "react"
import {
  CyberGridBackground,
  AbstractFlowBackground,
  MinimalGradientBackground,
  FarmingNodesBackground,
} from "@/components/backgrounds"
import { PlatformLogoWithText } from "@/components/platform-logo-with-text"

type BackgroundType = "cyber-grid" | "abstract-flow" | "minimal-gradient" | "farming-nodes"
type ColorTheme = "blue" | "purple" | "green" | "gold" | "teal" | "red"

export default function BackgroundShowcase() {
  const [selectedBackground, setSelectedBackground] = useState<BackgroundType>("cyber-grid")
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>("blue")
  const [animated, setAnimated] = useState(true)

  // 颜色主题映射
  const colorThemes = {
    blue: {
      primary: "10, 132, 255",
      secondary: "94, 92, 230",
    },
    purple: {
      primary: "138, 63, 252",
      secondary: "105, 41, 196",
    },
    green: {
      primary: "32, 190, 110",
      secondary: "14, 140, 74",
    },
    gold: {
      primary: "245, 209, 63",
      secondary: "230, 179, 25",
    },
    teal: {
      primary: "0, 186, 182",
      secondary: "0, 125, 121",
    },
    red: {
      primary: "250, 77, 86",
      secondary: "218, 30, 40",
    },
  }

  // 渲染当前选择的背景
  const renderBackground = () => {
    const { primary, secondary } = colorThemes[selectedTheme]

    switch (selectedBackground) {
      case "cyber-grid":
        return <CyberGridBackground primaryColor={primary} secondaryColor={secondary} animated={animated} />
      case "abstract-flow":
        return <AbstractFlowBackground primaryColor={primary} secondaryColor={secondary} animated={animated} />
      case "minimal-gradient":
        return <MinimalGradientBackground primaryColor={primary} secondaryColor={secondary} animated={animated} />
      case "farming-nodes":
        return <FarmingNodesBackground primaryColor={primary} secondaryColor={secondary} animated={animated} />
      default:
        return <CyberGridBackground primaryColor={primary} secondaryColor={secondary} animated={animated} />
    }
  }

  return (
    <div className="min-h-screen">
      {/* 渲染当前背景 */}
      {renderBackground()}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="flex justify-center mb-8">
            <PlatformLogoWithText size={50} theme={selectedTheme as any} />
          </div>

          <div className="dark-card p-6 mb-8">
            <h2 className="text-2xl font-medium mb-4 text-center">背景样式展示</h2>

            {/* 背景选择器 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">选择背景样式</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedBackground("cyber-grid")}
                  className={`p-3 rounded-md transition-colors ${
                    selectedBackground === "cyber-grid"
                      ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                      : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
                  }`}
                >
                  赛博网格
                </button>
                <button
                  onClick={() => setSelectedBackground("abstract-flow")}
                  className={`p-3 rounded-md transition-colors ${
                    selectedBackground === "abstract-flow"
                      ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                      : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
                  }`}
                >
                  抽象流动
                </button>
                <button
                  onClick={() => setSelectedBackground("minimal-gradient")}
                  className={`p-3 rounded-md transition-colors ${
                    selectedBackground === "minimal-gradient"
                      ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                      : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
                  }`}
                >
                  简约渐变
                </button>
                <button
                  onClick={() => setSelectedBackground("farming-nodes")}
                  className={`p-3 rounded-md transition-colors ${
                    selectedBackground === "farming-nodes"
                      ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                      : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
                  }`}
                >
                  农场节点
                </button>
              </div>
            </div>

            {/* 颜色主题选择器 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">选择颜色主题</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {Object.keys(colorThemes).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSelectedTheme(theme as ColorTheme)}
                    className={`p-3 rounded-md transition-colors ${
                      selectedTheme === theme
                        ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                        : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* 动画开关 */}
            <div>
              <h3 className="text-lg font-medium mb-3">动画效果</h3>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animated}
                    onChange={() => setAnimated(!animated)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-[rgba(var(--dark-bg-tertiary),0.5)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--dark-accent))]"></div>
                  <span className="ms-3 text-sm font-medium text-[rgb(var(--dark-text-secondary))]">
                    {animated ? "开启" : "关闭"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* 背景说明 */}
          <div className="dark-card p-6">
            <h2 className="text-xl font-medium mb-4">背景设计说明</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">赛博网格</h3>
                <p className="text-[rgb(var(--dark-text-secondary))]">
                  赛博朋克风格的网格背景，带有发光效果和动态光线。适合现代化的加密货币平台，营造科技感和未来感。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">抽象流动</h3>
                <p className="text-[rgb(var(--dark-text-secondary))]">
                  流动的粒子和连接线，象征数据流和流动性。粒子之间的连接代表网络和社区，适合强调平台的流动性和连接性。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">简约渐变</h3>
                <p className="text-[rgb(var(--dark-text-secondary))]">
                  简洁的渐变背景，不会分散用户对内容的注意力。适合需要突出内容的页面，同时保持现代感和专业性。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">农场节点</h3>
                <p className="text-[rgb(var(--dark-text-secondary))]">
                  模拟区块链节点网络的背景，大节点代表ETH，小节点代表用户。节点之间的连接和数据流动直观地展示了流动性农场的概念。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
