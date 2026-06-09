'use client';

import Image from 'next/image';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_KEYS,
  APP_SCREENSHOT_WIDTH,
  getAppScreenshotAlt,
  getAppScreenshotDescription,
  getAppScreenshotLabel,
  getAppScreenshotPath,
  type AppScreenshotKey,
} from '@/lib/assets/app-screenshots';
import type { Locale } from '@/lib/i18n/config';

type AppScreenshotsProps = {
  locale?: Locale;
  title?: string;
  subtitle?: string;
  keys?: readonly AppScreenshotKey[];
  className?: string;
  imageClassName?: string;
};

export default function AppScreenshots({
  locale = 'es',
  title,
  subtitle,
  keys = APP_SCREENSHOT_KEYS,
  className = '',
  imageClassName = 'screenshot-image',
}: AppScreenshotsProps) {
  return (
    <section
      className={`app-screenshots ${className}`.trim()}
      data-fade-section
      aria-labelledby={title ? 'app-screenshots-title' : undefined}
    >
      <div className="container">
        {title && (
          <h2 id="app-screenshots-title" className="section-title reveal-on-scroll">
            {title}
          </h2>
        )}
        {subtitle && <p className="section-subtitle reveal-on-scroll">{subtitle}</p>}
        <div className="screenshots-grid" data-stagger>
          {keys.map((key) => (
            <figure key={key} className="screenshot-card reveal-on-scroll" data-stagger-item>
              <Image
                src={getAppScreenshotPath(key)}
                alt={getAppScreenshotAlt(key, locale)}
                width={APP_SCREENSHOT_WIDTH}
                height={APP_SCREENSHOT_HEIGHT}
                className={imageClassName}
              />
              <figcaption className="screenshot-info">
                <div className="screenshot-label">{getAppScreenshotLabel(key, locale)}</div>
                <p className="screenshot-description">{getAppScreenshotDescription(key, locale)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
