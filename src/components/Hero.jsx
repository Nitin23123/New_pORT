import React, { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Stars, Html } from '@react-three/drei';
import { Earth } from './canvas/Earth';
import Loader from './Loader';
import ErrorBoundary from './ErrorBoundary';

const Hero = () => {
    const containerRef = useRef(null);
    const nameRef1 = useRef(null); // NITIN
    const nameRef2 = useRef(null); // TANWAR
    const roleRef = useRef(null);

    useEffect(() => {
        // Entrance Animation
        const tl = gsap.timeline();

        tl.fromTo([nameRef1.current, nameRef2.current],
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 2.5, ease: "expo.out", stagger: 0.2 }
        )
            .fromTo(roleRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 0.8, duration: 2, ease: "power3.out" },
                "-=2"
            );

        // Parallax Interaction
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30; // -15 to 15
            const yPos = (clientY / window.innerHeight - 0.5) * 30;

            gsap.to(nameRef1.current, { x: -xPos, y: -yPos, duration: 1.5, ease: "power2.out" });
            gsap.to(nameRef2.current, { x: xPos, y: yPos, duration: 1.5, ease: "power2.out" });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen mx-auto bg-black overflow-hidden">

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <ErrorBoundary>
                    <Canvas
                        shadows
                        frameloop="always"
                        dpr={[1, 2]}
                        gl={{ preserveDrawingBuffer: true }}
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 200,
                            position: [0, 0, 4],
                        }}
                    >
                        <Suspense fallback={<Html><Loader /></Html>}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={2} />
                            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                            <Earth />
                        </Suspense>
                    </Canvas>
                </ErrorBoundary>
            </div>

            {/* UI Overlay - Architectural Layout */}
            <div className="absolute inset-0 z-10 pointer-events-none mix-blend-difference text-white select-none">

                {/* 1. Name: NITIN (Top Left) */}
                <h1 ref={nameRef1} className="absolute top-10 left-6 md:top-16 md:left-16 text-[15vw] md:text-[11rem] font-black tracking-tighter leading-none opacity-0">
                    NITIN
                </h1>

                {/* 2. Name: TANWAR (Bottom Right) */}
                <h1 ref={nameRef2} className="absolute bottom-10 right-6 md:bottom-16 md:right-16 text-[10vw] md:text-[8rem] font-black tracking-tighter leading-none opacity-0 text-right">
                    TANWAR
                </h1>

                {/* 3. Role: Vertical (Left Center) */}
                <div ref={roleRef} className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 opacity-0 flex-col gap-8 hidden md:flex">
                    <div style={{ writingMode: 'vertical-rl' }} className="flex gap-4 rotate-180">
                        <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-gray-300 uppercase whitespace-nowrap">
                            Interface & Interaction Engineer
                        </p>
                        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase whitespace-nowrap">
                            Design-Driven Web Systems
                        </p>
                    </div>
                </div>

                {/* 4. Metadata / Coordinates (Decorations) */}
                <div className="absolute top-8 right-8 flex flex-col items-end font-mono text-[10px] text-gray-400 tracking-widest opacity-60">
                    <span>SYS.READY</span>
                    <span>35.6762° N / 139.6503° E</span>
                </div>

                <div className="absolute bottom-8 left-8 font-mono text-[10px] text-gray-400 tracking-widest opacity-60 uppercase">
                    <span>// TO KNOW ABOUT ME EXPLORE THE EARTH (HAHAHA)</span>
                </div>

                {/* Decorative Lines - The "Grid" */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-white opacity-[0.03] hidden md:block"></div>
                <div className="absolute top-0 right-1/4 w-px h-full bg-white opacity-[0.03] hidden md:block"></div>
            </div>

        </section>
    );
};

export default Hero;
