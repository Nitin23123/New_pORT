import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
    const containerRef = useRef(null)
    const percentRef = useRef(null)
    const barRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: onComplete
                })
            }
        })

        // Animate Percentage
        const counter = { val: 0 }
        tl.to(counter, {
            val: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                if (percentRef.current) {
                    percentRef.current.textContent = Math.round(counter.val)
                }
            }
        })

        // Animate Bar Width
        tl.to(barRef.current, {
            width: '100%',
            duration: 2,
            ease: "power2.inOut"
        }, 0) // start together

        // Reveal Text stagger
        tl.to('.loader-text', {
            y: 0,
            opacity: 1,
            stagger: 0.1
        }, 0.5)

        return () => tl.kill()
    }, [onComplete])

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center">
            <div className="absolute bottom-10 left-10 md:left-20 text-9xl font-heading font-bold overflow-hidden">
                <span ref={percentRef}>0</span>%
            </div>

            <div className="absolute bottom-10 right-10 md:right-20 flex gap-4 text-sm font-mono overflow-hidden">
                <span className="loader-text translate-y-full opacity-0">LOADING EXPERIENCE</span>
                <span className="loader-text translate-y-full opacity-0">...</span>
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-neutral-900">
                <div ref={barRef} className="h-full bg-white w-0"></div>
            </div>
        </div>
    )
}
