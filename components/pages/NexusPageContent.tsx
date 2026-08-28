'use client';

import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getNexusPageCopy } from '@/lib/i18n/copy/pages/nexus';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import NexusNav from '@/components/nexus/NexusNav';
import NexusStatus from '@/components/nexus/NexusStatus';
import '@/styles/pages/home-landing-final.css';
import '@/styles/components/nexus.css';

const NexusOrganism = dynamic(() => import('@/components/nexus/NexusOrganism'), {
  ssr: false,
  loading: () => (
    <div className="nexus-organism">
      <div className="nexus-organism__fallback" aria-hidden="true" />
    </div>
  ),
});

type NexusPageContentProps = {
  locale: Locale;
};

const CONTRACT = `THESIS: Anto's intelligence as a living suspended field, not a brain diagram and not three lobes.
OWN-WORLD: Near-black navy, Inter/SF, teal chrome; Psyche/Persona/Cortex only inside the GPU field; sparse event chips.
STORY: Conversations shape a system that understands you; try Anto.
FIRST VIEWPORT: 36/64 split, copy left, organism right, CTA in nav only.
FORM: brief-pinned cinematic organism.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function NexusPageContent({ locale }: NexusPageContentProps) {
  const copy = getNexusPageCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <div className="nexus-page">
        <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: `<!-- ${CONTRACT} -->` }} />
        <ClientInitializer />
        <a className="nexus-skip" href="#main-content">
          {copy.skip}
        </a>
        <NexusNav locale={locale} copy={copy.nav} />
        <main id="main-content" lang={locale}>
          <section className="nexus-hero" aria-labelledby="nexus-title">
            <div className="nexus-copy">
              <p className="nexus-eyebrow">{copy.hero.eyebrow}</p>
              <h1 id="nexus-title" className="nexus-title">
                <span className="nexus-title__line">{copy.hero.line1}</span>
                <span className="nexus-title__line">{copy.hero.line2}</span>
                <span className="nexus-title__line">
                  {copy.hero.line3Prefix}
                  <span className="nexus-highlight">{copy.hero.highlight}</span>
                </span>
              </h1>
              <p className="nexus-support">
                {copy.hero.supportLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <NexusStatus copy={copy.status} />
            </div>
            <div className="nexus-stage">
              <NexusOrganism events={copy.events} label={copy.organismAria} />
            </div>
          </section>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/nexus" />
        <CookieConsent
          compact
          bannerDelayMs={8000}
          showAfterScrollPx={900}
          mobileBannerDelayMs={12000}
          mobileShowAfterScrollPx={1600}
        />
      </div>
    </LocaleProvider>
  );
}
