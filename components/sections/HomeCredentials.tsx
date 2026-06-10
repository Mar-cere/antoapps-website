'use client';

import MultilineText from '@/components/ui/MultilineText';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeCredentialsProps = {
  locale?: Locale;
};

export default function HomeCredentials({ locale = 'es' }: HomeCredentialsProps) {
  const copy = getHomeLandingFinalCopy(locale).credentials;

  return (
    <section className="home-landing-cred" aria-labelledby="home-cred-title" data-fade-section>
      <div className="home-landing-cred__head reveal-on-scroll">
        <p className="home-landing-eyebrow">{copy.eyebrow}</p>
        <h2 id="home-cred-title" className="home-landing-cred__title">
          <MultilineText text={copy.title} />
        </h2>
        <p className="home-landing-cred__sub">{copy.subtitle}</p>
      </div>
      <div className="home-landing-cred__stats">
        {copy.stats.map((stat) => (
          <div key={stat.label} className="home-landing-cred__card reveal-on-scroll" data-stagger-item>
            <p className="home-landing-cred__num">{stat.value}</p>
            <p className="home-landing-cred__desc">{stat.label}</p>
            <p className="home-landing-cred__detail">{stat.detail}</p>
          </div>
        ))}
      </div>
      <div className="home-landing-cred__proto-grid">
        {copy.protocols.map((proto) => (
          <div key={proto.title} className="home-landing-cred__proto reveal-on-scroll" data-stagger-item>
            <div className="home-landing-cred__proto-icon" aria-hidden="true">
              <span className="home-landing-cred__proto-dot" />
            </div>
            <div>
              <p className="home-landing-cred__proto-t">{proto.title}</p>
              <p className="home-landing-cred__proto-s">{proto.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
