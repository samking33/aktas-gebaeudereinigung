'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxImage({
    src,
    alt,
    speed = 0.2,
    className = '',
    priority = false,
    width = 1200,
    height = 800,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw',
}) {
    const containerRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? [0, 0] : [speed * -100, speed * 100]
    );

    return (
        <motion.div
            ref={containerRef}
            className={`parallax-image-container ${className}`}
            style={{
                overflow: 'hidden',
                position: 'relative',
            }}
            initial={shouldReduceMotion ? false : { clipPath: 'inset(100% 0 0 0)' }}
            whileInView={shouldReduceMotion ? {} : { clipPath: 'inset(0% 0 0 0)' }}
            viewport={shouldReduceMotion ? undefined : { once: true, margin: '-50px' }}
            transition={shouldReduceMotion ? undefined : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div style={{ y, scale: shouldReduceMotion ? 1 : 1.1 }}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    sizes={sizes}
                    style={{
                        width: '100%',
                        height: '110%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                    data-cursor="image"
                />
            </motion.div>
        </motion.div>
    );
}
