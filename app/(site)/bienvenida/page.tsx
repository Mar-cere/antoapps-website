import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import DownloadLink from '@/components/DownloadLink';
import { APP_STORE_BADGE_SVG_PATH, appStoreHref } from '@/lib/download-links';
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
          <h1 id="lad-hero-title">
            <span className="lad-hero-title-line">Escribe lo que no sabes cómo decir</span>
            <span className="lad-hero-title-line">y empieza a entenderlo</span>
          </h1>
          <p className="lad-hero-lead">
            Desahógate sin filtro y recibe guía práctica con tono cercano y profesional.
          </p>

          <div className="lad-hero-fold-cta" id="descargar">
            <DownloadLink
              href={storeHref}
              className="btn btn-primary btn-large lad-hero-cta-btn"
              aria-label="Empieza ahora: descargar Anto en App Store. Incluye prueba gratis. Se abre en una pestaña nueva."
            >
              Empieza ahora
            </DownloadLink>
            <p className="lad-hero-cta-micro">Empieza gratis. Sin compromiso.</p>
            <div className="lad-hero-store-trust">
              <DownloadLink
                href={storeHref}
                className="lad-store-badge-link lad-store-badge-link--primary"
                aria-label="Descargar en App Store (mismo enlace que Empieza ahora)"
              >
                <Image
                  src={APP_STORE_BADGE_SVG_PATH}
                  alt=""
                  width={120}
                  height={40}
                  className="lad-store-badge-img lad-store-badge-img--hero"
                  priority
                />
              </DownloadLink>
              <div className="lad-cta-secondary lad-cta-secondary--hero" aria-label="Google Play próximamente">
                <span className="lad-cta-secondary-label">Android</span>
                <span className="lad-btn-soon">
                  Google Play <span className="lad-btn-soon-pill">Próximamente</span>
                </span>
              </div>
            </div>
          </div>

          <Link href="#como-funciona" className="lad-cta-skip">
            <span>Ver cómo funciona antes de descargar</span>
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

        <section
          className="lad-how lad-section--anchor"
          id="como-funciona"
          aria-labelledby="lad-how-section-title"
        >
          <div className="lad-how-inner">
            <h2 id="lad-how-section-title" className="lad-how-section-title">
              Cómo funciona
            </h2>
            <p className="lad-how-open">No necesitas explicarlo bien.</p>
            <p className="lad-how-body">
              Solo escribe lo que salga:
              <br />
              aunque esté desordenado,
              <br />
              aunque no tenga sentido.
            </p>
            <p className="lad-how-prefix">Anto te ayuda a:</p>
            <ul className="lad-how-list">
              <li>ordenar lo que sientes</li>
              <li>entender qué te pasa</li>
              <li>avanzar con pequeñas acciones</li>
            </ul>
            <Link href="#por-que-anto" className="lad-how-next">
              Ver qué más incluye la app
            </Link>
          </div>
        </section>

        <section className="lad-section lad-section--anchor" id="por-que-anto" aria-labelledby="lad-features-title">
          <div className="lad-section-head">
            <h2 id="lad-features-title">Por qué Anto</h2>
            <p>Funciones y herramientas que verás dentro de la app.</p>
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

        <section
          className="lad-reinforce"
          aria-label="Tu espacio privado en Anto"
        >
          <p className="lad-reinforce-text">
            Un espacio privado para soltar lo que tienes
            <br />
            y no quedarte ahí.
          </p>
        </section>

        <p className="lad-trust-line">
          <Link href="/contacto" className="lad-trust-link">
            ¿Dudas antes de instalar? Escríbenos
          </Link>
        </p>

        <section className="lad-final lad-final--push" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">Empieza en segundos.</h2>
          <p className="lad-final-sub">
            <span className="lad-final-sub-line">Sin registro complejo.</span>
            <span className="lad-final-sub-line">Sin presión.</span>
          </p>
          <div className="lad-final-cta-stack">
            <DownloadLink
              href={storeHref}
              className="btn btn-primary btn-large lad-hero-cta-btn"
              aria-label="Empieza ahora: descargar Anto en App Store. Incluye prueba gratis."
            >
              Empieza ahora
            </DownloadLink>
            <p className="lad-hero-cta-micro">Empieza gratis. Sin compromiso.</p>
          </div>
          <StoreCtaBlock storeHref={storeHref} title="También puedes usar el badge oficial" />
          <Link href="#descargar" className="lad-cta-back-top">
            Volver arriba al inicio
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
