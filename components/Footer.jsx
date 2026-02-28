'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PhoneIcon, EmailIcon, LocationIcon } from '@/components/icons/ContactIcons';

/* ── AKTAS Logo Mark (teal / white version for dark bg) */
function AktasLogoFooter({ size = 48 }) {
    const h = Math.round(size * 0.889);
    return (
        <svg width={size} height={h} viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="18,0 0,32 18,32" fill="#FFFFFF" opacity="0.9" />
            <polygon points="18,0 36,32 18,32" fill="#00B5A0" />
            <polygon points="18,24 10,10 26,10" fill="#0D1117" />
        </svg>
    );
}

/* ── Column fade-up variants ─────────────────────── */
const colVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
};

/* ── Section Label ───────────────────────────────── */
function FooterLabel({ children }) {
    return (
        <div
            style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-label)',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--teal)',
                borderBottom: '1px solid rgba(0,181,160,0.3)',
                paddingBottom: '12px',
                marginBottom: '24px',
            }}
        >
            {children}
        </div>
    );
}

/* ── Footer Link ─────────────────────────────────── */
function FooterLink({ href, children, external = false }) {
    const Tag = external ? 'a' : Link;
    const props = external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href };

    return (
        <motion.div
            whileHover={{ x: 6, color: '#FFFFFF' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
        >
            <Tag
                {...props}
                data-cursor="link"
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted-dark)',
                    display: 'block',
                    paddingBlock: '4px',
                    transition: 'color 0.3s',
                }}
            >
                {children}
            </Tag>
        </motion.div>
    );
}

/* ── Contact Row ─────────────────────────────────── */
function ContactRow({ icon, main, secondary }) {
    return (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ flexShrink: 0, marginTop: '1px' }}>{icon}</div>
            <div>
                <div style={{ color: 'var(--white)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
                    {main}
                </div>
                {secondary && (
                    <div style={{ color: 'var(--text-muted-dark)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                        {secondary}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Main Footer ─────────────────────────────────── */
export default function Footer() {
    const year = new Date().getFullYear();

    const pagesLinks = [
        { href: '/', label: 'Startseite' },
        { href: '/leistungen', label: 'Leistungen' },
        { href: '/kontakt', label: 'Kontakt' },
        { href: '/impressum', label: 'Impressum' },
        { href: '/datenschutz', label: 'Datenschutz' },
    ];

    const serviceLinks = [
        'Unterhaltsreinigung',
        'Glasreinigung',
        'Grundreinigung',
        'Büroreinigung',
        'Außenanlagen',
    ];

    return (
        <footer
            className="dark-section"
            style={{
                position: 'relative',
                background: 'var(--dark)',
                overflow: 'hidden',
                padding: 'clamp(80px, 10vw, 100px) var(--container-padding) 0',
            }}
        >
            {/* ── Atmosphere Background Image (15% opacity) ── */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            >
                <Image
                    src="/images/footer-atmosphere.png"
                    alt=""
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', opacity: 0.35 }}
                    aria-hidden="true"
                    priority={false}
                />
                {/* Dark gradient overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(13,17,23,0.80), rgba(13,17,23,0.60))',
                    }}
                />
            </div>

            {/* ── Content ───────────────────────────── */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* 4-column grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'clamp(40px, 5vw, 80px)',
                        marginBottom: 'clamp(48px, 6vw, 80px)',
                    }}
                >
                    {/* Col 1 — Brand */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={colVariants}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <AktasLogoFooter size={48} />
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                fontStyle: 'italic',
                                color: 'var(--white)',
                                lineHeight: 1,
                                marginBottom: '4px',
                            }}
                        >
                            AKTAS
                        </div>
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-label)',
                                letterSpacing: '0.15em',
                                color: 'var(--text-muted-dark)',
                                textTransform: 'uppercase',
                                marginBottom: '32px',
                            }}
                        >
                            Gebäudereinigung GmbH
                        </div>
                        <p
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontStyle: 'italic',
                                fontSize: '1.1rem',
                                color: 'var(--text-muted-dark)',
                                lineHeight: 1.6,
                                maxWidth: '240px',
                            }}
                        >
                            Mit uns haben Sie immer den Durchblick.
                        </p>
                    </motion.div>

                    {/* Col 2 — Navigation */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={colVariants}
                    >
                        <FooterLabel>Seiten</FooterLabel>
                        <nav style={{ display: 'flex', flexDirection: 'column' }}>
                            {pagesLinks.map((link) => (
                                <FooterLink key={link.href} href={link.href}>
                                    {link.label}
                                </FooterLink>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Col 3 — Leistungen */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={colVariants}
                    >
                        <FooterLabel>Leistungen</FooterLabel>
                        <nav style={{ display: 'flex', flexDirection: 'column' }}>
                            {serviceLinks.map((label) => (
                                <FooterLink key={label} href="/leistungen">
                                    {label}
                                </FooterLink>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Col 4 — Kontakt */}
                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={colVariants}
                    >
                        <FooterLabel>Kontakt</FooterLabel>

                        <ContactRow
                            icon={<PhoneIcon size={20} color="#ffffff" />}
                            main="06101 / 98 611 63"
                            secondary="Büro"
                        />
                        <ContactRow
                            icon={<PhoneIcon size={20} color="#ffffff" />}
                            main="0177 / 650 772 8"
                            secondary="Mobil"
                        />
                        <ContactRow
                            icon={<EmailIcon size={20} color="#ffffff" />}
                            main="info@m-aktas.de"
                        />
                        <ContactRow
                            icon={<LocationIcon size={20} color="#ffffff" />}
                            main="Friedrich-Ebert-Str. 47"
                            secondary="61118 Bad Vilbel"
                        />

                        {/* CTA Link */}
                        <motion.div
                            style={{ marginTop: '24px' }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                href="/kontakt"
                                data-cursor="link"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--teal)',
                                    borderBottom: '1px solid rgba(0,181,160,0.4)',
                                    paddingBottom: '4px',
                                    transition: 'color 0.3s, border-color 0.3s',
                                }}
                            >
                                Jetzt anfragen →
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Divider ───────────────────────────── */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 0 36px' }} />

                {/* ── Bottom Bar ────────────────────────── */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        paddingBottom: '36px',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-label)',
                            letterSpacing: '0.1em',
                            color: 'var(--text-muted-dark)',
                        }}
                    >
                        © {year} AKTAS Gebäudereinigung GmbH — Alle Rechte vorbehalten
                    </span>

                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Impressum', 'Datenschutz'].map((label) => (
                            <motion.div key={label} whileHover={{ color: 'var(--grey-400)' }} transition={{ duration: 0.2 }}>
                                <Link
                                    href={`/${label.toLowerCase()}`}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 'var(--text-label)',
                                        letterSpacing: '0.1em',
                                        color: 'var(--text-muted-dark)',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    {label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
