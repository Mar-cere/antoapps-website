'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaStickyCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
  pagePath: string;
  copy: BienvenidaCopy;
};

export default function BienvenidaStickyCta({
  storeHref,
  landingVariant,
  pagePath,
  copy,
}: BienvenidaStickyCtaProps) {
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
        trackingPage={pagePath}
        trackingLabel={`sticky_variant_${landingVariant}`}
        aria-label={copy.trial.stickyAria}
      >
        {copy.trial.stickyCta[landingVariant]}
      </DownloadLink>
    </div>
  );
}
