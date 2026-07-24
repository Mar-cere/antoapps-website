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

export type CompararTableRow = {
  dimension: string;
  anto: string;
  others: string;
};

export type CompararDifferentiator = {
  title: string;
  description: string;
};

export type CompararPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
  };
  intro: string;
  table: {
    caption: string;
    colAnto: string;
    colOthers: string;
    colDimension: string;
    rows: CompararTableRow[];
  };
  differentiators: {
    title: string;
    items: CompararDifferentiator[];
  };
  note: string;
  cta: {
    title: string;
    subtitle: string;
    downloadLabel: string;
    downloadHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const metadataByLocale: Record<Locale, CompararPageMetadata> = {
  es: {
    title: 'Anto vs chatbots y apps de bienestar | Comparar',
    description:
      'Compara Anto con chatbots genéricos y apps de bienestar: acompañamiento emocional continuo para ansiedad, privacidad, un paso concreto y prueba en iPhone. Complementa — no reemplaza — a un terapeuta humano.',
    openGraph: {
      title: 'Anto vs chatbots y apps de bienestar',
      description:
        'Acompañamiento emocional continuo frente a chat genérico. Claridad, privacidad y un paso concreto — en iPhone.',
      url: 'https://antoapps.com/comparar',
    },
  },
  en: {
    title: 'Anto vs chatbots and wellness apps | Compare',
    description:
      'Compare Anto with generic chatbots and wellness apps: ongoing emotional support for anxiety, privacy, one concrete step, and a trial on iPhone. Complements — does not replace — a human therapist.',
    openGraph: {
      title: 'Anto vs chatbots and wellness apps',
      description:
        'Ongoing emotional support versus generic chat. Clarity, privacy, and one concrete step — on iPhone.',
      url: 'https://antoapps.com/en/comparar',
    },
  },
};

function buildCompararPageCopy(locale: Locale): CompararPageCopy {
  const trial = getTrialCopy(locale);
  const priceMonth = formatUsdPrice(PRICING_USD.month, locale);

  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Compare',
      },
      hero: {
        title: 'Anto beside the usual options',
        subtitle:
          'Not another generic chatbot. A place to land between sessions — or on the days therapy is not available.',
      },
      intro:
        'People often compare Anto with ChatGPT-style chat, meditation apps, or waiting until the next appointment. The differences below are honest: Anto is ongoing emotional support for anxiety and quiet hours. It uses AI in the background. It complements care; it does not replace a human therapist.',
      table: {
        caption: 'How Anto compares with typical chatbots and wellness apps',
        colDimension: 'What you need',
        colAnto: 'Anto',
        colOthers: 'Typical chatbots & wellness apps',
        rows: [
          {
            dimension: 'Role',
            anto: 'Ongoing emotional support — write, leave with clarity',
            others: 'Generic chat, meditation tracks, or mood logs',
          },
          {
            dimension: 'Between sessions',
            anto: 'Built for the hours when your mind will not slow down',
            others: 'Often a one-off reply or a scheduled exercise',
          },
          {
            dimension: 'What you leave with',
            anto: 'Clarity and one concrete next step',
            others: 'Advice that can feel broad or forgettable',
          },
          {
            dimension: 'Memory',
            anto: 'Themes and patterns over time',
            others: 'Often resets; little continuity',
          },
          {
            dimension: 'Privacy',
            anto: 'Conversations stay yours — no ads, no data sold',
            others: 'Varies; some products track or train on chats',
          },
          {
            dimension: 'Hard moments',
            anto: 'Crisis-aware alerts and resources when needed',
            others: 'Often a static help link — or nothing',
          },
          {
            dimension: 'Platform',
            anto: 'iPhone (App Store); Android early access',
            others: 'Varies by product',
          },
          {
            dimension: 'Price',
            anto: `From ${priceMonth}/month · ${trial.short}`,
            others: 'Often higher, freemium walls, or ad-supported',
          },
          {
            dimension: 'Therapy',
            anto: 'Complements a human therapist — does not replace one',
            others: 'Sometimes marketed as a substitute; often is not',
          },
        ],
      },
      differentiators: {
        title: 'Where Anto is clearer',
        items: [
          {
            title: 'A companion, not a novelty chat',
            description:
              'Designed for anxiety and quiet hours — continuity, theme memory, and techniques you can return to.',
          },
          {
            title: 'One concrete step',
            description:
              'You leave with something to try, not only a longer conversation.',
          },
          {
            title: 'Privacy without the pitch',
            description:
              'No ads in the product loop. Your conversations are not sold.',
          },
          {
            title: 'Honest about limits',
            description:
              'AI assists in the background. A human therapist remains the stronger choice for clinical care.',
          },
        ],
      },
      note:
        'Features vary by competitor. This page compares categories, not named brands. Always check each product’s own privacy and clinical claims.',
      cta: {
        title: 'When your mind will not slow down',
        subtitle: `Try Anto on iPhone. ${trial.short}. No card required to start.`,
        downloadLabel: 'Download on the App Store',
        downloadHref: localePath(locale, '/bienvenida'),
        secondaryLabel: 'Contact',
        secondaryHref: localePath(locale, '/contacto'),
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
      title: 'Anto frente a las opciones habituales',
      subtitle:
        'No es otro chatbot genérico. Un lugar donde aterrizar entre sesiones — o en los días en que la terapia no está.',
    },
    intro:
      'Quien evalúa Anto suele compararlo con un chat tipo ChatGPT, apps de meditación o esperar a la próxima cita. Las diferencias abajo son honestas: Anto es acompañamiento emocional continuo para ansiedad y horas quietas. Usa asistencia de IA en segundo plano. Complementa la atención; no reemplaza a un terapeuta humano.',
    table: {
      caption: 'Cómo se compara Anto con chatbots y apps de bienestar típicas',
      colDimension: 'Qué necesitas',
      colAnto: 'Anto',
      colOthers: 'Chatbots y apps de bienestar típicas',
      rows: [
        {
          dimension: 'Rol',
          anto: 'Acompañamiento emocional continuo — escribe y sal con claridad',
          others: 'Chat genérico, pistas de meditación o registros de ánimo',
        },
        {
          dimension: 'Entre sesiones',
          anto: 'Hecho para las horas en que la mente no para',
          others: 'Suele ser una respuesta suelta o un ejercicio programado',
        },
        {
          dimension: 'Con qué te quedas',
          anto: 'Claridad y un siguiente paso concreto',
          others: 'Consejos amplios que a veces se olvidan',
        },
        {
          dimension: 'Memoria',
          anto: 'Temas y patrones con el tiempo',
          others: 'A menudo reinicia; poca continuidad',
        },
        {
          dimension: 'Privacidad',
          anto: 'Tus conversaciones son tuyas — sin anuncios ni venta de datos',
          others: 'Variable; algunos rastrean o entrenan con el chat',
        },
        {
          dimension: 'Momentos difíciles',
          anto: 'Alertas y recursos si hace falta apoyo urgente',
          others: 'A menudo un enlace estático — o nada',
        },
        {
          dimension: 'Plataforma',
          anto: 'iPhone (App Store); Android en acceso anticipado',
          others: 'Varía según el producto',
        },
        {
          dimension: 'Precio',
          anto: `Desde ${priceMonth}/mes · ${trial.short}`,
          others: 'A menudo más alto, muros freemium o con publicidad',
        },
        {
          dimension: 'Terapia',
          anto: 'Complementa a un terapeuta humano — no lo reemplaza',
          others: 'A veces se vende como sustituto; casi nunca lo es',
        },
      ],
    },
    differentiators: {
      title: 'Donde Anto se entiende mejor',
      items: [
        {
          title: 'Acompañamiento, no un chat de novedad',
          description:
            'Pensado para ansiedad y horas quietas: continuidad, memoria de temas y técnicas a las que volver.',
        },
        {
          title: 'Un paso concreto',
          description:
            'Sales con algo que probar, no solo con una conversación más larga.',
        },
        {
          title: 'Privacidad sin discurso',
          description:
            'Sin anuncios en el producto. Tus conversaciones no se venden.',
        },
        {
          title: 'Límites claros',
          description:
            'La IA asiste en segundo plano. Un terapeuta humano sigue siendo lo más recomendable para cuidado clínico.',
        },
      ],
    },
    note:
      'Las funciones varían entre productos. Esta página compara categorías, no marcas concretas. Revisa siempre la privacidad y los límites clínicos de cada app.',
    cta: {
      title: 'Cuando tu mente no para',
      subtitle: `Prueba Anto en iPhone. ${trial.short}. Sin tarjeta para empezar.`,
      downloadLabel: 'Descargar en App Store',
      downloadHref: localePath(locale, '/bienvenida'),
      secondaryLabel: 'Contacto',
      secondaryHref: localePath(locale, '/contacto'),
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
