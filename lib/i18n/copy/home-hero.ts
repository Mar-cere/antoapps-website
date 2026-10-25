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
  androidStoreAria: string;
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
    androidCta: 'Descargar en Google Play',
    androidLink: 'También en Google Play',
    androidStoreAria: 'Descargar Anto en Google Play',
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
    androidCta: 'Get it on Google Play',
    androidLink: 'Also on Google Play',
    androidStoreAria: 'Download Anto on Google Play',
    starsAria: '5 stars on the App Store',
    trustItems: [
      { icon: 'lock', label: 'Private' },
      { icon: 'no-card', label: 'No card' },
      { icon: 'chile', label: 'Made in Chile' },
    ],
    appHref: localePath('en', '/app'),
  }),
  pt: (trialShort) => ({
    eyebrow: 'Apoio emocional com IA',
    titlePrefix: 'Quando a sua mente\nnão para,',
    titleHighlight: 'a Anto ajuda\nvocê a aterrissar.',
    subtitle: 'Escreva o que você sente. Receba clareza e um passo concreto em segundos.',
    heroReview: {
      quote: 'Uso quando a ansiedade me acorda. Em minutos a intensidade baixa um pouco.',
      author: 'Camila S.',
      source: 'App Store',
    },
    ctaStoreLabel: 'Baixar na',
    ctaStoreText: 'App Store',
    ctaBadge: trialShort,
    ctaMicro: `${trialShort} · Sem cartão · Cancele quando quiser`,
    ctaSecondary: 'Ver como funciona',
    storeAria: 'Baixar a Anto na App Store',
    androidCta: 'Baixar no Google Play',
    androidLink: 'Também no Google Play',
    androidStoreAria: 'Baixar a Anto no Google Play',
    starsAria: '5 estrelas na App Store',
    trustItems: [
      { icon: 'lock', label: 'Privado' },
      { icon: 'no-card', label: 'Sem cartão' },
      { icon: 'chile', label: 'Feito no Chile' },
    ],
    appHref: localePath('pt', '/app'),
  }),
};

export function getHomeHeroCopy(locale: Locale): HomeHeroCopy {
  const trial = getTrialCopy(locale);
  return homeHeroCopy[locale](trial.short);
}
