import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const About = () => {
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 30 });

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative py-32 overflow-hidden text-white font-['Inter']"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Overlay */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: useMotionTemplate`radial-gradient(
                        800px circle at ${smoothMouseX}px ${smoothMouseY}px,
                        rgba(234, 88, 12, 0.04),
                        transparent 80%
                    )`
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 md:px-16">
                {/* Header */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[10px] font-mono text-white/30 uppercase tracking-[0.45em] mb-8"
                >
                    About
                </motion.p>

                {/* Bio */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-5xl font-black tracking-tighter text-white/90 leading-[1.1] mb-12"
                >
                    Full-Stack Developer building{' '}
                    <span className="text-primary">high-performance</span>,{' '}
                    accessible UIs — and the APIs that power them.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="text-white/45 text-lg leading-relaxed max-w-2xl"
                >
                    Currently a Full Stack Engineer at{' '}
                    <span className="text-white/80 font-medium">Novus Aegis AI</span>{' '}
                    (Texas, US), where I build React-based frontends with Tailwind &amp; Framer Motion, and
                    secure REST APIs with Node.js, Express, and PostgreSQL. I care deeply about
                    performance, clean architecture, and shipping things that actually work in production.
                </motion.p>

                {/* Quick facts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/[0.06] pt-10"
                >
                    {[
                        { label: 'Role', value: 'Full Stack Eng.' },
                        { label: 'Company', value: 'Novus Aegis AI' },
                        { label: 'Location', value: 'Noida, UP' },
                        { label: 'Available', value: 'Open to work' },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.35em] mb-1">{label}</p>
                            <p className="text-sm font-medium text-white/70">{value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Resume CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                    className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-white/[0.06] pt-10"
                >
                    <div className="flex-1">
                        <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.35em] mb-1">Resume</p>
                        <p className="text-sm text-white/50">Full work history, skills & education in one place.</p>
                    </div>
                    <a
                        href="/resume.pdf"
                        download
                        className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-primary/40 active:scale-95 transition-all duration-300"
                    >
                        <span className="text-xs font-mono text-white/50 group-hover:text-white tracking-widest uppercase transition-colors duration-300">Download CV</span>
                        <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-primary group-hover:translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
