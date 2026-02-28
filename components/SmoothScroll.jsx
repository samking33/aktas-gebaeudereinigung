'use client';

import { LenisProvider } from '@/hooks/useLenis';

export default function SmoothScroll({ children }) {
    return (
        <LenisProvider>
            {children}
        </LenisProvider>
    );
}
