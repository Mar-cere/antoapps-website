import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import HeroDualCta from '@/components/bienvenida/HeroDualCta';
import LandingViewTracker from '@/components/analytics/LandingViewTracker';
import { appStoreHref } from '@/lib/download-links';
import '@/styles/components/buttons.css';
import '@/styles/pages/landing-ad.css';

const baseUrl = 'https://antoapps.com';

export const metadata: Metadata = {
  title: 'Anto — Escribe lo que no sabes cómo decir | App de bienestar',
  description:
    'Desahógate sin filtro y recibe guía práctica con tono cercano y profesional. Empieza gratis, sin compromiso. Prueba 3 días. No sustituye terapia ni atención clínica.',
  alternates: {
    canonical: `${baseUrl}/bienvenida`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/bienvenida`,
    title: 'Anto — Escribe lo que no sabes cómo decir',
    description:
      'Empieza gratis, sin compromiso. Guía práctica con tono cercano y profesional. Disponible en App Store.',
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
    title: 'Anto — Empieza ahora',
    description: 'Empieza gratis, sin compromiso. App de bienestar emocional en App Store.',
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

export default function BienvenidaLandingPage({ searchParams }: BienvenidaLandingPageProps) {
  const storeHref = appStoreHref();
  const landingVariant = parseVariant(searchParams?.ab);

  return (
    <div className="lad-page">
      <LandingViewTracker page="/bienvenida" landingVariant={landingVariant} />
      <header className="lad-topbar" role="banner">
        <Link href="/" className="lad-brand" aria-label="Anto — Inicio">
          <Image
            src="/assets/images/antoIcon.png"
            alt=""
            width={28}
            height={28}
            className="lad-brand-icon"
            priority
          />
          <span>Anto</span>
        </Link>
      </header>

      <main className="lad-main" id="contenido-principal">
        <section className="lad-hero" aria-labelledby="lad-hero-title">
          <p className="lad-hero-badge">App de bienestar emocional</p>
          <h1 id="lad-hero-title">
            <span className="lad-hero-title-line">Cuando tu mente va a mil,</span>
            <span className="lad-hero-title-line">Anto te ayuda a ordenar lo que sientes</span>
          </h1>
          <p className="lad-hero-lead">
            Escribes como te salga y recibes guía clara, práctica y humana en segundos.
          </p>
          <HeroDualCta
            storeHref={storeHref}
            landingVariant={landingVariant}
          />
          <div className="lad-hero-visual" aria-hidden="true">
            <div className="lad-hero-visual-orbit lad-hero-visual-orbit--one"></div>
            <div className="lad-hero-visual-orbit lad-hero-visual-orbit--two"></div>
            <div className="lad-hero-visual-core">
              <Image
                src="/assets/images/antoIcon.png"
                alt=""
                width={52}
                height={52}
                className="lad-hero-visual-logo"
                priority
              />
            </div>
          </div>
          <ul className="lad-hero-quick-points" aria-label="Beneficios rápidos">
            <li>Guía práctica al instante</li>
            <li>Privado y personal</li>
            <li>Herramientas para avanzar hoy</li>
          </ul>
          <div className="lad-social-proof" aria-label="Señales de confianza">
            <span className="lad-social-proof-item">Acceso inmediato en iPhone</span>
            <span className="lad-social-proof-item">Versión 1.2.7 en tiendas</span>
            <span className="lad-social-proof-item">Privacidad clara y transparente</span>
          </div>

          <p className="lad-microcopy">
            Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional
            o de emergencia en tu país.
          </p>

          <ul className="lad-pills" aria-label="Beneficios destacados">
            <li className="lad-pill lad-pill--accent">3 días gratis</li>
            <li className="lad-pill">24/7 en la app</li>
            <li className="lad-pill">Datos protegidos</li>
            <li className="lad-pill">Herramientas de bienestar</li>
          </ul>
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

      <CookieConsent />
    </div>
  );
}
