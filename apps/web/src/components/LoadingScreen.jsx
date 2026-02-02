import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(onComplete, 200) // Small delay before triggering exit
                    return 100
                }
                return prev + 1
            })
        }, 20) // 20ms * 100 = 2000ms duration

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-white text-black"
        >
            <div className="relative flex flex-col items-center">
                {/* Large minimal counter */}
                <motion.span
                    className="text-9xl font-bold tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.3 } }}
                >
                    {count}%
                </motion.span>


            </div>
        </motion.div>
    )
}
