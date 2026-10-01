import { useEffect, useRef } from 'react'

/**
 * 3D Animated Hexagonal Honeycomb Background
 * - Starts completely dark/black.
 * - NO automatic wave or static green clusters.
 * - When mouse cursor is INSIDE the login card (the red part), NO animation triggers.
 * - When mouse cursor moves OUTSIDE the login card, only the hexagons around the cursor
 *   position illuminate with 3D elevation and neon green glow.
 * - When cursor stops or leaves, hexagons smoothly fade back to dark matte.
 */
export default function HexagonBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = 0
    let height = 0
    let dpr = 1

    // Hexagon geometry
    const hexRadius = 34 // Radius in CSS pixels
    const hexWidth = Math.sqrt(3) * hexRadius
    const rowStep = 1.5 * hexRadius
    const colStep = hexWidth

    let hexagons = []

    // Mouse tracking state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    }

    let idleTimer = null

    // Check if cursor coordinates or target are inside the login card boundary
    const isInsideCard = (e) => {
      if (e.target && e.target.closest && e.target.closest('.login-card, .login-card-container')) {
        return true
      }
      const card = document.querySelector('.login-card')
      if (!card) return false
      const rect = card.getBoundingClientRect()
      return (
        e.clientX >= rect.left - 8 &&
        e.clientX <= rect.right + 8 &&
        e.clientY >= rect.top - 8 &&
        e.clientY <= rect.bottom + 8
      )
    }

    const handleMouseMove = (e) => {
      if (isInsideCard(e)) {
        mouse.active = false
        return
      }

      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true

      // Reset idle timer: if mouse stops moving for 2 seconds, fade back to dark
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        mouse.active = false
      }, 2000)
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Build the honeycomb grid
    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const cols = Math.ceil(width / colStep) + 2
      const rows = Math.ceil(height / rowStep) + 3

      hexagons = []

      for (let r = -1; r < rows; r++) {
        const y = r * rowStep
        const isOdd = Math.abs(r) % 2 === 1
        const xOffset = isOdd ? colStep / 2 : 0

        for (let c = -1; c < cols; c++) {
          const x = c * colStep + xOffset

          hexagons.push({
            x,
            y,
            col: c,
            row: r,
            glowIntensity: 0, // Starts completely dark/black
          })
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      initGrid()
    })
    resizeObserver.observe(document.body)
    initGrid()

    // Color interpolation helper
    const lerp = (a, b, t) => a + (b - a) * t

    const hexPoints = (cx, cy, r) => {
      const pts = []
      for (let i = 0; i < 6; i++) {
        const angle = -Math.PI / 2 + (i * Math.PI) / 3
        pts.push({
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
        })
      }
      return pts
    }

    // Main 60fps render loop
    const render = () => {
      // Smooth mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.2
      mouse.y += (mouse.targetY - mouse.y) * 0.2

      ctx.save()
      ctx.scale(dpr, dpr)

      // Solid dark background
      ctx.fillStyle = '#0a0c10'
      ctx.fillRect(0, 0, width, height)

      const glowRadius = 130 // Effect radius around cursor

      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i]

        // Calculate distance to cursor
        let target = 0
        if (mouse.active) {
          const dx = hex.x - mouse.x
          const dy = hex.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < glowRadius) {
            // Smooth falloff from center of cursor
            target = Math.pow(1 - dist / glowRadius, 1.4)
          }
        }

        // Fast attack, smooth decay
        if (target > hex.glowIntensity) {
          hex.glowIntensity += (target - hex.glowIntensity) * 0.28
        } else {
          hex.glowIntensity += (target - hex.glowIntensity) * 0.08
        }

        const g = hex.glowIntensity

        // 3D elevation displacement: rises towards the viewer
        const elevation = g * 4
        const cy = hex.y - elevation
        const cx = hex.x
        const radius = hexRadius - 1.8 + g * 0.8

        const pts = hexPoints(cx, cy, radius)

        // Draw hexagon base path
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let j = 1; j < 6; j++) {
          ctx.lineTo(pts[j].x, pts[j].y)
        }
        ctx.closePath()

        if (g > 0.02) {
          // Dynamic vibrant neon green 3D glow face
          const grad = ctx.createLinearGradient(
            pts[5].x,
            pts[5].y,
            pts[2].x,
            pts[2].y
          )
          const r1 = Math.round(lerp(24, 0, g))
          const g1 = Math.round(lerp(28, 255, g))
          const b1 = Math.round(lerp(35, 60, g))

          const r2 = Math.round(lerp(18, 0, g))
          const g2 = Math.round(lerp(22, 185, g))
          const b2 = Math.round(lerp(28, 35, g))

          grad.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`)
          grad.addColorStop(1, `rgb(${r2}, ${g2}, ${b2})`)
          ctx.fillStyle = grad

          // Emerald green bloom/halo around active hexagons
          ctx.shadowColor = `rgba(0, 255, 68, ${(g * 0.6).toFixed(2)})`
          ctx.shadowBlur = g * 18
        } else {
          // Completely dark matte 3D hexagon
          const grad = ctx.createLinearGradient(
            pts[5].x,
            pts[5].y,
            pts[2].x,
            pts[2].y
          )
          grad.addColorStop(0, '#1c2028')
          grad.addColorStop(0.5, '#161920')
          grad.addColorStop(1, '#101216')
          ctx.fillStyle = grad
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
        }
        ctx.fill()

        // 3D Bevel Highlight Edges (top-left edges: 4->5, 5->0, 0->1)
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0

        ctx.beginPath()
        ctx.moveTo(pts[4].x, pts[4].y)
        ctx.lineTo(pts[5].x, pts[5].y)
        ctx.lineTo(pts[0].x, pts[0].y)
        ctx.lineTo(pts[1].x, pts[1].y)
        if (g > 0.02) {
          ctx.strokeStyle = `rgba(130, 255, 160, ${Math.min(1, 0.3 + g * 0.7)})`
          ctx.lineWidth = 1.6
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
          ctx.lineWidth = 1.0
        }
        ctx.stroke()

        // 3D Bevel Shadow Edges (bottom-right edges: 1->2, 2->3, 3->4)
        ctx.beginPath()
        ctx.moveTo(pts[1].x, pts[1].y)
        ctx.lineTo(pts[2].x, pts[2].y)
        ctx.lineTo(pts[3].x, pts[3].y)
        ctx.lineTo(pts[4].x, pts[4].y)
        if (g > 0.02) {
          ctx.strokeStyle = `rgba(0, 75, 20, ${0.3 + g * 0.6})`
          ctx.lineWidth = 1.6
        } else {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)'
          ctx.lineWidth = 1.2
        }
        ctx.stroke()
      }

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(idleTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hex-canvas-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
