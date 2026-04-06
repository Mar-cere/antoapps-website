import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';

export default function CTA() {
  return (
    <section id="descargar" className="cta" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">¿Listo para comenzar?</h2>
        <p className="section-subtitle reveal-on-scroll">
          Descarga Anto en tu dispositivo: la cuenta y el uso completo son en la aplicación móvil.
        </p>
        <div className="cta-buttons">
          <DownloadLink href={appStoreHref()} className="btn btn-primary btn-large" aria-label="Descargar en App Store">
            App Store
          </DownloadLink>
          <DownloadLink
            href={googlePlayHref()}
            className="btn btn-secondary btn-large"
            aria-label="Descargar en Google Play"
          >
            Google Play
          </DownloadLink>
          <Link href="/privacidad" className="btn btn-secondary btn-large">
            Ver Política de Privacidad
          </Link>
        </div>
      </div>
    </section>
  );
}

