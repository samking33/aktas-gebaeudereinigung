'use client';

import Image from 'next/image';

export default function MediaFrame({
    src,
    alt,
    ratio = '16 / 10',
    overlay = false,
    priority = false,
    sizes = '(max-width: 768px) 100vw, 33vw',
    decorative = false,
    className = '',
    objectPosition = 'center',
    children,
}) {
    const classes = ['media-frame', className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={{ aspectRatio: ratio }} data-cursor="image">
            <Image
                src={src}
                alt={decorative ? '' : alt}
                fill
                priority={priority}
                loading={priority ? undefined : 'lazy'}
                sizes={sizes}
                aria-hidden={decorative ? 'true' : undefined}
                style={{ objectFit: 'cover', objectPosition }}
            />
            {overlay && <div className={`media-overlay ${overlay === true ? 'soft' : overlay}`} aria-hidden="true" />}
            {children}
        </div>
    );
}
