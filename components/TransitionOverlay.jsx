'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * TransitionOverlay
 * Two-panel (blue top / teal bottom) page transition that covers and reveals
 * the screen on every route change.
 */
export default function TransitionOverlay() {
    const pathname = usePathname();
    const [stage, setStage] = useState('idle'); // idle | covering | covered | revealing
    const prevPath = useRef(pathname);
    const timeouts = useRef([]);

    const clear = () => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
    };

    useEffect(() => {
        if (pathname === prevPath.current) return;
        prevPath.current = pathname;

        clear();
        setStage('covering');

        // After panels meet in center, hold briefly then reveal
        timeouts.current.push(setTimeout(() => setStage('covered'), 600));
        timeouts.current.push(setTimeout(() => setStage('revealing'), 750));
        timeouts.current.push(setTimeout(() => setStage('idle'), 1400));

        return clear;
    }, [pathname]);

    if (stage === 'idle') return null;

    const isCovering = stage === 'covering' || stage === 'covered';

    const panelBase = {
        position: 'fixed',
        left: 0,
        right: 0,
        height: '50vh',
        zIndex: 100100,
        pointerEvents: 'none',
    };

    const topVariants = {
        enter: { y: '-100%' },
        cover: { y: 0, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } },
        reveal: { y: '-100%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 } },
    };

    const botVariants = {
        enter: { y: '100%' },
        cover: { y: 0, transition: { duration: 0.5, ease: [0.4, 0, 1, 1], delay: 0.05 } },
        reveal: { y: '100%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
    };

    const topAnim = isCovering ? 'cover' : 'reveal';
    const botAnim = isCovering ? 'cover' : 'reveal';

    return (
        <>
            <motion.div
                key="top-panel"
                style={{ ...panelBase, top: 0, background: 'var(--blue)' }}
                initial="enter"
                animate={topAnim}
                variants={topVariants}
            />
            <motion.div
                key="bot-panel"
                style={{ ...panelBase, bottom: 0, background: 'var(--teal)' }}
                initial="enter"
                animate={botAnim}
                variants={botVariants}
            />
        </>
    );
}
