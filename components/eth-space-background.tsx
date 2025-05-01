"use client"

import { useEffect, useRef } from "react"

interface EthSpaceBackgroundProps {
  className?: string
}

export default function EthSpaceBackground({ className = "" }: EthSpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    // Stars class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      twinklePhase: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
        this.twinkleSpeed = Math.random() * 0.01 + 0.005
        this.twinklePhase = Math.random() * Math.PI * 2
      }

      draw(time: number) {
        // Twinkle effect
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinklePhase) * 0.5 + 0.5
        const currentOpacity = this.opacity * twinkle

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Occasional star glow
        if (this.size > 1.5 && twinkle > 0.8) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.5})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }
    }

    // Ethereum logo class
    class EthereumLogo {
      x: number
      y: number
      size: number
      opacity: number
      rotationSpeed: number
      rotation: number

      constructor(size: number) {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.size = size
        this.opacity = 0.15
        this.rotationSpeed = 0.0002
        this.rotation = 0
      }

      draw(time: number) {
        this.rotation += this.rotationSpeed

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)

        // Draw Ethereum logo
        ctx.beginPath()

        // Simplified Ethereum logo shape
        ctx.moveTo(0, -1)
        ctx.lineTo(0.5, -0.3)
        ctx.lineTo(0, 0)
        ctx.lineTo(-0.5, -0.3)
        ctx.closePath()

        ctx.moveTo(0, 0)
        ctx.lineTo(0.5, -0.3)
        ctx.lineTo(0.5, 0.7)
        ctx.lineTo(0, 1)
        ctx.lineTo(-0.5, 0.7)
        ctx.lineTo(-0.5, -0.3)
        ctx.closePath()

        // Create gradient
        const gradient = ctx.createLinearGradient(0, -1, 0, 1)
        gradient.addColorStop(0, `rgba(130, 71, 229, ${this.opacity})`) // Purple
        gradient.addColorStop(1, `rgba(61, 136, 248, ${this.opacity})`) // Blue

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      }
    }

    // Nebula class
    class Nebula {
      x: number
      y: number
      radius: number
      color1: string
      color2: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 300 + 100

        // Random color combinations
        const colors = [
          { c1: "86, 71, 229", c2: "61, 136, 248" }, // Purple to blue
          { c1: "61, 136, 248", c2: "94, 231, 223" }, // Blue to cyan
          { c1: "86, 71, 229", c2: "155, 79, 230" }, // Purple variants
        ]

        const colorSet = colors[Math.floor(Math.random() * colors.length)]
        this.color1 = colorSet.c1
        this.color2 = colorSet.c2
        this.opacity = Math.random() * 0.05 + 0.02
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, `rgba(${this.color1}, ${this.opacity})`)
        gradient.addColorStop(0.5, `rgba(${this.color2}, ${this.opacity * 0.7})`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Create stars
    const stars: Star[] = []
    const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 5000), 200)

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // Create nebulas
    const nebulas: Nebula[] = []
    const nebulaCount = 5

    for (let i = 0; i < nebulaCount; i++) {
      nebulas.push(new Nebula())
    }

    // Create Ethereum logo
    const ethLogo = new EthereumLogo(Math.min(canvas.width, canvas.height) * 0.3)

    // Draw the background
    const drawBackground = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dark background
      ctx.fillStyle = "rgb(13, 17, 28)" // Dark blue-black
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient overlay
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      bgGradient.addColorStop(0, "rgba(20, 30, 48, 0.5)")
      bgGradient.addColorStop(1, "rgba(10, 15, 30, 0.5)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Animation loop
    const animate = (time: number) => {
      drawBackground()

      // Draw nebulas
      nebulas.forEach((nebula) => nebula.draw())

      // Draw Ethereum logo
      ethLogo.draw(time)

      // Draw stars
      stars.forEach((star) => star.draw(time))

      requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`} aria-hidden="true" />
}
