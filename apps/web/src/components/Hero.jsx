import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import FrameSequence from './FrameSequence'
import kiev from '../assets/kiev-ukraine-april-06-2022-600nw-2161177561.webp'

export default function Hero() {
    const containerRef = useRef(null)

    // Using useMotionValue as intended but initialized
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    return (
        <div
            ref={containerRef}
            className="h-screen w-screen relative z-10 bg-white overflow-hidden"
            onMouseMove={(e) => {
                const rect = containerRef.current.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left - rect.width / 2)
                mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
            onMouseLeave={() => {
                mouseX.set(0)
                mouseY.set(0)
            }}
        >
            {/* Model Animation - Perfectly Centered */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
                <div className="w-[90vw] md:w-[65vw] max-w-5xl relative -translate-y-12 md:-translate-y-20">
                    <FrameSequence className="drop-shadow-2xl" />

                    {/* Headphone Sticker Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 15,
                            y: [0, -15, 0]
                        }}
                        transition={{
                            duration: 1,
                            delay: 1,
                            y: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute right-4 md:right-10 top-[15%] z-30 pointer-events-auto"
                    >
                        <div className="rotate-6 hover:rotate-0 transition-transform duration-300">
                            <img
                                src={kiev}
                                alt="Kiev Sticker"
                                className="w-24 md:w-40 h-auto grayscale hover:grayscale-0 transition-all duration-500 mix-blend-multiply select-none"
                                draggable="false"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Name - Anchored at the bottom */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-30"
            >
                <h1
                    className="text-[12vw] md:text-[15vw] font-bold leading-none tracking-tighter text-black/90 select-none whitespace-nowrap"
                    style={{ fontFamily: 'Dirtyline, sans-serif' }}
                >
                    NITIN TANWAR
                </h1>
            </motion.div>
        </div>
    )
}
