import type { Locale } from '@/lib/i18n/config';

export type NexusStoreButtonCopy = {
  appleLabel: string;
  googleLabel: string;
  badge: string;
};

/** Etiquetas visibles del par de tiendas. El aria sigue en el copy de la página. */
export function nexusStoreButtonCopy(locale: Locale): NexusStoreButtonCopy {
  if (locale === 'pt') {
    return {
      appleLabel: 'Baixar na',
      googleLabel: 'Disponível no',
      badge: '1 dia grátis',
    };
  }
  if (locale === 'en') {
    return {
      appleLabel: 'Download on the',
      googleLabel: 'Get it on',
      badge: '1 day free',
    };
  }
  return {
    appleLabel: 'Descargar en',
    googleLabel: 'Disponible en',
    badge: '1 día gratis',
  };
}
