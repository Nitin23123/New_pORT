import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const isTouchDevice = () =>
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches;

const CustomCursor = () => {
    const [isTouch, setIsTouch] = useState(() => isTouchDevice());
    const [expanded, setExpanded] = useState(false);
    const [hidden, setHidden] = useState(false);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 300, damping: 28, mass: 0.5 });
    const y = useSpring(rawY, { stiffness: 300, damping: 28, mass: 0.5 });

    useEffect(() => {
        const mql = window.matchMedia('(pointer: coarse)');
        const handler = (e) => setIsTouch(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (isTouch) return;

        const move   = (e) => { rawX.set(e.clientX - 32); rawY.set(e.clientY - 32); };
        const expand = () => setExpanded(true);
        const shrink = () => setExpanded(false);
        const hide   = () => setHidden(true);
        const show   = () => setHidden(false);

        window.addEventListener('mousemove', move);
        window.addEventListener('cursor-expand', expand);
        window.addEventListener('cursor-shrink', shrink);
        window.addEventListener('cursor-hide',   hide);
        window.addEventListener('cursor-show',   show);

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('cursor-expand', expand);
            window.removeEventListener('cursor-shrink', shrink);
            window.removeEventListener('cursor-hide',   hide);
            window.removeEventListener('cursor-show',   show);
        };
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference bg-white"
            style={{ x, y }}
            animate={{
                width:      expanded ? 300 : 64,
                height:     expanded ? 300 : 64,
                marginLeft: expanded ? -118 : 0,
                marginTop:  expanded ? -118 : 0,
                opacity:    hidden ? 0 : 1,
                scale:      hidden ? 0.5 : 1,
            }}
            transition={{
                width:      { type: 'spring', stiffness: 350, damping: 25 },
                height:     { type: 'spring', stiffness: 350, damping: 25 },
                marginLeft: { type: 'spring', stiffness: 350, damping: 25 },
                marginTop:  { type: 'spring', stiffness: 350, damping: 25 },
                opacity:    { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                scale:      { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }}
        />
    );
};

export default CustomCursor;
