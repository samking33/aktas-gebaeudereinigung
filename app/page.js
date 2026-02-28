'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';
import Preloader from '@/components/Preloader';
import SplitHeading from '@/components/SplitHeading';
import ClipReveal from '@/components/ClipReveal';
import MarqueeTicker from '@/components/MarqueeTicker';
import MagneticButton from '@/components/MagneticButton';
import ParallaxImage from '@/components/ParallaxImage';
import SectionShell from '@/components/ui/SectionShell';
import VariantStrip from '@/components/ui/VariantStrip';
import { SCENE_VARIANTS } from '@/lib/imageManifest';

/* ─────────────────────────────────────────────────────
   AKTAS Logo SVG (compact, for CTA watermark)
───────────────────────────────────────────────────── */
function AktasLogoWatermark({ size = 400 }) {
    const h = Math.round(size * 0.889);
    return (
        <svg
            width={size}
            height={h}
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <polygon points="18,0 0,32 18,32" fill="#FFFFFF" opacity="0.05" />
            <polygon points="18,0 36,32 18,32" fill="#FFFFFF" opacity="0.05" />
            <polygon points="18,24 10,10 26,10" fill="rgba(255,255,255,0.03)" />
        </svg>
    );
}

/* ─────────────────────────────────────────────────────
   Count-Up Animated Number
───────────────────────────────────────────────────── */
function CountUp({ to, suffix = '', duration = 2 }) {
    const ref = useRef(null);
    const inViewRef = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let controls;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !inViewRef.current) {
                    inViewRef.current = true;
                    controls = animate(0, parseInt(to, 10), {
                        duration,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate(value) {
                            el.textContent = Math.round(value) + suffix;
                        },
                    });
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => {
            observer.disconnect();
            controls?.stop();
        };
    }, [to, suffix, duration]);

    return (
        <span ref={ref} style={{ display: 'inline-block' }}>
            0{suffix}
        </span>
    );
}

