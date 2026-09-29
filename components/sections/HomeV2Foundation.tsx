import HomeV2ProductFigure from '@/components/sections/HomeV2ProductFigure';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2FoundationProps = {
  locale?: Locale;
  showStep?: boolean;
};

/**
 * Puente “no es un chat genérico”: memoria, técnicas, entre sesiones.
 * Sin franja hero-metric de proof (Sprint B / craft-floor).
 */
export default function HomeV2Foundation({
  locale = 'es',
  showStep = false,
}: HomeV2FoundationProps) {
  const { foundation, product } = getHomeV2Copy(locale);

  return (
    <section
      className={`home-v2-foundation${showStep ? ' home-v2-foundation--with-step' : ''}`}
      aria-labelledby="home-v2-foundation-title"
      data-fade-section
    >
      <div className="home-landing-container home-v2-foundation__layout">
        {showStep ? (
          <HomeV2ProductFigure
            locale={locale}
            kind="step"
            caption={product.stepCaption}
            alt={product.stepAlt}
            frameClassName="home-v2-product--step"
          />
        ) : null}
        <div className="home-v2-foundation__copy">
          <div className="home-v2-foundation__head" data-home-reveal>
            <h2 id="home-v2-foundation-title" className="home-v2-foundation__title">
              {foundation.title}
            </h2>
            <p className="home-v2-foundation__support">{foundation.support}</p>
          </div>
          <ul className="home-v2-foundation__list">
            {foundation.pillars.map((pillar) => (
              <li key={pillar.title} className="home-v2-foundation__item">
                <h3 className="home-v2-foundation__item-title">{pillar.title}</h3>
                <p className="home-v2-foundation__item-body">{pillar.body}</p>
              </li>
            ))}
          </ul>
          <p className="home-v2-foundation__guide">
            <a href={foundation.guide.href}>{foundation.guide.label}</a>
            <span>{foundation.guide.note}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
