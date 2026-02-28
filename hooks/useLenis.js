'use client';

import { createContext, useContext, useRef, useEffect, useState } from 'react';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
    const [lenis, setLenis] = useState(null);
    const reqRef = useRef(null);

    useEffect(() => {
        // Disable on mobile or prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;

        if (prefersReduced || isMobile) return;

        let lenisInstance;

        (async () => {
            const Lenis = (await import('lenis')).default;
            lenisInstance = new Lenis({
                lerp: 0.08,
                duration: 1.4,
                smoothWheel: true,
            });

            setLenis(lenisInstance);

            function raf(time) {
                lenisInstance.raf(time);
                reqRef.current = requestAnimationFrame(raf);
            }

            reqRef.current = requestAnimationFrame(raf);
        })();

        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
            if (lenisInstance) lenisInstance.destroy();
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
}

export default function useLenis() {
    return useContext(LenisContext);
}
