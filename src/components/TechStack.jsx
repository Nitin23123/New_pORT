import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import ScrollFloat from './ScrollFloat';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaLinux, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiFramer, SiExpress, SiPostgresql, SiVite, SiVercel, SiRedux, SiPostman } from 'react-icons/si';

const categories = [
    {
        label: 'Frontend',
        items: [
            { name: 'HTML',          icon: <FaHtml5 />,       color: '#E34F26' },
            { name: 'CSS',           icon: <FaCss3Alt />,      color: '#1572B6' },
            { name: 'JavaScript',    icon: <SiJavascript />,   color: '#F7DF1E' },
            { name: 'React',         icon: <FaReact />,        color: '#61DAFB' },
            { name: 'Redux Toolkit', icon: <SiRedux />,        color: '#764ABC' },
            { name: 'Tailwind',      icon: <SiTailwindcss />,  color: '#06B6D4' },
            { name: 'Framer Motion', icon: <SiFramer />,       color: '#9B5DE5' },
            { name: 'Bootstrap',     icon: <FaBootstrap />,    color: '#7952B3' },
            { name: 'Vite',          icon: <SiVite />,         color: '#646CFF' },
        ],
    },
    {
        label: 'Backend',
        items: [
            { name: 'Node.js',    icon: <FaNodeJs />,      color: '#339933' },
            { name: 'Express',    icon: <SiExpress />,     color: '#ffffff' },
            { name: 'PostgreSQL', icon: <SiPostgresql />,  color: '#336791' },
        ],
    },
    {
        label: 'Tools',
        items: [
            { name: 'Git',     icon: <FaGitAlt />,   color: '#F05032' },
            { name: 'GitHub',  icon: <FaGithub />,   color: '#ffffff' },
            { name: 'Docker',  icon: <FaDocker />,   color: '#2496ED' },
            { name: 'Postman', icon: <SiPostman />,  color: '#FF6C37' },
            { name: 'Figma',   icon: <FaFigma />,    color: '#F24E1E' },
            { name: 'Vercel',  icon: <SiVercel />,   color: '#ffffff' },
            { name: 'Linux',   icon: <FaLinux />,    color: '#FCC624' },
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden:  { opacity: 0, y: 32, scale: 0.92 },
    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Each card floats at a unique depth based on its index
const TechCard = ({ name, icon, color, scrollYProgress, cardIndex }) => {
    // Each card gets a slightly different parallax range — odd/even alternate direction
    const depth = ((cardIndex % 5) - 2) * 8; // ranges: -16, -8, 0, 8, 16
    const rawY = useTransform(scrollYProgress, [0, 1], [depth * -1, depth]);
    const y = useSpring(rawY, { stiffness: 80, damping: 20 });

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.06, y: -8 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="cursor-target group relative flex items-center gap-3 px-4 py-3 rounded-2xl cursor-none overflow-hidden"
            onMouseEnter={() => window.dispatchEvent(new Event('cursor-hide'))}
            onMouseLeave={() => window.dispatchEvent(new Event('cursor-show'))}
            style={{
                y,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
            }}
        >
            {/* top shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* hover color glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 30% 50%, ${color}18 0%, transparent 65%)` }}
            />

            {/* hover border shimmer */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{ border: `1px solid ${color}30` }}
            />

            <span
                className="relative z-10 text-xl transition-all duration-300 group-hover:scale-110 drop-shadow-sm"
                style={{ color: `${color}99`, transition: 'color 0.3s, transform 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = color}
                onMouseLeave={e => e.currentTarget.style.color = `${color}99`}
            >
                {icon}
            </span>
            <span className="relative z-10 text-[11px] font-mono text-white/35 group-hover:text-white/80 transition-colors duration-300 uppercase tracking-widest whitespace-nowrap">
                {name}
            </span>
        </motion.div>
    );
};

const Category = ({ label, items, index, scrollYProgress }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div ref={ref} className="flex flex-col items-center gap-5">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="flex items-center gap-4 w-full max-w-2xl"
            >
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.45em]">{label}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-wrap justify-center gap-3"
            >
                {items.map((tech, i) => (
                    <TechCard
                        key={tech.name}
                        {...tech}
                        scrollYProgress={scrollYProgress}
                        cardIndex={index * 10 + i}
                    />
                ))}
            </motion.div>
        </div>
    );
};

const TechStack = () => {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

    // Track scroll progress across the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    return (
        <section ref={sectionRef} id="tech-stack" className="py-16 md:py-28 px-4 md:px-16 border-t border-white/[0.05]">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div ref={headerRef} className="mb-16 text-center">
                    <ScrollFloat
                        containerClassName="my-0"
                        textClassName="text-4xl md:text-5xl font-black tracking-tighter text-white/90"
                        animationDuration={1}
                        ease="back.inOut(2)"
                        stagger={0.04}
                    >
                        TECH STACK
                    </ScrollFloat>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={headerInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 mx-auto h-px w-24 bg-white/20"
                        style={{ originX: 0.5 }}
                    />
                </div>

                {/* Categories */}
                <div className="w-full flex flex-col gap-14">
                    {categories.map((cat, i) => (
                        <Category
                            key={cat.label}
                            label={cat.label}
                            items={cat.items}
                            index={i}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Currently Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-16 w-full flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-4 w-full max-w-2xl">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.45em]">Currently Learning</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {[
                            { label: 'DevOps',         pulse: '#38BDF8' },
                            { label: 'System Design',  pulse: '#A78BFA' },
                            { label: 'DSA',            pulse: '#34D399' },
                        ].map(({ label, pulse }) => (
                            <motion.div
                                key={label}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: Math.random() * 1.5 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-2xl cursor-default"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ backgroundColor: pulse, boxShadow: `0 0 6px ${pulse}` }}
                                />
                                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TechStack;
