"use client"

import { useEffect, useRef } from "react"

interface MinimalGradientBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  animated?: boolean
  animationSpeed?: number
}

export function MinimalGradientBackground({
  className = "",
  primaryColor = "10, 132, 255", // 默认蓝色
  secondaryColor = "94, 92, 230", // 默认紫色
  animated = true,
  animationSpeed = 0.001,
}: MinimalGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGradient(animationRef.current)
    }

    // 绘制渐变背景
    const drawGradient = (time: number) => {
      if (!ctx || !canvas) return

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 设置背景
      ctx.fillStyle = "rgba(18, 18, 18, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 创建渐变
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )

      // 如果启用动画，使用时间来改变渐变
      if (animated) {
        const offset = Math.sin(time * animationSpeed) * 0.2 + 0.5 // 在0.3到0.7之间变化
        gradient.addColorStop(0, `rgba(${primaryColor}, 0.15)`)
        gradient.addColorStop(offset, `rgba(${secondaryColor}, 0.1)`)
        gradient.addColorStop(1, "rgba(18, 18, 18, 0)")
      } else {
        gradient.addColorStop(0, `rgba(${primaryColor}, 0.15)`)
        gradient.addColorStop(0.5, `rgba(${secondaryColor}, 0.1)`)
        gradient.addColorStop(1, "rgba(18, 18, 18, 0)")
      }

      // 填充渐变
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 添加一些微妙的点
      const numPoints = 20
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 2 + 1
        const opacity = Math.random() * 0.1 + 0.05

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${primaryColor}, ${opacity})`
        ctx.fill()
      }
    }

    // 动画循环
    const animate = (time: number) => {
      animationRef.current = time
      drawGradient(time)
      if (animated) {
        requestAnimationFrame(animate)
      }
    }

    // 初始化
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 如果启用动画，开始动画循环
    let animationFrameId: number
    if (animated) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      // 如果不启用动画，只绘制一次
      drawGradient(0)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animated && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [primaryColor, secondaryColor, animated, animationSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-80 ${className}`}
      aria-hidden="true"
    />
  )
}
