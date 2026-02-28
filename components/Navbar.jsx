'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/* ── AKTAS Logo Mark SVG ───────────────────────────── */
function AktasLogo({ isLight, size = 36 }) {
    const h = Math.round(size * 0.889); // ~32px for 36px wide
    return (
        <svg
            width={size}
            height={h}
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Left half of outer triangle — blue */}
            <polygon
                points="18,0 0,32 18,32"
                fill={isLight ? '#1B3A8C' : '#FFFFFF'}
                opacity={isLight ? 1 : 0.9}
            />
            {/* Right half of outer triangle — teal */}
            <polygon
                points="18,0 36,32 18,32"
                fill={isLight ? '#00B5A0' : '#00B5A0'}
            />
            {/* Inner inverted white triangle */}
            <polygon
                points="18,24 10,10 26,10"
                fill={isLight ? '#FFFFFF' : '#0D1117'}
            />
        </svg>
    );
}

/* ── Teal Diamond Separator ────────────────────────── */
function Diamond() {
    return (
        <span
            style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                background: 'var(--teal)',
                transform: 'rotate(45deg)',
                flexShrink: 0,
            }}
            aria-hidden="true"
        />
    );
}

/* ── Mobile Menu Overlay ───────────────────────────── */
function MobileMenu({ isOpen, onClose, pathname }) {
    const links = [
        { href: '/', label: 'Startseite' },
        { href: '/leistungen', label: 'Leistungen' },
        { href: '/kontakt', label: 'Kontakt' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ clipPath: 'circle(0% at calc(100% - 32px) 36px)' }}
                    animate={{ clipPath: 'circle(150% at calc(100% - 32px) 36px)' }}
                    exit={{ clipPath: 'circle(0% at calc(100% - 32px) 36px)' }}
                    transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'var(--dark)',
                        zIndex: 100050,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: '0 clamp(32px, 10vw, 80px)',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Menü schließen"
                        style={{
                            position: 'absolute',
                            top: '28px',
                            right: '28px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--white)', transform: 'rotate(45deg) translate(4.5px, 4.5px)' }} />
                        <span style={{ display: 'block', width: '24px', height: '1.5px', background: 'var(--white)', transform: 'rotate(-45deg) translate(4.5px, -4.5px)' }} />
                    </button>

                    {/* Nav links */}
                    <nav id="mobile-main-menu">
                        {links.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    style={{
                                        display: 'block',
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                                        fontStyle: 'italic',
                                        color: pathname === link.href ? 'var(--teal)' : 'var(--white)',
                                        lineHeight: 1.15,
                                        marginBottom: '0.2em',
                                        transition: 'color 0.3s',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        style={{ marginTop: '48px' }}
                    >
                        <Link
                            href="/kontakt"
                            onClick={onClose}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: 'var(--teal)',
                                borderBottom: '1px solid var(--teal)',
                                paddingBottom: '4px',
                            }}
                        >
                            Anfrage stellen →
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ── Main Navbar ───────────────────────────────────── */
export default function Navbar() {
    const pathname = usePathname();
    const [isLight, setIsLight] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    const navLinks = [
        { href: '/', label: 'Startseite' },
        { href: '/leistungen', label: 'Leistungen' },
        { href: '/kontakt', label: 'Kontakt' },
    ];

    // Detect dark/light section via IntersectionObserver
    useEffect(() => {
        const darkSections = document.querySelectorAll('.dark-section');
        if (darkSections.length === 0) {
            // Fallback: scroll-based detection
            const handler = () => setIsLight(window.scrollY > 80);
            window.addEventListener('scroll', handler, { passive: true });
            return () => window.removeEventListener('scroll', handler);
        }

        const lightHandler = () => {
            const isOverDark = [...darkSections].some((el) => {
                const rect = el.getBoundingClientRect();
                return rect.top <= 72 && rect.bottom > 72;
            });
            setIsLight(!isOverDark);
        };

        window.addEventListener('scroll', lightHandler, { passive: true });
        lightHandler();

        return () => {
            window.removeEventListener('scroll', lightHandler);
        };
    }, [pathname]);

    // Smart hide on scroll down
    useEffect(() => {
        const handler = () => {
            const currentY = window.scrollY;
            setIsHidden(currentY > lastScrollY.current && currentY > 120);
            lastScrollY.current = currentY;
        };
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileOpen]);

    useEffect(() => {
        if (!isMobileOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsMobileOpen(false);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileOpen]);

    const textColor = isLight ? 'var(--dark)' : 'var(--white)';

    return (
        <>
            <motion.header
                animate={{
                    y: isHidden ? '-100%' : '0%',
                    backgroundColor: isLight ? 'rgba(247, 248, 250, 0.85)' : 'rgba(0,0,0,0)',
                    borderBottomColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    height: '72px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto auto',
                    alignItems: 'center',
                    gap: 'clamp(24px, 3vw, 48px)',
                    padding: '0 var(--container-padding)',
                    backdropFilter: isLight ? 'blur(24px) saturate(180%)' : 'none',
                    WebkitBackdropFilter: isLight ? 'blur(24px) saturate(180%)' : 'none',
                    borderBottom: '1px solid transparent',
                }}
            >
                {/* ── Logo ─────────────────────────────── */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ flexShrink: 0 }}
                    >
                        <AktasLogo isLight={isLight} size={36} />
                    </motion.div>
                    <motion.div
                        animate={{ color: textColor }}
                        transition={{ duration: 0.4 }}
                        style={{ lineHeight: 1 }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                fontStyle: 'normal',
                            }}
                        >
                            AKTAS
                        </div>
                        <motion.div
                            animate={{ opacity: isLight ? 0.72 : 0.82 }}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.62rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                marginTop: '3px',
                            }}
                        >
                            Gebäudereinigung GmbH
                        </motion.div>
                    </motion.div>
                </Link>

                {/* ── Center Nav ───────────────────────── */}
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                    }}
                    className="navbar-desktop-links"
                >
                    {navLinks.map((link, i) => {
                        const isActive = pathname === link.href;
                        return (
                            <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <motion.div animate={{ color: textColor }} transition={{ duration: 0.4 }}>
                                    <Link
                                        href={link.href}
                                        className="navbar-link"
                                        aria-current={isActive ? 'page' : undefined}
                                        data-active={isActive ? 'true' : undefined}
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.7rem',
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            color: 'inherit',
                                            position: 'relative',
                                            paddingBottom: '4px',
                                        }}
                                    >
                                        {link.label}
                                        {/* Underline */}
                                        <span
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                height: '1px',
                                                background: 'var(--teal)',
                                                width: isActive ? '100%' : '0%',
                                                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                                transformOrigin: 'left',
                                            }}
                                            className="navbar-underline"
                                        />
                                    </Link>
                                </motion.div>
                                {/* Diamond separator (not after last) */}
                                {i < navLinks.length - 1 && <Diamond />}
                            </span>
                        );
                    })}
                </nav>

                {/* ── CTA Button ───────────────────────── */}
                <div className="navbar-desktop-cta">
                    <Link href="/kontakt" style={{ textDecoration: 'none' }}>
                        <motion.div
                            animate={{ borderColor: textColor, color: textColor }}
                            transition={{ duration: 0.4 }}
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1.5px solid currentColor',
                                padding: '10px 28px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                cursor: 'pointer',
                                zIndex: 0,
                            }}
                            whileHover="hover"
                            data-cursor="magnetic"
                        >
                            {/* Fill layer */}
                            <motion.span
                                variants={{
                                    hover: { scaleX: 1 },
                                    default: { scaleX: 0 },
                                }}
                                initial={{ scaleX: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'var(--blue)',
                                    transformOrigin: 'left',
                                    zIndex: -1,
                                }}
                            />
                            <motion.span
                                variants={{
                                    hover: { color: '#FFFFFF' },
                                }}
                                style={{ position: 'relative', zIndex: 1 }}
                            >
                                Anfrage stellen
                            </motion.span>
                        </motion.div>
                    </Link>
                </div>

                {/* ── Hamburger (mobile) ────────────────── */}
                <button
                    className="navbar-mobile-toggle"
                    onClick={() => setIsMobileOpen(true)}
                    aria-label="Menü öffnen"
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-main-menu"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'none',
                        flexDirection: 'column',
                        gap: '5px',
                        padding: '8px',
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            animate={{ background: textColor }}
                            transition={{ duration: 0.4 }}
                            style={{ display: 'block', width: '24px', height: '1.5px' }}
                        />
                    ))}
                </button>
            </motion.header>

            {/* ── Mobile Full-Screen Menu ───────────── */}
            <MobileMenu
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                pathname={pathname}
            />
        </>
    );
}
