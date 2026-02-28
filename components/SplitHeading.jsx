'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import SplitType from 'split-type';

export default function SplitHeading({
    text,
    tag = 'h2',
    delay = 0,
    className = '',
}) {
    const containerRef = useRef(null);
    const splitRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!containerRef.current) return;

        splitRef.current = new SplitType(containerRef.current, {
            types: 'chars',
            tagName: 'span',
        });

        // Set initial state
        if (splitRef.current.chars) {
            splitRef.current.chars.forEach((char) => {
                char.style.display = 'inline-block';
                char.style.transform = 'translateY(110%)';
                char.style.transition = 'none';
            });
        }

        return () => {
            if (splitRef.current) splitRef.current.revert();
        };
    }, [text]);

    // Animate when in view
    useEffect(() => {
        if (!isInView || !splitRef.current?.chars) return;

        splitRef.current.chars.forEach((char, i) => {
            char.style.transition = `transform 0.7s ${delay + i * 0.025}s cubic-bezier(0.16, 1, 0.3, 1)`;
            char.style.transform = 'translateY(0%)';
        });
    }, [isInView, delay]);

    const Tag = tag;

    return (
        <Tag
            ref={containerRef}
            className={className}
            style={{ overflow: 'hidden' }}
        >
            {text}
        </Tag>
    );
}
