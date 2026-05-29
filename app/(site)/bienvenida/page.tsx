import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import BienvenidaChatPreview from '@/components/bienvenida/BienvenidaChatPreview';
import BienvenidaFaq from '@/components/bienvenida/BienvenidaFaq';
import BienvenidaPhoneMockup from '@/components/bienvenida/BienvenidaPhoneMockup';
import HeroDualCta from '@/components/bienvenida/HeroDualCta';
import InstagramBrowserHint from '@/components/bienvenida/InstagramBrowserHint';
import LandingViewTracker from '@/components/analytics/LandingViewTracker';
import { appStoreHref } from '@/lib/download-links';
import '@/styles/components/buttons.css';
import '@/styles/pages/landing-ad.css';

const baseUrl = 'https://antoapps.com';
const APP_STORE_ID = '6756631911';

export const metadata: Metadata = {
  title: 'Anto — Calma mental en minutos | Descarga en App Store',
  description:
    'Cuando tu mente va a mil, escribe como te salga y recibe guía clara en segundos. Descarga en App Store o pide acceso anticipado Android por correo. Prueba 3 días.',
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
    description:
      'Descarga en App Store y empieza hoy. Android con acceso anticipado por correo.',
    siteName: 'Anto',
    locale: 'es_CL',
    images: [
      {
        url: `${baseUrl}/assets/images/antoIcon.png`,
        width: 512,
        height: 512,
        alt: 'Anto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anto — Empieza hoy',
    description: 'Descarga en App Store. Android con acceso anticipado por correo.',
    images: [`${baseUrl}/assets/images/antoIcon.png`],
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

const howSteps = [
  'Abre la app y escribe lo que sientes, sin filtro.',
  'Recibe claridad y un micro-paso concreto para hoy.',
  'Vuelve cuando lo necesites — Anto está disponible 24/7.',
] as const;

export default function BienvenidaLandingPage({ searchParams }: BienvenidaLandingPageProps) {
  const storeHref = appStoreHref();
  const landingVariant = parseVariant(searchParams?.ab);
  const heroTitleLine2 =
    landingVariant === 'B'
      ? 'Anto te ayuda a ordenar lo que sientes'
      : 'ordena lo que sientes con Anto';
  const heroLead =
    landingVariant === 'B'
      ? 'Escribes como te salga y recibes guía clara, práctica y humana en segundos.'
      : 'Escribe como te salga y recibe claridad práctica en segundos, estés donde estés.';

  return (
    <div className="lad-page">
      <LandingViewTracker page="/bienvenida" landingVariant={landingVariant} />
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
          <p className="lad-hero-badge">Bienestar emocional en tu bolsillo</p>
          <h1 id="lad-hero-title">
            <span className="lad-hero-title-line">Cuando tu mente va a mil,</span>
            <span className="lad-hero-title-line">{heroTitleLine2}</span>
          </h1>
          <p className="lad-hero-lead">{heroLead}</p>

          <HeroDualCta storeHref={storeHref} landingVariant={landingVariant} />

          <ul className="lad-hero-quick-points" aria-label="Beneficios rápidos">
            <li>Claridad emocional en minutos</li>
            <li>Privado, personal y sin juicios</li>
            <li>Acciones concretas para hoy</li>
          </ul>

          <BienvenidaChatPreview />

          <BienvenidaPhoneMockup />

          <div className="lad-social-proof" aria-label="Señales de confianza">
            <span className="lad-social-proof-item">Disponible en App Store</span>
            <span className="lad-social-proof-item">Descarga gratuita en iPhone</span>
            <span className="lad-social-proof-item">Privado y sin juicios</span>
          </div>

          <p className="lad-microcopy">
            Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional
            o de emergencia en tu país.
          </p>
        </section>

        <section
          className="lad-how lad-section--anchor"
          id="como-funciona"
          aria-labelledby="lad-how-section-title"
        >
          <div className="lad-how-inner">
            <h2 id="lad-how-section-title" className="lad-how-section-title">
              Cómo funciona
            </h2>
            <p className="lad-how-open">Tu primera conversación toma menos de 2 minutos.</p>
            <ol className="lad-how-steps">
              {howSteps.map((step, index) => (
                <li key={step}>
                  <span className="lad-how-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link href="#descargar" className="lad-how-next">
              Descargar y probar gratis
            </Link>
          </div>
        </section>

        <BienvenidaFaq />

        <section className="lad-final lad-final--push" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">Empieza en segundos.</h2>
          <p className="lad-final-sub">
            <span className="lad-final-sub-line">Prueba 3 días gratis.</span>
            <span className="lad-final-sub-line">Cancelación simple desde App Store.</span>
          </p>
          <HeroDualCta
            storeHref={storeHref}
            landingVariant={landingVariant}
            placement="final"
          />
          <Link href="#descargar" className="lad-cta-back-top">
            Volver arriba
          </Link>
        </section>
      </main>

      <footer className="lad-footer">
        <div className="lad-footer-links">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
        <p>© {new Date().getFullYear()} Anto · Hecho con cuidado en Chile</p>
      </footer>

      <CookieConsent compact />
    </div>
  );
}
