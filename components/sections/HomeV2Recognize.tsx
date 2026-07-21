import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

type HomeV2RecognizeProps = {
  locale?: Locale;
};

/** Un solo bloque emocional: foto fuerte + reconocimiento. */
export default function HomeV2Recognize({ locale = 'es' }: HomeV2RecognizeProps) {
  const copy = getHomeV2Copy(locale).recognize;

  return (
    <section className="home-v2-recognize" aria-labelledby="home-v2-recognize-title" data-fade-section>
      <div className="home-landing-container home-v2-recognize__grid">
        <div className="home-v2-recognize__media home-v2-motion-media">
          <Image
            src={getEditorialImagePath('deskRain')}
            alt={copy.imageAlt}
            width={1600}
            height={900}
            className="home-v2-recognize__img"
            sizes="(max-width: 899px) 100vw, 58vw"
            quality={85}
          />
        </div>
        <div className="home-v2-recognize__text home-v2-motion-text">
          <h2 id="home-v2-recognize-title" className="home-v2-recognize__lead">
            {copy.lead}
          </h2>
          <p className="home-v2-recognize__body">{copy.body}</p>
        </div>
      </div>
    </section>
  );
}
