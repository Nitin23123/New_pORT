
import { useEffect, useRef, useState } from 'react'

// Generate frame imports dynamically
const frameModules = import.meta.glob('../assets/frames/*.webp', { eager: true })

// Sort frames by their index number
const frames = Object.entries(frameModules)
    .map(([path, module]) => {
        const match = path.match(/frame_(\d+)/)
        const index = match ? parseInt(match[1], 10) : 0
        return { index, src: module.default }
    })
    .sort((a, b) => a.index - b.index)
    .map(frame => frame.src)

const TOTAL_FRAMES = frames.length

// Function to remove white/light background from image
function removeWhiteBackground(img) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Process each pixel
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Check if pixel is white/light gray (threshold: 200+)
        if (r > 200 && g > 200 && b > 200) {
            // Make it transparent
            data[i + 3] = 0
        }
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas
}

export default function ScrollFrameAnimation({ isMenuOpen }) {
    const canvasRef = useRef(null)
    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
    // Initialize with nulls
    const loadedImagesRef = useRef(new Array(TOTAL_FRAMES).fill(null))

    // Animation refs
    const requestRef = useRef()
    const previousTimeRef = useRef()
    const frameIndexRef = useRef(0)

    // Load images
    useEffect(() => {
        let isMounted = true

        const processImage = (src, index) => {
            return new Promise((resolve) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.src = src
                img.onload = () => {
                    if (!isMounted) return
                    // Process image to remove white background
                    const processedCanvas = removeWhiteBackground(img)
                    loadedImagesRef.current[index] = processedCanvas

                    if (index === 0) {
                        setFirstFrameLoaded(true)
                    }
                    resolve(processedCanvas)
                }
                img.onerror = () => {
                    resolve(null)
                }
            })
        }

        // Prioritize first frame
        processImage(frames[0], 0).then(() => {
            // After first frame is started/done, load the rest
            // We don't await this, letting it run in background
            frames.slice(1).forEach((src, idx) => {
                // Determine actual index since we sliced
                processImage(src, idx + 1)
            })
        })

        return () => {
            isMounted = false
        }
    }, [])

    // Continuous animation loop
    const animate = (time) => {
        if (previousTimeRef.current !== undefined) {
            // Calculate time difference to control speed if needed
            // For now, we'll just run as fast as we can but maybe skip frames if it's too fast?
            // Or update the frame index based on time elapsed

            // Let's target ~30fps -> 33ms per frame
            const deltaTime = time - previousTimeRef.current
            if (deltaTime >= 33) {
                frameIndexRef.current = (frameIndexRef.current + 1) % TOTAL_FRAMES
                previousTimeRef.current = time

                const canvas = canvasRef.current
                const context = canvas?.getContext('2d', { alpha: true })
                const processedCanvas = loadedImagesRef.current[frameIndexRef.current] || loadedImagesRef.current[0]

                if (processedCanvas && context && canvas) {
                    if (canvas.width !== processedCanvas.width || canvas.height !== processedCanvas.height) {
                        canvas.width = processedCanvas.width
                        canvas.height = processedCanvas.height
                    }
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.drawImage(processedCanvas, 0, 0)
                }
            }
        } else {
            previousTimeRef.current = time
        }

        requestRef.current = requestAnimationFrame(animate)
    }

    // Start animation loop when first frame is loaded
    useEffect(() => {
        if (!firstFrameLoaded) return

        requestRef.current = requestAnimationFrame(animate)

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [firstFrameLoaded])

    if (!firstFrameLoaded) {
        // Show spinner only until first frame is ready
        return (
            <div className="fixed top-8 left-8 z-50 w-24 h-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#FDD835] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div
            className="fixed top-0 z-50 cursor-pointer transition-all duration-500 ease-in-out"
            style={{
                left: isMenuOpen ? '-20px' : '-50px',
                top: isMenuOpen ? '-20px' : '-50px'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <canvas
                ref={canvasRef}
                style={{
                    imageRendering: 'crisp-edges',
                    width: isMenuOpen ? '120px' : '300px',
                    height: isMenuOpen ? '120px' : '300px',
                    objectFit: 'contain',
                    transition: 'width 0.5s ease-in-out, height 0.5s ease-in-out'
                }}
            />
        </div>
    )
}
