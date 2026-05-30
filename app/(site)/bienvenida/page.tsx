import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import BienvenidaLandingTracker from '@/components/analytics/BienvenidaLandingTracker';
import MetaPixelNoscript from '@/components/analytics/MetaPixelNoscript';
import BienvenidaAppPreview from '@/components/bienvenida/BienvenidaAppPreview';
import BienvenidaFaq from '@/components/bienvenida/BienvenidaFaq';
import BienvenidaStickyCta from '@/components/bienvenida/BienvenidaStickyCta';
import BienvenidaTrustStrip from '@/components/bienvenida/BienvenidaTrustStrip';
import HeroDualCta from '@/components/bienvenida/HeroDualCta';
import InstagramBrowserHint from '@/components/bienvenida/InstagramBrowserHint';
import {
  BIENVENIDA_DISCLAIMER,
  BIENVENIDA_FINAL_HEADLINE,
  BIENVENIDA_HOW_STEPS,
  BIENVENIDA_META_DESCRIPTION,
  BIENVENIDA_SOCIAL_DESCRIPTION,
  bienvenidaHeroLead,
  bienvenidaHeroTitleLine2,
} from '@/lib/bienvenida-copy';
import { appStoreHref } from '@/lib/download-links';
import '@/styles/components/buttons.css';
import '@/styles/pages/landing-ad.css';

const baseUrl = 'https://antoapps.com';
const APP_STORE_ID = '6756631911';

export const metadata: Metadata = {
  title: 'Anto — Calma mental en minutos | Descarga en App Store',
  description: BIENVENIDA_META_DESCRIPTION,
  alternates: {
    canonical: `${baseUrl}/bienvenida`,
  },
  other: {
    'apple-itunes-app': `app-id=${APP_STORE_ID}, app-argument=${baseUrl}/bienvenida`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/bienvenida`,
    title: 'Anto — Calma mental en minutos',
    description: BIENVENIDA_SOCIAL_DESCRIPTION,
    siteName: 'Anto',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anto — Empieza hoy',
    description: BIENVENIDA_SOCIAL_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

type BienvenidaLandingPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function parseVariant(value: string | string[] | undefined): 'A' | 'B' {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.toLowerCase() === 'b' ? 'B' : 'A';
}

export default function BienvenidaLandingPage({ searchParams }: BienvenidaLandingPageProps) {
  const storeHref = appStoreHref();
  const landingVariant = parseVariant(searchParams?.ab);

  return (
    <div className="lad-page">
      <MetaPixelNoscript />
      <BienvenidaLandingTracker landingVariant={landingVariant} />
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
      </header>

      <InstagramBrowserHint />

      <main className="lad-main" id="contenido-principal">
        <section className="lad-hero" aria-labelledby="lad-hero-title">
          <h1 id="lad-hero-title">
            <span className="lad-hero-title-line">Cuando tu mente va a mil,</span>
            <span className="lad-hero-title-line">{bienvenidaHeroTitleLine2(landingVariant)}</span>
          </h1>
          <p className="lad-hero-lead">{bienvenidaHeroLead(landingVariant)}</p>

          <HeroDualCta storeHref={storeHref} landingVariant={landingVariant} />

          <BienvenidaAppPreview />

          <BienvenidaTrustStrip />
        </section>

        <section
          className="lad-how lad-section--anchor"
          id="como-funciona"
          aria-labelledby="lad-how-section-title"
        >
          <div className="lad-how-inner">
            <h2 id="lad-how-section-title" className="lad-how-section-title">
              Así funciona
            </h2>
            <ol className="lad-how-steps">
              {BIENVENIDA_HOW_STEPS.map((step, index) => (
                <li key={step}>
                  <span className="lad-how-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <BienvenidaFaq />

        <section className="lad-final lad-final--push" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">{BIENVENIDA_FINAL_HEADLINE}</h2>
          <HeroDualCta
            storeHref={storeHref}
            landingVariant={landingVariant}
            placement="final"
          />
        </section>

        <p className="lad-disclaimer">{BIENVENIDA_DISCLAIMER}</p>
      </main>

      <footer className="lad-footer">
        <div className="lad-footer-links">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <p>© {new Date().getFullYear()} Anto · Hecho con cuidado en Chile</p>
      </footer>

      <BienvenidaStickyCta storeHref={storeHref} landingVariant={landingVariant} />

      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </div>
  );
}
