import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import type { BienvenidaV2TrustIcon } from '@/lib/i18n/copy/bienvenida';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeHeroCopy = {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  heroReview: { quote: string; author: string; source: string };
  ctaStoreLabel: string;
  ctaStoreText: string;
  ctaBadge: string;
  ctaMicro: string;
  ctaSecondary: string;
  storeAria: string;
  androidCta: string;
  androidLink: string;
  starsAria: string;
  trustItems: readonly { icon: BienvenidaV2TrustIcon; label: string }[];
  appHref: string;
};

const homeHeroCopy: Record<Locale, (trialShort: string) => HomeHeroCopy> = {
  es: (trialShort) => ({
    eyebrow: 'Apoyo emocional con IA',
    titlePrefix: 'Cuando tu mente\nno para,',
    titleHighlight: 'Anto te ayuda\na aterrizar.',
    subtitle: 'Escribe lo que sientes. Recibe claridad y un paso concreto en segundos.',
    heroReview: {
      quote: 'La uso cuando la ansiedad me despierta. En minutos bajo un poco la intensidad.',
      author: 'Camila S.',
      source: 'App Store',
    },
    ctaStoreLabel: 'Descargar en',
    ctaStoreText: 'App Store',
    ctaBadge: trialShort,
    ctaMicro: `${trialShort} · Sin tarjeta · Cancela cuando quieras`,
    ctaSecondary: 'Ver cómo funciona',
    storeAria: 'Descargar Anto en App Store',
    androidCta: 'Quiero acceso Android',
    androidLink: 'Solicitar acceso anticipado para Android',
    starsAria: '5 estrellas en App Store',
    trustItems: [
      { icon: 'lock', label: 'Privado' },
      { icon: 'no-card', label: 'Sin tarjeta' },
      { icon: 'chile', label: 'Hecho en Chile' },
    ],
    appHref: localePath('es', '/app'),
  }),
  en: (trialShort) => ({
    eyebrow: 'AI emotional support',
    titlePrefix: 'When your mind\nwon\'t slow down,',
    titleHighlight: 'Anto helps you\nland.',
    subtitle: 'Write what you feel. Get clarity and one concrete step in seconds.',
    heroReview: {
      quote: 'I use it when anxiety wakes me up. Within minutes the intensity eases a bit.',
      author: 'Camila S.',
      source: 'App Store',
    },
    ctaStoreLabel: 'Download on',
    ctaStoreText: 'App Store',
    ctaBadge: trialShort,
    ctaMicro: `${trialShort} · No card required · Cancel anytime`,
    ctaSecondary: 'See how it works',
    storeAria: 'Download Anto on the App Store',
    androidCta: 'I want Android access',
    androidLink: 'Request early access for Android',
    starsAria: '5 stars on the App Store',
    trustItems: [
      { icon: 'lock', label: 'Private' },
      { icon: 'no-card', label: 'No card' },
      { icon: 'chile', label: 'Made in Chile' },
    ],
    appHref: localePath('en', '/app'),
  }),
};

export function getHomeHeroCopy(locale: Locale): HomeHeroCopy {
  const trial = getTrialCopy(locale);
  return homeHeroCopy[locale](trial.short);
}
