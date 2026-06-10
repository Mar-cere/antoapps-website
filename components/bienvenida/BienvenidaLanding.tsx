import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import BienvenidaLandingTracker from '@/components/analytics/BienvenidaLandingTracker';
import MetaPixelNoscript from '@/components/analytics/MetaPixelNoscript';
import BienvenidaAppPreview from '@/components/bienvenida/BienvenidaAppPreview';
import BienvenidaAppScreenshots from '@/components/bienvenida/BienvenidaAppScreenshots';
import BienvenidaAudience from '@/components/bienvenida/BienvenidaAudience';
import BienvenidaClinicalPillars from '@/components/bienvenida/BienvenidaClinicalPillars';
import BienvenidaConversationDemo from '@/components/bienvenida/BienvenidaConversationDemo';
import BienvenidaFaq from '@/components/bienvenida/BienvenidaFaq';
import BienvenidaReviews from '@/components/bienvenida/BienvenidaReviews';
import BienvenidaStickyCta from '@/components/bienvenida/BienvenidaStickyCta';
import BienvenidaTrustStrip from '@/components/bienvenida/BienvenidaTrustStrip';
import HeroDualCta from '@/components/bienvenida/HeroDualCta';
import InstagramBrowserHint from '@/components/bienvenida/InstagramBrowserHint';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import BienvenidaLandingV2 from '@/components/bienvenida/BienvenidaLandingV2';
import type { LandingDevice } from '@/lib/device/landing-device';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getBienvenidaCopy, type BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import { appStoreHref } from '@/lib/download-links';
import '@/styles/components/buttons.css';
import '@/styles/pages/landing-ad.css';

const baseUrl = 'https://antoapps.com';
const APP_STORE_ID = '6756631911';

type BienvenidaLandingProps = {
  locale: Locale;
  landingVariant: BienvenidaVariant;
  initialDevice: LandingDevice;
};

export function bienvenidaMetadata(locale: Locale): Metadata {
  const copy = getBienvenidaCopy(locale);
  const path = localePath(locale, '/bienvenida');
  const canonical = `${baseUrl}${path}`;
  const alternateEs = `${baseUrl}/bienvenida`;
  const alternateEn = `${baseUrl}/en/bienvenida`;

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical,
      languages: {
        es: alternateEs,
        en: alternateEn,
        'x-default': alternateEs,
      },
    },
    other: {
      'apple-itunes-app': `app-id=${APP_STORE_ID}, app-argument=${canonical}`,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.meta.title,
      description: copy.meta.socialDescription,
      siteName: 'Anto',
      locale: locale === 'en' ? 'en_US' : 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.meta.title,
      description: copy.meta.socialDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BienvenidaLanding({
  locale,
  landingVariant,
  initialDevice,
}: BienvenidaLandingProps) {
  if (landingVariant === 'C') {
    return (
      <BienvenidaLandingV2
        locale={locale}
        landingVariant={landingVariant}
        initialDevice={initialDevice}
      />
    );
  }

  const copy = getBienvenidaCopy(locale);
  const storeHref = appStoreHref();
  const pagePath = localePath(locale, '/bienvenida');
  const year = new Date().getFullYear();

  return (
    <div className="lad-page" lang={locale}>
      <MetaPixelNoscript />
      <BienvenidaLandingTracker landingVariant={landingVariant} pagePath={pagePath} />
      <header className="lad-topbar" role="banner">
        <div className="lad-brand" aria-label="Anto">
          <Image
            src="/assets/images/antoIcon.png"
            alt=""
            width={28}
            height={28}
            className="lad-brand-icon"
            priority
          />
          <span>Anto</span>
        </div>
        <LanguageSwitcher locale={locale} path="/bienvenida" />
      </header>

      <InstagramBrowserHint copy={copy.inAppHint} locale={locale} />

      <main className="lad-main" id="contenido-principal">
        <section className="lad-hero" aria-labelledby="lad-hero-title">
          <h1 id="lad-hero-title">
            <span className="lad-hero-title-line">{copy.hero.titleLine1}</span>
            <span className="lad-hero-title-line">{copy.hero.titleLine2[landingVariant]}</span>
          </h1>
          <p className="lad-hero-subheadline">{copy.hero.subheadline[landingVariant]}</p>

          <HeroDualCta
            storeHref={storeHref}
            landingVariant={landingVariant}
            pagePath={pagePath}
            copy={copy}
            locale={locale}
            initialDevice={initialDevice}
          />

          <BienvenidaTrustStrip copy={copy.trustStrip} />
        </section>

        <div className="lad-hero-social">
          <BienvenidaReviews copy={copy.reviews} />
          <BienvenidaAppPreview copy={copy.appPreview} />
        </div>

        <BienvenidaClinicalPillars copy={copy.clinicalPillars} />

        <section
          className="lad-how lad-section--anchor"
          id="como-funciona"
          aria-labelledby="lad-how-section-title"
        >
          <div className="lad-how-inner">
            <h2 id="lad-how-section-title" className="lad-how-section-title">
              {copy.how.sectionTitle}
            </h2>
            <BienvenidaConversationDemo copy={copy.conversationDemo} />
            <ol className="lad-how-steps">
              {copy.how.steps.map((step, index) => (
                <li key={step}>
                  <span className="lad-how-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <BienvenidaAppScreenshots copy={copy.screenshots} />
          </div>
        </section>

        <BienvenidaAudience copy={copy.audience} />

        <BienvenidaFaq copy={copy.faq} locale={locale} />

        <section className="lad-final lad-final--push" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">{copy.final.headline}</h2>
          <HeroDualCta
            storeHref={storeHref}
            landingVariant={landingVariant}
            placement="final"
            pagePath={pagePath}
            copy={copy}
            locale={locale}
            initialDevice={initialDevice}
          />
        </section>

        <p className="lad-disclaimer">{copy.disclaimer}</p>
      </main>

      <footer className="lad-footer">
        <div className="lad-footer-links">
          <Link href={localePath(locale, '/privacidad')}>{copy.footer.privacy}</Link>
          <Link href={localePath(locale, '/terminos')}>{copy.footer.terms}</Link>
          <Link href={localePath(locale, '/contacto')}>{copy.footer.contact}</Link>
        </div>
        <p>{copy.footer.tagline.replace('{year}', String(year))}</p>
      </footer>

      <BienvenidaStickyCta
        storeHref={storeHref}
        landingVariant={landingVariant}
        pagePath={pagePath}
        copy={copy}
        initialDevice={initialDevice}
      />

      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </div>
  );
}
