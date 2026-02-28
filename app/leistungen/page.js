'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SplitHeading from '@/components/SplitHeading';
import ClipReveal from '@/components/ClipReveal';
import MagneticButton from '@/components/MagneticButton';
import ParallaxImage from '@/components/ParallaxImage';
import SectionShell from '@/components/ui/SectionShell';
import VariantStrip from '@/components/ui/VariantStrip';
import { SCENE_VARIANTS } from '@/lib/imageManifest';

/* ─── Arrow Icon ────────────────────────────────────── */
function ArrowIcon() {
    return (
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
            <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ─── Feature List Item ─────────────────────────────── */
function FeatureItem({ children, light = false }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            color: light ? 'rgba(255,255,255,0.75)' : 'var(--grey-600)',
            paddingBlock: '10px',
            borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.08)' : 'var(--grey-200)'}`,
        }}>
            <span style={{ color: light ? 'var(--teal)' : 'var(--blue)', flexShrink: 0, display: 'flex' }}>
                <ArrowIcon />
            </span>
            {children}
        </div>
    );
}

/* ─── Anchor Nav ────────────────────────────────────── */
const NAV_ITEMS = [
    { label: 'Unterhaltsreinigung', href: '#unterhaltsreinigung' },
    { label: 'Glasreinigung', href: '#glasreinigung' },
    { label: 'Grundreinigung', href: '#grundreinigung' },
    { label: 'Büroreinigung', href: '#bueroreinigung' },
    { label: 'Treppenhaus', href: '#treppenhaus' },
    { label: 'Außenanlagen', href: '#aussenanlagen' },
];

function AnchorNav() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const ids = ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung', 'bueroreinigung', 'treppenhaus', 'aussenanlagen'];
        const observers = ids.map((id, i) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(i); },
                { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="anchor-nav" style={{
            background: 'var(--white)',
            borderBottom: '1px solid var(--grey-200)',
            position: 'sticky',
            top: 'var(--nav-height)',
            zIndex: 100,
            overflowX: 'auto',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px, 3vw, 48px)',
                padding: '0 var(--container-padding)',
                height: '56px',
                whiteSpace: 'nowrap',
            }}>
                {NAV_ITEMS.map((item, i) => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.href)}
                        data-cursor="link"
                        aria-current={active === i ? 'true' : undefined}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            color: active === i ? 'var(--teal)' : 'var(--grey-400)',
                            transition: 'color 0.3s',
                            position: 'relative',
                            paddingBottom: '4px',
                            flexShrink: 0,
                        }}
                    >
                        {item.label}
                        {active === i && (
                            <motion.div
                                layoutId="nav-indicator"
                                style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: 0,
                                    right: 0,
                                    height: '1.5px',
                                    background: 'var(--teal)',
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                            />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}

/* ─── Hero Section ──────────────────────────────────── */
function LeistungenHero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section ref={ref} style={{ height: '70svh', position: 'relative', overflow: 'hidden' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <ParallaxImage
                    src="/images/leistungen-hero.jpg"
                    alt="Modernes Bürogebäude Glasfassade"
                    speed={0.3}
                    priority
                    width={1920}
                    height={900}
                    sizes="100vw"
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(13,17,23,0.65)',
                }} />
            </div>

            {/* Content */}
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: 'var(--container-padding)',
                zIndex: 2,
                maxWidth: '700px',
            }} className="overlay-readable">
                <ClipReveal delay={0.2}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: 'var(--teal)',
                        marginBottom: '24px',
                    }}>
                        Leistungen · AKTAS Gebäudereinigung
                    </div>
                </ClipReveal>

                <SplitHeading
                    text="Was wir für Sie tun."
                    tag="h1"
                    delay={0.3}
                    className="atmospheric-heading"
                />

                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100px' } : {}}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.35)',
                        marginTop: '32px',
                    }}
                />
            </div>
        </section>
    );
}

