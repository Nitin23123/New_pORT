import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import ScrollFrameAnimation from './components/ScrollFrameAnimation'
import LoadingScreen from './components/LoadingScreen'
import Hyperspeed from './components/Hyperspeed'


// Staggered layout configuration matching the reference image style
const menuItems = [
    { name: 'Home', count: null, align: 'left', offset: '0%', sub: null },
    { name: 'Tech Stack', count: null, align: 'left', offset: '15%', sub: null },
    { name: 'Experience', count: '03', align: 'center', offset: '0%', sub: null },
    { name: 'About Me', count: null, align: 'right', offset: '10%', sub: ['Hobbies', 'Current Playlist', 'Favorites'] },
    { name: 'Projects', count: '12', align: 'left', offset: '5%', sub: null },
    { name: 'Contact', count: null, align: 'center', offset: '0%', sub: null },
]

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="min-h-screen bg-black relative">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Background Animation */}
                    <div className="fixed inset-0 z-0">
                        <Hyperspeed
                            effectOptions={{
                                onSpeedUp: () => { },
                                onSlowDown: () => { },
                                distortion: 'turbulentDistortion',
                                length: 400,
                                roadWidth: 10,
                                islandWidth: 2,
                                lanesPerRoad: 4,
                                fov: 90,
                                fovSpeedUp: 150,
                                speedUp: 2,
                                carLightsFade: 0.4,
                                totalSideLightSticks: 20,
                                lightPairsPerRoadWay: 40,
                                shoulderLinesWidthPercentage: 0.05,
                                brokenLinesWidthPercentage: 0.1,
                                brokenLinesLengthPercentage: 0.5,
                                lightStickWidth: [0.12, 0.5],
                                lightStickHeight: [1.3, 1.7],
                                movingAwaySpeed: [60, 80],
                                movingCloserSpeed: [-120, -160],
                                carLightsLength: [400 * 0.03, 400 * 0.2],
                                carLightsRadius: [0.05, 0.14],
                                carWidthPercentage: [0.3, 0.5],
                                carShiftX: [-0.8, 0.8],
                                carFloorSeparation: [0, 5],
                                colors: {
                                    roadColor: 0x080808,
                                    islandColor: 0x0a0a0a,
                                    background: 0x000000,
                                    shoulderLines: 0xffffff,
                                    brokenLines: 0xffffff,
                                    leftCars: [0xFFFF00, 0xFDD835, 0xFFEB3B], // Yellow shades
                                    rightCars: [0xFFFF00, 0xFDD835, 0xFFEB3B], // Yellow shades
                                    sticks: 0xFFFF00 // Yellow
                                }
                            }}
                        />
                    </div>

                    {/* Menu Button */}
                    <motion.button
                        layout
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        initial={false}
                        animate={{
                            left: isMenuOpen ? "calc(100% - 3rem)" : "50%",
                            x: isMenuOpen ? "-100%" : "-50%",
                            scale: [1, 0.9, 1], // Pulse effect
                            backgroundColor: isMenuOpen ? "transparent" : "transparent"
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            scale: { duration: 0.4, times: [0, 0.5, 1] }
                        }}
                        className="fixed top-10 z-[100] flex items-center gap-3 cursor-pointer group px-5 py-3"
                        aria-label="Toggle menu"
                    >
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.span
                                        key="close"
                                        initial={{ opacity: 0, rotate: -45 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-white text-4xl block"
                                        style={{ fontFamily: 'DancingScript', color: '#fff' }}
                                    >
                                        +
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="open"
                                        initial={{ opacity: 0, rotate: 45 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -45 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-white text-4xl block"
                                        style={{ fontFamily: 'DancingScript', color: '#fff' }}
                                    >
                                        +
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative w-20 h-8 overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.span
                                        key="close-text"
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -30, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="text-white text-2xl uppercase absolute"
                                        style={{ fontFamily: 'DancingScript', color: '#fff' }}
                                    >
                                        close
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="menu-text"
                                        initial={{ y: -30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 30, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="text-white text-2xl uppercase absolute"
                                        style={{ fontFamily: 'DancingScript', color: '#fff' }}
                                    >
                                        menu
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.button>

                    {/* Navbar Overlay */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.nav
                                initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
                                animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
                                exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="fixed inset-0 z-40 bg-black flex flex-col px-6 md:px-12 lg:px-24 py-16 md:py-24 h-screen overflow-hidden"
                            >
                                {/* Top Logo - NITIN */}
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="w-full flex justify-center mb-4 md:mb-8 shrink-0"
                                >
                                    <h1 className="text-white text-7xl md:text-9xl tracking-tighter" style={{ fontFamily: 'DancingScript' }}>
                                        NITIN<sup className="text-[#FDD835] text-2xl md:text-4xl relative -top-10 md:-top-16 left-2">®</sup>
                                    </h1>
                                </motion.div>

                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.08,
                                                delayChildren: 0.2,
                                            },
                                        },
                                    }}
                                    className="flex flex-col flex-1 w-full min-h-0 pb-24"
                                >
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            variants={{
                                                hidden: { opacity: 0, y: 60 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                            className="border-b border-dashed border-zinc-700 w-full group hover:bg-white hover:border-white transition-all duration-300"
                                            style={{
                                                textAlign: item.align,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'inline-block',
                                                    paddingLeft: item.align === 'left' ? item.offset : '0',
                                                    paddingRight: item.align === 'right' ? item.offset : '0',
                                                }}
                                            >
                                                <a
                                                    href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="inline-block text-white group-hover:text-black text-6xl md:text-7xl lg:text-8xl uppercase transition-colors duration-300 py-14"
                                                    style={{ fontFamily: 'DancingScript' }}
                                                >
                                                    {item.name}
                                                    {item.count && (
                                                        <sup className="text-lg md:text-xl ml-2 text-zinc-400 group-hover:text-zinc-600" style={{ fontFamily: 'DancingScript, cursive' }}>
                                                            ({item.count})
                                                        </sup>
                                                    )}
                                                </a>
                                                {item.sub && (
                                                    <div className="flex gap-4 md:gap-6 pb-4">
                                                        {item.sub.map((subItem) => (
                                                            <span
                                                                key={subItem}
                                                                className="text-zinc-500 text-sm md:text-base group-hover:text-zinc-700 hover:!text-black transition-colors cursor-pointer"
                                                                style={{ fontFamily: 'DancingScript, cursive' }}
                                                            >
                                                                {subItem}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="mt-auto pt-16 w-full flex justify-center items-center"
                                >
                                    <span className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-medium hover:text-white transition-colors duration-300">
                                        © 2026 Portfolio
                                    </span>
                                </motion.div>
                            </motion.nav>
                        )}
                    </AnimatePresence>

                    <Hero />
                    <ScrollFrameAnimation isMenuOpen={isMenuOpen} />




                </motion.div>
            )}
        </div>
    )
}

export default App
