import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { homeOgImageAlt, homeOgImageSize } from '@/lib/home/opengraph-image';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

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
      title: 'Anto — A place for your mind to land | AI emotional support',
      description:
        'Anto combines advanced AI with validated clinical protocols to support you when you need it most. Techniques hub, insights graph, PHQ-9/GAD-7 scales, 8 evidence-based protocols, crisis detection, and bilingual ES/EN support. 1-day free trial on iPhone. Not a substitute for clinical care.',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — A place for your mind to land',
        description: `AI emotional support with clinical protocols, PHQ-9/GAD-7 scales, and crisis detection. ${trial.short} on iPhone.`,
        siteName: 'Anto',
        locale: 'en_US',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — A place for your mind to land',
        description: `AI emotional support with clinical protocols. ${trial.short} on iPhone.`,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: 'Anto — Tu mente tiene un lugar donde aterrizar | Apoyo emocional con IA',
    description:
      'Anto combina IA avanzada con protocolos clínicos validados para acompañarte cuando más lo necesitas. Hub de técnicas, grafo de insights, escalas PHQ-9/GAD-7, 8 protocolos basados en evidencia, detección de crisis y soporte bilingüe ES/EN. 1 día de prueba gratis en iPhone. No sustituye atención clínica.',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Tu mente tiene un lugar donde aterrizar',
      description: `Apoyo emocional con IA, protocolos clínicos, escalas PHQ-9/GAD-7 y detección de crisis. ${trial.pricingNote}`,
      images: [ogImage],
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Tu mente tiene un lugar donde aterrizar',
      description: `Apoyo emocional con IA y protocolos clínicos validados. ${trial.short} en iPhone.`,
      images: [ogImageUrl],
    },
  };
}
