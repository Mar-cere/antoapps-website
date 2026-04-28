import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import HeroDualCta from '@/components/bienvenida/HeroDualCta';
import LandingViewTracker from '@/components/analytics/LandingViewTracker';
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
  landingVariant: 'A' | 'B';
};

function StoreCtaBlock({ storeHref, blockId, title, priority, landingVariant }: StoreCtaProps) {
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
          trackingPlacement="bienvenida_store_badge_block"
          trackingPage="/bienvenida"
          trackingLabel={`store_badge_block_variant_${landingVariant}`}
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
      <div className="lad-cta-secondary" aria-label="Android acceso anticipado">
        <AndroidEarlyAccessForm
          placement="bienvenida_store_block_android_early_access"
          page="/bienvenida"
          className="android-early-access android-early-access--landing"
          title="Acceso anticipado Android"
          subtitle="Únete a la lista prioritaria para recibir invitación antes del lanzamiento público."
          buttonLabel="Quiero acceso anticipado"
        />
      </div>
    </div>
  );
}

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
  const primaryCtaText =
    landingVariant === 'B' ? 'Descargar en iPhone (3 días gratis)' : 'Empieza en iPhone (3 días gratis)';

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
          <p className="lad-proof-line">Versión 1.2.7 publicada en tiendas · App Store disponible hoy</p>
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

          <Link href="#lad-final-title" className="lad-cta-skip">
            <span>Ver más detalles rápidos</span>
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

        <p className="lad-trust-line">
          <span className="lad-trust-platform">Acceso anticipado Android disponible</span>
          <Link href="/contacto" className="lad-trust-link">
            ¿Dudas antes de instalar? Escríbenos
          </Link>
        </p>

        <section className="lad-final lad-final--push" aria-labelledby="lad-final-title">
          <h2 id="lad-final-title">Empieza hoy. Si te sirve, te quedas.</h2>
          <p className="lad-final-sub">
            <span className="lad-final-sub-line">Empieza en pocos pasos.</span>
            <span className="lad-final-sub-line">Cancelación simple desde App Store.</span>
          </p>
          <div className="lad-final-cta-stack">
            <DownloadLink
              href={storeHref}
              className="btn btn-primary btn-large lad-hero-cta-btn"
              trackingPlacement="bienvenida_final_primary_cta"
              trackingPage="/bienvenida"
              trackingLabel={`final_primary_variant_${landingVariant}`}
              aria-label="Empieza ahora: descargar Anto en App Store. Incluye prueba gratis."
            >
              {primaryCtaText}
            </DownloadLink>
            <p className="lad-hero-cta-micro">Prueba de 3 días y control total desde tu App Store.</p>
            <p className="lad-cta-privacy">
              <Link href="/privacidad" className="lad-cta-privacy-link">
                Cómo tratamos tus datos
              </Link>
            </p>
          </div>
          <StoreCtaBlock
            storeHref={storeHref}
            title="También puedes usar el badge oficial"
            landingVariant={landingVariant}
          />
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
