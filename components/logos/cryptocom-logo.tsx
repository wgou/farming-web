export function CryptoComLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      width="24"
      height="24"
    >
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#1A1E2D" />
      <path d="M17.274 9.2l-1.275-2.2h-8l-1.274 2.2L12 17.6l5.274-8.4z" fill="#103F68" />
      <path d="M12 17.6l5.274-8.4-1.275-2.2L12 12.8V17.6z" fill="#1A3177" />
      <path d="M12 12.8L8 7h8l-4 5.8z" fill="#2970BF" />
      <path d="M12 12.8L8 7h4v5.8z" fill="#2E74BA" />
    </svg>
  )
}
