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
    'Descarga Anto: prueba gratis 3 días, conversación con IA para tu bienestar, privacidad y disponible 24/7. No sustituye atención clínica.',
  alternates: {
    canonical: `${baseUrl}/bienvenida`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/bienvenida`,
    title: 'Anto — Tu apoyo emocional, en el bolsillo',
    description:
      'Prueba gratis 3 días. IA para bienestar emocional, privada y disponible cuando la necesites. Descarga en App Store.',
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
    description: 'Prueba gratis 3 días. Apoyo emocional con IA. Descarga en App Store.',
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

type StoreCtaProps = {
  storeHref: string;
  blockId?: string;
  title: string;
  priority?: boolean;
};

function StoreCtaBlock({ storeHref, blockId, title, priority }: StoreCtaProps) {
  return (
    <div className="lad-cta-wrap" id={blockId}>
      <p className="lad-cta-title">{title}</p>
      <div className="lad-cta-card">
        <p className="lad-cta-label">iPhone e iPad</p>
        <p className="lad-cta-trial">
          <strong>3 días gratis</strong> para probar la app. Sin compromiso: tú decides después.
        </p>
        <DownloadLink
          href={storeHref}
          className="lad-store-badge-link lad-store-badge-link--primary"
          aria-label="Descargar Anto en App Store. Incluye prueba gratis de 3 días. Se abre en una pestaña nueva."
        >
          <Image
            src={APP_STORE_BADGE_SVG_PATH}
            alt=""
            width={120}
            height={40}
            className="lad-store-badge-img"
            priority={priority}
          />
        </DownloadLink>
        <p className="lad-cta-foot">
          Se abre en la App Store · <strong>Descarga sin costo</strong> · Condiciones del plan en la tienda
        </p>
      </div>
      <div className="lad-cta-secondary" aria-label="Google Play próximamente">
        <span className="lad-cta-secondary-label">Android</span>
        <span className="lad-btn-soon">
          Google Play <span className="lad-btn-soon-pill">Próximamente</span>
        </span>
      </div>
    </div>
  );
}

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
      </header>

      <main className="lad-main" id="contenido-principal">
        <section className="lad-hero" aria-labelledby="lad-hero-title">
          <p className="lad-hero-badge">App de bienestar emocional</p>
          <h1 id="lad-hero-title">Tu espacio para sentirte mejor, cuando lo necesites</h1>
          <p className="lad-hero-lead">
            Anto combina IA y herramientas de salud mental para acompañarte con privacidad. Descarga
            la app y empieza en segundos.
          </p>

          <StoreCtaBlock
            storeHref={storeHref}
            blockId="descargar"
            title="Consíguela en el App Store"
            priority
          />

          <Link href="#por-que-anto" className="lad-cta-skip">
            <span>Ver qué incluye antes de descargar</span>
            <span className="lad-cta-skip-chevron" aria-hidden="true">
              ↓
            </span>
          </Link>

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

        <section className="lad-section lad-section--anchor" id="por-que-anto" aria-labelledby="lad-features-title">
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

        <p className="lad-trust-line">
          <Link href="/contacto" className="lad-trust-link">
            ¿Dudas antes de instalar? Escríbenos
          </Link>
        </p>

        <section className="lad-final" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">¿Lista o listo para empezar?</h2>
          <p className="lad-final-lead">Un toque y abres Anto en tu iPhone o iPad.</p>
          <StoreCtaBlock storeHref={storeHref} title="Consíguela en el App Store" />
          <Link href="#descargar" className="lad-cta-back-top">
            Volver arriba al botón de descarga
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

      <CookieConsent />
    </div>
  );
}