/* ─── Alternating Service Section ───────────────────── */
function ServiceSection({ id, number, title, headline, body, features, imageRight = false, image, imagePlaceholder = false, bg = 'var(--white)', dark = false }) {
    return (
        <section
            id={id}
            className={dark ? 'dark-section' : ''}
            style={{
                background: bg,
                scrollMarginTop: 'calc(var(--nav-height) + 56px)',
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                minHeight: '600px',
            }}>
                {/* Image Column */}
                <div
                    style={{
                        order: imageRight ? 2 : 1,
                        height: '600px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: dark ? 'rgba(255,255,255,0.03)' : 'var(--grey-50)',
                    }}
                    data-cursor="image"
                >
                    {image ? (
                        <ParallaxImage
                            src={image}
                            alt={title}
                            speed={0.2}
                            width={900}
                            height={700}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        /* Placeholder for missing images */
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, var(--grey-50), var(--grey-200))',
                            flexDirection: 'column',
                            gap: '12px',
                        }}>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            color: 'var(--text-muted-light)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                        }}>
                                {imagePlaceholder}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Column */}
                <div
                    style={{
                        order: imageRight ? 1 : 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 'clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px)',
                    }}
                >
                    <ClipReveal delay={0}>
                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.25em',
                            color: 'var(--teal)',
                            marginBottom: '24px',
                        }}>
                            {number}
                        </div>
                    </ClipReveal>

                    <SplitHeading
                        text={headline}
                        tag="h2"
                        delay={0.1}
                        className={dark ? 'atmospheric-heading' : ''}
                    />

                    <ClipReveal delay={0.25}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-body)',
                            color: dark ? 'var(--text-muted-dark-strong)' : 'var(--grey-600)',
                            lineHeight: 1.85,
                            marginTop: '24px',
                            maxWidth: '480px',
                        }}>
                            {body}
                        </p>
                    </ClipReveal>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        style={{ listStyle: 'none', marginTop: '32px', marginBottom: '40px' }}
                    >
                        {features.map((f) => (
                            <motion.li
                                key={f}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                                }}
                            >
                                <FeatureItem light={dark}>{f}</FeatureItem>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <ClipReveal delay={0.4}>
                        <MagneticButton href="/kontakt" className={dark ? 'btn-outline-white' : ''}>
                            <span style={{ color: dark ? 'white' : 'inherit' }}>
                                Anfrage stellen →
                            </span>
                        </MagneticButton>
                    </ClipReveal>
                </div>
            </div>
        </section>
    );
}

/* ─── Full-Width Dark Service Section ───────────────── */
function FullWidthServiceSection({ id, number, headline, body, bg, image, imageOpacity = 0.08 }) {
    return (
        <section
            id={id}
            className="dark-section noise"
            style={{
                background: bg,
                position: 'relative',
                overflow: 'hidden',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollMarginTop: 'calc(var(--nav-height) + 56px)',
            }}
        >
            {/* Background image texture */}
            {image && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover', opacity: imageOpacity }}
                        aria-hidden="true"
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(13,17,23,0.7), rgba(13,17,23,0.5))',
                    }} />
                </div>
            )}

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                padding: 'var(--section-padding) var(--container-padding)',
                maxWidth: '800px',
                margin: '0 auto',
            }}>
                <ClipReveal delay={0}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: 'var(--teal)',
                        marginBottom: '24px',
                    }}>
                        {number}
                    </div>
                </ClipReveal>

                <SplitHeading
                    text={headline}
                    tag="h2"
                    delay={0.1}
                    className="atmospheric-heading"
                />

                <ClipReveal delay={0.3}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-body)',
                        color: 'var(--text-muted-dark-strong)',
                        lineHeight: 1.85,
                        marginTop: '24px',
                        maxWidth: '600px',
                        margin: '24px auto 0',
                    }}>
                        {body}
                    </p>
                </ClipReveal>

                <ClipReveal delay={0.5}>
                    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                        <MagneticButton href="/kontakt" className="btn-outline-white">
                            <span style={{ color: 'white' }}>Anfrage stellen →</span>
                        </MagneticButton>
                    </div>
                </ClipReveal>
            </div>
        </section>
    );
}

function ServiceVariantsBlock({ title, items }) {
    return (
        <SectionShell
            style={{
                background: 'var(--white)',
                padding: 0,
            }}
        >
            <VariantStrip title={title} items={items} compact columns={3} />
        </SectionShell>
    );
}

