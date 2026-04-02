import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaStarOfLife } from 'react-icons/fa';
import MagneticWrapper from './MagneticWrapper';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: 'ABOUT', id: 'about' },
        { name: 'EXPERIENCE', id: 'experience' },
        { name: 'WORK', id: 'projects' },
        { name: 'TECH STACK', id: 'tech-stack' },
        { name: 'CONTACT', id: 'contact' }
    ];

    const handleNavClick = (id) => {
        setMenuOpen(false);
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <>
            <nav className="fixed inset-0 z-50 pointer-events-none px-6 py-6 md:px-12 md:py-8 max-w-[1920px] mx-auto">
                {/* Logo - Top Left */}
                <div className="absolute top-6 left-6 md:top-8 md:left-12 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-10 h-10 flex items-center justify-center cursor-pointer group"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <motion.div
                            className="absolute inset-0 text-primary mix-blend-screen flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                            <FaStarOfLife className="text-2xl" />
                        </motion.div>
                        <motion.div
                            className="relative z-10 text-white flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                            <FaStarOfLife className="text-xl md:text-2xl" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Desktop Navigation - Top Right */}
                <div className="absolute top-6 right-6 md:top-8 md:right-12 hidden md:flex flex-col items-end gap-2 pointer-events-auto">
                    {links.map((item, index) => (
                        <MagneticWrapper key={index} strength={0.2}>
                            <a href={`#${item.id}`} className="group relative block px-2 py-1">
                                <span className="text-[10px] md:text-xs font-bold text-muted group-hover:text-white transition-colors duration-300 uppercase tracking-[0.15em]">
                                    {item.name}
                                </span>
                            </a>
                        </MagneticWrapper>
                    ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="absolute top-6 right-6 md:hidden pointer-events-auto w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-50"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="block w-5 h-px bg-white"
                    />
                    <motion.span
                        animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                        className="block w-5 h-px bg-white"
                    />
                    <motion.span
                        animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="block w-5 h-px bg-white"
                    />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="flex flex-col items-center gap-8" onClick={e => e.stopPropagation()}>
                            {links.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: index * 0.07, duration: 0.3 }}
                                    onClick={() => handleNavClick(item.id)}
                                    className="text-3xl font-black tracking-tighter text-white/60 hover:text-white transition-colors duration-200 uppercase"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
