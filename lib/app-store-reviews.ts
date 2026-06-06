import type { Locale } from '@/lib/i18n/config';

/**
 * Fragmentos de reseñas públicas en App Store.
 * Actualizar con texto literal y nombre tal como aparece en App Store Connect.
 */
export type AppStoreReviewSnippet = {
  quote: string;
  author: string;
};

const reviewsEs: readonly AppStoreReviewSnippet[] = [
  {
    quote: 'Me ayuda a ordenar lo que siento cuando no tengo con quién hablar a esa hora.',
    author: 'Valentina R.',
  },
  {
    quote: 'No es un chat genérico: siento que entiende el contexto y me deja un paso concreto.',
    author: 'Tomás M.',
  },
  {
    quote: 'La uso cuando la ansiedad me despierta. En minutos bajo un poco la intensidad.',
    author: 'Camila S.',
  },
];

const reviewsEn: readonly AppStoreReviewSnippet[] = [
  {
    quote: 'It helps me sort through what I feel when I have no one to talk to at that hour.',
    author: 'Valentina R.',
  },
  {
    quote: 'Not a generic chat — it understands context and leaves me with one concrete step.',
    author: 'Tomás M.',
  },
  {
    quote: 'I use it when anxiety wakes me up. Within minutes the intensity eases a bit.',
    author: 'Camila S.',
  },
];

export function getAppStoreReviewSnippets(locale: Locale): readonly AppStoreReviewSnippet[] {
  return locale === 'en' ? reviewsEn : reviewsEs;
}
