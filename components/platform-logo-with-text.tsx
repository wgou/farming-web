import { PlatformLogo, type LogoColorTheme } from "./platform-logo"

interface PlatformLogoWithTextProps {
  size?: number
  className?: string
  textClassName?: string
  theme?: LogoColorTheme
}

export function PlatformLogoWithText({
  size = 40,
  className = "",
  textClassName = "",
  theme = "blue",
}: PlatformLogoWithTextProps) {
  // 根据主题设置文字颜色
  const getTextColorClass = () => {
    if (textClassName) return textClassName

    switch (theme) {
      case "blue":
        return "text-[rgb(var(--dark-text-primary))]"
      case "purple":
        return "text-[#8A3FFC]"
      case "green":
        return "text-[#20BE6E]"
      case "gold":
        return "text-[#F5D13F]"
      case "teal":
        return "text-[#00BAB6]"
      case "red":
        return "text-[#FA4D56]"
      case "rainbow":
        return "bg-clip-text text-transparent bg-gradient-to-r from-[#FF0080] via-[#00DFD8] to-[#7928CA]"
      default:
        return "text-[rgb(var(--dark-text-primary))]"
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      <PlatformLogo size={size} theme={theme} />
      <div className={`ml-2 font-medium tracking-wider uppercase ${getTextColorClass()}`}>
        <span className={theme === "blue" ? "glow-text" : ""}>FARMING</span>
      </div>
    </div>
  )
}
