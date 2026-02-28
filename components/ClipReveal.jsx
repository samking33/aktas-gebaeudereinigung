'use client';

import { motion } from 'framer-motion';

const directionMap = {
    up: { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 } },
};

export default function ClipReveal({
    children,
    direction = 'up',
    delay = 0,
    className = '',
}) {
    const { initial, animate } = directionMap[direction] || directionMap.up;

    return (
        <div style={{ overflow: 'hidden' }} className={className}>
            <motion.div
                initial={initial}
                whileInView={animate}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
