import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

export type NotFoundCopy = {
  title: string;
  lead: string;
  homeLabel: string;
  homeHref: string;
  downloadLabel: string;
  downloadHref: string;
};

const copy: Record<Locale, Omit<NotFoundCopy, 'homeHref' | 'downloadHref'>> = {
  es: {
    title: 'Página no encontrada',
    lead: 'Lo sentimos, la página que buscas no existe.',
    homeLabel: 'Volver al Inicio',
    downloadLabel: 'Descargar',
  },
  en: {
    title: 'Page not found',
    lead: 'Sorry, the page you are looking for does not exist.',
    homeLabel: 'Back to Home',
    downloadLabel: 'Download',
  },
};

export function getNotFoundCopy(locale: Locale): NotFoundCopy {
  const c = copy[locale];
  return {
    ...c,
    homeHref: localePath(locale, '/'),
    downloadHref: localePath(locale, '/bienvenida'),
  };
}
