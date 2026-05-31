'use client';

import Image from 'next/image';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

type AppShowcaseProps = {
  locale?: Locale;
};

export default function AppShowcase({ locale = 'es' }: AppShowcaseProps) {
  const copy = getHomeSectionsCopy(locale).appShowcase;

  return (
    <section className="app-showcase" data-fade-section>
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-text">
            <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
            <p className="showcase-description reveal-on-scroll">{copy.description}</p>
          </div>
          <div className="showcase-image-wrapper">
            <div className="phone-mockup-container float-enhanced">
              <Image
                src="/assets/images/hero/phone-mockup-landing.webp"
                alt={copy.imageAlt}
                className="phone-mockup-image"
                width={856}
                height={1346}
                quality={95}
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
