'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [phase, setPhase] = useState(0); // 0=logo, 1=counter, 2=exit
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const counterRef = useRef(null);

    // Phase sequencing
    useEffect(() => {
        // Phase 0 → Phase 1 after 800ms (logo draw)
        const t1 = setTimeout(() => setPhase(1), 800);

        // Phase 1 → Phase 2 after 1600ms (counter done)
        const t2 = setTimeout(() => setPhase(2), 1600);

        // Unmount after 2200ms
        const t3 = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, 2200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    // Counter animation (phase 1)
    useEffect(() => {
        if (phase !== 1) return;

        let start = null;
        const duration = 700; // ms

        function tick(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * 100));
            if (progress < 1) {
                counterRef.current = requestAnimationFrame(tick);
            }
        }

        counterRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(counterRef.current);
    }, [phase]);

    // SVG path for AKTAS logo mark (simplified geometric A)
    const logoPath = 'M60 10 L10 110 L30 110 L40 80 L80 80 L90 110 L110 110 L60 10 Z M45 65 L60 25 L75 65 Z';
    const pathLength = 400;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
                >
                    {/* Phase 0: Logo SVG Draw */}
                    <motion.div
                        className="preloader-logo"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase >= 1 ? 0.3 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d={logoPath}
                                strokeDasharray={pathLength}
                                initial={{ strokeDashoffset: pathLength }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </svg>
                    </motion.div>

                    {/* Phase 1: Counter */}
                    <motion.div
                        className="preloader-counter"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: phase >= 1 ? 1 : 0,
                            y: phase >= 1 ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {String(count).padStart(3, '0')}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
