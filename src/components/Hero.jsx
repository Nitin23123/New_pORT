import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa';


const Hero = () => {

    const [headlineHovered, setHeadlineHovered] = useState(false);
    const [showInstaPopup, setShowInstaPopup] = useState(false);
    const [showWebPopup, setShowWebPopup] = useState(false);
    const triggerPopup = (setter) => {
        setter(true);
        setTimeout(() => setter(false), 2500);
    };

    return (
        <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden font-sans bg-black perspective-[1000px]">

            {/* Ambient Background Glow - REMOVED for True Black */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" />

            {/* Main Typography - Centered & Balanced */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center mix-blend-normal w-full max-w-[1920px]">
                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-primary font-mono text-sm md:text-sm tracking-[0.5em] mb-4 uppercase"
                >
                    Nitin Tanwar
                </motion.div>

                {/* Static Headline */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group cursor-default w-full"
                >
                    <div className="flex flex-col items-center leading-[0.8] font-black tracking-tighter w-full select-none">
                        <span
                            onMouseEnter={() => { setHeadlineHovered(true);  window.dispatchEvent(new Event('cursor-expand'));  }}
                            onMouseLeave={() => { setHeadlineHovered(false); window.dispatchEvent(new Event('cursor-shrink')); }}
                            className="relative overflow-hidden inline-block text-[16vw] md:text-[8vw] text-[#EBEBEB]"
                            style={{ willChange: 'transform' }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span key={headlineHovered ? 'r' : 'm'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.1, ease: 'easeOut' }} className="block">
                                    {headlineHovered ? 'REMOVING' : 'MAKING'}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span
                            onMouseEnter={() => { setHeadlineHovered(true);  window.dispatchEvent(new Event('cursor-expand'));  }}
                            onMouseLeave={() => { setHeadlineHovered(false); window.dispatchEvent(new Event('cursor-shrink')); }}
                            className="relative overflow-hidden inline-block text-[16vw] md:text-[8vw] text-primary"
                            style={{ willChange: 'transform' }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span key={headlineHovered ? 'b' : 'g'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.1, ease: 'easeOut' }} className="block">
                                    {headlineHovered ? 'BAD' : 'GOOD'}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span className="text-[16vw] md:text-[8vw] text-primary">SHIT</span>
                        <span className="text-[16vw] md:text-[8vw] text-[#EBEBEB]">SINCE</span>
                        <span className="text-[16vw] md:text-[8vw] text-[#EBEBEB]">2023</span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Left - Social Icons */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-5 z-20">
                <a href="https://github.com/Nitin23123" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="group flex items-center gap-2 text-muted hover:text-white transition-colors duration-300">
                    <FaGithub className="text-xl shrink-0" />
                </a>
                <a href="https://www.linkedin.com/in/nitin-tanwar-535018303/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="text-muted hover:text-white transition-colors duration-300 text-xl"><FaLinkedin /></a>
                <a href="#" aria-label="Instagram" onClick={(e) => { e.preventDefault(); triggerPopup(setShowInstaPopup); }} className="text-muted hover:text-white transition-colors duration-300 text-xl"><FaInstagram /></a>
                <a href="#" aria-label="Website" onClick={(e) => { e.preventDefault(); triggerPopup(setShowWebPopup); }} className="text-muted hover:text-white transition-colors duration-300 text-xl"><FaGlobe /></a>
            </div>

            {/* Website Popup */}
            <AnimatePresence>
                {showWebPopup && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="absolute bottom-36 left-8 md:left-14 z-50 bg-zinc-900 border border-white/10 text-white text-xs font-mono rounded-xl shadow-2xl overflow-hidden max-w-[calc(100vw-4rem)]"
                        style={{ minWidth: '160px' }}
                    >
                        <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-zinc-900" />
                        <div className="px-4 py-3 flex items-center gap-3">
                            <motion.span
                                animate={{ scale: [1, 1.3, 1, 1.2, 1] }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-lg"
                            >
                                📍
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                            >
                                u are here only
                            </motion.span>
                        </div>
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 2.5, ease: 'linear' }}
                            style={{ originX: 0 }}
                            className="h-[2px] bg-primary w-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instagram Popup */}
            <AnimatePresence>
                {showInstaPopup && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="absolute bottom-24 left-8 md:left-14 z-50 bg-zinc-900 border border-white/10 text-white text-xs font-mono rounded-xl shadow-2xl overflow-hidden max-w-[calc(100vw-4rem)]"
                        style={{ minWidth: '160px' }}
                    >
                        {/* Arrow pointing left toward icon */}
                        <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-zinc-900" />

                        <div className="px-4 py-3 flex items-center gap-3">
                            <motion.span
                                animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-lg"
                            >
                                🙃
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                            >
                                sorry for being antisocial
                            </motion.span>
                        </div>

                        {/* Auto-dismiss progress bar */}
                        <motion.div
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 2.5, ease: 'linear' }}
                            style={{ originX: 0 }}
                            className="h-[2px] bg-primary w-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Bottom Center - Download CV (desktop only — also in About) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
            >
                <a
                    href="/resume.pdf"
                    download
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30 transition-all duration-300"
                >
                    <span className="text-xs font-mono text-white/50 group-hover:text-white tracking-[0.2em] uppercase transition-colors duration-300">Download CV</span>
                    <svg className="w-3 h-3 text-white/30 group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </motion.div>

            {/* Bottom Right - Scroll Indicator */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-xs font-mono text-muted tracking-[0.2em] [writing-mode:vertical-rl] uppercase hidden sm:block">Scroll Down</span>
                    <div className="w-[1px] h-8 sm:h-12 bg-white/20" />
                </div>
            </div>


        </section>
    );
};

export default Hero;
