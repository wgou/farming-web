export type LogoColorTheme =
  | "blue" // 默认蓝色主题
  | "purple" // 紫色主题
  | "green" // 绿色主题
  | "gold" // 金色主题
  | "teal" // 青色主题
  | "red" // 红色主题
  | "rainbow" // 彩虹渐变主题

interface PlatformLogoProps {
  size?: number
  className?: string
  theme?: LogoColorTheme
}

export function PlatformLogo({ size = 40, className = "", theme = "blue" }: PlatformLogoProps) {
  // 定义不同主题的颜色配置
  const themeColors = {
    blue: {
      primary: {
        start: "#2C7BE5",
        end: "#1A54A8",
      },
      secondary: {
        start: "#7EB6FF",
        end: "#3D8DFF",
      },
      glow: "rgb(var(--dark-accent))",
    },
    purple: {
      primary: {
        start: "#8A3FFC",
        end: "#6929C4",
      },
      secondary: {
        start: "#BE95FF",
        end: "#A56EFF",
      },
      glow: "#8A3FFC",
    },
    green: {
      primary: {
        start: "#20BE6E",
        end: "#0E8C4A",
      },
      secondary: {
        start: "#6FE7B7",
        end: "#42D392",
      },
      glow: "#20BE6E",
    },
    gold: {
      primary: {
        start: "#F5D13F",
        end: "#E6B319",
      },
      secondary: {
        start: "#FFE999",
        end: "#FFD84D",
      },
      glow: "#F5D13F",
    },
    teal: {
      primary: {
        start: "#00BAB6",
        end: "#007D79",
      },
      secondary: {
        start: "#92EEEE",
        end: "#3DDBD9",
      },
      glow: "#00BAB6",
    },
    red: {
      primary: {
        start: "#FA4D56",
        end: "#DA1E28",
      },
      secondary: {
        start: "#FFB3B8",
        end: "#FF8389",
      },
      glow: "#FA4D56",
    },
    rainbow: {
      primary: {
        start: "#FF0080",
        end: "#7928CA",
      },
      secondary: {
        start: "#00DFD8",
        end: "#0072F5",
      },
      glow: "#FF0080",
    },
  }

  // 获取当前主题的颜色
  const colors = themeColors[theme]

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer diamond shape */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glowing background effect */}
        <defs>
          <radialGradient id={`logoGlow-${theme}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={colors.glow} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`diamondGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary.start} />
            <stop offset="100%" stopColor={colors.primary.end} />
          </linearGradient>

          <linearGradient id={`innerGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary.start} />
            <stop offset="100%" stopColor={colors.secondary.end} />
          </linearGradient>

          {theme === "rainbow" && (
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF0080" />
              <stop offset="20%" stopColor="#FF8C00" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="60%" stopColor="#00DFD8" />
              <stop offset="80%" stopColor="#0072F5" />
              <stop offset="100%" stopColor="#7928CA" />
            </linearGradient>
          )}

          <filter id={`glow-${theme}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Subtle glow effect */}
        <circle cx="50" cy="50" r="40" fill={`url(#logoGlow-${theme})`} opacity="0.5" />

        {/* Main diamond shape */}
        <path
          d="M50 5L95 50L50 95L5 50L50 5Z"
          fill={theme === "rainbow" ? `url(#rainbowGradient)` : `url(#diamondGradient-${theme})`}
          filter={`url(#glow-${theme})`}
        />

        {/* Inner diamond shape */}
        <path d="M50 20L80 50L50 80L20 50L50 20Z" fill={`url(#innerGradient-${theme})`} />

        {/* Plant/farming element */}
        <path d="M50 35C50 35 45 45 50 55C55 45 50 35 50 35Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M40 45C40 45 50 50 60 45C50 55 40 45 40 45Z" fill="#FFFFFF" opacity="0.9" />

        {/* Circular center */}
        <circle cx="50" cy="50" r="8" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  )
}
