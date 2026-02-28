export const metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzhinweise der AKTAS Gebäudereinigung GmbH.',
};

export default function DatenschutzPage() {
  return (
    <section className="section" style={{ background: 'var(--white)', minHeight: '80vh', paddingTop: 'calc(var(--section-padding) + var(--nav-height))' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', display: 'grid', gap: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-heading)', color: 'var(--dark)' }}>Datenschutz</h1>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--grey-600)', lineHeight: 1.8 }}>
          Der Schutz Ihrer personenbezogenen Daten hat für AKTAS Gebäudereinigung GmbH hohe Priorität.
        </p>

        <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontStyle: 'normal', color: 'var(--dark)' }}>Verantwortliche Stelle</h2>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--grey-600)', lineHeight: 1.8 }}>
          AKTAS Gebäudereinigung GmbH, Friedrich-Ebert-Str. 47, 61118 Bad Vilbel,
          <a href="mailto:info@m-aktas.de" className="field-link" style={{ marginLeft: '0.4ch' }}>info@m-aktas.de</a>
        </p>

        <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontStyle: 'normal', color: 'var(--dark)' }}>Hinweis</h2>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--grey-600)', lineHeight: 1.8 }}>
          Diese Seite ist eine technische Platzhalter-Version, damit die Navigation vollständig funktionsfähig ist.
          Vor Livegang sollten vollständige, rechtlich geprüfte DSGVO-Texte hinterlegt werden.
        </p>
      </div>
    </section>
  );
}
