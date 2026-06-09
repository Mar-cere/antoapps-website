import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { formatUsdPrice, PRICING_USD } from '@/lib/pricing/plans';

export type CompararPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

export type CompararAdvantage = {
  icon: string;
  title: string;
  description: string;
};

export type CompararFeatureRow = {
  label: string;
  value: string;
};

export type CompararPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
  };
  comparison: {
    anto: {
      name: string;
      logoAlt: string;
      features: CompararFeatureRow[];
      ctaLabel: string;
      ctaHref: string;
    };
    others: {
      placeholderIcon: string;
      title: string;
      features: CompararFeatureRow[];
      note: string;
    };
    advantagesTitle: string;
    advantages: CompararAdvantage[];
  };
  cta: {
    title: string;
    subtitle: string;
    downloadLabel: string;
    downloadHref: string;
    salesLabel: string;
    salesHref: string;
  };
};

const metadataByLocale: Record<Locale, CompararPageMetadata> = {
  es: {
    title: 'Comparar - Anto vs Otras Apps | Comparación Completa',
    description:
      'Compara Anto con otras apps de salud mental. Descubre por qué Anto es la mejor opción para tu bienestar mental.',
    openGraph: {
      title: 'Comparar - Anto vs Otras Apps',
      description: 'Compara Anto con otras opciones de salud mental.',
      url: 'https://antoapps.com/comparar',
    },
  },
  en: {
    title: 'Compare - Anto vs Other Apps | Full Comparison',
    description:
      'Compare Anto with other mental health apps. See why Anto is the best fit for your mental wellness.',
    openGraph: {
      title: 'Compare - Anto vs Other Apps',
      description: 'Compare Anto with other mental health options.',
      url: 'https://antoapps.com/en/comparar',
    },
  },
};

const advantagesEs: CompararAdvantage[] = [
  {
    icon: '🤖',
    title: 'IA Más Avanzada',
    description:
      'GPT-5.4 Mini optimizado específicamente para salud mental, no un chatbot genérico.',
  },
  {
    icon: '🚨',
    title: 'Detección Proactiva',
    description: 'Sistema único de detección automática de crisis que puede salvar vidas.',
  },
  {
    icon: '🔒',
    title: 'Privacidad Real',
    description: 'No hacemos tracking, no compartimos datos. Privacidad verdadera, no solo marketing.',
  },
  {
    icon: '💰',
    title: 'Mejor Precio',
    description: 'Más funcionalidades a un precio más accesible que la competencia.',
  },
  {
    icon: '📊',
    title: 'Análisis Avanzado',
    description: 'Análisis emocional en tiempo real con insights personalizados.',
  },
];

const advantagesEn: CompararAdvantage[] = [
  {
    icon: '🤖',
    title: 'More Advanced AI',
    description:
      'GPT-5.4 Mini tuned specifically for mental health, not a generic chatbot.',
  },
  {
    icon: '🚨',
    title: 'Proactive Detection',
    description: 'A unique automatic crisis detection system that can save lives.',
  },
  {
    icon: '🔒',
    title: 'Real Privacy',
    description: 'No tracking, no data sharing. True privacy, not just marketing.',
  },
  {
    icon: '💰',
    title: 'Better Price',
    description: 'More features at a more accessible price than competitors.',
  },
  {
    icon: '📊',
    title: 'Advanced Analysis',
    description: 'Real-time emotional analysis with personalized insights.',
  },
];

