import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'

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

    return (
        <div className="min-h-screen bg-black relative">
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
                className="fixed top-10 z-60 flex items-center gap-3 cursor-pointer group px-5 py-3"
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
                                style={{ fontFamily: 'Dirtyline', color: '#fff' }}
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
                                style={{ fontFamily: 'Dirtyline', color: '#fff' }}
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
                                style={{ fontFamily: 'Dirtyline', color: '#fff' }}
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
                                style={{ fontFamily: 'Dirtyline', color: '#fff' }}
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
                            <h1 className="text-white text-5xl md:text-7xl tracking-tighter" style={{ fontFamily: 'Dirtyline' }}>
                                NITIN
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
                            className="flex flex-col justify-between flex-1 w-full min-h-0"
                        >
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 60 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                    className="border-b border-dashed border-zinc-700 w-full"
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
                                            className="inline-block text-white text-5xl md:text-6xl lg:text-7xl uppercase hover:opacity-50 transition-opacity duration-300 py-6"
                                            style={{ fontFamily: 'Dirtyline' }}
                                        >
                                            {item.name}
                                            {item.count && (
                                                <sup className="text-lg md:text-xl ml-2 text-zinc-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                                                    ({item.count})
                                                </sup>
                                            )}
                                        </a>
                                        {item.sub && (
                                            <div className="flex gap-4 md:gap-6 pb-4">
                                                {item.sub.map((subItem) => (
                                                    <span
                                                        key={subItem}
                                                        className="text-zinc-500 text-sm md:text-base hover:text-white transition-colors cursor-pointer"
                                                        style={{ fontFamily: 'Inter, sans-serif' }}
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
                            className="mt-auto pt-16 flex justify-between text-sm text-zinc-500"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            <span>(Privacy)</span>
                            <span>2024© Portfolio</span>
                            <span>(Legal)</span>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>

            <Hero />
        </div>
    )
}

export default App