/* ─── Process Timeline ──────────────────────────────── */
const PROCESS_STEPS = [
    { num: '01', title: 'Erstgespräch', desc: 'Kostenloses Beratungsgespräch zu Ihren Anforderungen' },
    { num: '02', title: 'Angebot', desc: 'Individuelles Festpreisangebot innerhalb von 24 Stunden' },
    { num: '03', title: 'Durchführung', desc: 'Professionelle Ausführung durch unser geschultes Team' },
    { num: '04', title: 'Qualitätsprüfung', desc: 'Abnahme, Protokoll und Feedbackgespräch' },
];

function ProcessTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section style={{
            background: 'var(--white)',
            padding: 'var(--section-padding) var(--container-padding)',
        }}>
            <ClipReveal delay={0}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--teal)',
                    marginBottom: '16px',
                }}>
                    03 — Unser Prozess
                </div>
            </ClipReveal>

            <SplitHeading text="So einfach geht's." tag="h2" delay={0.1} />

            {/* Steps grid */}
            <div
                ref={ref}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0',
                    marginTop: 'clamp(48px, 6vw, 80px)',
                    position: 'relative',
                }}
            >
                {/* Connecting dashed line — desktop only */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        top: '28px',
                        left: 'calc(12.5%)',
                        right: 'calc(12.5%)',
                        height: '1px',
                        borderTop: '1px dashed rgba(0,181,160,0.35)',
                        zIndex: 0,
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            transformOrigin: 'left center',
                            height: '100%',
                            background: 'rgba(0,181,160,0.35)',
                            backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,181,160,0.45) 0, rgba(0,181,160,0.45) 6px, transparent 6px, transparent 14px)',
                        }}
                    />
                </div>

                {PROCESS_STEPS.map((step, i) => (
                    <motion.div
                        key={step.num}
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '0 clamp(12px, 2vw, 24px)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        {/* Circle */}
                        <div style={{
                            width: '56px',
                            height: '56px',
                            border: '1.5px solid var(--teal)',
                            background: 'var(--white)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.85rem',
                                color: 'var(--teal)',
                                letterSpacing: '0.05em',
                            }}>
                                {step.num}
                            </span>
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: 'var(--dark)',
                            marginTop: '20px',
                        }}>
                            {step.title}
                        </div>

                        <div style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted-light-strong)',
                            marginTop: '8px',
                            maxWidth: '180px',
                            lineHeight: 1.6,
                        }}>
                            {step.desc}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ─── Pricing Card ──────────────────────────────────── */
function PricingCard({ title, badge, subtitle, features, ctaText, featured = false, variant = 'default', delay = 0 }) {
    const cardBg = {
        default: 'var(--dark-2)',
        featured: 'linear-gradient(135deg, rgba(0,181,160,0.08), rgba(27,58,140,0.08))',
        blue: 'rgba(27,58,140,0.18)',
    }[variant];

    const borderStyle = {
        default: '1px solid rgba(255,255,255,0.0)',
        featured: '1px solid var(--teal)',
        blue: '1px solid rgba(27,58,140,0.4)',
    }[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: cardBg,
                border: borderStyle,
                padding: '48px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* BELIEBT badge */}
            {badge && (
                <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--teal)',
                    background: 'rgba(0,181,160,0.12)',
                    padding: '4px 12px',
                }}>
                    {badge}
                </div>
            )}

            {/* Subtitle / type */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--text-muted-dark)',
                marginBottom: '16px',
            }}>
                {subtitle}
            </div>

            {/* Title */}
            <div style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.8rem',
                color: 'var(--white)',
                marginBottom: '8px',
            }}>
                {title}
            </div>

            {/* Price hint */}
            <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--teal)',
                marginBottom: '28px',
            }}>
                Auf Anfrage
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '28px' }} />

            {/* Features */}
            <ul style={{ listStyle: 'none', flexGrow: 1, marginBottom: '36px' }}>
                {features.map((f) => (
                    <li key={f} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: featured ? 'rgba(255,255,255,0.9)' : 'var(--text-muted-dark)',
                        paddingBlock: '9px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        lineHeight: 1.5,
                    }}>
                        <span style={{ color: 'var(--teal)', flexShrink: 0, marginTop: '2px' }}>→</span>
                        {f}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <MagneticButton
                href="/kontakt"
                className={featured ? 'btn-teal' : 'btn-outline-white'}
                style={{ width: '100%' }}
            >
                <span style={{ color: 'white' }}>{ctaText}</span>
            </MagneticButton>
        </motion.div>
    );
}

