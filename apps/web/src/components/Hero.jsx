import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const greetings = [
    'Hello', '你好', 'Hola', 'Bonjour', 'Olá', 'Здравствуйте',
    'নমস্কার', 'السلام علیکم', 'Halo', 'Hallo', 'こんにちは',
    'Habari', '안녕하세요', 'Ciao', 'Merhaba', 'Xin chào',
    'สวัสดี', 'नमस्ते'
]

const acronyms = [
    { char: 'N', word: 'NEW' },
    { char: 'I', word: 'IDEAS' },
    { char: 'T', word: 'TURNED' },
    { char: 'I', word: 'INTO' },
    { char: 'N', word: 'NOW' }
]

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const containerRef = useRef(null)

    // Mouse tracking for subtle parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth magnetic pull for text - kept very subtle for minimalism
    const springX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), { stiffness: 50, damping: 20 })
    const springY = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), { stiffness: 50, damping: 20 })

    useEffect(() => {
        if (currentIndex < greetings.length - 1) {
            const delay = currentIndex === 0 ? 1000 : 400
            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev + 1)
            }, delay)
            return () => clearTimeout(timer)
        }
    }, [currentIndex])

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

            className="h-screen w-full flex flex-col justify-center items-center relative z-0 overflow-hidden bg-black"
            style={{ paddingBottom: '30vh' }}
        >
            <motion.div

                className="text-center select-none relative z-10"
            >
                {/* Minimalist Greeting Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="text-zinc-500 text-lg md:text-xl mb-16 tracking-[0.3em] uppercase h-8 overflow-hidden"
                    style={{ fontFamily: 'DancingScript, cursive' }}
                >
                    <AnimatePresence>
                        <motion.span
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="block absolute w-full left-0"
                        >
                            {greetings[currentIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>

                {/* Main Name Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex items-center justify-center">
                        <span
                            className="text-[#FDD835] text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mr-8 opacity-80"
                            style={{ fontFamily: 'DancingScript, cursive' }}
                        >
                            I'm
                        </span>

                        <div className="flex gap-1 md:gap-2">
                            {acronyms.map((item, i) => (
                                <div
                                    key={i}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative flex flex-col items-center"
                                >
                                    {/* The Word - Elegant ghost reveal UNDER the text */}
                                    <AnimatePresence>
                                        {hoveredIndex === i && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 0, filter: 'blur(8px)' }}
                                                animate={{ opacity: 0.7, y: 22, filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, y: 0, filter: 'blur(8px)' }}
                                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                                className="absolute top-full pointer-events-none"
                                            >
                                                <span
                                                    className="text-lg md:text-2xl font-light text-[#FDD835] tracking-[0.4em]"
                                                    style={{ fontFamily: 'DancingScript, cursive' }}
                                                >
                                                    {item.word}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* The Character */}
                                    <motion.span
                                        animate={{
                                            opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                                            scale: hoveredIndex === i ? 1.05 : 1,
                                            color: hoveredIndex === i ? "#FDD835" : "#FFFFFF"
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter cursor-none inline-block px-1"
                                        style={{ fontFamily: 'DancingScript, cursive' }}
                                    >
                                        {item.char}
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
