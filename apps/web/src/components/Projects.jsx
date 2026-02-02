import { motion } from 'framer-motion'

const projects = [
    { title: 'Project One', category: 'Web App', tag: 'Next.js' },
    { title: 'Project Two', category: 'E-commerce', tag: 'React' },
    { title: 'Project Three', category: 'Branding', tag: 'Design' }
]

export default function Projects() {
    return (
        <section id="projects" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col mb-24">
                    <span className="text-zinc-400 text-sm uppercase tracking-[0.3em] mb-4">Selection</span>
                    <h2 className="text-black text-6xl md:text-8xl tracking-tight" style={{ fontFamily: 'DancingScript' }}>
                        Selected <span className="text-zinc-300">Works</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/5] bg-zinc-50 rounded-[2.5rem] mb-6 overflow-hidden border border-zinc-100 relative shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700">
                                    <span className="bg-black text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest">View Project</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">{project.category}</p>
                                    <h3 className="text-black text-3xl font-medium tracking-tight">{project.title}</h3>
                                </div>
                                <span className="text-zinc-200 text-xs font-medium border border-zinc-100 px-3 py-1 rounded-full">{project.tag}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
