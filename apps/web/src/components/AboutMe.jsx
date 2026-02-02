import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Import photos
import photo1 from '../assets/nitin/2.jpeg'
import photo2 from '../assets/nitin/3.jpeg'
import photo3 from '../assets/nitin/4.jpeg'
import photo4 from '../assets/nitin/WhatsApp Image 2026-01-31 at 1.42.20 AM.jpeg'

const photos = [photo3, photo1, photo2, photo4]

const personalInfo = {
    name: "Nitin",
    title: "Full Stack Developer",
    bio: "Passionate developer crafting digital experiences that blend creativity with cutting-edge technology. I believe in writing clean, elegant code that makes a difference.",
    location: "India",
    email: "hello@nitin.dev",
    experience: "3+",
    projects: "12+",
    clients: "10+"
}

const hobbies = [
    { emoji: "🎮", name: "Gaming", description: "Strategy & RPGs" },
    { emoji: "📚", name: "Reading", description: "Tech & Sci-Fi" },
    { emoji: "🎵", name: "Music", description: "Lo-Fi & Indie" },
    { emoji: "🏋️", name: "Fitness", description: "Morning workouts" },
    { emoji: "✈️", name: "Travel", description: "Exploring new places" },
    { emoji: "🎬", name: "Movies", description: "Thriller & Drama" }
]

const currentPlaylist = [
    { song: "Blinding Lights", artist: "The Weeknd", cover: "🎧" },
    { song: "Starboy", artist: "The Weeknd", cover: "⭐" },
    { song: "Heat Waves", artist: "Glass Animals", cover: "🌊" },
    { song: "Levitating", artist: "Dua Lipa", cover: "🚀" },
    { song: "Save Your Tears", artist: "The Weeknd", cover: "💧" }
]

const favorites = [
    { category: "Editor", value: "VS Code", icon: "💻" },
    { category: "Framework", value: "React", icon: "⚛️" },
    { category: "Language", value: "TypeScript", icon: "📘" },
    { category: "Tool", value: "Figma", icon: "🎨" },
    { category: "OS", value: "macOS", icon: "🍎" },
    { category: "Drink", value: "Coffee", icon: "☕" }
]

// Magnetic hover effect hook
function useMagnetic(strength = 0.3) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 15 })
    const springY = useSpring(y, { stiffness: 150, damping: 15 })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * strength)
        y.set((e.clientY - centerY) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return { springX, springY, handleMouseMove, handleMouseLeave }
}

