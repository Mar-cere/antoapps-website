'use client';

import Image from 'next/image';
import MultilineText from '@/components/ui/MultilineText';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getHomeLandingScreenshotAlt,
  getHomeLandingScreenshotPath,
} from '@/lib/assets/app-screenshots';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeFeatureShowcaseProps = {
  locale?: Locale;
};

export default function HomeFeatureShowcase({ locale = 'es' }: HomeFeatureShowcaseProps) {
  const copy = getHomeLandingFinalCopy(locale);

  return (
    <div className="home-landing-features">
      {copy.featureRows.map((row, index) => (
        <div key={row.id}>
          {index > 0 && <div className="home-landing-sep" aria-hidden="true" />}
          <section
            className={`home-landing-feature-row ${row.reverse ? 'home-landing-feature-row--reverse' : ''}`}
            id={row.id === 'product' ? 'home-feat-product' : undefined}
            aria-labelledby={`home-feat-${row.id}-title`}
            data-fade-section
          >
            <div className="home-landing-feature-row__text reveal-on-scroll">
              <p className="home-landing-eyebrow">{row.eyebrow}</p>
              <h2 id={`home-feat-${row.id}-title`} className="home-landing-feat-title">
                <MultilineText text={row.titlePrefix} />{' '}
                <em className="home-landing-feat-accent">
                  <MultilineText text={row.titleHighlight} />
                </em>
              </h2>
              <p className="home-landing-feat-sub">{row.subtitle}</p>
              <div className="home-landing-tags">
                {row.tags.map((tag) => (
                  <span key={tag} className="home-landing-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`reveal-on-scroll ${
                row.screenshotCrop
                  ? 'home-landing-screen home-landing-screen--crop'
                  : 'home-landing-screen'
              }`}
              data-stagger-item
            >
              <Image
                src={getHomeLandingScreenshotPath(row.screenshot)}
                alt={getHomeLandingScreenshotAlt(row.screenshot, locale)}
                width={APP_SCREENSHOT_WIDTH}
                height={APP_SCREENSHOT_HEIGHT}
                className="home-landing-screen__img"
                quality={90}
              />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
