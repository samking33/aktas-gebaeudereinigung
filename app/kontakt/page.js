// Note: page-level metadata is exported from metadata.js in this directory
'use client';


import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SplitHeading from '@/components/SplitHeading';
import ClipReveal from '@/components/ClipReveal';
import MagneticButton from '@/components/MagneticButton';
import ParallaxImage from '@/components/ParallaxImage';
import { PhoneIcon, EmailIcon, LocationIcon } from '@/components/icons/ContactIcons';
import SectionShell from '@/components/ui/SectionShell';
import VariantStrip from '@/components/ui/VariantStrip';
import { SCENE_VARIANTS } from '@/lib/imageManifest';

/* ─── Floating Label Field ──────────────────────────── */
function FloatingField({
    label,
    type = 'text',
    value,
    onChange,
    textarea = false,
    id,
    required = false,
    autoComplete,
}) {
    const [focused, setFocused] = useState(false);
    const lifted = focused || value.length > 0;

    const sharedStyle = {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '24px 0 10px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        color: 'var(--dark)',
        resize: 'none',
        display: 'block',
    };

    return (
        <div style={{
            position: 'relative',
            borderBottom: `1.5px solid ${focused ? 'var(--blue)' : 'var(--grey-200)'}`,
            marginBottom: '32px',
            transition: 'border-color 0.25s',
        }}>
            <motion.label
                htmlFor={id}
                animate={{
                    y: lifted ? -20 : 0,
                    scale: lifted ? 0.85 : 1,
                    color: lifted ? 'var(--teal)' : 'var(--text-muted-light)',
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    top: '16px',
                    left: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    pointerEvents: 'none',
                    transformOrigin: 'left center',
                    display: 'block',
                }}
            >
                {label}
            </motion.label>

            {textarea ? (
                <textarea
                    id={id}
                    rows={4}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={sharedStyle}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={sharedStyle}
                />
            )}
        </div>
    );
}

/* ─── Custom Dropdown ───────────────────────────────── */
const SERVICE_OPTIONS = [
    'Unterhaltsreinigung',
    'Glasreinigung',
    'Grundreinigung',
    'Büroreinigung',
    'Sonstiges',
];

function ServiceDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const lifted = open || value.length > 0;
    const listboxId = 'service-dropdown-options';
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const onClickOutside = (event) => {
            if (!dropdownRef.current?.contains(event.target)) setOpen(false);
        };

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', onClickOutside);
        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('mousedown', onClickOutside);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', marginBottom: '32px' }}>
            <button
                type="button"
                style={{
                    position: 'relative',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1.5px solid ${open ? 'var(--blue)' : 'var(--grey-200)'}`,
                    transition: 'border-color 0.25s',
                    cursor: 'pointer',
                }}
                onClick={() => setOpen(o => !o)}
                data-cursor="link"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
            >
                <motion.div
                    animate={{
                        y: lifted ? -20 : 0,
                        scale: lifted ? 0.85 : 1,
                        color: lifted ? 'var(--teal)' : 'var(--text-muted-light)',
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        left: 0,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        pointerEvents: 'none',
                        transformOrigin: 'left center',
                    }}
                >
                    Gewünschte Leistung
                </motion.div>
                <div style={{
                    padding: '24px 0 10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body)',
                    color: value ? 'var(--dark)' : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {value || 'Bitte auswählen'}
                    <motion.span
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ color: 'var(--text-muted-light)', fontSize: '0.8rem', flexShrink: 0 }}
                    >
                        ↓
                    </motion.span>
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id={listboxId}
                        role="listbox"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'var(--white)',
                            border: '1px solid var(--grey-200)',
                            zIndex: 50,
                            overflow: 'hidden',
                        }}
                    >
                        {SERVICE_OPTIONS.map(opt => (
                            <button
                                type="button"
                                role="option"
                                aria-selected={value === opt}
                                key={opt}
                                onClick={() => { onChange(opt); setOpen(false); }}
                                className="select-option"
                                data-cursor="link"
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    border: 'none',
                                    background: value === opt ? 'var(--off-white)' : 'transparent',
                                    padding: '14px 16px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'var(--text-body)',
                                    color: value === opt ? 'var(--blue)' : 'var(--grey-600)',
                                    cursor: 'pointer',
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Spinner SVG ───────────────────────────────────── */
function Spinner() {
    return (
        <motion.svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <motion.circle
                cx="10" cy="10" r="8"
                stroke="var(--teal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="50"
                animate={{ strokeDashoffset: [50, 0, -50] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
        </motion.svg>
    );
}

/* ─── Contact Form ──────────────────────────────────── */
function ContactForm() {
    const [fields, setFields] = useState({
        name: '', company: '', email: '', phone: '', service: '', message: '',
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success
    const timeoutRef = useRef(null);

    const set = (key) => (e) => {
        const val = typeof e === 'string' ? e : e.target.value;
        setFields(f => ({ ...f, [key]: val }));
    };

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (!fields.name || !fields.email || !fields.message) return;
        setStatus('loading');
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setStatus('success'), 1200);
    }, [fields]);

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: 'var(--white)',
                padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
            }}
        >
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--teal)',
                marginBottom: '8px',
            }}>
                02 — Anfrage senden
            </div>
            <div style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '2rem',
                color: 'var(--dark)',
                marginBottom: '4px',
            }}>
                Kostenloses Angebot
            </div>
            <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-muted-light)',
                marginBottom: '48px',
            }}>
                Wir antworten innerhalb von 24 Stunden.
            </div>

            <FloatingField id="name" label="Ihr Name *" required autoComplete="name" value={fields.name} onChange={set('name')} />
            <FloatingField id="company" label="Unternehmen" autoComplete="organization" value={fields.company} onChange={set('company')} />
            <FloatingField id="email" label="E-Mail-Adresse *" type="email" required autoComplete="email" value={fields.email} onChange={set('email')} />
            <FloatingField id="phone" label="Telefonnummer" type="tel" autoComplete="tel" value={fields.phone} onChange={set('phone')} />
            <ServiceDropdown value={fields.service} onChange={set('service')} />
            <FloatingField id="message" label="Ihre Nachricht *" required value={fields.message} onChange={set('message')} textarea />

            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--text-muted-light)',
                marginBottom: '32px',
                lineHeight: 1.6,
            }}>
                Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
            </p>

            <div style={{ width: '100%' }}>
                <MagneticButton
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`btn-submit-full ${status === 'success' ? 'btn-success' : ''}`}
                >
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.span key="idle"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white' }}
                            >
                                Anfrage absenden
                            </motion.span>
                        )}
                        {status === 'loading' && (
                            <motion.span key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}
                            >
                                <Spinner /> Wird gesendet…
                            </motion.span>
                        )}
                        {status === 'success' && (
                            <motion.span key="success"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                            >
                                ✓ Anfrage erfolgreich versendet
                            </motion.span>
                        )}
                    </AnimatePresence>
                </MagneticButton>
            </div>
            <span className="sr-only" aria-live="polite">
                {status === 'success' ? 'Anfrage erfolgreich versendet' : ''}
            </span>
        </motion.form>
    );
}

/* ─── Contact Info Column ───────────────────────────── */
const CONTACT_ITEMS = [
    {
        icon: <PhoneIcon color="var(--blue)" />,
        label: 'Telefon',
        main: '06101 / 98 611 63',
        secondary: '0177 / 650 772 8',
        href: 'tel:+4961019861163',
    },
    {
        icon: <EmailIcon color="var(--blue)" />,
        label: 'E-Mail',
        main: 'info@m-aktas.de',
        href: 'mailto:info@m-aktas.de',
    },
    {
        icon: <LocationIcon color="var(--blue)" />,
        label: 'Adresse',
        main: 'Friedrich-Ebert-Str. 47',
        secondary: '61118 Bad Vilbel, Deutschland',
    },
];

const HOURS = [
    { day: 'Montag – Freitag', time: '07:00 – 20:00 Uhr', highlight: false },
    { day: 'Samstag', time: '08:00 – 16:00 Uhr', highlight: false },
    { day: 'Notfallservice', time: '24/7 · 0177 / 650 772 8', highlight: true },
];

function ContactInfo() {
    return (
        <div style={{
            background: 'var(--off-white)',
            padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)',
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
                    01 — Direkt Kontakt
                </div>
            </ClipReveal>

            <SplitHeading text="Wir sind für Sie da." tag="h2" delay={0.1} />

            <ClipReveal delay={0.25}>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body)',
                    color: 'var(--grey-600)',
                    lineHeight: 1.85,
                    maxWidth: '420px',
                    marginTop: '24px',
                    marginBottom: '40px',
                }}>
                    Ob erste Anfrage, laufender Auftrag oder eine Frage — unser Team antwortet
                    schnell und persönlich. Kontaktieren Sie uns auf dem Weg, der Ihnen am
                    angenehmsten ist.
                </p>
            </ClipReveal>

            {/* Contact items */}
            {CONTACT_ITEMS.map((item, i) => (
                <ClipReveal key={item.label} delay={0.1 * i}>
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'flex-start',
                        paddingBlock: '28px',
                        borderBottom: '1px solid var(--grey-200)',
                    }}>
                        <div style={{ flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                color: 'var(--text-muted-light)',
                                marginBottom: '6px',
                            }}>
                                {item.label}
                            </div>
                            {item.href ? (
                                <a href={item.href} data-cursor="link" className="field-link" style={{
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 600,
                                    fontSize: 'var(--text-body)',
                                    display: 'block',
                                }}
                                >
                                    {item.main}
                                </a>
                            ) : (
                                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-body)', color: 'var(--dark)' }}>
                                    {item.main}
                                </div>
                            )}
                            {item.secondary && (
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted-light)', marginTop: '2px' }}>
                                    {item.secondary}
                                </div>
                            )}
                        </div>
                    </div>
                </ClipReveal>
            ))}

            {/* Atmospheric insert image */}
            <ClipReveal delay={0.2}>
                <div style={{
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBlock: '40px',
                }}
                    data-cursor="image"
                >
                    <Image
                        src="/images/service-sonderreinigung.png.png"
                        alt=""
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        aria-hidden="true"
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,181,160,0.05)',
                        mixBlendMode: 'color',
                    }} />
                </div>
            </ClipReveal>

            {/* Öffnungszeiten */}
            <ClipReveal delay={0.1}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: 'var(--teal)',
                    borderLeft: '2px solid var(--teal)',
                    paddingLeft: '16px',
                    marginBottom: '20px',
                }}>
                    Erreichbarkeit
                </div>
            </ClipReveal>

            {HOURS.map((row) => (
                <ClipReveal key={row.day} delay={0.1}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBlock: '14px',
                        borderBottom: '1px solid var(--grey-200)',
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-body)',
                            color: row.highlight ? 'var(--teal)' : 'var(--dark)',
                        }}>
                            {row.day}
                        </span>
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-body)',
                            color: row.highlight ? 'var(--teal)' : 'var(--grey-600)',
                            textAlign: 'right',
                        }}>
                            {row.time}
                        </span>
                    </div>
                </ClipReveal>
            ))}
        </div>
    );
}

/* ─── Map Section ───────────────────────────────────── */
function MapSection() {
    return (
        <section className="map-section" style={{
            height: '380px',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--dark)',
        }}>
            {/* Aerial image */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image
                    src="/images/bad-vilbel-aerial.jpg"
                    alt="Bad Vilbel Luftbild"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', opacity: 0.35 }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(13,17,23,0.75)',
                }} />
            </div>

            {/* SVG city grid overlay */}
            <svg
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
            >
                {/* Irregular grid lines */}
                <line x1="15%" y1="0" x2="22%" y2="100%" stroke="rgba(0,181,160,0.08)" strokeWidth="1" />
                <line x1="38%" y1="0" x2="45%" y2="100%" stroke="rgba(0,181,160,0.08)" strokeWidth="1" />
                <line x1="63%" y1="0" x2="58%" y2="100%" stroke="rgba(0,181,160,0.08)" strokeWidth="1" />
                <line x1="82%" y1="0" x2="88%" y2="100%" stroke="rgba(0,181,160,0.08)" strokeWidth="1" />
                <line x1="0" y1="30%" x2="100%" y2="25%" stroke="rgba(0,181,160,0.06)" strokeWidth="1" />
                <line x1="0" y1="65%" x2="100%" y2="72%" stroke="rgba(0,181,160,0.06)" strokeWidth="1" />
                {/* Block rectangles */}
                <rect x="10%" y="15%" width="12%" height="20%" fill="rgba(0,181,160,0.04)" />
                <rect x="55%" y="50%" width="18%" height="15%" fill="rgba(0,181,160,0.04)" />
                <rect x="72%" y="10%" width="10%" height="30%" fill="rgba(0,181,160,0.03)" />
            </svg>

            {/* Center content */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Pulsing marker */}
                <div style={{ position: 'relative', width: '60px', height: '60px', marginBottom: '20px' }}>
                    {/* Outer ring */}
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            border: '1px solid var(--teal)',
                            borderRadius: '50%',
                        }}
                    />
                    {/* Inner dot */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '12px',
                        height: '12px',
                        background: 'var(--teal)',
                        borderRadius: '50%',
                    }} />
                </div>

                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'white',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                }}>
                    AKTAS Gebäudereinigung GmbH
                </div>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    color: 'var(--text-muted-dark)',
                    letterSpacing: '0.1em',
                }}>
                    Friedrich-Ebert-Str. 47 · 61118 Bad Vilbel
                </div>
            </div>

            {/* Google Maps link — bottom right */}
            <a
                href="https://maps.google.com/?q=Friedrich-Ebert-Str.+47+Bad+Vilbel"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: 'var(--container-padding)',
                    zIndex: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    color: 'var(--teal)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    transition: 'opacity 0.3s',
                }}
            >
                In Google Maps öffnen →
            </a>
        </section>
    );
}

/* ─── Secondary CTA Bar ─────────────────────────────── */
function CTABar() {
    return (
        <section className="cta-bar" style={{
            background: 'var(--teal)',
            padding: '80px var(--container-padding)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
        }}>
            <div>
                <ClipReveal delay={0}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-label)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: 'var(--text-muted-dark-strong)',
                        marginBottom: '12px',
                    }}>
                        Sofort erreichbar
                    </div>
                </ClipReveal>
                <ClipReveal delay={0.1}>
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: 'white',
                        lineHeight: 1,
                    }}>
                        06101 / 98 611 63
                    </div>
                </ClipReveal>
            </div>

            <ClipReveal delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <MagneticButton href="tel:+4961019861163" className="btn-outline-white">
                        <span style={{ color: 'white', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                            Jetzt anrufen
                        </span>
                    </MagneticButton>
                    <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted-dark-strong)',
                    }}>
                        Mo–Fr 07:00 – 20:00 Uhr
                    </span>
                </div>
            </ClipReveal>
        </section>
    );
}

function ContactVariantSection() {
    return (
        <SectionShell
            style={{
                background: 'var(--off-white)',
                padding: 0,
            }}
        >
            <VariantStrip
                title="Sonder- und Kontaktvarianten"
                items={SCENE_VARIANTS.sonder}
                compact
                columns={2}
            />
        </SectionShell>
    );
}

/* ─── KONTAKT PAGE ──────────────────────────────────── */
export default function KontaktPage() {
    return (
        <div className="page-content is-visible">

            {/* Section 1 — Hero */}
            <section style={{ height: '60svh', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <ParallaxImage
                        src="/images/kontakt-hero.jpg"
                        alt="AKTAS Empfangshalle"
                        speed={0.25}
                        priority
                        width={1920}
                        height={900}
                        sizes="100vw"
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(13,17,23,0.75), rgba(13,17,23,0.5))',
                    }} />
                </div>
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
                            marginBottom: '20px',
                        }}>
                            Kontakt · AKTAS Gebäudereinigung
                        </div>
                    </ClipReveal>
                    <SplitHeading
                        text="Lassen Sie uns sprechen."
                        tag="h1"
                        delay={0.3}
                        className="atmospheric-heading"
                    />
                </div>
            </section>

            {/* Section 2 — Split: Info + Form */}
            <section className="contact-split" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                minHeight: '90vh',
            }}>
                <ContactInfo />
                <ContactForm />
            </section>

            <ContactVariantSection />

            {/* Section 3 — Map */}
            <MapSection />

            {/* Section 4 — CTA Bar */}
            <CTABar />

        </div>
    );
}
