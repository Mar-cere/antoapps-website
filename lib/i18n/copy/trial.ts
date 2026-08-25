import type { Locale } from '@/lib/i18n/config';

export type TrialCopy = {
  short: string;
  label: string;
  faqPremiumAnswer: string;
  faqPricingAnswer: string;
  differentiatorSuffix: string;
  pricingNote: string;
  heroNote: string;
};

const trialCopy: Record<Locale, TrialCopy> = {
  es: {
    short: '1 día gratis',
    label: 'Prueba gratuita de 1 día',
    faqPremiumAnswer:
      'Sí. Un día completo, sin tarjeta. Acceso completo. Cancela cuando quieras. iPhone y Android.',
    faqPricingAnswer:
      'La descarga es gratis y tienes 1 día de prueba sin costo. Después, el plan mensual parte desde US$4.20. Puedes cancelar cuando quieras desde App Store (iPhone) o Google Play (Android).',
    differentiatorSuffix:
      'El modelo de precios es accesible y hay período de prueba de 1 día para explorar las funciones (según el flujo en la app).',
    pricingNote: 'Incluye 1 día gratis en App Store o Google Play al descargar.',
    heroNote: 'Prueba 1 día gratis en iPhone o Android.',
  },
  en: {
    short: '1-day free trial',
    label: '1-day free trial',
    faqPremiumAnswer:
      'Yes. A full day, no card. Full access. Cancel anytime. iPhone and Android.',
    faqPricingAnswer:
      'Download is free and includes a 1-day trial at no cost. After that, the monthly plan starts at US$4.20. You can cancel anytime in the App Store (iPhone) or Google Play (Android).',
    differentiatorSuffix:
      'Pricing is accessible, with a 1-day trial to explore features (depending on the in-app flow).',
    pricingNote: 'Includes a 1-day free trial on the App Store or Google Play when you download.',
    heroNote: 'Try it free for 1 day on iPhone or Android.',
  },
};

export function getTrialCopy(locale: Locale): TrialCopy {
  return trialCopy[locale];
}
