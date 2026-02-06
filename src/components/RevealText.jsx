import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function RevealText({
    children,
    className = "",
    phrase = false, // If true, reveal by words/lines instead of chars
    delay = 0
}) {
    const containerRef = useRef(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        // Simple manual split text logic
        // We assume children is a string. If not, this component wraps it simply.
        if (typeof children !== 'string') return

        // Clear content is handled by React render, but generic GSAP fromTo works on the rendered spans
        const chars = el.querySelectorAll('.char')

        gsap.fromTo(chars,
            {
                y: 100,
                opacity: 0,
                rotateX: -90,
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.02,
                duration: 1,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%', // start when top of text hits 80% viewport
                    toggleActions: 'play none none reverse'
                }
            }
        )

    }, [children, delay])

    if (typeof children !== 'string') {
        return <div ref={containerRef} className={className}>{children}</div>
    }

    // Split text
    // We split by words first, then characters to keep word integrity
    // Or just characters for the "Matrix" / "Cinematic" feel
    const words = children.split(' ')

    return (
        <div ref={containerRef} className={`${className} overflow-hidden`}>
            <span className="sr-only">{children}</span>
            {children.split('').map((char, i) => (
                <span
                    key={i}
                    className="char inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </span>
            ))}
        </div>
    )
}
