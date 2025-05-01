interface EthIconProps {
  className?: string
  size?: number
}

export function EthIcon({ className = "", size = 24 }: EthIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient background */}
      <defs>
        <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8CEF" />
          <stop offset="100%" stopColor="#6B74EF" />
        </linearGradient>
        <filter id="ethGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Circle background */}
      <circle cx="16" cy="16" r="16" fill="url(#ethGradient)" />

      {/* ETH logo */}
      <g filter="url(#ethGlow)">
        <path
          d="M16.498 4L16.3828 4.54343V19.0559L16.498 19.1677L23.4944 15.1791L16.498 4Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />
        <path d="M16.498 4L9.5 15.1791L16.498 19.1677V12.1537V4Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path
          d="M16.498 20.5927L16.4324 20.6712V26.1827L16.498 26.3737L23.5 16.6069L16.498 20.5927Z"
          fill="#FFFFFF"
          fillOpacity="0.9"
        />
        <path d="M16.498 26.3737V20.5927L9.5 16.6069L16.498 26.3737Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M16.498 19.1677L23.4944 15.1791L16.498 12.1537V19.1677Z" fill="#FFFFFF" fillOpacity="1" />
        <path d="M9.5 15.1791L16.498 19.1677V12.1537L9.5 15.1791Z" fill="#FFFFFF" fillOpacity="0.9" />
      </g>
    </svg>
  )
}
