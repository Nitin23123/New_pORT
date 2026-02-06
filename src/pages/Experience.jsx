import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import RevealText from '../components/RevealText';

export default function Experience() {
    useEffect(() => {
        gsap.from('.experience-line', {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "power3.inOut"
        });
    }, []);

    return (
        <section className="experience-section min-h-screen flex items-center justify-center p-20 relative bg-black text-white">
            <div className="max-w-4xl w-full">
                <h2 className="font-heading text-5xl md:text-7xl font-bold mb-20 text-right text-neutral-200">
                    <RevealText>EXPERIENCE</RevealText>
                </h2>
                <div className="space-y-24 pl-10 ml-10 relative">
                    {/* Animated Line */}
                    <div className="experience-line absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-800 origin-top h-full"></div>

                    {[
                        { role: "Senior Frontend Engineer", company: "Tech Corp", year: "2023 - Present" },
                        { role: "Creative Developer", company: "Agency Studio", year: "2021 - 2023" },
                        { role: "UI/UX Developer", company: "Startup Inc", year: "2019 - 2021" }
                    ].map((job, i) => (
                        <div key={i} className="relative">
                            <span className="absolute -left-[49px] top-2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10"></span>
                            <h3 className="text-3xl font-bold text-white max-w-lg"><RevealText>{job.role}</RevealText></h3>
                            <p className="text-xl text-cyan-400 font-mono mt-2">{job.company}</p>
                            <p className="text-neutral-500 mt-1">{job.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
