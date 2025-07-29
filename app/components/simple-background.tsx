"use client"

import { useEffect, useRef } from "react"

export default function SimpleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simple floating orbs
    const orbs: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ["#00ffff", "#3b82f6", "#8b5cf6"]

    // Create fewer, larger orbs
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 60 + 20,
        opacity: Math.random() * 0.1 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.vx
        orb.y += orb.vy

        // Gentle mouse interaction
        const dx = mouse.x - orb.x
        const dy = mouse.y - orb.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          orb.vx += (dx / distance) * force * 0.002
          orb.vy += (dy / distance) * force * 0.002
        }

        // Boundary check with gentle bounce
        if (orb.x < 0 || orb.x > canvas.width) orb.vx *= -0.8
        if (orb.y < 0 || orb.y > canvas.height) orb.vy *= -0.8

        // Keep orbs in bounds
        orb.x = Math.max(0, Math.min(canvas.width, orb.x))
        orb.y = Math.max(0, Math.min(canvas.height, orb.y))

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size)
        gradient.addColorStop(
          0,
          orb.color +
            Math.floor(orb.opacity * 255)
              .toString(16)
              .padStart(2, "0"),
        )
        gradient.addColorStop(1, orb.color + "00")

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}
