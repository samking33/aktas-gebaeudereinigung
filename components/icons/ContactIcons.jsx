'use client';

export function PhoneIcon({ size = 24, color = 'currentColor' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M6.5,3 C5.7,3 5,3.7 5,4.5 L5,6.5 C5,9 7,13 9,15 C11,17 15,19 17.5,19 L19.5,19 C20.3,19 21,18.3 21,17.5 L21,15.5 C21,15.5 18.5,14.5 17.5,14.5 L15.5,16.5 C13.5,15.5 11.5,13.5 10.5,11.5 L12.5,9.5 C12.5,8.5 11.5,6 11.5,6 Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function EmailIcon({ size = 24, color = 'currentColor' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="0" stroke={color} strokeWidth="1.5" />
            <polyline points="3,5 12,13 21,5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function LocationIcon({ size = 24, color = 'currentColor' }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12,2 L18,8 C18,13 12,22 12,22 C12,22 6,13 6,8 Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="1.5" />
        </svg>
    );
}