/* ─── Pricing Section ───────────────────────────────── */
function PricingSection() {
    return (
        <section
            className="dark-section noise"
            style={{
                background: 'var(--dark)',
                padding: 'var(--section-padding) var(--container-padding)',
            }}
        >
            <ClipReveal delay={0}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--teal)',
                    marginBottom: '16px',
                }}>
                    04 — Unsere Pakete
                </div>
            </ClipReveal>

            <SplitHeading
                text="Transparent. Fair. Fest."
                tag="h2"
                delay={0.1}
                className="atmospheric-heading"
            />

            {/* 1px gap grid — dark bg bleeds through as divider */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1px',
                marginTop: 'clamp(48px, 6vw, 80px)',
                background: 'rgba(255,255,255,0.06)',
            }}>
                <PricingCard
                    variant="default"
                    subtitle="Einmalig"
                    title="Einzelreinigung"
                    features={[
                        'Einmaliger Reinigungseinsatz nach Absprache',
                        'Für alle Gewerbeflächen geeignet',
                        'Eigene Reinigungsmittel und Geräte',
                        'Protokoll nach Abschluss',
                    ]}
                    ctaText="Anfragen"
                    delay={0}
                />
                <PricingCard
                    variant="featured"
                    featured
                    subtitle="Regelmäßig"
                    title="Wartungsvertrag"
                    badge="Beliebt"
                    features={[
                        'Feste Reinigungsintervalle nach Wunsch',
                        'Fester Ansprechpartner für Ihr Objekt',
                        'Protokollierte Qualitätskontrolle',
                        'Zertifizierte, umweltschonende Mittel',
                        'Flexible Anpassung jederzeit möglich',
                    ]}
                    ctaText="Jetzt anfragen"
                    delay={0.1}
                />
                <PricingCard
                    variant="blue"
                    subtitle="All-Inclusive"
                    title="Komplett-Paket"
                    features={[
                        'Unterhalts- und Glasreinigung kombiniert',
                        'Treppenhäuser und Außenanlagen',
                        'Grundreinigung auf Abruf inklusive',
                        'Priorität bei Sonderanfragen',
                        '24h-Notfallservice auf Wunsch',
                    ]}
                    ctaText="Paket anfragen"
                    delay={0.2}
                />
            </div>

            {/* Footer note */}
            <ClipReveal delay={0.4}>
                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    color: 'var(--text-muted-dark)',
                    textAlign: 'center',
                    marginTop: '32px',
                    letterSpacing: '0.1em',
                }}>
                    Alle Preise auf Anfrage · Festpreisgarantie · Keine versteckten Kosten
                </p>
            </ClipReveal>
        </section>
    );
}

