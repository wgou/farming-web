"use client"

import { useEffect, useRef } from "react"

interface FarmingNodesBackgroundProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  nodeCount?: number
  animated?: boolean
}

export function FarmingNodesBackground({
  className = "",
  primaryColor = "10, 132, 255", // 默认蓝色
  secondaryColor = "94, 92, 230", // 默认紫色
  nodeCount = 30,
  animated = true,
}: FarmingNodesBackgroundProps) {
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

    // 节点类
    class Node {
      x: number
      y: number
      size: number
      color: string
      connections: Node[]
      pulseSpeed: number
      pulsePhase: number
      isEthNode: boolean

      constructor(isEthNode = false) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = isEthNode ? 4 : Math.random() * 2 + 1
        this.color = isEthNode ? `rgba(${primaryColor}, 0.8)` : `rgba(${secondaryColor}, 0.5)`
        this.connections = []
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
        this.isEthNode = isEthNode
      }

      update(time: number) {
        if (animated) {
          // 脉冲效果
          const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.5 + 0.5
          this.size = this.isEthNode ? 4 + pulse * 2 : 1 + pulse * 2
        }
      }

      draw(time: number) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        if (this.isEthNode) {
          // 为ETH节点添加发光效果
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
          gradient.addColorStop(0, `rgba(${primaryColor}, 0.8)`)
          gradient.addColorStop(1, `rgba(${primaryColor}, 0)`)
          ctx.fillStyle = gradient
          ctx.fill()

          // 绘制中心点
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, 0.9)`
          ctx.fill()
        } else {
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }
    }

    // 创建节点
    const nodes: Node[] = []
    const ethNodes: Node[] = []

    // 创建ETH节点（较大的节点）
    for (let i = 0; i < 5; i++) {
      const node = new Node(true)
      nodes.push(node)
      ethNodes.push(node)
    }

    // 创建普通节点
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    // 建立节点之间的连接
    const connectNodes = () => {
      // 连接普通节点到ETH节点
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].isEthNode) {
          // 找到最近的ETH节点
          let closestEthNode = null
          let minDistance = Number.POSITIVE_INFINITY

          for (let j = 0; j < ethNodes.length; j++) {
            const dx = nodes[i].x - ethNodes[j].x
            const dy = nodes[i].y - ethNodes[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < minDistance) {
              minDistance = distance
              closestEthNode = ethNodes[j]
            }
          }

          if (closestEthNode && minDistance < 300) {
            nodes[i].connections.push(closestEthNode)
            closestEthNode.connections.push(nodes[i])
          }
        }
      }

      // 连接普通节点之间
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].isEthNode) {
          for (let j = i + 1; j < nodes.length; j++) {
            if (!nodes[j].isEthNode) {
              const dx = nodes[i].x - nodes[j].x
              const dy = nodes[i].y - nodes[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 150 && Math.random() > 0.7) {
                nodes[i].connections.push(nodes[j])
                nodes[j].connections.push(nodes[i])
              }
            }
          }
        }
      }
    }

    // 绘制背景
    const drawBackground = () => {
      ctx.fillStyle = "rgba(18, 18, 18, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // 绘制节点和连接
    const drawNodes = (time: number) => {
      // 绘制连接
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        for (let j = 0; j < node.connections.length; j++) {
          const connectedNode = node.connections[j]

          // 避免重复绘制连接
          if (nodes.indexOf(node) < nodes.indexOf(connectedNode)) {
            const dx = node.x - connectedNode.x
            const dy = node.y - connectedNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // 基于距离计算不透明度
            const opacity = 1 - distance / 300

            if (opacity > 0) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(connectedNode.x, connectedNode.y)

              // 如果连接涉及ETH节点，使用主色调
              if (node.isEthNode || connectedNode.isEthNode) {
                ctx.strokeStyle = `rgba(${primaryColor}, ${opacity * 0.5})`
                ctx.lineWidth = 1
              } else {
                ctx.strokeStyle = `rgba(${secondaryColor}, ${opacity * 0.3})`
                ctx.lineWidth = 0.5
              }

              ctx.stroke()

              // 如果是活跃连接，添加数据流动画
              if (animated && (node.isEthNode || connectedNode.isEthNode) && Math.random() > 0.95) {
                const particleSize = 2
                const particlePosition = Math.sin(time * 0.001) * 0.5 + 0.5

                const particleX = node.x + (connectedNode.x - node.x) * particlePosition
                const particleY = node.y + (connectedNode.y - node.y) * particlePosition

                ctx.beginPath()
                ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${primaryColor}, 0.8)`
                ctx.fill()
              }
            }
          }
        }
      }

      // 绘制节点
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(time)
        nodes[i].draw(time)
      }
    }

    // 动画循环
    const animate = (time: number) => {
      drawBackground()
      drawNodes(time)
      if (animated) {
        requestAnimationFrame(animate)
      }
    }

    // 初始化
    resizeCanvas()
    connectNodes()
    window.addEventListener("resize", resizeCanvas)

    // 如果启用动画，开始动画循环
    let animationFrameId: number
    if (animated) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      // 如果不启用动画，只绘制一次
      drawBackground()
      drawNodes(0)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animated && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [primaryColor, secondaryColor, nodeCount, animated])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-70 ${className}`}
      aria-hidden="true"
    />
  )
}
