import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RevealText from '../components/RevealText';

export default function TechStack() {
    const containerRef = useRef(null);

    useEffect(() => {
        const techItems = gsap.utils.toArray('.tech-item');
        techItems.forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: (i % 2 === 0 ? -10 : 10),
                    duration: 1,
                    delay: i * 0.1,
                    ease: "power2.out"
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen flex items-center justify-center p-20 relative bg-black text-white">
            <div className="max-w-4xl w-full">
                <h2 className="font-heading text-5xl md:text-7xl font-bold mb-10 text-neutral-200 overflow-hidden">
                    <RevealText>TECH STACK</RevealText>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 perspective-1000">
                    {['React', 'Next.js', 'GSAP', 'WebGL', 'Node.js', 'Tailwind', 'Three.js', 'MongoDB'].map((tech) => (
                        <div key={tech} className="tech-item aspect-square bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 flex items-center justify-center rounded-2xl hover:bg-neutral-800 transition-colors hover:scale-110 duration-500 cursor-pointer group">
                            <span className="font-body font-bold text-xl text-neutral-400 group-hover:text-white">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
