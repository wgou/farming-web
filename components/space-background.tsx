export function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>

      {/* Stars */}
      <div className="absolute top-1/4 left-1/4 w-6 h-6 text-white opacity-70">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-1/3 w-4 h-4 text-white opacity-50">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-5 h-5 text-white opacity-60">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 w-3 h-3 text-white opacity-40">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      {/* Planets/Circles */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gray-800 opacity-30"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-gray-800 opacity-20"></div>
    </div>
  )
}
