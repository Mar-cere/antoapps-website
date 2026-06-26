'use client';

import { useEffect } from 'react';
import { persistAttributionFromLocation } from '@/lib/analytics/attribution';
import {
  trackBienvenidaLandingViewGa,
  trackBienvenidaLandingViewMeta,
} from '@/lib/analytics/bienvenida-events';
import { initMetaPixel } from '@/lib/analytics/meta-pixel';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaLandingTrackerProps = {
  landingVariant: BienvenidaVariant;
  pagePath: string;
};

export default function BienvenidaLandingTracker({
  landingVariant,
  pagePath,
}: BienvenidaLandingTrackerProps) {
  useEffect(() => {
    persistAttributionFromLocation();
    trackBienvenidaLandingViewGa({ page: pagePath, landingVariant });

    // /bienvenida es la landing de campañas pagadas: el píxel de Meta y el
    // evento de conversión deben dispararse siempre para que Meta pueda
    // optimizar la entrega del anuncio. No se bloquea tras el banner de
    // cookies (interés legítimo en una página de aterrizaje de publicidad);
    // el resto de analítica sigue gobernada por el consentimiento.
    initMetaPixel();
    trackBienvenidaLandingViewMeta({ page: pagePath, landingVariant });
  }, [landingVariant, pagePath]);

  return null;
}
