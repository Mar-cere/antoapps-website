import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeCtaCopy = {
  title: string;
  subtitle: string;
  storeAria: string;
  privacyLabel: string;
  privacyHref: string;
  androidCta: string;
  trackingPage: string;
};

export function getHomeCtaCopy(locale: Locale): HomeCtaCopy {
  const trial = getTrialCopy(locale);

  if (locale === 'en') {
    return {
      title: 'Ready to get started?',
      subtitle: `Download Anto on your device: account setup and full use happen in the mobile app. ${trial.heroNote}`,
      storeAria: 'Download Anto on the App Store',
      privacyLabel: 'View Privacy Policy',
      privacyHref: localePath('en', '/privacidad'),
      androidCta: 'Android early access',
      trackingPage: '/en',
    };
  }

  return {
    title: '¿Listo para comenzar?',
    subtitle: `Descarga Anto en tu dispositivo: la cuenta y el uso completo son en la aplicación móvil. ${trial.heroNote}`,
    storeAria: 'Descargar Anto en App Store',
    privacyLabel: 'Ver Política de Privacidad',
    privacyHref: localePath('es', '/privacidad'),
    androidCta: 'Acceso anticipado Android',
    trackingPage: '/',
  };
}
