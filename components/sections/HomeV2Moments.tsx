'use client';

import Image from 'next/image';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getHomeLandingScreenshotAlt,
  getHomeLandingScreenshotPath,
} from '@/lib/assets/app-screenshots';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2MomentsProps = {
  locale?: Locale;
};

/** Filas producto al ritmo del home actual; copy más humano, sin tags. */
export default function HomeV2Moments({ locale = 'es' }: HomeV2MomentsProps) {
  const moments = getHomeV2Copy(locale).moments;

  return (
    <div className="home-v2-moments">
      {moments.map((moment, index) => (
        <div key={moment.id}>
          {index > 0 && <div className="home-landing-sep" aria-hidden="true" />}
          <section
            className={`home-v2-moment ${moment.reverse ? 'home-v2-moment--reverse' : ''}`}
            aria-labelledby={`home-v2-moment-${moment.id}`}
            data-fade-section
          >
            <div className="home-landing-container home-v2-moment__grid">
              <div className="home-v2-moment__text reveal-on-scroll home-v2-motion-text">
                <h2 id={`home-v2-moment-${moment.id}`} className="home-v2-moment__title">
                  {moment.title}
                </h2>
                <p className="home-v2-moment__body">{moment.body}</p>
              </div>
              <div className="home-v2-moment__media reveal-on-scroll home-v2-motion-media">
                <Image
                  src={getHomeLandingScreenshotPath(moment.screenshot)}
                  alt={getHomeLandingScreenshotAlt(moment.screenshot, locale)}
                  width={APP_SCREENSHOT_WIDTH}
                  height={APP_SCREENSHOT_HEIGHT}
                  className="home-v2-moment__img"
                  quality={95}
                  sizes="(max-width: 899px) 60vw, 19rem"
                />
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
