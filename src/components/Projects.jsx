import { motion, useSpring } from 'framer-motion';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Data for selected works
const projects = [
    {
        title: "ReconPro",
        category: "SaaS Landing + Auth API",
        year: "2026",
        link: "https://reconpro.info",
        image: "/previews/reconpro.png",
    },
    {
        title: "DevTrace",
        category: "Developer Productivity Dashboard",
        year: "2025",
        link: "https://devtracedash.netlify.app",
        image: "/previews/devTrace.png",
    },
];

/**
 * Projects Component
 * 
 * Displays a list of selected works with a minimal, interactive design.
 * Features hover animations that shift text and rotate the arrow icon.
 */
const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    // Spring physics for smooth mouse following
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX - 150); // Center offset
        mouseY.set(clientY - 100); // Center offset
    };

    return (
        <section id="projects" className="py-16 md:py-32 bg-transparent text-white relative z-10" onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 flex items-end justify-between border-b border-white/10 pb-8"
                >
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                        Selected Work
                    </h2>
                    <span className="text-muted font-mono hidden md:block">(0{projects.length})</span>
                </motion.div>

                {/* Project List */}
                <div className="flex flex-col" onMouseLeave={() => setHoveredProject(null)}>
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileTap={{ scale: 0.98, backgroundColor: 'rgba(255,255,255,0.03)' }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setHoveredProject(index)}
                            className={`group border-b border-white/10 py-12 md:py-20 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 cursor-default md:cursor-none relative overflow-hidden`}
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Project Number & Title */}
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-16 pointer-events-none z-10">
                                <span className="text-muted/50 text-sm font-mono mb-4 md:mb-0">0{index + 1}</span>
                                <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Project Meta & Arrow Icon */}
                            <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 mt-6 md:mt-0 pointer-events-none z-10">
                                <div className="md:text-right overflow-hidden">
                                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-accent">{project.category}</p>
                                    <p className="text-muted text-xs font-mono mt-1">{project.year}</p>
                                </div>
                                {/* Arrow rotates on hover */}
                                <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500 backdrop-blur-sm shrink-0">
                                    <FaArrowRight className="text-lg md:text-xl text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Floating Image Reveal - Fixed to viewport to follow mouse globally within section */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block overflow-hidden rounded-xl glass-panel shadow-2xl"
                style={{
                    width: 400,
                    height: 250,
                    x: mouseX,
                    y: mouseY,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredProject !== null ? 1 : 0,
                    scale: hoveredProject !== null ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
                {/* Floating Image */}
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay for contrast */}
                    {hoveredProject !== null && projects[hoveredProject] && projects[hoveredProject].image ? (
                        <img
                            src={projects[hoveredProject].image}
                            alt={projects[hoveredProject].title}
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary text-muted">
                            <span className="font-mono text-xs uppercase tracking-widest">Preview Unavailable</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
