"use client"

export default function NeumorphismExample() {
  return (
    <div className="bg-[#e0e5ec] min-h-screen p-6">
      <div className="max-w-md mx-auto py-12">
        <div className="shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] bg-[#e0e5ec] rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-medium text-gray-700 mb-4">Neumorphic Design</h1>
          <p className="text-gray-600">Soft UI elements that appear to extrude from the background.</p>
        </div>

        <div className="flex justify-center space-x-4 my-8">
          <button className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <button className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] bg-[#e0e5ec] rounded-xl p-4">
          <div className="bg-[#e0e5ec] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="Email address"
              className="w-full bg-transparent border-none outline-none text-gray-700"
            />
          </div>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
