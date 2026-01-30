import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

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
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const loadedImagesRef = useRef([])

    const { scrollYProgress } = useScroll()

    // Preload all images and process them
    useEffect(() => {
        let loadedCount = 0
        const processedCanvases = []

        const preloadAndProcess = (src, index) => {
            return new Promise((resolve) => {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                img.src = src
                img.onload = () => {
                    // Process image to remove white background
                    const processedCanvas = removeWhiteBackground(img)
                    processedCanvases[index] = processedCanvas
                    loadedCount++
                    resolve(processedCanvas)
                }
                img.onerror = () => {
                    loadedCount++
                    resolve(null)
                }
            })
        }

        Promise.all(frames.map((src, index) => preloadAndProcess(src, index)))
            .then(() => {
                loadedImagesRef.current = processedCanvases
                setImagesLoaded(true)
            })
    }, [])

    // Draw frame based on scroll position
    useEffect(() => {
        if (!imagesLoaded) return

        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d', { alpha: true })

        const unsubscribe = scrollYProgress.on('change', (progress) => {
            const frameIndex = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            )

            const processedCanvas = loadedImagesRef.current[frameIndex]
            if (processedCanvas && context) {
                if (canvas.width !== processedCanvas.width || canvas.height !== processedCanvas.height) {
                    canvas.width = processedCanvas.width
                    canvas.height = processedCanvas.height
                }

                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(processedCanvas, 0, 0)
            }
        })

        // Draw first frame initially
        const firstCanvas = loadedImagesRef.current[0]
        if (firstCanvas && context) {
            canvas.width = firstCanvas.width
            canvas.height = firstCanvas.height
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(firstCanvas, 0, 0)
        }

        return () => unsubscribe()
    }, [imagesLoaded, scrollYProgress])

    if (!imagesLoaded) {
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
