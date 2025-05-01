"use client"

import { Moon, Bell, Settings, User } from "lucide-react"

export default function DarkModeExample() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <header className="border-b border-gray-800 px-4 py-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Dark UI</h1>
          <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <Moon size={18} />
          </button>
        </div>
      </header>

      <main className="p-4">
        <div className="bg-gray-800 rounded-xl p-5 mb-6">
          <h2 className="text-xl font-medium mb-2">Welcome back</h2>
          <p className="text-gray-400">Your dashboard is ready to explore</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-blue-400 mb-2">
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
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-xl font-medium">$2,450</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-purple-400 mb-2">
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
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">Activity</p>
              <p className="text-xl font-medium">12 tasks</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                <span className="text-blue-400">#{item}</span>
              </div>
              <div>
                <p className="font-medium">Transaction #{item}0823</p>
                <p className="text-sm text-gray-400">Completed • 2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center text-blue-400">
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
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Bell size={20} />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <Settings size={20} />
            <span className="text-xs mt-1">Settings</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
