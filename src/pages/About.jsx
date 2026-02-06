import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textSectionsRef = useRef([]);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    // 1. Load Images efficiently using Vite's glob import
    useEffect(() => {
        const loadImages = async () => {
            const modules = import.meta.glob('../assets/frame01/*.webp', { eager: true });
            const keys = Object.keys(modules).sort();

            const loadedData = await Promise.all(
                keys.map(async (key) => {
                    const img = new Image();
                    img.src = modules[key].default;
                    await img.decode();
                    return img;
                })
            );

            setImages(loadedData);
            setLoaded(true);
        };
        loadImages();
    }, []);

    // 2. Setup Animation
    useEffect(() => {
        if (!loaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameCount = images.length - 1;

        const render = (index) => {
            if (images[index]) {
                const img = images[index];
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                // SAFE ZONE LOGIC (Responsive Framing)
                const focusY = 0.2; // Head is at top 20%
                const targetY = 0.35; // Position at top 35% of screen

                if (imgRatio > canvasRatio) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgRatio;
                    offsetY = 0;
                    offsetX = (canvas.width - drawWidth) / 2;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    const idealOffsetY = (canvas.height * targetY) - (drawHeight * focusY);
                    offsetY = Math.min(0, Math.max(canvas.height - drawHeight, idealOffsetY));
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // --- SCROLL ANIMATION ---
        const ctx = gsap.context(() => {

            // Frame Sequence
            const frameObj = { frame: 0 };

            gsap.to(frameObj, {
                frame: frameCount,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                },
                onUpdate: () => render(Math.round(frameObj.frame))
            });

            // --- NARRATIVE ANIMATIONS & DARK LAYERING ---
            const texts = textSectionsRef.current;
            const overlay = document.querySelector('#content-overlay'); // Dynamic Darkening

            // Helper for dynamic darkening
            const darkenBg = (opacity = 0.6) => {
                gsap.to(overlay, { opacity: opacity, duration: 1, ease: "power2.inOut" });
            };

            // 0. Opening: "Hi, this is Nitin" (0-10%)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "10% center",
                onEnter: () => darkenBg(0.4),
                onLeaveBack: () => darkenBg(0.2)
            });

            gsap.fromTo(texts[0],
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "2% top", end: "8% center", scrub: 1 } }
            );
            gsap.to(texts[0], { opacity: 0, scale: 1.05, scrollTrigger: { trigger: containerRef.current, start: "10% center", end: "15% center", scrub: 1 } });

            // 1. Identity: "An India-based..." (10-25%)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "15% center",
                end: "30% center",
                onEnter: () => darkenBg(0.6),
            });

            gsap.fromTo(texts[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, scrollTrigger: { trigger: containerRef.current, start: "15% center", end: "20% center", scrub: 1 } });
            gsap.to(texts[1], { opacity: 0, y: -30, scrollTrigger: { trigger: containerRef.current, start: "25% center", end: "30% center", scrub: 1 } });

            // 2. Geography: "Global-quality..." (25-45%)
            const geoText = texts[2]?.querySelector('#geo-drift');
            if (geoText) {
                gsap.fromTo(geoText, { x: 80, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: { trigger: containerRef.current, start: "30% center", end: "40% center", scrub: 1 } });
            }
            gsap.to(texts[2], { opacity: 0, x: -50, scrollTrigger: { trigger: containerRef.current, start: "45% center", end: "50% center", scrub: 1 } });

            // 3. Mindset: "Obsessed..." (45-65%)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "45% center",
                end: "70% center",
                onEnter: () => darkenBg(0.7), // Deeper focus
            });

            const mindsetLines = texts[3]?.querySelectorAll('p');
            if (mindsetLines) {
                gsap.fromTo(mindsetLines,
                    { opacity: 0, y: 40, filter: "blur(10px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2, scrollTrigger: { trigger: containerRef.current, start: "50% center", end: "60% center", scrub: 1 } }
                );
            }
            gsap.to(texts[3], { opacity: 0, scrollTrigger: { trigger: containerRef.current, start: "65% center", end: "70% center", scrub: 1 } });

            // 4. Layers: Gaming/Guitar (65-80%)
            const layerItems = texts[4]?.querySelectorAll('.layer-item');
            if (layerItems) {
                gsap.fromTo(layerItems,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "70% center", end: "75% center", scrub: 1 } }
                );
            }
            gsap.to(texts[4], { opacity: 0, scrollTrigger: { trigger: containerRef.current, start: "80% center", end: "85% center", scrub: 1 } });

            // 5. Live Data (80-90%)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "80% center",
                onEnter: () => darkenBg(0.5),
            });
            gsap.fromTo(texts[5], { opacity: 0, y: 20 }, { opacity: 1, y: 0, scrollTrigger: { trigger: containerRef.current, start: "85% center", end: "90% center", scrub: 1 } });

            // 6. Outro (90-100%)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "92% center",
                onEnter: () => darkenBg(0.8),
            });
            gsap.fromTo(texts[6], { opacity: 0, y: 30 }, { opacity: 1, y: 0, scrollTrigger: { trigger: containerRef.current, start: "93% center", end: "98% center", scrub: 1 } });

        }, containerRef);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
        };

    }, [loaded, images]);

    return (
        <main ref={containerRef} className="relative w-full h-[600vh] bg-white font-sans selection:bg-cyan-500/30">

            {/* Sticky Canvas & Containment Layers */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">

                {/* 0. Canvas Layer - Scaled slightly for overscan safety */}
                <canvas ref={canvasRef} className="w-full h-full object-cover scale-[1.02] origin-center" />

                {/* 1. Cinematic White Vignette (Edges Fade to White) */}
                {/* Soft gradient from transparent center to white edges. 
                    This creates the 'framed' look and hides hard edges. */}
                <div className="absolute inset-0 z-[1] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 65%, #ffffff 100%)',
                    }}
                ></div>

                {/* Vertical Gradient Caps (Top/Bottom soft fade to white) 
                    Helps ground the header and footer transitions */}
                {/* Top & Bottom gradients removed as per request to clear mid visibility */}

                {/* 2. Dynamic Content Overlay (Inner Darkening for Text Contrast) */}
                <div id="content-overlay" className="absolute inset-0 bg-black/20 pointer-events-none z-2 transition-opacity duration-1000"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 left-8 z-50 text-neutral-800 font-mono text-xs tracking-widest hover:text-black transition-colors uppercase border-b border-transparent hover:border-black/50 pb-1 mix-blend-multiply"
                >
                    ← Return to Earth
                </button>
            </div>

            {/* Narrative Content Layer - Content Led Storytelling */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col items-center justify-center px-6 md:px-0">

                {/* 0. Opening - Grounded & Authoritative */}
                <div ref={el => textSectionsRef.current[0] = el} className="absolute text-center max-w-lg select-none">
                    <p className="font-medium text-2xl md:text-3xl text-white tracking-wide font-sans leading-relaxed drop-shadow-md">
                        Hi, this is <span className="text-white font-bold">Nitin Tanwar</span>.
                    </p>
                </div>

                {/* 1. Identity - High Contrast Zone */}
                <div ref={el => textSectionsRef.current[1] = el} className="absolute text-center max-w-5xl opacity-0">
                    <h2 className="text-xs font-mono tracking-[0.4em] text-cyan-100 mb-8 uppercase drop-shadow-md">Identity</h2>
                    <div className="flex flex-col gap-4 relative">
                        <p className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
                            An India-based
                        </p>
                        <p className="text-5xl md:text-7xl font-serif italic text-white/90 drop-shadow-xl">
                            web developer & engineer
                        </p>
                    </div>
                </div>

                {/* 2. Geography - Editorial Context */}
                <div ref={el => textSectionsRef.current[2] = el} className="absolute text-center w-full max-w-6xl px-12 opacity-0">
                    <div className="flex flex-col items-center md:items-end gap-6">
                        <p className="text-4xl md:text-6xl font-light leading-snug text-right text-white drop-shadow-xl" id="geo-drift">
                            Building global-quality <br />
                            experiences from <span className="text-white font-normal border-b-2 border-cyan-400 pb-2">India.</span>
                        </p>
                        <p className="text-sm font-mono text-gray-300 max-w-sm text-right border-r border-gray-400 pr-6 mr-2 drop-shadow-md">
                            Learning, shipping, and experimenting without borders.
                        </p>
                    </div>
                </div>

                {/* 3. Mindset - Deep Focus Mode */}
                <div ref={el => textSectionsRef.current[3] = el} className="absolute text-center max-w-4xl opacity-0 pl-8 md:pl-0">
                    <div className="space-y-16">
                        <p className="text-4xl md:text-6xl font-light text-white drop-shadow-lg">Obsessed with details.</p>
                        <p className="text-4xl md:text-6xl font-serif italic pl-16 text-cyan-50 drop-shadow-lg">Driven by curiosity.</p>
                        <div className="pt-12 border-t border-white/20 mt-12 w-full max-w-2xl mx-auto">
                            <p className="text-xl md:text-2xl font-mono text-gray-100 leading-relaxed drop-shadow-md">
                                I care about the <span className="text-white font-bold tracking-wide">craft</span>,<br /> not just the code.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Human Layers - Structured Glimpses */}
                <div ref={el => textSectionsRef.current[4] = el} className="absolute w-full px-12 md:px-32 flex justify-start opacity-0">
                    <div className="text-left space-y-12 pointer-events-auto bg-black/40 p-8 md:p-12 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
                        <div className="group layer-item cursor-default">
                            <span className="text-[10px] font-mono text-purple-300 mb-2 block tracking-widest opacity-80">// LAYER 01</span>
                            <p className="text-3xl md:text-5xl text-white group-hover:text-purple-100 transition-colors duration-500">Gaming</p>
                        </div>
                        <div className="group layer-item cursor-default">
                            <span className="text-[10px] font-mono text-amber-300 mb-2 block tracking-widest opacity-80">// LAYER 02</span>
                            <p className="text-3xl md:text-5xl text-white group-hover:text-amber-100 transition-colors duration-500">Guitar</p>
                        </div>
                        <div className="group layer-item cursor-default">
                            <span className="text-[10px] font-mono text-emerald-300 mb-2 block tracking-widest opacity-80">// LAYER 03</span>
                            <p className="text-3xl md:text-5xl text-white group-hover:text-emerald-100 transition-colors duration-500">Coding</p>
                        </div>
                    </div>
                </div>

                {/* 5. Live Data - Quiet Pocket */}
                <div ref={el => textSectionsRef.current[5] = el} className="absolute bottom-16 right-8 md:bottom-24 md:right-24 text-right opacity-0 bg-black/60 p-6 md:p-8 border-l-2 border-green-500 shadow-2xl backdrop-blur-md rounded-sm">
                    <div className="flex items-center justify-end gap-3 mb-3">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <h2 className="text-[10px] font-mono tracking-[0.2em] text-green-400 uppercase">On Air</h2>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white mb-1">After Hours</p>
                        <p className="text-[10px] text-gray-300 uppercase tracking-widest">The Weeknd</p>
                    </div>
                </div>

                {/* 6. Outro - Low Light, High Impact */}
                <div ref={el => textSectionsRef.current[6] = el} className="absolute text-center max-w-2xl opacity-0 pointer-events-auto">
                    <p className="text-3xl md:text-6xl font-serif italic mb-16 text-white drop-shadow-xl leading-tight">
                        "The web is a canvas, <br /> not a document."
                    </p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 border border-white/40 hover:border-white hover:bg-white/10"
                    >
                        <span className="relative text-sm font-mono tracking-[0.2em] text-white uppercase">Explore My Work</span>
                    </button>
                </div>

            </div>

            {/* Scroll Indication - Removed Loading Overlay for Seamless Flow */}
        </main>
    );
}
