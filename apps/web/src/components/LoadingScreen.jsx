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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-900 text-[#FDD835]"
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

                {/* Subtle loading text */}
                <motion.div
                    className="mt-4 text-sm uppercase tracking-[0.5em] text-zinc-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5 } }}
                >
                    Loading Portfolio
                </motion.div>
            </div>
        </motion.div>
    )
}
