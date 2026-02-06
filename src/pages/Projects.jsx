import React from 'react';
import MagneticButton from '../components/MagneticButton';

export default function Projects() {
    return (
        <section className="min-h-screen py-32 px-4 md:px-20 bg-black text-white">
            <h2 className="font-heading text-5xl md:text-8xl font-black mb-32 text-center text-neutral-100/10">
                SELECTED WORKS
            </h2>
            <div className="space-y-64">
                {/* Project 1 */}
                <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
                    <div className="w-full md:w-1/2 aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 relative group cursor-pointer hover:border-cyan-500/50 transition-colors duration-500">
                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MagneticButton className="bg-white text-black font-bold px-8 py-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">View Case Study</MagneticButton>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 space-y-4">
                        <h3 className="text-4xl font-bold">Project Alpha</h3>
                        <p className="text-neutral-400 text-lg">Next-generation e-commerce experience with 3D product customization.</p>
                        <div className="flex gap-4 pt-4">
                            <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Live Site</MagneticButton>
                            <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">GitHub</MagneticButton>
                        </div>
                    </div>
                </div>

                {/* Project 2 - Reversed */}
                <div className="flex flex-col md:flex-row-reverse gap-10 items-center justify-center">
                    <div className="w-full md:w-1/2 aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 relative group cursor-pointer hover:border-purple-500/50 transition-colors duration-500">
                        <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MagneticButton className="bg-white text-black font-bold px-8 py-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">View Case Study</MagneticButton>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 space-y-4 text-right md:text-right">
                        <h3 className="text-4xl font-bold">Project Beta</h3>
                        <p className="text-neutral-400 text-lg">Fintech dashboard with real-time data visualization and WebSockets.</p>
                        <div className="flex gap-4 pt-4 justify-end">
                            <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">Live Site</MagneticButton>
                            <MagneticButton className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">GitHub</MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
