export function TrustWalletLogo({ className = "" }: { className?: string }) {
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
      <path
        d="M12 4.5l5.25 2.625v3.938c0 3.656-2.25 7.078-5.25 7.875-3-0.797-5.25-4.219-5.25-7.875V7.125L12 4.5z"
        fill="#3375BB"
      />
      <path d="M15.75 10.5l-4.5 4.5-3-3 1.125-1.125 1.875 1.875 3.375-3.375 1.125 1.125z" fill="white" />
    </svg>
  )
}
