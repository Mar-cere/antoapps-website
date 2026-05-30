import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeHeroCopy = {
  title: string;
  subtitle: string;
  downloadLead: string;
  downloadAndroid: string;
  statPrivate: string;
  statAvailable: string;
  ctaSecondary: string;
  storeAria: string;
  androidCta: string;
};

const homeHeroCopy: Record<Locale, (trialHeroNote: string) => HomeHeroCopy> = {
  es: (trialHeroNote) => ({
    title: 'Cuando te sientes sobrepasado, Anto te ayuda a aterrizar',
    subtitle: 'Escribe lo que te pasa y recibe guía clara, práctica y humana en segundos.',
    downloadLead: `Descarga Anto en App Store y empieza hoy. ${trialHeroNote}`,
    downloadAndroid:
      'En Android, solicita acceso anticipado con el correo de tu cuenta de Google Play.',
    statPrivate: 'privado y seguro',
    statAvailable: 'disponible',
    ctaSecondary: 'Ver cómo funciona',
    storeAria: 'Descargar Anto en App Store',
    androidCta: 'Quiero acceso Android',
  }),
  en: (trialHeroNote) => ({
    title: 'When you feel overwhelmed, Anto helps you land',
    subtitle: 'Write what you are going through and get clear, practical, human guidance in seconds.',
    downloadLead: `Download Anto on the App Store and start today. ${trialHeroNote}`,
    downloadAndroid: 'On Android, request early access with your Google Play account email.',
    statPrivate: 'private and secure',
    statAvailable: 'available',
    ctaSecondary: 'See how it works',
    storeAria: 'Download Anto on the App Store',
    androidCta: 'I want Android access',
  }),
};

export function getHomeHeroCopy(locale: Locale): HomeHeroCopy {
  const trial = getTrialCopy(locale);
  return homeHeroCopy[locale](trial.heroNote);
}
