import type { Locale } from '@/lib/i18n/config';

/** Precios de referencia en USD (equivalente a los planes en App Store). */
export const PRICING_USD = {
  month: 4.2,
  threeMonths: 12.62,
  sixMonths: 22.09,
  year: 42.09,
} as const;

export function formatUsdPrice(amount: number, locale: Locale = 'es'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
