"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function MinimalistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // 在这里处理表单提交
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-light text-gray-900 mb-8">联系我们</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-600 mb-2">
              姓名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              电子邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-gray-600 mb-2">
              留言
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-colors duration-200"
              required
            ></textarea>
          </div>

          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-none py-6 h-auto">
            发送信息
          </Button>
        </form>
      </div>
    </section>
  )
}
