"use client"

import { useEffect, useRef } from "react"

interface AbstractFlowBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  density?: number
  speed?: number
  animated?: boolean
}

export function AbstractFlowBackground({
  className = "",
  primaryColor = "10, 132, 255", // 默认蓝色
  secondaryColor = "94, 92, 230", // 默认紫色
  density = 30,
  speed = 0.5,
  animated = true,
}: AbstractFlowBackgroundProps) {
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
    }

    // 粒子类
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * speed
        this.speedY = (Math.random() - 0.5) * speed
        this.color = Math.random() > 0.5 ? `rgba(${primaryColor}, ` : `rgba(${secondaryColor}, `
        this.opacity = Math.random() * 0.5 + 0.1
        this.life = 0
        this.maxLife = Math.random() * 100 + 100
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        // 如果粒子超出画布，重新放置
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life > this.maxLife) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.life = 0
        }
      }

      draw() {
        // 计算基于生命周期的不透明度
        const lifeRatio = this.life / this.maxLife
        const currentOpacity = this.opacity * (1 - lifeRatio)

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `${this.color}${currentOpacity})`
        ctx.fill()
      }
    }

    // 创建粒子数组
    const particlesArray: Particle[] = []
    const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / density))

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle())
    }

    // 绘制背景
    const drawBackground = () => {
      ctx.fillStyle = "rgba(18, 18, 18, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // 绘制和更新粒子
    const updateParticles = () => {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
    }

    // 连接附近的粒子
    const connectParticles = () => {
      const maxDistance = 100
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    const animate = () => {
      drawBackground()
      updateParticles()
      connectParticles()
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
      drawBackground()
      updateParticles()
      connectParticles()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animated && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [primaryColor, secondaryColor, density, speed, animated])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-70 ${className}`}
      aria-hidden="true"
    />
  )
}
