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
      'Sí, ofrecemos 1 día completo de prueba gratis en el plan Premium. No se requiere tarjeta de crédito para comenzar, y puedes cancelar en cualquier momento sin compromiso. Durante la prueba tendrás acceso completo a todas las funciones Premium, incluyendo análisis emocional avanzado, detección de crisis proactiva, y todas las herramientas de bienestar. Si decides continuar después de la prueba, tu suscripción comenzará automáticamente.',
    faqPricingAnswer:
      'La descarga es gratis y tienes 1 día de prueba sin costo. Después, el plan mensual parte desde US$4.20. Puedes cancelar cuando quieras desde App Store.',
    differentiatorSuffix:
      'El modelo de precios es accesible y hay período de prueba de 1 día para explorar las funciones (según el flujo en la app).',
    pricingNote: 'Incluye 1 día gratis en App Store al descargar.',
    heroNote: 'Prueba 1 día gratis en iPhone.',
  },
  en: {
    short: '1-day free trial',
    label: '1-day free trial',
    faqPremiumAnswer:
      'Yes. Premium includes a full 1-day free trial. No credit card is required to start, and you can cancel anytime. During the trial you get full access to Premium features, including advanced emotional analysis, proactive crisis detection, and all wellness tools. If you continue after the trial, your subscription starts automatically.',
    faqPricingAnswer:
      'Download is free and includes a 1-day trial at no cost. After that, the monthly plan starts at US$4.20. You can cancel anytime in the App Store.',
    differentiatorSuffix:
      'Pricing is accessible, with a 1-day trial to explore features (depending on the in-app flow).',
    pricingNote: 'Includes a 1-day free trial on the App Store when you download.',
    heroNote: 'Try it free for 1 day on iPhone.',
  },
};

export function getTrialCopy(locale: Locale): TrialCopy {
  return trialCopy[locale];
}
