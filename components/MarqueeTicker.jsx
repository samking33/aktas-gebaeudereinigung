'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function TealTriangle() {
    return (
        <span className="marquee-separator">
            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <polygon points="6,0 12,12 0,12" />
            </svg>
        </span>
    );
}

export default function MarqueeTicker({
    items = [],
    speed = 25,
    direction = 'left',
    velocityRef = null, // optional ref to lenis velocity for direction reversal
}) {
    const [reversed, setReversed] = useState(false);
    const rafRef = useRef(null);

    // Poll velocityRef to detect scroll-up reversal
    useEffect(() => {
        if (!velocityRef) return;
        let prev = false;
        const poll = () => {
            const v = velocityRef.current ?? 0;
            const shouldReverse = v < -15; // scrolling up fast
            if (shouldReverse !== prev) {
                setReversed(shouldReverse);
                prev = shouldReverse;
            }
            rafRef.current = requestAnimationFrame(poll);
        };
        rafRef.current = requestAnimationFrame(poll);
        return () => cancelAnimationFrame(rafRef.current);
    }, [velocityRef]);

    const effectiveDirection = reversed
        ? (direction === 'left' ? 'right' : 'left')
        : direction;

    const translateFrom = effectiveDirection === 'left' ? '0%' : '-50%';
    const translateTo = effectiveDirection === 'left' ? '-50%' : '0%';

    const allItems = [...items, ...items];

    return (
        <div className="marquee-container">
            <motion.div
                key={effectiveDirection} // re-mount on direction flip for smooth restart
                className="marquee-track"
                animate={{ x: [translateFrom, translateTo] }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {allItems.map((item, i) => (
                    <span key={i} style={{ display: 'contents' }}>
                        <span className="marquee-item">{item}</span>
                        <TealTriangle />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
