"use client"

import { useState } from "react"
import { PlatformLogo, PlatformLogoWithText, type LogoColorTheme } from "@/components"

export default function LogoThemeShowcase() {
  const [selectedTheme, setSelectedTheme] = useState<LogoColorTheme>("blue")

  const themes: LogoColorTheme[] = ["blue", "purple", "green", "gold", "teal", "red", "rainbow"]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-medium mb-6 text-center">Logo 主题展示</h2>

      {/* 主题选择器 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedTheme === theme
                ? "bg-[rgba(var(--dark-accent),0.2)] text-[rgb(var(--dark-accent))]"
                : "bg-[rgba(var(--dark-bg-tertiary),0.5)] text-[rgb(var(--dark-text-secondary))]"
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      {/* 当前选中主题的展示 */}
      <div className="dark-card p-8 flex flex-col items-center justify-center mb-8">
        <div className="mb-8">
          <PlatformLogo size={100} theme={selectedTheme} />
        </div>
        <div>
          <PlatformLogoWithText size={50} theme={selectedTheme} />
        </div>
      </div>

      {/* 所有主题的网格展示 */}
      <h3 className="text-xl font-medium mb-4 text-center">所有主题</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {themes.map((theme) => (
          <div key={theme} className="dark-card p-4 flex flex-col items-center">
            <PlatformLogo size={60} theme={theme} className="mb-3" />
            <p className="text-[rgb(var(--dark-text-secondary))] text-sm mb-2">{theme}</p>
            <PlatformLogoWithText size={24} theme={theme} />
          </div>
        ))}
      </div>
    </div>
  )
}
