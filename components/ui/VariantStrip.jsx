'use client';

import MediaFrame from '@/components/ui/MediaFrame';

export default function VariantStrip({
    title,
    items,
    compact = false,
    columns = 3,
}) {
    if (!items?.length) return null;

    const minWidth = compact ? 140 : 220;

    return (
        <div className={`variant-strip ${compact ? 'is-compact' : ''}`} aria-label={title}>
            <div className="variant-strip-head">
                <span className="variant-strip-kicker">Varianten</span>
                <h3>{title}</h3>
            </div>
            <div
                className="variant-strip-grid"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {items.map((item) => (
                    <article key={item.src} className="variant-card">
                        <div style={{ minWidth }}>
                            <MediaFrame
                                src={item.src}
                                alt={item.alt}
                                ratio={compact ? '16 / 10' : '16 / 9'}
                                sizes={compact ? '(max-width: 768px) 50vw, 20vw' : '(max-width: 768px) 100vw, 25vw'}
                                overlay="soft"
                            />
                        </div>
                        <div className="variant-label">{item.src.replace('/images/', '')}</div>
                    </article>
                ))}
            </div>
        </div>
    );
}
