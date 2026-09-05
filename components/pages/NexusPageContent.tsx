'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getNexusPageCopy } from '@/lib/i18n/copy/pages/nexus';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import NexusNav from '@/components/nexus/NexusNav';
import NexusWorld from '@/components/nexus/NexusWorld';
import '@/styles/pages/home-landing-final.css';
import '@/styles/components/nexus.css';

type NexusPageContentProps = {
  locale: Locale;
};

const CONTRACT = `THESIS: Anto's intelligence as a living constellation, not a brain, a cloud, or a particle sphere.
OWN-WORLD: Near-black navy, Inter/SF, teal chrome; plate plus subtle WebGL; glass event cards.
STORY: Conversations shape a system that understands you; memory, pattern, strategy; try Anto.
FIRST VIEWPORT: copy left, organic constellation center-right, CTA in nav only.
SECOND ACT: same field continues; labels become reading; large CTA after; trust last.
FORM: brief-pinned cinematic constellation in one world, two acts.
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
          <NexusWorld copy={copy} />
          <section className="nexus-trust" aria-labelledby="nexus-trust-title">
            <h2 id="nexus-trust-title" className="visually-hidden">
              {copy.trust.aria}
            </h2>
            <ul className="nexus-trust__list">
              {copy.trust.items.map((item) => (
                <li key={item.id} className="nexus-trust__item">
                  <h3 className="nexus-trust__heading">{item.title}</h3>
                  <p className="nexus-trust__body">{item.body}</p>
                  <Link href={item.href} className="nexus-trust__link">
                    {item.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
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
