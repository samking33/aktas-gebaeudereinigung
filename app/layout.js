import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionOverlay from '@/components/TransitionOverlay';
import { Cormorant_Garamond, DM_Mono, Manrope } from 'next/font/google';

const displayFont = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-display',
    display: 'swap',
});

const bodyFont = Manrope({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-body',
    display: 'swap',
});

const monoFont = DM_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-mono',
    display: 'swap',
});

/* ─── Site-wide SEO Metadata ────────────────────────── */
export const metadata = {
    metadataBase: new URL('https://www.m-aktas.de'),
    title: {
        default: 'AKTAS Gebäudereinigung GmbH – Bad Vilbel',
        template: '%s | AKTAS Gebäudereinigung',
    },
    description:
        'Professionelle Gebäudereinigung in Bad Vilbel und Frankfurt. Unterhaltsreinigung, Glasreinigung, Grundreinigung – zuverlässig, versichert, mit Festpreisgarantie.',
    keywords: [
        'Gebäudereinigung',
        'Bad Vilbel',
        'Frankfurt',
        'Büroreinigung',
        'Glasreinigung',
        'Grundreinigung',
        'Unterhaltsreinigung',
        'AKTAS',
    ],
    authors: [{ name: 'AKTAS Gebäudereinigung GmbH' }],
    openGraph: {
        title: 'AKTAS Gebäudereinigung GmbH',
        description: 'Mit uns haben Sie immer den Durchblick.',
        url: 'https://www.m-aktas.de',
        siteName: 'AKTAS Gebäudereinigung',
        images: [{ url: '/images/hero-main.jpg', width: 1920, height: 1080 }],
        locale: 'de_DE',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AKTAS Gebäudereinigung GmbH',
        description: 'Professionelle Gebäudereinigung in Bad Vilbel und Frankfurt.',
    },
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://www.m-aktas.de' },
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
                <SmoothScroll>
                    <TransitionOverlay />
                    <CustomCursor />
                    <a href="#main-content" className="skip-link">
                        Zum Inhalt springen
                    </a>
                    <Navbar />
                    <main id="main-content">{children}</main>
                    <Footer />
                </SmoothScroll>
            </body>
        </html>
    );
}