// Animated counter component
function AnimatedCounter({ value, duration = 2 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const numericValue = parseInt(value) || 0

    useEffect(() => {
        if (isInView && numericValue > 0) {
            let start = 0
            const increment = numericValue / (duration * 60)
            const timer = setInterval(() => {
                start += increment
                if (start >= numericValue) {
                    setCount(numericValue)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 1000 / 60)
            return () => clearInterval(timer)
        }
    }, [isInView, numericValue, duration])

    return <span ref={ref}>{count}{value.includes('+') ? '+' : ''}</span>
}

// Glassmorphism stat card with 3D tilt
function StatCard({ value, label, delay, icon }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const { springX, springY, handleMouseMove, handleMouseLeave } = useMagnetic(0.1)

    const rotateX = useTransform(springY, [-20, 20], [5, -5])
    const rotateY = useTransform(springX, [-20, 20], [-5, 5])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY, rotateX, rotateY, transformPerspective: 1000 }}
            className="group relative p-6 rounded-2xl cursor-default overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white border border-zinc-100 rounded-2xl" />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-[#FDD835] via-zinc-200 to-[#FDD835] rounded-2xl animate-spin-slow" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-[1px] bg-white rounded-2xl" />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#FDD835]/0 group-hover:bg-[#FDD835]/10 rounded-2xl transition-all duration-500 blur-xl" />

            <div className="relative z-10">
                <motion.div
                    className="text-5xl md:text-6xl font-bold text-black mb-2"
                    style={{ fontFamily: 'DancingScript' }}
                >
                    {typeof value === 'string' && value.match(/\d/) ? (
                        <AnimatedCounter value={value} />
                    ) : (
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                            {value}
                        </motion.span>
                    )}
                </motion.div>
                <span className="text-zinc-400 text-sm uppercase tracking-widest" style={{ fontFamily: 'DancingScript' }}>
                    {label}
                </span>
            </div>

            {/* Floating particles on hover */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#FDD835] rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ x: "50%", y: "100%" }}
                        animate={{ y: "-100%", x: `${30 + i * 10}%` }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

// Interactive tab button with ripple effect
function TabButton({ active, onClick, children }) {
    const [ripples, setRipples] = useState([])

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setRipples([...ripples, { x, y, id: Date.now() }])
        setTimeout(() => setRipples(r => r.slice(1)), 1000)
        onClick()
    }

    return (
        <motion.button
            onClick={handleClick}
            className={`relative px-8 py-4 text-lg uppercase tracking-wider overflow-hidden rounded-full transition-all duration-500 ${active
                ? 'bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]'
                : 'bg-zinc-50 text-zinc-500 hover:text-black hover:bg-zinc-100 border border-zinc-200'
                }`}
            style={{ fontFamily: 'DancingScript' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full pointer-events-none"
                    initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y, opacity: 1 }}
                    animate={{ width: 200, height: 200, x: ripple.x - 100, y: ripple.y - 100, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}
        </motion.button>
    )
}

// Hobby card with flip animation
function HobbyCard({ hobby, index }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-1000 h-40"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 p-6 bg-white border border-zinc-100 rounded-2xl flex flex-col items-center justify-center backface-hidden shadow-sm"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <span className="text-5xl mb-2">{hobby.emoji}</span>
                    <h4 className="text-black text-lg" style={{ fontFamily: 'DancingScript' }}>
                        {hobby.name}
                    </h4>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 p-6 bg-gradient-to-br from-[#FDD835] to-[#FFB300] rounded-2xl flex flex-col items-center justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <span className="text-4xl mb-2">✨</span>
                    <p className="text-black text-center font-medium" style={{ fontFamily: 'DancingScript' }}>
                        {hobby.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Playlist item with waveform
function PlaylistItem({ item, index, isPlaying, onPlay }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={onPlay}
            whileHover={{ x: 10, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${isPlaying ? 'bg-black/5 border-l-4 border-black' : 'hover:bg-zinc-100'
                }`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${isPlaying
                ? 'bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]'
                : 'bg-zinc-100 group-hover:bg-zinc-200'
                }`}>
                {isPlaying ? (
                    <div className="flex items-end gap-1 h-6">
                        {[1, 2, 3, 4].map((bar) => (
                            <motion.div
                                key={bar}
                                className="w-1 bg-black rounded-full"
                                animate={{ height: ["30%", "100%", "50%", "80%", "30%"] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.1, ease: "easeInOut" }}
                            />
                        ))}
                    </div>
                ) : (
                    <span>{item.cover}</span>
                )}
            </div>

            <div className="flex-1">
                <h4 className={`text-lg transition-all duration-300 ${isPlaying ? 'text-black font-bold' : 'text-zinc-800 group-hover:text-black'
                    }`} style={{ fontFamily: 'DancingScript' }}>
                    {item.song}
                </h4>
                <p className="text-zinc-400 text-sm" style={{ fontFamily: 'DancingScript' }}>
                    {item.artist}
                </p>
            </div>

            <motion.div
                className="text-zinc-400"
                whileHover={{ scale: 1.2 }}
            >
                {isPlaying ? '▶' : '○'}
            </motion.div>
        </motion.div>
    )
}

// Favorite card with gradient reveal
function FavoriteCard({ item, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative p-6 rounded-2xl overflow-hidden cursor-default"
        >
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-white to-zinc-50"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
            />

            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-zinc-100 group-hover:border-black/10 rounded-2xl transition-all duration-300" />

            <div className="relative z-10 flex items-center gap-4">
                <motion.span
                    className="text-4xl"
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {item.icon}
                </motion.span>
                <div>
                    <span className="text-zinc-400 text-xs uppercase tracking-wider block" style={{ fontFamily: 'DancingScript' }}>
                        {item.category}
                    </span>
                    <span className="text-black text-xl group-hover:text-zinc-900 transition-colors" style={{ fontFamily: 'DancingScript' }}>
                        {item.value}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

// Photo Carousel with cinematic transitions
function PhotoCarousel() {
    const [currentPhoto, setCurrentPhoto] = useState(0)
    const [direction, setDirection] = useState(1)

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentPhoto((prev) => (prev + 1) % photos.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 1.2,
            rotateY: direction > 0 ? 45 : -45,
            filter: "blur(10px) brightness(0.5)"
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px) brightness(1)"
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
            filter: "blur(10px) brightness(0.5)"
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative group perspective-1000"
        >
            <div className="relative w-full max-w-[280px] mx-auto">
                {/* Animated border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 rounded-3xl opacity-75 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-pulse" />

                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-white">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.img
                            key={currentPhoto}
                            src={photos[currentPhoto]}
                            alt={`Nitin - Photo ${currentPhoto + 1}`}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 },
                                rotateY: { duration: 0.5 },
                                filter: { duration: 0.4 }
                            }}
                            className="w-full h-full object-contain"
                        />
                    </AnimatePresence>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />

                    {/* Photo info overlay */}
                    <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-black/80 text-sm" style={{ fontFamily: 'DancingScript' }}>
                                {currentPhoto + 1} / {photos.length}
                            </span>
                            <div className="flex gap-2">
                                {photos.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDirection(i > currentPhoto ? 1 : -1)
                                            setCurrentPhoto(i)
                                        }}
                                        className={`h-1 rounded-full transition-all duration-300 ${i === currentPhoto
                                            ? 'w-6 bg-black'
                                            : 'w-2 bg-black/20 hover:bg-black/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating decoration */}
            <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 border-2 border-zinc-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute -bottom-2 -left-2 w-12 h-12 bg-zinc-100 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    )
}

export default function AboutMe() {
    const [activeTab, setActiveTab] = useState('hobbies')
    const [playingIndex, setPlayingIndex] = useState(0)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    return (
        <section
            id="about-me"
            ref={sectionRef}
            className="relative min-h-screen w-full py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-3xl opacity-50"
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-zinc-50 rounded-full blur-3xl opacity-50"
                    animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-7xl mx-auto mb-20"
            >
                <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="inline-block text-black text-sm uppercase tracking-[0.3em] mb-6 px-4 py-2 border border-zinc-200 rounded-full"
                    style={{ fontFamily: 'DancingScript' }}
                >
                    ✨ Get to know me
                </motion.span>

                <motion.h2
                    className="text-black text-6xl md:text-8xl lg:text-9xl tracking-tight"
                    style={{ fontFamily: 'DancingScript' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    About <span className="text-zinc-400">Me</span>
                </motion.h2>
            </motion.div>

            <div className="relative max-w-7xl mx-auto">
                {/* Main content grid */}
                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-24 items-start">
                    {/* Photo */}
                    <div className="lg:col-span-1">
                        <PhotoCarousel />
                    </div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <h3 className="text-black text-3xl md:text-4xl" style={{ fontFamily: 'DancingScript' }}>
                            Hi, I'm <span className="text-black relative">
                                {personalInfo.name}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-1 bg-black"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: "100%" } : {}}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                />
                            </span>
                        </h3>

                        <p className="text-zinc-600 text-lg leading-relaxed" style={{ fontFamily: 'DancingScript' }}>
                            {personalInfo.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <motion.div
                                className="flex items-center gap-2 text-zinc-600 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100"
                                whileHover={{ scale: 1.05, borderColor: "rgba(0, 0, 0, 0.1)" }}
                            >
                                <span>📍</span>
                                <span style={{ fontFamily: 'DancingScript' }}>{personalInfo.location}</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-2 text-zinc-600 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100"
                                whileHover={{ scale: 1.05, borderColor: "rgba(0, 0, 0, 0.1)" }}
                            >
                                <span>✉️</span>
                                <span style={{ fontFamily: 'DancingScript' }}>{personalInfo.email}</span>
                            </motion.div>
                        </div>

                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-lg uppercase tracking-wider mt-6 group overflow-hidden relative"
                            style={{ fontFamily: 'DancingScript' }}
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">Let's Talk</span>
                            <motion.span
                                className="relative z-10"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-zinc-800"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                        <StatCard value={personalInfo.experience} label="Years Exp" delay={0.5} />
                        <StatCard value={personalInfo.projects} label="Projects" delay={0.6} />
                        <StatCard value={personalInfo.clients} label="Clients" delay={0.7} />
                        <StatCard value="∞" label="Lines of Code" delay={0.8} />
                    </div>
                </div>

                {/* Tabs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="border-t border-zinc-100 pt-16"
                >
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <TabButton active={activeTab === 'hobbies'} onClick={() => setActiveTab('hobbies')}>
                            🎯 Hobbies
                        </TabButton>
                        <TabButton active={activeTab === 'playlist'} onClick={() => setActiveTab('playlist')}>
                            🎵 Playlist
                        </TabButton>
                        <TabButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
                            ⭐ Favorites
                        </TabButton>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="min-h-[400px]"
                        >
                            {activeTab === 'hobbies' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    {hobbies.map((hobby, index) => (
                                        <HobbyCard key={hobby.name} hobby={hobby} index={index} />
                                    ))}
                                </div>
                            )}

                            {activeTab === 'playlist' && (
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-3xl p-8 border border-zinc-800 backdrop-blur-xl">
                                        <div className="flex items-center gap-4 mb-8">
                                            <motion.div
                                                className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-lg"
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            >
                                                <span className="text-4xl">🎵</span>
                                            </motion.div>
                                            <div>
                                                <h4 className="text-black text-2xl" style={{ fontFamily: 'DancingScript' }}>
                                                    My Vibe
                                                </h4>
                                                <p className="text-zinc-400" style={{ fontFamily: 'DancingScript' }}>
                                                    {currentPlaylist.length} songs • Updated weekly
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {currentPlaylist.map((item, index) => (
                                                <PlaylistItem
                                                    key={item.song}
                                                    item={item}
                                                    index={index}
                                                    isPlaying={playingIndex === index}
                                                    onPlay={() => setPlayingIndex(index)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'favorites' && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                                    {favorites.map((item, index) => (
                                        <FavoriteCard key={item.category} item={item} index={index} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
