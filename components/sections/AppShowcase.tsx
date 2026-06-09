'use client';

import Image from 'next/image';
import MultilineText from '@/components/ui/MultilineText';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getAppScreenshotAlt,
  getAppScreenshotPath,
} from '@/lib/assets/app-screenshots';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type AppShowcaseProps = {
  locale?: Locale;
};

export default function AppShowcase({ locale = 'es' }: AppShowcaseProps) {
  const copy = getHomeSectionsCopy(locale).appShowcase;

  return (
    <section id="la-app" className="app-showcase app-showcase--premium" data-fade-section aria-labelledby="la-app-title">
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-text">
            <p className="showcase-label reveal-on-scroll">{copy.label}</p>
            <h2 className="section-title showcase-headline reveal-on-scroll" id="la-app-title">
              <MultilineText text={copy.title} />
            </h2>
            <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
            <p className="showcase-description reveal-on-scroll">{copy.description}</p>
          </div>
          <div className="showcase-image-wrapper">
            <div className="showcase-screenshot-crop">
              <Image
                src={getAppScreenshotPath('home')}
                alt={getAppScreenshotAlt('home', locale)}
                className="showcase-screenshot showcase-screenshot--crop"
                width={APP_SCREENSHOT_WIDTH}
                height={APP_SCREENSHOT_HEIGHT}
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