/* ─────────────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────────────── */
function HeroSection({ isLoaded }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const ghostY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);
    const scrollLineH = useSpring(0, { stiffness: 80, damping: 20 });

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                scrollLineH.set(60);
            }, 1400);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, scrollLineH]);

    const entryDelay = isLoaded ? 0.2 : 99;

    return (
        <section
            ref={sectionRef}
            style={{
                height: '100svh',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--dark)',
            }}
        >
            {/* Layer 0 — Background Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    scale: bgScale,
                    y: bgY,
                }}
            >
                <Image
                    src="/images/hero-main.jpg"
                    alt="Modernes Bürogebäude-Atrium"
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.3) 100%)',
                    }}
                />
            </motion.div>

            {/* Layer 1 — Ghost word "SAUBER" */}
            <motion.div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    right: '-2vw',
                    bottom: '-5vw',
                    zIndex: 1,
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: '30vw',
                    lineHeight: 1,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    y: ghostY,
                }}
            >
                SAUBER
            </motion.div>

            {/* Layer 2 — Foreground Content */}
            <div
                className="overlay-readable"
                style={{
                    position: 'absolute',
                    bottom: '12%',
                    left: 'var(--container-padding)',
                    zIndex: 2,
                    maxWidth: '760px',
                }}
            >
                {/* Category label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: entryDelay, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: 'var(--teal)',
                        marginBottom: '28px',
                    }}
                >
                    Gebäudereinigung · Bad Vilbel · Seit 2009
                </motion.div>

                {/* Main Headline */}
                <div style={{ overflow: 'hidden', marginBottom: '0' }}>
                    {isLoaded && (
                        <SplitHeading
                            text="Sauberkeit, die man sieht."
                            tag="h1"
                            delay={0.4}
                            className=""
                        />
                    )}
                </div>

                {/* Separator line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isLoaded ? { width: '60px' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.3)',
                        margin: '28px 0',
                    }}
                />

                {/* Subtext */}
                <ClipReveal delay={isLoaded ? 0.8 : 99}>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-subheading)',
                            color: 'var(--text-muted-dark-strong)',
                            maxWidth: '500px',
                            lineHeight: 1.6,
                            marginBottom: '40px',
                        }}
                    >
                        Professionelle Gebäudereinigung für Unternehmen und Gewerbe.
                        <br />
                        Zuverlässig. Diskret. Makellos.
                    </p>
                </ClipReveal>

                {/* CTA Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
                >
                    <MagneticButton
                        href="/leistungen"
                        style={{
                            background: 'var(--teal)',
                            borderColor: 'var(--teal)',
                            color: 'white',
                        }}
                    >
                        <span style={{ color: 'white' }}>Leistungen entdecken</span>
                    </MagneticButton>
                    <MagneticButton
                        href="/kontakt"
                        style={{
                            borderColor: 'rgba(255,255,255,0.5)',
                            color: 'white',
                        }}
                    >
                        <span style={{ color: 'white' }}>Kontakt</span>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Layer 2 — Floating Right Panel */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    right: 'var(--container-padding)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
                className="hero-side-panel"
            >
                <div
                    data-cursor="image"
                    style={{
                        width: '280px',
                        height: '380px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        overflow: 'hidden',
                        position: 'relative',
                        flexShrink: 0,
                    }}
                >
                    <Image
                        src="/images/hero-cleaning.png.png"
                        alt="Reinigungskraft bei professioneller Glasreinigung"
                        fill
                        sizes="280px"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        color: 'var(--text-muted-dark)',
                        letterSpacing: '0.2em',
                        textAlign: 'right',
                    }}
                >
                    © AKTAS · 2024
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                }}
            >
                <motion.div
                    style={{
                        width: '1px',
                        height: scrollLineH,
                        background: 'rgba(255,255,255,0.4)',
                    }}
                    animate={{ opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 0.72 } : {}}
                    transition={{ delay: 1.5 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        color: 'var(--text-muted-dark)',
                        writingMode: 'vertical-rl',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}
                >
                    Scrollen
                </motion.span>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────
   Section 2 — Marquee Ticker
───────────────────────────────────────────────────── */
function MarqueeSection() {
    return (
        <div
            style={{
                height: '72px',
                background: 'var(--teal)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                transform: 'skewX(-2deg)',
            }}
        >
            <div style={{ transform: 'skewX(2deg)', width: '100%' }} className="teal-marquee">
                <MarqueeTicker
                    items={[
                        'Unterhaltsreinigung',
                        'Glasreinigung',
                        'Grundreinigung',
                        'Büroreinigung',
                        'Außenanlagen',
                        'Treppenhaus',
                        'Fassadenreinigung',
                    ]}
                    speed={25}
                    direction="left"
                />
            </div>
        </div>
    );
}

function HeroVariantSection() {
    return (
        <SectionShell
            style={{
                background: 'var(--white)',
                padding: 0,
            }}
        >
            <VariantStrip title="Hero-Motive im Einsatz" items={SCENE_VARIANTS.hero} compact columns={3} />
        </SectionShell>
    );
}

/* ─────────────────────────────────────────────────────
   Section 3 — Brand Statement
───────────────────────────────────────────────────── */
function StatementSection() {
    return (
        <section
            style={{
                background: 'var(--off-white)',
                padding: 'var(--section-padding) var(--container-padding)',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: 'clamp(48px, 6vw, 100px)',
                    alignItems: 'center',
                }}
            >
                {/* Text Column */}
                <div>
                    <ClipReveal delay={0}>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                color: 'var(--teal)',
                                marginBottom: '32px',
                            }}
                        >
                            01 — Unser Versprechen
                        </div>
                    </ClipReveal>

                    <SplitHeading
                        text="Mit uns haben Sie immer den Durchblick."
                        tag="h2"
                        delay={0.1}
                        className=""
                    />

                    <ClipReveal delay={0.3}>
                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--text-body)',
                                color: 'var(--grey-600)',
                                maxWidth: '480px',
                                lineHeight: 1.85,
                                marginTop: '28px',
                            }}
                        >
                            Seit über 15 Jahren vertrauen Unternehmen in Frankfurt und Umgebung auf unsere
                            Präzision. Wir reinigen nicht nur Oberflächen — wir schaffen Umgebungen, in
                            denen Menschen gerne arbeiten.
                        </p>
                    </ClipReveal>

                    {/* Stats row */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 'clamp(24px, 4vw, 48px)',
                            marginTop: '48px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { num: '15', suffix: '+', label: 'Jahre Erfahrung' },
                            { num: '200', suffix: '+', label: 'Zufriedene Kunden' },
                            { num: '5', suffix: '', label: 'Fachkundige Teams' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontStyle: 'italic',
                                        fontSize: '3.5rem',
                                        color: 'var(--blue)',
                                        lineHeight: 1,
                                    }}
                                >
                                    <CountUp to={stat.num} suffix={stat.suffix} />
                                </div>
                                <div
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 'var(--text-label)',
                                        color: 'var(--text-muted-light)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.15em',
                                        marginTop: '6px',
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Column */}
                <div
                    className="statement-media"
                    style={{
                        height: '580px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    data-cursor="image"
                >
                    <ParallaxImage
                        src="/images/statement-workspace.jpg"
                        alt="Modernes Bürogebäude — Reinheit und Ordnung"
                        speed={0.2}
                        width={900}
                        height={700}
                        className=""
                    />
                    {/* Teal bottom accent bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: '4px',
                            background: 'var(--teal)',
                            zIndex: 2,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────
   Section 4 — Services Horizontal Scroll
───────────────────────────────────────────────────── */
const SERVICE_CARDS = [
    {
        id: '01',
        title: 'Unterhaltsreinigung',
        description:
            'Regelmäßige, professionelle Reinigung Ihrer Büro- und Gewerbeflächen. Täglich, wöchentlich oder nach Ihrem Bedarf.',
        bg: 'var(--blue)',
        textColor: 'white',
        accentColor: 'var(--teal)',
        image: '/images/service-unterhaltsreinigung.png.png',
        imageOpacity: 0.4,
    },
    {
        id: '02',
        title: 'Glasreinigung',
        description:
            'Streifenfreie Reinigung von Fenstern, Glasfassaden und Wintergärten — auf höchstem technischen Niveau.',
        bg: 'var(--off-white)',
        textColor: 'var(--dark)',
        accentColor: 'var(--teal)',
        image: '/images/service-glasreinigung.png.png',
        imageOpacity: 0.3,
    },
    {
        id: '03',
        title: 'Grundreinigung',
        description:
            'Intensive Tiefenreinigung für nachhaltig saubere Ergebnisse. Ideal für Umzüge, Renovierungen und Sonderanlässe.',
        bg: 'var(--teal)',
        textColor: 'white',
        accentColor: 'rgba(255,255,255,0.8)',
        image: null,
        imageOpacity: 0,
    },
    {
        id: '04',
        title: 'Alle Leistungen',
        description:
            'Entdecken Sie unser vollständiges Leistungsportfolio für Unternehmen jeder Größe.',
        bg: 'var(--dark)',
        textColor: 'white',
        accentColor: 'var(--teal)',
        image: '/images/service-fassade.png.png',
        imageOpacity: 0.35,
        isCTA: true,
    },
];

function ServicesSection() {
    const sectionRef = useRef(null);
    const [activeCard, setActiveCard] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const xTranslate = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    useEffect(() => {
        const unsub = scrollYProgress.onChange((v) => {
            setActiveCard(Math.min(3, Math.floor(v * 4)));
        });
        return () => unsub();
    }, [scrollYProgress]);

    return (
        <div
            ref={sectionRef}
            className="dark-section noise services-horizontal-section"
            style={{ height: '500vh', position: 'relative' }}
        >
            <div
                className="services-horizontal-stage"
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    background: 'var(--dark)',
                }}
            >
                {/* Header + Progress Bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        padding: '100px var(--container-padding) 24px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        background:
                            'linear-gradient(to bottom, rgba(13,17,23,0.95) 0%, transparent 100%)',
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                color: 'var(--teal)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                marginBottom: '8px',
                            }}
                        >
                            03 — Leistungen
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontStyle: 'italic',
                                fontSize: 'var(--text-heading)',
                                color: 'white',
                            }}
                        >
                            Was wir für Sie tun
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                            style={{
                                width: '120px',
                                height: '1px',
                                background: 'rgba(255,255,255,0.1)',
                                position: 'relative',
                            }}
                        >
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '1px',
                                    background: 'var(--teal)',
                                    width: progressWidth,
                                }}
                            />
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                color: 'var(--text-muted-dark)',
                                letterSpacing: '0.1em',
                            }}
                        >
                            0{activeCard + 1}/04
                        </div>
                    </div>
                </div>

                {/* Horizontal card track */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <motion.div
                        className="services-horizontal-track"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0px',
                            x: xTranslate,
                            paddingLeft: 'clamp(24px, 8vw, 120px)',
                        }}
                    >
                        {SERVICE_CARDS.map((card) => (
                            <div
                                key={card.id}
                                className="services-horizontal-card"
                                style={{
                                    width: '80vw',
                                    maxWidth: '800px',
                                    height: '85vh',
                                    flexShrink: 0,
                                    background: card.bg,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    marginRight: 'clamp(16px, 2vw, 32px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '60px',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                {/* Background image */}
                                {card.image && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            zIndex: 0,
                                        }}
                                    >
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 80vw"
                                            style={{
                                                objectFit: 'cover',
                                                opacity: card.imageOpacity,
                                            }}
                                        />
                                    </div>
                                )}

                                {/* CTA card watermark logo */}
                                {card.isCTA && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            zIndex: 0,
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <AktasLogoWatermark size={400} />
                                    </div>
                                )}

                                {/* Large number */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        top: '-2vw',
                                        right: '-1vw',
                                        fontFamily: 'var(--font-display)',
                                        fontStyle: 'italic',
                                        fontSize: '20vw',
                                        color: 'transparent',
                                        WebkitTextStroke: `1px rgba(${card.textColor === 'white' ? '255,255,255' : '0,0,0'},0.06)`,
                                        lineHeight: 1,
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                        zIndex: 1,
                                    }}
                                >
                                    {card.id}
                                </div>

                                {/* Content */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: 'var(--text-label)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.25em',
                                            color: card.accentColor,
                                            marginBottom: '16px',
                                        }}
                                    >
                                        {card.id} — Leistung
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontStyle: 'italic',
                                            fontSize: 'var(--text-heading)',
                                            color: card.textColor,
                                            lineHeight: 1.1,
                                            marginBottom: '24px',
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: 'var(--text-body)',
                                            color:
                                                card.textColor === 'white'
                                                    ? 'rgba(255,255,255,0.7)'
                                                    : 'var(--grey-600)',
                                            maxWidth: '420px',
                                            lineHeight: 1.7,
                                            marginBottom: '40px',
                                        }}
                                    >
                                        {card.description}
                                    </p>
                                    <MagneticButton
                                        href={card.isCTA ? '/leistungen' : '/leistungen'}
                                        style={
                                            card.textColor === 'white'
                                                ? {
                                                    borderColor: 'rgba(255,255,255,0.5)',
                                                    color: 'white',
                                                }
                                                : {}
                                        }
                                    >
                                        <span
                                            style={{
                                                color: card.textColor === 'white' ? 'white' : 'inherit',
                                            }}
                                        >
                                            {card.isCTA ? 'Portfolio entdecken →' : 'Mehr erfahren →'}
                                        </span>
                                    </MagneticButton>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ServiceVariantSection() {
    return (
        <SectionShell
            style={{
                background: 'var(--off-white)',
                padding: 0,
            }}
        >
            <VariantStrip title="Fassaden- und Portfolio-Varianten" items={SCENE_VARIANTS.fassade} compact columns={3} />
        </SectionShell>
    );
}

