import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CanvasSequence({ frameCount = 120 }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId

        // State for animation
        const playhead = { frame: 0 }

        // Resize Handling
        const setSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            render(playhead.frame)
        }

        window.addEventListener('resize', setSize)
        setSize() // Initial render

        // ScrollTrigger Setup
        // We drive the 'frame' property from 0 to frameCount
        const trigger = gsap.to(playhead, {
            frame: frameCount - 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0,
            },
            onUpdate: () => {
                render(Math.round(playhead.frame))
            }
        })

        // Render Function (Procedural Fallback for now)
        function render(frame) {
            if (!ctx || !canvas) return

            const width = canvas.width
            const height = canvas.height
            const progress = frame / frameCount

            // Clear
            // ctx.clearRect(0, 0, width, height) 
            // Use slightly opaque fill for trails if desired, but here we want crisp redraw
            ctx.fillStyle = '#050505'
            ctx.fillRect(0, 0, width, height)

            const cx = width / 2
            const cy = height / 2

            // Cinematic "Warp" Effect
            // Draw stars/lines radiating
            const starCount = 100

            ctx.fillStyle = 'white'

            for (let i = 0; i < starCount; i++) {
                // Deterministic random driven by index i (not frame)
                // so stars stay in "place" but move in Z
                const xSeed = Math.sin(i * 132.1) * width
                const ySeed = Math.cos(i * 453.2) * height

                // Z movement driven by progress
                // Loop Z from 0 to 1
                let z = (i / starCount + progress * 2) % 1

                // Perspective projection
                // If z is close to 0 (camera), scale is large. If 1 (far), scale is small.
                // Wait, normally z=0 is camera. Let's say z goes 1 (far) -> 0 (near)
                const depth = 1 - z
                if (depth <= 0.01) continue // clipping

                const perspective = 300 / depth
                const x = cx + xSeed * depth // simple parallax
                const y = cy + ySeed * depth

                // Actually, classic starfield:
                // x = xWorld / z
                const sx = (xSeed) / depth
                const sy = (ySeed) / depth

                // Draw only if on screen
                const screenX = cx + sx
                const screenY = cy + sy

                if (screenX > 0 && screenX < width && screenY > 0 && screenY < height) {
                    const size = (1 - depth) * 3
                    const alpha = (1 - depth)
                    ctx.globalAlpha = alpha
                    ctx.beginPath()
                    ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            // Draw "Grid" Floor
            ctx.globalAlpha = 0.2
            ctx.strokeStyle = '#3b82f6' // Blue-ish
            ctx.lineWidth = 1
            ctx.beginPath()

            // Moving grid lines
            const gridCount = 20
            for (let i = 0; i < gridCount; i++) {
                // Horizontal lines moving down
                let yProto = ((i / gridCount) + progress) % 1
                // Exponential for perspective floor
                // Map 0..1 to horizon..bottom
                // Horizon at cy
                const y = cy + (yProto * yProto) * (height / 2)

                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
            }

            // Perspective lines
            for (let i = -10; i <= 10; i++) {
                const x = cx + i * (width / 10) * 2
                ctx.moveTo(cx, cy)
                ctx.lineTo(x, height)
            }

            ctx.stroke()
            ctx.globalAlpha = 1.0

            // Debug Text
            ctx.font = '12px monospace'
            ctx.fillStyle = '#444'
            ctx.fillText(`FRAME: ${frame} / ${frameCount}`, 20, 30)
            ctx.fillText(`PROGRESS: ${(progress * 100).toFixed(1)}%`, 20, 45)
        }

        return () => {
            window.removeEventListener('resize', setSize)
            trigger.kill()
        }
    }, [frameCount])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-50"
        />
    )
}
