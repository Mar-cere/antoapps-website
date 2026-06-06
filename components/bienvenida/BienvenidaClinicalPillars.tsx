import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaClinicalPillarsProps = {
  copy: BienvenidaCopy['clinicalPillars'];
};

function PillarIcon({ type }: { type: 'evidence' | 'crisis' | 'privacy' }) {
  if (type === 'evidence') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'crisis') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 7v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function BienvenidaClinicalPillars({ copy }: BienvenidaClinicalPillarsProps) {
  return (
    <section className="lad-pillars" aria-labelledby="lad-pillars-title">
      <h2 id="lad-pillars-title" className="lad-pillars-title">
        {copy.sectionTitle}
      </h2>
      <ul className="lad-pillars-grid">
        {copy.items.map((pillar) => (
          <li key={pillar.title} className="lad-pillar-card">
            <span className={`lad-pillar-icon lad-pillar-icon--${pillar.icon}`}>
              <PillarIcon type={pillar.icon} />
            </span>
            <h3 className="lad-pillar-heading">{pillar.title}</h3>
            <p className="lad-pillar-text">{pillar.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
