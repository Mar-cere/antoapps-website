import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

/**
 * Metadata de la home publicada (voz editorial home-v2).
 * Title y description responden a «qué es Anto» / «what is Anto» / «o que é a Anto».
 * El H1 sigue siendo la frase editorial.
 *
 * La imagen social no se declara aquí. Vive en `app/(site)/opengraph-image.tsx`
 * (y en `app/(site)/en/opengraph-image.tsx`). Como el archivo está dentro del
 * route group `(site)`, Next la publica en `/opengraph-image-<sufijo>`, no en
 * `/opengraph-image`. Fijar `images` sustituye esa URL y el HTML anuncia un 404.
 */
export function homePageMetadata(locale: Locale): Metadata {
  const trial = getTrialCopy(locale);
  const canonical = siteUrl(locale, '/');

  const alternates = {
    canonical,
    languages: {
      es: siteUrl('es', '/'),
      en: siteUrl('en', '/'),
      'pt-BR': siteUrl('pt', '/'),
      'x-default': siteUrl('es', '/'),
    },
  };

  if (locale === 'pt') {
    return {
      title: 'O que é a Anto: app de acompanhamento emocional',
      description:
        'A Anto é um app para escrever o que fica em loop e sair com um passo concreto. No iPhone e no Android. Não substitui um terapeuta. Inclui 1 dia de teste.',
      keywords:
        'Anto, o que é a Anto, acompanhamento emocional, passo concreto, iPhone, Android, teste grátis',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — Quando tudo custa um pouco mais',
        description: `A Anto é um app de acompanhamento emocional. Você escreve o que fica em loop e sai com um passo concreto. No iPhone e no Android. Não substitui um terapeuta. ${trial.pricingNote}`,
        siteName: 'Anto',
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — Quando tudo custa um pouco mais',
        description: `A Anto é um app de acompanhamento emocional. Você escreve o que fica em loop e sai com um passo concreto. No iPhone e no Android. Não substitui um terapeuta. ${trial.short}.`,
      },
    };
  }

  if (locale === 'en') {
    return {
      title: 'What is Anto? An emotional support app',
      description:
        'Anto is an app to write looping thoughts and leave with one concrete step. On iPhone and Android. Does not replace a therapist. Includes a 1-day trial.',
      keywords:
        'Anto, what is Anto, emotional support app, concrete step, iPhone, Android, free trial',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — When everything costs a little more',
        description: `Anto is an emotional support app. You write looping thoughts and leave with one concrete step. On iPhone and Android. Does not replace a therapist. ${trial.pricingNote}`,
        siteName: 'Anto',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — When everything costs a little more',
        description: `Anto is an emotional support app. You write looping thoughts and leave with one concrete step. On iPhone and Android. Does not replace a therapist. ${trial.short}.`,
      },
    };
  }

  return {
    title: 'Qué es Anto: app de acompañamiento emocional',
    description:
      'Anto es una app para escribir lo que te da vueltas y salir con un paso concreto. En iPhone y Android. No sustituye a un terapeuta. Incluye 1 día de prueba.',
    keywords:
      'Anto, qué es Anto, acompañamiento emocional, paso concreto, iPhone, Android, prueba gratis',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Anto es una app de acompañamiento emocional. Escribes lo que te da vueltas y sales con un paso concreto. En iPhone y Android. No sustituye a un terapeuta. ${trial.pricingNote}`,
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Anto es una app de acompañamiento emocional. Escribes lo que te da vueltas y sales con un paso concreto. En iPhone y Android. No sustituye a un terapeuta. ${trial.short}.`,
    },
  };
}
