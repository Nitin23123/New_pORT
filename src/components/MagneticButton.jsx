import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({ children, className = "", onClick }) {
    const buttonRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const button = buttonRef.current
        const text = textRef.current
        if (!button || !text) return

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

        const xToText = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
        const yToText = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

        const mouseMove = (e) => {
            const { clientX, clientY } = e
            const { left, top, width, height } = button.getBoundingClientRect()

            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)

            // Move button slightly
            xTo(x * 0.3)
            yTo(y * 0.3)

            // Move text more (parallax)
            xToText(x * 0.5)
            yToText(y * 0.5)
        }

        const mouseLeave = () => {
            xTo(0)
            yTo(0)
            xToText(0)
            yToText(0)
        }

        button.addEventListener("mousemove", mouseMove)
        button.addEventListener("mouseleave", mouseLeave)

        return () => {
            button.removeEventListener("mousemove", mouseMove)
            button.removeEventListener("mouseleave", mouseLeave)
        }
    }, [])

    return (
        <button
            ref={buttonRef}
            className={`relative inline-block ${className}`}
            onClick={onClick}
        >
            <span ref={textRef} className="block relative z-10 pointer-events-none">
                {children}
            </span>
        </button>
    )
}
