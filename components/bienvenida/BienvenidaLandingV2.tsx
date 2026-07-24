import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import BienvenidaLandingTracker from '@/components/analytics/BienvenidaLandingTracker';
import MetaPixelNoscript from '@/components/analytics/MetaPixelNoscript';
import BienvenidaV2HeroFold from '@/components/bienvenida/v2/BienvenidaV2HeroFold';
import BienvenidaV2HeroReview from '@/components/bienvenida/v2/BienvenidaV2HeroReview';
import BienvenidaV2StickyCta from '@/components/bienvenida/v2/BienvenidaV2StickyCta';
import {
  BienvenidaV2FeatureIcon,
  BienvenidaV2TrustIcon,
} from '@/components/bienvenida/v2/BienvenidaV2Icons';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import type { LandingDevice } from '@/lib/device/landing-device';
import { getBienvenidaCopy, type BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import { appStoreHref } from '@/lib/download-links';
import '@/styles/components/buttons.css';
import '@/styles/pages/landing-ad.css';
import '@/styles/pages/landing-ad-v2.css';

type BienvenidaLandingV2Props = {
  locale: Locale;
  landingVariant: BienvenidaVariant;
  initialDevice: LandingDevice;
};

function MultilineText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, index) => (
        <span key={line}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function BienvenidaLandingV2({
  locale,
  landingVariant,
  initialDevice,
}: BienvenidaLandingV2Props) {
  const copy = getBienvenidaCopy(locale);
  const v2 = copy.v2;
  const storeHref = appStoreHref();
  const pagePath = localePath(locale, '/bienvenida');
  const year = new Date().getFullYear();

  return (
    <div className="lad-page lad-page--v2" lang={locale}>
      <MetaPixelNoscript />
      <BienvenidaLandingTracker landingVariant={landingVariant} pagePath={pagePath} />
      <header className="lad-topbar lad-v2-topbar" role="banner">
        <div className="lad-brand" aria-label="Anto">
          <Image
            src="/assets/images/antoIcon.png"
            alt=""
            width={30}
            height={30}
            className="lad-brand-icon"
            priority
          />
          <span>Anto</span>
        </div>
        <LanguageSwitcher locale={locale} path="/bienvenida" className="lad-v2-lang" />
      </header>

      <main className="lad-v2-main" id="contenido-principal">
        <section className="lad-v2-s1" aria-labelledby="lad-v2-hero-title">
          <p className="lad-v2-eyebrow">{v2.eyebrow}</p>
          <h1 id="lad-v2-hero-title" className="lad-v2-hero-h1">
            <MultilineText text={v2.heroTitlePrefix} />
            <span className="lad-v2-hero-h1-accent">
              <MultilineText text={v2.heroTitleHighlight} />
            </span>
          </h1>
          <p className="lad-v2-hero-sub">{v2.heroSub}</p>

          <div className="lad-v2-hero-product">
            <HomeV2ChatVignette
              thread={v2.chat}
              locale={locale}
              size="ads"
              className="lad-v2-chat"
            />
          </div>

          <BienvenidaV2HeroFold
            storeHref={storeHref}
            pagePath={pagePath}
            landingVariant={landingVariant}
            copy={copy}
            locale={locale}
            initialDevice={initialDevice}
          />
        </section>

        <div className="lad-v2-divider" aria-hidden="true" />

        <section className="lad-v2-s3" aria-label={v2.chatSectionLabel}>
          <ul className="lad-v2-feature-row">
            {v2.features.map((feat) => (
              <li key={feat.title} className="lad-v2-feat">
                <span className="lad-v2-feat__icon" aria-hidden="true">
                  <BienvenidaV2FeatureIcon id={feat.icon} />
                </span>
                <p className="lad-v2-feat__title">{feat.title}</p>
                <p className="lad-v2-feat__sub">{feat.subtitle}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lad-v2-s-review" aria-label={copy.reviews.sectionTitle}>
          <BienvenidaV2HeroReview copy={copy} />
        </section>

        <section className="lad-v2-s4" aria-labelledby="lad-v2-dash-headline">
          <p className="lad-v2-section-label">{v2.dashboard.label}</p>
          <h2 id="lad-v2-dash-headline" className="lad-v2-dash-headline">
            <MultilineText text={v2.dashboard.headline} />
          </h2>
          <p className="lad-v2-dash-sub">{v2.dashboard.subtitle}</p>
          <div className="lad-v2-screenshot-crop">
            <Image
              src={v2.dashboard.image.src}
              alt={v2.dashboard.image.alt}
              width={390}
              height={844}
              className="lad-v2-screenshot lad-v2-screenshot--crop"
            />
          </div>
        </section>

        <section className="lad-v2-s5" aria-label={copy.trial.finalCta}>
          <BienvenidaV2HeroFold
            storeHref={storeHref}
            pagePath={pagePath}
            landingVariant={landingVariant}
            copy={copy}
            locale={locale}
            initialDevice={initialDevice}
            placement="final"
          />
          <ul className="lad-v2-trust-strip">
            {v2.trustItems.map((item) => (
              <li key={item.label} className="lad-v2-trust-item">
                <BienvenidaV2TrustIcon id={item.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="lad-v2-legal">{copy.disclaimer}</p>
        </section>
      </main>

      <footer className="lad-footer lad-v2-footer">
        <div className="lad-footer-links">
          <Link href={localePath(locale, '/privacidad')}>{copy.footer.privacy}</Link>
          <Link href={localePath(locale, '/terminos')}>{copy.footer.terms}</Link>
          <Link href={localePath(locale, '/contacto')}>{copy.footer.contact}</Link>
        </div>
        <p>{copy.footer.tagline.replace('{year}', String(year))}</p>
      </footer>

      <BienvenidaV2StickyCta
        storeHref={storeHref}
        landingVariant={landingVariant}
        pagePath={pagePath}
        copy={copy}
        initialDevice={initialDevice}
      />

      {/* Retraso alto: no tapar el CTA del fold en los primeros segundos (Meta/IG). */}
      <CookieConsent compact bannerDelayMs={12000} showAfterScrollPx={560} />
    </div>
  );
}
