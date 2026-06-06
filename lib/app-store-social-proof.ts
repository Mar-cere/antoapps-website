/** Nota pública en App Store (Chile). Actualizar APP_STORE_REVIEW_COUNT periódicamente. */
export const APP_STORE_RATING = 5.0;

export const APP_STORE_REVIEW_COUNT = 12;

export const APP_STORE_RATING_STARS = '★★★★★';

export const APP_STORE_RATING_SHORT = `${APP_STORE_RATING_STARS} ${APP_STORE_RATING.toFixed(1)} en App Store`;

export const APP_STORE_RATING_LINE = 'Valorada con 5.0 en App Store';

export function appStoreRatingWithReviews(locale: 'es' | 'en'): string {
  const count =
    locale === 'es'
      ? `${APP_STORE_REVIEW_COUNT} reseñas`
      : `${APP_STORE_REVIEW_COUNT} reviews`;
  const store = locale === 'es' ? 'App Store' : 'the App Store';
  return `${APP_STORE_RATING_STARS} ${APP_STORE_RATING.toFixed(1)} (${count}) · ${store}`;
}
