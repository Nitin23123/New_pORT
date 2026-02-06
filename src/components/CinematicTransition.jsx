import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation, NAV_STATES } from '../context/NavigationContext';
import gsap from 'gsap';

export default function CinematicTransition() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const { navState, targetPath, startCinematic, revealDestination, endTransition } = useNavigation();
    const navigate = useNavigate();

    // State
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 1. Preload Images (Eagerly on Mount)
    useEffect(() => {
        const loadImages = async () => {
            const modules = import.meta.glob('../assets/frames02/*.webp', { eager: true });
            const keys = Object.keys(modules).sort();

            if (keys.length === 0) {
                console.warn("CinematicTransition: No frames found in ../assets/frames02/");
                return;
            }

            const loadedData = await Promise.all(
                keys.map(async (key) => {
                    const img = new Image();
                    img.src = modules[key].default;
                    await img.decode().catch(() => { });
                    return img;
                })
            );

            setImages(loadedData);
            setImagesLoaded(true);
        };
        loadImages();
    }, []);

    // 2. BLACKOUT Phase: Fast fade to black, then trigger cinematic
    useEffect(() => {
        if (navState !== NAV_STATES.BLACKOUT) return;

        // Lock scroll immediately
        document.body.style.overflow = 'hidden';

        // Instant-fade to black (150ms for "film cut" feel)
        gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
                // Transition to CINEMATIC_TRANSITION after blackout
                startCinematic();
            }
        });

        return () => {
            document.body.style.overflow = '';
        };
    }, [navState, startCinematic]);

    // 3. CINEMATIC_TRANSITION Phase: Play frames02
    useEffect(() => {
        if (navState !== NAV_STATES.CINEMATIC_TRANSITION || !imagesLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let startTime = null;

        const FPS = 30;
        const frameDuration = 1000 / FPS;
        const totalFrames = images.length;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (images[0]) drawFrame(0);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        function drawFrame(index) {
            if (!ctx || !images[index]) return;
            const img = images[index];

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetY = 0;
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        function play(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const currentFrame = Math.min(
                Math.floor(elapsed / frameDuration),
                totalFrames - 1
            );

            drawFrame(currentFrame);

            if (currentFrame < totalFrames - 1) {
                animationFrameId = requestAnimationFrame(play);
            } else {
                finishTransition();
            }
        }

        animationFrameId = requestAnimationFrame(play);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };

    }, [navState, imagesLoaded, images]);

    const finishTransition = () => {
        // Navigate
        if (targetPath) {
            navigate(targetPath);
        }
        revealDestination();

        // Fade Out Transition Overlay
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                endTransition();
            }
        });
    };

    // Only render if in an active transition state
    if (navState === NAV_STATES.IDLE) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black pointer-events-auto opacity-0"
            style={{ zIndex: 9999 }}
        >
            {/* Canvas for frames02 - only visible during CINEMATIC_TRANSITION */}
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
