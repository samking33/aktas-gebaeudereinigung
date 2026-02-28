'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const stateRef = useRef('default');
    const labelRef = useRef('');
    const [cursorState, setCursorState] = useState('default');
    const [cursorLabel, setCursorLabel] = useState('');

    const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
    const ringX = useSpring(0, springConfig);
    const ringY = useSpring(0, springConfig);

    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isTouch || prefersReducedMotion) return;

        const handleMouseMove = (e) => {
            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }

            ringX.set(e.clientX);
            ringY.set(e.clientY);

            const target = e.target;
            const cursorType = target?.closest('[data-cursor]')?.getAttribute('data-cursor');
            let nextState = 'default';
            let nextLabel = '';

            if (cursorType === 'link') {
                nextState = 'is-link';
                nextLabel = '→';
            } else if (cursorType === 'image') {
                nextState = 'is-image';
            } else if (cursorType === 'magnetic') {
                nextState = 'is-magnetic';
            }

            if (stateRef.current !== nextState) {
                stateRef.current = nextState;
                setCursorState(nextState);
            }

            if (labelRef.current !== nextLabel) {
                labelRef.current = nextLabel;
                setCursorLabel(nextLabel);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [ringX, ringY]);

    return (
        <>
            <div
                ref={dotRef}
                className={`cursor-dot ${cursorState !== 'default' ? cursorState : ''}`}
            />
            <motion.div
                className={`cursor-ring ${cursorState !== 'default' ? cursorState : ''}`}
                style={{ x: ringX, y: ringY }}
            >
                {cursorLabel && (
                    <span className="cursor-ring-label">{cursorLabel}</span>
                )}
            </motion.div>
        </>
    );
}
