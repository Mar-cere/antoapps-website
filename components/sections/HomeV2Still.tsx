import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2StillProps = {
  locale?: Locale;
};

/**
 * Pausa fotográfica editorial entre producto y prueba social.
 * Una foto, una línea — respira el ritmo de revista.
 */
export default function HomeV2Still({ locale = 'es' }: HomeV2StillProps) {
  const { still } = getHomeV2Copy(locale);

  return (
    <section className="home-v2-still" aria-labelledby="home-v2-still-line" data-fade-section>
      <div className="home-v2-still__media">
        <Image
          src={getEditorialImagePath('morningPause')}
          alt={still.imageAlt}
          fill
          className="home-v2-still__img"
          sizes="100vw"
          quality={85}
        />
        <div className="home-v2-still__scrim" aria-hidden="true" />
      </div>
      <div className="home-landing-container home-v2-still__inner">
        <p id="home-v2-still-line" className="home-v2-still__line reveal-on-scroll">
          {still.line}
        </p>
      </div>
    </section>
  );
}
