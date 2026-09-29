import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

/**
 * Metadata de la home publicada (voz editorial home-v2).
 * El título nombra la app para una consulta ambigua; el H1 sigue siendo la frase editorial.
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
      'x-default': siteUrl('es', '/'),
    },
  };

  if (locale === 'en') {
    return {
      title: 'Anto, an emotional support app | Anxiety, between sessions',
      description:
        'Anto is an ongoing emotional support app for anxiety and quiet hours, between sessions or day to day. You write what keeps looping and leave with one concrete step. On iPhone and Android. Does not replace a human therapist. Free 1-day trial.',
      keywords:
        'Anto, ongoing emotional support, anxiety, quiet hours, between therapy sessions, grounding, CBT, iPhone, Android, free trial',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — When everything costs a little more',
        description: `Ongoing emotional support for anxiety and quiet hours, between sessions or day to day. On iPhone and Android. Does not replace a human therapist. ${trial.pricingNote}`,
        siteName: 'Anto',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — When everything costs a little more',
        description: `Ongoing emotional support for anxiety and quiet hours, between sessions or day to day. On iPhone and Android. Does not replace a human therapist. ${trial.short}.`,
      },
    };
  }

  return {
    title: 'Anto, app de acompañamiento emocional | Ansiedad, entre sesiones',
    description:
      'Anto es una app de acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. Escribes lo que da vueltas y te llevas un paso concreto. En iPhone y Android. No sustituye a un terapeuta. Prueba de 1 día gratis.',
    keywords:
      'Anto, acompañamiento emocional continuo, ansiedad, horas quietas, entre sesiones, grounding, TCC, iPhone, Android, prueba gratis',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. En iPhone y Android. No sustituye a un terapeuta. ${trial.pricingNote}`,
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. En iPhone y Android. No sustituye a un terapeuta. ${trial.short}.`,
    },
  };
}
