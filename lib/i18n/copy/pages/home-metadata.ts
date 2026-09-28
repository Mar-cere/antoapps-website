import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { homeOgImageAlt, homeOgImageSize } from '@/lib/home/opengraph-image';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

/**
 * Metadata de la home publicada (voz editorial home-v2).
 * Title alineado al H1; description con intenciones naturales (ansiedad, entre sesiones).
 */
export function homePageMetadata(locale: Locale): Metadata {
  const trial = getTrialCopy(locale);
  const canonical = siteUrl(locale, '/');
  const ogImageUrl = siteUrl(locale, '/opengraph-image');

  const alternates = {
    canonical,
    languages: {
      es: siteUrl('es', '/'),
      en: siteUrl('en', '/'),
      'x-default': siteUrl('es', '/'),
    },
  };

  const ogImage = {
    url: ogImageUrl,
    width: homeOgImageSize.width,
    height: homeOgImageSize.height,
    alt: homeOgImageAlt(locale),
  };

  if (locale === 'en') {
    return {
      title: 'Anto — When everything costs a little more | Anxiety, between sessions',
      description:
        'Ongoing emotional support for anxiety and quiet hours, between sessions or day to day. Memory, one concrete step, and techniques such as CBT and grounding. On iPhone and Android. Does not replace a human therapist. Free 1-day trial.',
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
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — When everything costs a little more',
        description: `Ongoing emotional support for anxiety and quiet hours, between sessions or day to day. On iPhone and Android. Does not replace a human therapist. ${trial.short}.`,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: 'Anto — Cuando todo cuesta un poco más | Ansiedad, entre sesiones',
    description:
      'Acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. Memoria, un paso concreto y técnicas como TCC y grounding. En iPhone y Android. No sustituye a un terapeuta. Prueba de 1 día gratis.',
    keywords:
      'Anto, acompañamiento emocional continuo, ansiedad, horas quietas, entre sesiones, grounding, TCC, iPhone, Android, prueba gratis',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. En iPhone y Android. No sustituye a un terapeuta. ${trial.pricingNote}`,
      images: [ogImage],
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. En iPhone y Android. No sustituye a un terapeuta. ${trial.short}.`,
      images: [ogImageUrl],
    },
  };
}
