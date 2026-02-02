import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'


export default function Hero() {
    const containerRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }

    const resetMouse = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <div
            ref={containerRef}

            className="h-screen w-full flex flex-col justify-center items-center relative z-10 bg-white"
            style={{ paddingBottom: '30vh' }}
        >
            <motion.div

                className="text-center select-none relative z-10"
            >




                {/* Crowd Image */}

            </motion.div>
        </div>
    )
}