/* ─── LEISTUNGEN PAGE ───────────────────────────────── */
export default function LeistungenPage() {
    return (
        <>
            {/* Hero */}
            <LeistungenHero />

            {/* Sticky Anchor Nav */}
            <AnchorNav />

            {/* 01 — Unterhaltsreinigung */}
            <ServiceSection
                id="unterhaltsreinigung"
                number="01 / Unterhaltsreinigung"
                title="Unterhaltsreinigung"
                headline="Täglich makellos."
                body="Die regelmäßige Unterhaltsreinigung ist das Fundament einer professionellen Gebäudepflege. Unser erfahrenes Team sorgt dafür, dass Ihre Flächen täglich, wöchentlich oder nach individuellem Turnus in makellosem Zustand sind — zuverlässig, effizient und diskret."
                features={[
                    'Flexible Reinigungsintervalle',
                    'Protokollierte Qualitätskontrolle',
                    'Eigene, zertifizierte Reinigungsmittel',
                    'Fester Ansprechpartner für Ihr Objekt',
                ]}
                image="/images/service-unterhaltsreinigung.png.png"
                imageRight={false}
                bg="var(--white)"
            />
            <ServiceVariantsBlock
                title="Unterhaltsreinigung Varianten"
                items={SCENE_VARIANTS.unterhalt}
            />

            {/* 02 — Glasreinigung */}
            <ServiceSection
                id="glasreinigung"
                number="02 / Glasreinigung"
                title="Glasreinigung"
                headline="Streifenfrei. Immer."
                body="Streifenfreie Glasreinigung für Fassaden, Fenster, Trennwände und Dachlichter. Mit professionellem Equipment und Abseiltechnik auch für schwer erreichbare Glasflächen — innen wie außen, vom Keller bis zum Dach."
                features={[
                    'Innen- und Außenreinigung',
                    'Rahmen und Dichtungen inklusive',
                    'Abseiltechnik für Hochhäuser',
                    'Regelmäßige Wartungsverträge',
                ]}
                image="/images/service-glasreinigung.png.png"
                imageRight={true}
                bg="var(--off-white)"
            />
            <ServiceVariantsBlock title="Glasreinigung Varianten" items={SCENE_VARIANTS.glas} />

            {/* 03 — Grundreinigung (full-width dark) */}
            <FullWidthServiceSection
                id="grundreinigung"
                number="03 / Grundreinigung"
                title="Grundreinigung"
                headline="Wenn Sauberkeit neu beginnt."
                body="Intensive Tiefenreinigung für jeden Anlass — ob Einzug, Auszug, Umbau oder besonderer Hygienebedarf. Wir reinigen bis in den letzten Winkel und hinterlassen Flächen, die wie neu wirken."
                bg="var(--dark)"
                image="/images/service-grundreinigung.png.png"
                imageOpacity={0.08}
            />
            <ServiceVariantsBlock title="Grundreinigung Varianten" items={SCENE_VARIANTS.grund} />

            {/* 04 — Büroreinigung */}
            <ServiceSection
                id="bueroreinigung"
                number="04 / Büroreinigung"
                title="Büroreinigung"
                headline="Ihr Arbeitsplatz. Perfekt."
                body="Sauberkeit am Arbeitsplatz steigert Wohlbefinden und Produktivität. Unser Büroreinigungsservice umfasst alle Arbeitsflächen, Sanitäranlagen, Küchen und Gemeinschaftsbereiche — gründlich und rücksichtsvoll."
                features={[
                    'Schreibtische, Bildschirme, Tastaturen',
                    'Küche und Aufenthaltsräume',
                    'Sanitäranlagen vollständig',
                    'Auf Wunsch außerhalb der Bürozeiten',
                ]}
                image="/images/service-detail-buero.jpg"
                imageRight={false}
                bg="var(--white)"
            />

            {/* 05 — Treppenhausreinigung */}
            <ServiceSection
                id="treppenhaus"
                number="05 / Treppenhausreinigung"
                title="Treppenhausreinigung"
                headline="Repräsentativ auf allen Etagen."
                body="Der erste Eindruck entscheidet. Saubere Treppenhäuser, Aufzüge und Gemeinschaftsflächen signalisieren Professionalität und Fürsorge — für Mieter, Mitarbeiter und Gäste gleichermaßen."
                features={[
                    'Stufen, Geländer, Wände und Fenster',
                    'Aufzugkabinen und Briefkastenbereich',
                    'Kellerzugänge und Tiefgaragen',
                    'Wöchentliche oder zweiwöchentliche Intervalle',
                ]}
                image="/images/service-treppenhaus.png.png"
                imageRight={true}
                bg="var(--off-white)"
            />
            <ServiceVariantsBlock
                title="Treppenhaus Varianten"
                items={SCENE_VARIANTS.treppenhaus}
            />

            {/* 06 — Außenanlagen (full-width blue) */}
            <FullWidthServiceSection
                id="aussenanlagen"
                number="06 / Außenanlagen"
                title="Außenanlagen"
                headline="Sauberkeit, die man sieht."
                body="Eingänge, Parkflächen, Gehwege und Grünanlagen — auch das Außengelände repräsentiert Ihr Unternehmen. Wir sorgen dafür, dass der erste Eindruck immer stimmt, in jeder Jahreszeit."
                bg="var(--blue)"
                image="/images/service-aussenanlagen.jpg"
                imageOpacity={0.12}
            />

            {/* Process Timeline */}
            <ProcessTimeline />

            {/* Pricing */}
            <PricingSection />
        </>
    );
}