/* ─────────────────────────────────────────────────────
   Section 5 — Why AKTAS / USPs
───────────────────────────────────────────────────── */
const USP_ITEMS = [
    {
        num: '01',
        title: 'Festpreisgarantie',
        desc: 'Transparente Preise. Was wir anbieten, das berechnen wir — ohne Überraschungen.',
    },
    {
        num: '02',
        title: 'Geprüftes Fachpersonal',
        desc: 'Jeder Mitarbeiter ist sorgfältig ausgewählt, geschult und vollständig versichert.',
    },
    {
        num: '03',
        title: 'Umweltbewusste Reinigung',
        desc: 'Wir setzen ausschließlich auf zertifizierte, umweltverträgliche Reinigungsmittel.',
    },
    {
        num: '04',
        title: 'Maximale Flexibilität',
        desc: 'Früh, spät, am Wochenende oder nachts — wir passen uns Ihrem Betrieb an.',
    },
];

function WhyAktasSection() {
    return (
        <section
            style={{
                background: 'var(--white)',
                padding: 'var(--section-padding) var(--container-padding)',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 'clamp(48px, 6vw, 100px)',
                    alignItems: 'start',
                }}
            >
                {/* Image Column */}
                <div
                    className="why-image-column"
                    style={{
                        position: 'relative',
                        height: '700px',
                    }}
                >
                    {/* Rotated label */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            writingMode: 'vertical-rl',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            color: 'var(--teal)',
                        }}
                    >
                        AKTAS QUALITÄT
                    </div>

                    <div
                        data-cursor="image"
                        style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
                    >
                        <ParallaxImage
                            src="/images/why-aktas-portrait.jpg"
                            alt="AKTAS Reinigungsprofi in modernem Bürogebäude"
                            speed={0.3}
                            width={700}
                            height={1000}
                        />
                    </div>
                </div>

                {/* Content Column */}
                <div style={{ paddingLeft: 'clamp(0px, 2vw, 40px)' }}>
                    <ClipReveal delay={0}>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.25em',
                                color: 'var(--teal)',
                                marginBottom: '32px',
                            }}
                        >
                            02 — Warum AKTAS
                        </div>
                    </ClipReveal>

                    <SplitHeading
                        text="Der Unterschied, den Sie erleben."
                        tag="h2"
                        delay={0.1}
                    />

                    {/* USP items */}
                    <div style={{ marginTop: '48px' }}>
                        {USP_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.num}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.12,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{
                                    display: 'flex',
                                    gap: '24px',
                                    alignItems: 'flex-start',
                                    borderBottom: '1px solid var(--grey-200)',
                                    paddingBlock: '28px',
                                }}
                            >
                                {/* Number */}
                                <div
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontStyle: 'italic',
                                        fontSize: '3rem',
                                        color: 'var(--teal)',
                                        opacity: 0.2,
                                        lineHeight: 1,
                                        flexShrink: 0,
                                        width: '56px',
                                    }}
                                >
                                    {item.num}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            color: 'var(--dark)',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '0.9rem',
                                            color: 'var(--grey-600)',
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {item.desc}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────
   Section 6 — Atmospheric Break