function buildCompararPageCopy(locale: Locale): CompararPageCopy {
  const trial = getTrialCopy(locale);
  const isEn = locale === 'en';

  if (isEn) {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Compare',
      },
      hero: {
        title: 'Compare Anto with Other Options',
        subtitle: 'Find the best solution for your mental health needs',
      },
      comparison: {
        anto: {
          name: 'Anto',
          logoAlt: 'Anto',
          features: [
            { label: 'Therapeutic AI Assistant', value: '✅ Advanced' },
            { label: 'Crisis Detection', value: '✅ Automatic 24/7' },
            { label: 'Emotional Analysis', value: '✅ Real-time' },
            { label: 'Privacy', value: '✅ E2E, no tracking' },
            { label: 'Initial trial', value: `✅ ${trial.short}` },
            {
              label: 'Price',
              value: `✅ From ${formatUsdPrice(PRICING_USD.month, 'en')}/month`,
            },
          ],
          ctaLabel: 'Download on the App Store',
          ctaHref: localePath(locale, '/bienvenida'),
        },
        others: {
          placeholderIcon: '📱',
          title: 'Other Mental Health Apps',
          features: [
            { label: 'Therapeutic AI Assistant', value: '⚠️ Basic or limited' },
            { label: 'Crisis Detection', value: '❌ Manual or limited' },
            { label: 'Emotional Analysis', value: '⚠️ Basic' },
            { label: 'Privacy', value: '⚠️ Varies; some use tracking' },
            { label: 'Price', value: '⚠️ $15–$50/month or more' },
          ],
          note:
            'Features vary by app. Anto stands out for its comprehensive approach and advanced technology.',
        },
        advantagesTitle: 'Key Advantages of Anto',
        advantages: advantagesEn,
      },
      cta: {
        title: 'Ready to Try Anto?',
        subtitle: `Join thousands of users already improving their mental wellness with Anto. ${trial.short}, no credit card required.`,
        downloadLabel: 'Download on the App Store',
        downloadHref: localePath(locale, '/bienvenida'),
        salesLabel: 'Talk to Sales',
        salesHref: localePath(locale, '/contacto'),
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Comparar',
    },
    hero: {
      title: 'Compara Anto con Otras Opciones',
      subtitle: 'Encuentra la mejor solución para tus necesidades de salud mental',
    },
    comparison: {
      anto: {
        name: 'Anto',
        logoAlt: 'Anto',
        features: [
          { label: 'Asistente AI Terapéutico', value: '✅ Avanzado' },
          { label: 'Detección de Crisis', value: '✅ Automática 24/7' },
          { label: 'Análisis Emocional', value: '✅ En tiempo real' },
          { label: 'Privacidad', value: '✅ E2E, sin tracking' },
          { label: 'Prueba inicial', value: `✅ ${trial.short}` },
          {
            label: 'Precio',
            value: `✅ Desde ${formatUsdPrice(PRICING_USD.month, 'es')}/mes`,
          },
        ],
        ctaLabel: 'Descargar en App Store',
        ctaHref: localePath(locale, '/bienvenida'),
      },
      others: {
        placeholderIcon: '📱',
        title: 'Otras Apps de Salud Mental',
        features: [
          { label: 'Asistente AI Terapéutico', value: '⚠️ Básico o limitado' },
          { label: 'Detección de Crisis', value: '❌ Manual o limitada' },
          { label: 'Análisis Emocional', value: '⚠️ Básico' },
          { label: 'Privacidad', value: '⚠️ Variable, algunos hacen tracking' },
          { label: 'Precio', value: '⚠️ $15-$50/mes o más' },
        ],
        note:
          'Las características varían según la app. Anto se destaca por su enfoque integral y tecnología avanzada.',
      },
      advantagesTitle: 'Ventajas Clave de Anto',
      advantages: advantagesEs,
    },
    cta: {
      title: '¿Listo para Probar Anto?',
      subtitle: `Únete a miles de usuarios que ya están mejorando su bienestar mental con Anto. ${trial.short}, sin tarjeta de crédito.`,
      downloadLabel: 'Descargar en App Store',
      downloadHref: localePath(locale, '/bienvenida'),
      salesLabel: 'Hablar con Ventas',
      salesHref: localePath(locale, '/contacto'),
    },
  };
}

const compararPageCopyCache: Partial<Record<Locale, CompararPageCopy>> = {};

export function compararPageMetadata(locale: Locale): Metadata {
  const meta = metadataByLocale[locale];
  return buildLocalizedPageMetadata(locale, '/comparar', meta);
}

export function getCompararPageCopy(locale: Locale): CompararPageCopy {
  if (!compararPageCopyCache[locale]) {
    compararPageCopyCache[locale] = buildCompararPageCopy(locale);
  }
  return compararPageCopyCache[locale]!;
}
