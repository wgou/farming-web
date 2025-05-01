"use client"

export default function GlassmorphismExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6 relative">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-xl opacity-50"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-blue-400 rounded-full blur-xl opacity-50"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-300 rounded-full blur-xl opacity-40"></div>

      <div className="max-w-md mx-auto pt-12">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">Glassmorphism UI</h1>

        {/* Glass card */}
        <div className="backdrop-blur-lg bg-white/20 rounded-xl border border-white/30 shadow-lg p-6 mb-6">
          <h2 className="text-white text-xl font-medium mb-4">Weather Today</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-4xl font-light">24°</p>
              <p className="text-white/80">Sunny</p>
            </div>
            <div className="text-yellow-300 text-5xl">☀️</div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-2">
            {["Mon", "Tue", "Wed", "Thu"].map((day) => (
              <div key={day} className="text-center">
                <p className="text-white/80 text-sm">{day}</p>
                <p className="text-white text-lg font-medium">23°</p>
              </div>
            ))}
          </div>
        </div>

        {/* Glass buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all rounded-full border border-white/30 w-12 h-12 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v18" />
              <path d="M3 12h18" />
            </svg>
          </button>
          <button className="backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all rounded-full border border-white/30 w-12 h-12 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-all rounded-full border border-white/30 w-12 h-12 flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
        </div>

        {/* Glass input */}
        <div className="backdrop-blur-lg bg-white/20 rounded-xl border border-white/30 p-4 flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-white placeholder-white/70 flex-1"
          />
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
