"use client"

import { useEffect, useRef } from "react"

interface CyberGridBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  gridOpacity?: number
  glowIntensity?: number
  animated?: boolean
}

function CyberGridBackground({
  className = "",
  primaryColor = "10, 132, 255", // 默认蓝色
  secondaryColor = "94, 92, 230", // 默认紫色
  gridOpacity = 0.3,
  glowIntensity = 0.4,
  animated = true,
}: CyberGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawPattern()
    }

    // 绘制背景图案
    const drawPattern = () => {
      if (!ctx || !canvas) return

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 设置背景
      ctx.fillStyle = "rgba(18, 18, 18, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制网格线
      ctx.strokeStyle = `rgba(44, 44, 46, ${gridOpacity})`
      ctx.lineWidth = 0.5

      // 水平线
      const gridSpacingY = 40
      for (let y = 0; y < canvas.height; y += gridSpacingY) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // 垂直线
      const gridSpacingX = 40
      for (let x = 0; x < canvas.width; x += gridSpacingX) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // 添加一些亮点
      const numPoints = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.5
        const opacity = Math.random() * 0.5 + 0.1

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${primaryColor}, ${opacity})`
        ctx.fill()
      }

      // 添加一些光线效果
      const numLines = 5
      for (let i = 0; i < numLines; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const length = Math.random() * 150 + 50
        const angle = Math.random() * Math.PI * 2
        const endX = x + Math.cos(angle) * length
        const endY = y + Math.sin(angle) * length

        const gradient = ctx.createLinearGradient(x, y, endX, endY)
        gradient.addColorStop(0, `rgba(${primaryColor}, ${glowIntensity})`)
        gradient.addColorStop(1, `rgba(${primaryColor}, 0)`)

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 添加一些圆形
      const numCircles = 8
      for (let i = 0; i < numCircles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 100 + 50

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(${secondaryColor}, 0.03)`)
        gradient.addColorStop(1, `rgba(${secondaryColor}, 0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // 初始化
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 如果启用动画，添加动画效果
    let animationFrameId: number
    if (animated) {
      const animate = () => {
        drawPattern()
        animationFrameId = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animated && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [primaryColor, secondaryColor, gridOpacity, glowIntensity, animated])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-70 ${className}`}
      aria-hidden="true"
    />
  )
}

export default CyberGridBackground
