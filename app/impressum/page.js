export const metadata = {
  title: 'Impressum',
  description: 'Impressum der AKTAS Gebäudereinigung GmbH.',
};

export default function ImpressumPage() {
  return (
    <section className="section" style={{ background: 'var(--off-white)', minHeight: '80vh', paddingTop: 'calc(var(--section-padding) + var(--nav-height))' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'grid', gap: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-heading)', color: 'var(--dark)' }}>Impressum</h1>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--grey-600)', lineHeight: 1.8 }}>
          Angaben gemäß § 5 TMG.
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-2)', color: 'var(--dark)' }}>
          <strong>AKTAS Gebäudereinigung GmbH</strong>
          <span>Friedrich-Ebert-Str. 47</span>
          <span>61118 Bad Vilbel</span>
          <span>Deutschland</span>
        </div>

        <div style={{ display: 'grid', gap: 'var(--space-2)', color: 'var(--dark)' }}>
          <strong>Kontakt</strong>
          <a href="tel:+4961019861163" className="field-link">06101 / 98 611 63</a>
          <a href="mailto:info@m-aktas.de" className="field-link">info@m-aktas.de</a>
        </div>

        <p style={{ fontSize: 'var(--text-body)', color: 'var(--grey-600)', lineHeight: 1.8 }}>
          Diese Seite dient als Basis-Impressum. Rechtliche Inhalte sollten vor Veröffentlichung von einer qualifizierten Rechtsberatung geprüft werden.
        </p>
      </div>
    </section>
  );
}
