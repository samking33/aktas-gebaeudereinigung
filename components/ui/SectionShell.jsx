export default function SectionShell({
    as: Tag = 'section',
    className = '',
    style,
    dark = false,
    children,
    id,
}) {
    const classes = ['section-shell', dark ? 'is-dark' : '', className].filter(Boolean).join(' ');

    return (
        <Tag id={id} className={classes} style={style}>
            {children}
        </Tag>
    );
}
