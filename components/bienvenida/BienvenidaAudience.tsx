import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaAudienceProps = {
  copy: BienvenidaCopy['audience'];
};

export default function BienvenidaAudience({ copy }: BienvenidaAudienceProps) {
  return (
    <section className="lad-audience lad-section--anchor" aria-labelledby="lad-audience-title">
      <h2 id="lad-audience-title" className="lad-audience-title">
        {copy.sectionTitle}
      </h2>
      <ul className="lad-audience-list">
        {copy.items.map((item) => (
          <li key={item.title} className="lad-audience-card">
            <h3 className="lad-audience-card-title">{item.title}</h3>
            <p className="lad-audience-card-text">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
