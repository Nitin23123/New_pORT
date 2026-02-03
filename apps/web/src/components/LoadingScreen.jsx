import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LetterGlitch from './LetterGlitch'

const Dialogue = [
    { speaker: "Me", text: "I think I’m a hacker now.", duration: 2500 },
    { speaker: "Mom", text: "You stayed up all night fixing one button.", duration: 4000 },
    { speaker: "Mom", text: "You’re a developer.", duration: 2500 },
    { speaker: "System", text: "Loading...", duration: 1500 },
]

export default function LoadingScreen({ onComplete }) {
    const [index, setIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsReady(true)
                    return 100
                }
                return prev + 1
            })
        }, 105) // ~10.5 seconds total for perfect readability

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        let timeout;
        const playDialogue = (idx) => {
            if (idx >= Dialogue.length) return;
            timeout = setTimeout(() => {
                if (idx < Dialogue.length - 1) {
                    setIndex(idx + 1);
                    playDialogue(idx + 1);
                }
            }, Dialogue[idx].duration);
        };

        playDialogue(0);
        return () => clearTimeout(timeout);
    }, [])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000000] font-mono text-[#00ffc3] overflow-hidden"
            style={{ willChange: 'opacity' }}
        >
            {/* Background Animation - Dimmmed further for clarity */}
            <div className="absolute inset-0 z-0 opacity-20">
                <LetterGlitch
                    glitchSpeed={50}
                    centerVignette={true}
                    outerVignette={false}
                    smooth={true}
                    glitchColors={['#00ffc3', '#004433', '#002211']}
                />
            </div>

            {/* Contrast Overlay - Stronger dimming */}
            <div className="absolute inset-0 z-10 bg-black/70 pointer-events-none" />

            {/* CRT Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,195,0.01),rgba(0,0,0,0),rgba(0,255,195,0.01))] bg-size-[100%_4px,4px_100%]" />

            {/* Ambient Background Noise */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            <div className="absolute bottom-16 right-12 z-30 w-full max-w-4xl px-8 flex flex-col items-end text-right">
                {/* Main Content Area - Corner Text */}
                <div className="min-h-[250px] flex flex-col justify-end mb-8 w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-end space-y-4"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[12px] uppercase tracking-[0.6em] text-[#00ffc3]/60 font-black mb-2">
                                    {Dialogue[index].speaker}
                                </span>
                                <div className="h-0.5 w-32 bg-linear-to-l from-[#00ffc3]/40 to-transparent" />
                            </div>

                            <h2 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] flex flex-wrap justify-end">
                                {Dialogue[index].text.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        whileHover={{
                                            color: '#00ffc3',
                                            y: -5,
                                            textShadow: '0 0 15px #00ffc3',
                                            transition: { duration: 0.1 }
                                        }}
                                        className="inline-block cursor-default select-none transition-colors duration-200"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress & Interaction Section */}
                <div className="w-full max-w-md space-y-8">
                    <AnimatePresence mode="wait">
                        {!isReady ? (
                            <motion.div
                                key="progress"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-end text-[10px] uppercase font-black tracking-[0.3em] text-[#00ffc3]/40">
                                    <span className="tabular-nums text-[#00ffc3]">{progress}%</span>
                                    <span className="flex items-center gap-3">
                                        Initializing_Sequence
                                        <div className="w-1 h-1 bg-[#00ffc3] animate-pulse rounded-full" />
                                    </span>
                                </div>

                                <div className="h-px w-full bg-white/5 relative overflow-hidden">
                                    <div
                                        className="absolute right-0 top-0 h-full bg-[#00ffc3] shadow-[0_0_15px_#00ffc3] transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="enter-button"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-end"
                            >
                                <button
                                    onClick={onComplete}
                                    className="group relative px-12 py-5 border border-[#00ffc3]/30 text-[#00ffc3] font-black uppercase tracking-[0.6em] transition-all duration-300 hover:bg-[#00ffc3] hover:text-black hover:shadow-[0_0_40px_rgba(0,255,195,0.4)] hover:border-[#00ffc3] active:scale-95"
                                >
                                    <span className="relative z-10 md:text-xl">ENTER PORTFOLIO</span>
                                </button>
                                <span className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#00ffc3]/20 animate-pulse font-black">Ready for access</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Header/Footer Corner Accents */}
            <div className="absolute top-10 left-10 w-4 h-4 border-l-4 border-t-4 border-[#00ffc3] opacity-40 shadow-[0_0_10px_#00ffc3]" />
            <div className="absolute top-10 right-10 w-4 h-4 border-r-4 border-t-4 border-[#00ffc3] opacity-40" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-l-4 border-b-4 border-[#00ffc3] opacity-40" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-r-4 border-b-4 border-[#00ffc3] opacity-40 shadow-[0_0_10px_#00ffc3]" />

            <div className="absolute bottom-12 left-10 rotate-90 origin-left text-[9px] tracking-[0.6em] opacity-20 uppercase font-black">
                SYS_INIT_SEQUENCE // PORTFOLIO_V7
            </div>
        </motion.div>
    )
}
