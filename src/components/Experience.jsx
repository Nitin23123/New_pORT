const Experience = () => {
    const experiences = [
        {
            company: "Novus Aegis AI",
            role: "Full Stack Engineer",
            period: "Jan 2026 - Present",
            location: "Remote · Texas, US",
            description: "Building responsive UIs with React.js (v19), Tailwind CSS & Framer Motion, converting Figma designs into pixel-perfect components. Developing secure REST APIs with Node.js, Express.js & PostgreSQL (Prisma ORM). Implemented JWT, bcrypt, Passport.js, OAuth 2.0 and built Chart.js dashboards within a full-stack monorepo for real-time analytics.",
            tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind", "Framer Motion", "JWT", "OAuth 2.0"],
        },
        {
            company: "Academic Avenger",
            role: "Frontend Intern",
            period: "July 2024 - Aug 2024",
            location: "Remote · Mohali, PB",
            description: "Built an interactive portal using React.js, Tailwind CSS, HTML5, CSS3 & JavaScript. Translated Figma designs into responsive, reusable components with consistent styling.",
            mainUrl: "https://academicavengers.com/",
            demoUrl: "https://academicavenger.onrender.com/",
            tech: ["React", "Tailwind", "HTML5", "CSS3", "JavaScript"],
        },
    ];

    return (
        <section id="experience" className="py-16 md:py-32 text-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                        Experience
                    </h2>
                    <span className="text-white/30 font-mono hidden md:block">(0{experiences.length})</span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white">{exp.company}</h3>
                                    <p className="text-primary font-mono text-sm mt-1">{exp.role}</p>
                                </div>
                                <div className="md:text-right shrink-0">
                                    <p className="text-white/60 font-mono text-sm">{exp.period}</p>
                                    <p className="text-white/30 font-mono text-xs mt-1">{exp.location}</p>
                                </div>
                            </div>

                            <p className="text-white/50 leading-relaxed mb-6">{exp.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {exp.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-white/40">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Experience;
