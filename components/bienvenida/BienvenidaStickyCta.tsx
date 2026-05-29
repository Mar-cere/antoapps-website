'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';

type BienvenidaStickyCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
};

function stickyLabel(variant: 'A' | 'B'): string {
  return variant === 'B' ? 'Descargar — 3 días gratis' : 'Empieza — 3 días gratis';
}

export default function BienvenidaStickyCta({ storeHref, landingVariant }: BienvenidaStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById('descargar');
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`lad-sticky-cta ${visible ? 'is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <DownloadLink
        href={storeHref}
        className="btn btn-primary lad-sticky-cta-btn"
        trackingPlacement="bienvenida_sticky_cta"
        trackingPage="/bienvenida"
        trackingLabel={`sticky_variant_${landingVariant}`}
        aria-label="Descargar Anto en App Store. Prueba gratis de 3 días."
      >
        {stickyLabel(landingVariant)}
      </DownloadLink>
    </div>
  );
}
