import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import DownloadLink from '@/components/DownloadLink';
import { APP_STORE_BADGE_SVG_PATH, appStoreHref } from '@/lib/download-links';
import '@/styles/pages/landing-ad.css';

const baseUrl = 'https://antoapps.com';

export const metadata: Metadata = {
  title: 'Anto — Descarga la app | Apoyo emocional con IA',
  description:
    'Descarga Anto: conversación con IA para tu bienestar, privacidad, disponible 24/7. Escalas clínicas y herramientas de apoyo. No sustituye atención clínica.',
  alternates: {
    canonical: `${baseUrl}/bienvenida`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/bienvenida`,
    title: 'Anto — Tu apoyo emocional, en el bolsillo',
    description:
      'IA pensada para bienestar emocional, privada y disponible cuando la necesites. Descarga en App Store.',
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
    title: 'Anto — Descarga la app',
    description: 'Apoyo emocional con IA. Descarga en App Store.',
    images: [`${baseUrl}/assets/images/antoIcon.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const features = [
  {
    icon: '🤖',
    title: 'Conversación con IA',
    text: 'Tono profesional y práctico, con protocolos basados en evidencia cuando aplica.',
  },
  {
    icon: '🛡️',
    title: 'Privacidad',
    text: 'Tus conversaciones van contigo; diseñamos la app pensando en confidencialidad.',
  },
  {
    icon: '📊',
    title: 'Seguimiento claro',
    text: 'Escalas validadas (PHQ-9, GAD-7) y herramientas para ver tu progreso.',
  },
  {
    icon: '⏰',
    title: 'Siempre disponible',
    text: 'Apoyo cuando lo necesites, sin agendas ni esperas.',
  },
] as const;

export default function BienvenidaLandingPage() {
  const storeHref = appStoreHref();

  return (
    <div className="lad-page">
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
        <Link href="/" className="lad-topbar-link">
          Sitio completo
        </Link>
      </header>

      <main className="lad-main" id="contenido-principal">
        <section className="lad-hero" aria-labelledby="lad-hero-title">
          <p className="lad-hero-badge">App de bienestar emocional</p>
          <h1 id="lad-hero-title">Tu espacio para sentirte mejor, cuando lo necesites</h1>
          <p className="lad-hero-lead">
            Anto combina IA y herramientas de salud mental para acompañarte con privacidad. Descarga
            la app y empieza en segundos.
          </p>

          <div className="lad-cta-block" id="descargar">
            <DownloadLink
              href={storeHref}
              className="lad-store-badge-link"
              aria-label="Descargar Anto en App Store"
            >
              <Image
                src={APP_STORE_BADGE_SVG_PATH}
                alt=""
                width={120}
                height={40}
                className="lad-store-badge-img"
                priority
              />
            </DownloadLink>
            <span className="lad-btn-soon" aria-disabled="true" aria-label="Google Play (próximamente)">
              Google Play <span className="lad-btn-soon-pill">Próximamente</span>
            </span>
          </div>

          <p className="lad-microcopy">
            Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional
            o de emergencia en tu país.
          </p>

          <div className="lad-pills" aria-hidden="true">
            <span className="lad-pill">24/7 en la app</span>
            <span className="lad-pill">Datos protegidos</span>
            <span className="lad-pill">Herramientas de bienestar</span>
          </div>
        </section>

        <section className="lad-section" aria-labelledby="lad-features-title">
          <div className="lad-section-head">
            <h2 id="lad-features-title">Por qué Anto</h2>
            <p>Lo esencial, sin ruido: lo que verás al abrir la app.</p>
          </div>
          <div className="lad-features">
            {features.map((f) => (
              <article key={f.title} className="lad-feature">
                <div className="lad-feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lad-final" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">¿Listo para probarla?</h2>
          <div className="lad-cta-block">
            <DownloadLink
              href={storeHref}
              className="lad-store-badge-link"
              aria-label="Descargar Anto en App Store"
            >
              <Image
                src={APP_STORE_BADGE_SVG_PATH}
                alt=""
                width={120}
                height={40}
                className="lad-store-badge-img"
              />
            </DownloadLink>
            <span className="lad-btn-soon" aria-disabled="true" aria-label="Google Play (próximamente)">
              Google Play <span className="lad-btn-soon-pill">Próximamente</span>
            </span>
          </div>
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
