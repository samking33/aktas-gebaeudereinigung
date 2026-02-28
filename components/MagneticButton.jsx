'use client';

import { useRef, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';
import Link from 'next/link';

export default function MagneticButton({
    children,
    className = '',
    href,
    style,
    onClick,
    type = 'button',
    disabled = false,
    ariaLabel,
    target,
    rel,
}) {
    const ref = useRef(null);

    const springConfig = { stiffness: 300, damping: 20 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);
    const innerX = useSpring(0, springConfig);
    const innerY = useSpring(0, springConfig);

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const radius = 100;
        const maxTranslate = 10;

        if (distance < radius) {
            const factor = (1 - distance / radius) * maxTranslate;
            const angle = Math.atan2(distY, distX);
            const moveX = Math.cos(angle) * factor;
            const moveY = Math.sin(angle) * factor;

            x.set(moveX);
            y.set(moveY);
            innerX.set(moveX * 0.3);
            innerY.set(moveY * 0.3);
        }
    }, [x, y, innerX, innerY]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        innerX.set(0);
        innerY.set(0);
    }, [x, y, innerX, innerY]);

    const innerContent = (
        <motion.span className="magnetic-btn-inner" style={{ x: innerX, y: innerY }}>
            {children}
        </motion.span>
    );

    const buttonClassName = `magnetic-btn ${disabled ? 'is-disabled' : ''} ${className}`.trim();

    if (href) {
        const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');

        const linkNode = isExternal ? (
            <a
                href={href}
                onClick={onClick}
                aria-label={ariaLabel}
                target={target}
                rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
                style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {innerContent}
            </a>
        ) : (
            <Link
                href={href}
                onClick={onClick}
                aria-label={ariaLabel}
                style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {innerContent}
            </Link>
        );

        return (
            <motion.div
                ref={ref}
                className={buttonClassName}
                style={{ x, y, ...style }}
                onMouseMove={disabled ? undefined : handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-cursor={disabled ? undefined : 'magnetic'}
                aria-disabled={disabled}
            >
                {linkNode}
            </motion.div>
        );
    }

    return (
        <motion.button
            ref={ref}
            type={type}
            disabled={disabled}
            className={buttonClassName}
            style={{ x, y, ...style }}
            onMouseMove={disabled ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            data-magnetic
            data-cursor={disabled ? undefined : 'magnetic'}
            aria-label={ariaLabel}
        >
            {innerContent}
        </motion.button>
    );
}
