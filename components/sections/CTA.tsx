import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { APP_STORE_BADGE_SVG_PATH, appStoreHref } from '@/lib/download-links';
import { APP_TRIAL_HERO_NOTE } from '@/lib/trial-copy';

export default function CTA() {
  return (
    <section id="descargar" className="cta" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">¿Listo para comenzar?</h2>
        <p className="section-subtitle reveal-on-scroll">
          Descarga Anto en tu dispositivo: la cuenta y el uso completo son en la aplicación móvil.{' '}
          {APP_TRIAL_HERO_NOTE}
        </p>
        <div className="cta-buttons">
          <DownloadLink
            href={appStoreHref()}
            className="store-badge-link"
            trackingPlacement="home_cta_store_badge"
            trackingPage="/"
            trackingLabel="home_cta_badge"
            aria-label="Descargar Anto en App Store"
          >
            <Image
              src={APP_STORE_BADGE_SVG_PATH}
              alt=""
              width={120}
              height={40}
              className="store-badge-img"
            />
          </DownloadLink>
          <Link href="/privacidad" className="btn btn-secondary btn-large">
            Ver Política de Privacidad
          </Link>
        </div>
        <div className="section-cta-row section-cta-row--flex">
          <AndroidEarlyAccessForm
            id="android-early-access-cta"
            placement="home_cta_android_early_access"
            page="/"
            compact
            buttonLabel="Acceso anticipado Android"
          />
        </div>
      </div>
    </section>
  );
}

