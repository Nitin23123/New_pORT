import React, { useEffect, useRef, useState } from 'react';

const FrameSequence = ({ className }) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const frameIndex = useRef(0);
    const requestRef = useRef();

    // Use import.meta.glob to get all webp files in the animate directory
    const frameFiles = import.meta.glob('../animate/*.webp', { eager: true });

    useEffect(() => {
        const loadedImages = Object.values(frameFiles).map((mod) => {
            const img = new Image();
            img.src = mod.default;
            return img;
        });

        // Wait for all images to load (optional but better for smooth start)
        const loadPromises = loadedImages.map(img => {
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
            });
        });

        Promise.all(loadPromises).then(() => {
            setImages(loadedImages);
            setIsLoaded(true);
        });

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const img = images[frameIndex.current];
        if (img) {
            // Draw original frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            // --- Chroma Key Processing ---
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const threshold = 180; // Highly aggressive background removal

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // If the pixel is very light (background), make it transparent
                if (r > threshold && g > threshold && b > threshold) {
                    data[i + 3] = 0; // Alpha
                }
            }
            ctx.putImageData(imageData, 0, 0);
            // -----------------------------
        }

        frameIndex.current = (frameIndex.current + 1) % images.length;

        // Control frame rate (e.g., ~24fps instead of 60fps)
        setTimeout(() => {
            requestRef.current = requestAnimationFrame(animate);
        }, 40); // ~25fps
    };

    useEffect(() => {
        if (isLoaded && images.length > 0) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isLoaded, images]);

    return (
        <div className={`relative w-full flex justify-center items-center ${className}`}>
            <canvas
                ref={canvasRef}
                width={1200}
                height={1200}
                className="w-full h-full max-w-4xl aspect-square"
                style={{
                    filter: 'contrast(1.1) brightness(1.05)'
                }}
            />
        </div>
    );
};

export default FrameSequence;