───────────────────────────────────────────────────── */
function AtmosphericBreak() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.0]);
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <section
            ref={ref}
            style={{
                height: '80vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Full-bleed image with parallax */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    scale,
                    y,
                }}
            >
                <Image
                    src="/images/atmospheric-break.jpg"
                    alt="Moderner Firmencampus aus der Vogelperspektive"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(to top, rgba(13,17,23,0.8) 30%, rgba(13,17,23,0.2) 100%)',
                    }}
                />
            </motion.div>

            {/* Centered content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '0 var(--container-padding)',
                }}
                className="overlay-readable"
            >
                <ClipReveal delay={0}>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            color: 'var(--text-muted-dark)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            marginBottom: '24px',
                        }}
                    >
                        Frankfurt & Umgebung
                    </div>
                </ClipReveal>

                <SplitHeading
                    text="Für Unternehmen, die Perfektion fordern."
                    tag="h2"
                    delay={0.1}
                    className="atmospheric-heading"
                />

                <ClipReveal delay={0.5}>
                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                        <MagneticButton href="/kontakt">
                            <span style={{ color: 'white' }}>Jetzt Angebot anfragen</span>
                        </MagneticButton>
                    </div>
                </ClipReveal>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────
   Section 7 — CTA Finale
───────────────────────────────────────────────────── */
function CTASection() {
    const sectionRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const bgX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), {
        stiffness: 40,
        damping: 20,
    });
    const bgY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), {
        stiffness: 40,
        damping: 20,
    });

    const handleMouseMove = (e) => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        const y = (e.clientY - rect.top) / rect.height * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={sectionRef}
            className="dark-section noise"
            onMouseMove={handleMouseMove}
            style={{
                background: 'var(--blue)',
                padding: 'var(--section-padding) var(--container-padding)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative large AKTAS text */}
            <motion.div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: '28vw',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 0,
                    x: bgX,
                    y: bgY,
                }}
            >
                AKTAS
            </motion.div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <ClipReveal delay={0}>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            color: 'var(--teal)',
                            marginBottom: '24px',
                        }}
                    >
                        Bereit für makellose Sauberkeit?
                    </div>
                </ClipReveal>

                <SplitHeading
                    text="Lassen Sie uns sprechen."
                    tag="h2"
                    delay={0.1}
                    className="atmospheric-heading"
                />


                <ClipReveal delay={0.3}>
                    <p
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-body)',
                            color: 'var(--text-muted-dark-strong)',
                            maxWidth: '480px',
                            margin: '24px auto 0',
                            lineHeight: 1.7,
                        }}
                    >
                        Kontaktieren Sie uns für ein unverbindliches Angebot. Wir antworten
                        innerhalb von 24 Stunden.
                    </p>
                </ClipReveal>

                <motion.div
                    style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}
                    whileHover={{
                        filter: 'drop-shadow(0 0 40px rgba(0,181,160,0.6))',
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <MagneticButton href="/kontakt">
                        <span
                            style={{
                                color: 'white',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                padding: '4px 16px',
                            }}
                        >
                            Kostenlos anfragen →
                        </span>
                    </MagneticButton>
                </motion.div>

                <ClipReveal delay={0.5}>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            color: 'var(--text-muted-dark)',
                            marginTop: '32px',
                            letterSpacing: '0.1em',
                        }}
                    >
                        06101 / 98 611 63 · info@m-aktas.de · Bad Vilbel
                    </div>
                </ClipReveal>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────
   HOME PAGE — Root Component
───────────────────────────────────────────────────── */
export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const handlePreloaderComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <Preloader onComplete={handlePreloaderComplete} />

            <div className={`page-content ${!isLoading ? 'is-visible' : ''}`}>

                {/* Section 1 — Cinematic Hero */}
                <HeroSection isLoaded={!isLoading} />

                {/* Hero variants */}
                <HeroVariantSection />

                {/* Section 2 — Marquee Ticker */}
                <MarqueeSection />

                {/* Section 3 — Brand Statement */}
                <StatementSection />

                {/* Section 4 — Services Horizontal Scroll */}
                <ServicesSection />

                {/* Service variants */}
                <ServiceVariantSection />

                {/* Section 5 — Why AKTAS */}
                <WhyAktasSection />

                {/* Section 6 — Atmospheric Break */}
                <AtmosphericBreak />

                {/* Section 7 — CTA Finale */}
                <CTASection />

            </div>
        </>
    );
}
