import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2FoundationProps = {
  locale?: Locale;
};

/**
 * Puente “no es un chat genérico”: memoria, técnicas, entre sesiones.
 * Credenciales humanas — tres señales de prueba, sin muro de métricas SaaS.
 */
export default function HomeV2Foundation({ locale = 'es' }: HomeV2FoundationProps) {
  const { foundation } = getHomeV2Copy(locale);
  const proofAria = locale === 'en' ? 'Trust signals' : 'Señales de confianza';

  return (
    <section
      className="home-v2-foundation"
      aria-labelledby="home-v2-foundation-title"
      data-fade-section
    >
      <div className="home-landing-container">
        <div className="home-v2-foundation__head reveal-on-scroll">
          <h2 id="home-v2-foundation-title" className="home-v2-foundation__title">
            {foundation.title}
          </h2>
          <p className="home-v2-foundation__support">{foundation.support}</p>
        </div>
        <ul className="home-v2-foundation__list">
          {foundation.pillars.map((pillar) => (
            <li key={pillar.title} className="home-v2-foundation__item reveal-on-scroll" data-stagger-item>
              <h3 className="home-v2-foundation__item-title">{pillar.title}</h3>
              <p className="home-v2-foundation__item-body">{pillar.body}</p>
            </li>
          ))}
        </ul>
        <ul
          className="home-v2-foundation__proof reveal-on-scroll"
          aria-label={proofAria}
        >
          {foundation.proofSignals.map((signal) => (
            <li key={`${signal.value}-${signal.label}`} className="home-v2-foundation__proof-item">
              <span className="home-v2-foundation__proof-value">{signal.value}</span>
              <span className="home-v2-foundation__proof-label">{signal.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
