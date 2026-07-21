import { localePath, type Locale } from '@/lib/i18n/config';
import type { HomeLandingScreenshotKey } from '@/lib/assets/app-screenshots';
import { PRICING_USD } from '@/lib/pricing/plans';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeV2Moment = {
  id: string;
  title: string;
  body: string;
  screenshot: HomeLandingScreenshotKey;
  reverse?: boolean;
};

export type HomeV2PriceCard = {
  period: string;
  price: string;
  unit: string;
  save?: string;
  popular?: boolean;
};

export type HomeV2Copy = {
  hero: {
    brand: string;
    titleLine1: string;
    titleAccent: string;
    support: string;
    ctaStoreLabel: string;
    ctaStoreText: string;
    ctaBadge: string;
    ctaMicro: string;
    storeAria: string;
    androidLink: string;
    androidCta: string;
    screenshot: HomeLandingScreenshotKey;
  };
  recognize: {
    lead: string;
    body: string;
    imageAlt: string;
  };
  moments: readonly HomeV2Moment[];
  reviews: {
    title: string;
    sourceLabel: string;
    starsAria: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    popularBadge: string;
    cards: readonly HomeV2PriceCard[];
    ctaMicro: string;
  };
  faq: {
    title: string;
    items: readonly { question: string; answer: string }[];
    moreHref: string;
    moreLabel: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    imageAlt: string;
  };
};

function buildHomeV2Copy(locale: Locale): HomeV2Copy {
  const trial = getTrialCopy(locale);

  if (locale === 'en') {
    return {
      hero: {
        brand: 'Anto',
        titleLine1: 'When everything costs',
        titleAccent: 'a little more.',
        support:
          'Ongoing emotional support for quiet hours: write what you feel, leave with clarity and one concrete step. Complements care — does not replace a human therapist.',
        ctaStoreLabel: 'Download on',
        ctaStoreText: 'App Store',
        ctaBadge: trial.short,
        ctaMicro: `${trial.short} · No card · Cancel anytime`,
        storeAria: 'Download Anto on the App Store',
        androidLink: 'Android early access',
        androidCta: 'I want Android access',
        screenshot: 'chatAnxiety',
      },
      recognize: {
        lead: 'Some days you are not exactly unwell.',
        body: 'Everything just costs a little more. Anto is for those quiet hours. No appointment required.',
        imageAlt: 'Rainy night desk with an open notebook and a warm lamp',
      },
      moments: [
        {
          id: 'patterns',
          title: 'See what keeps returning.',
          body: 'Connections between conversations and what actually helped, without noise.',
          screenshot: 'sessionSummary',
        },
        {
          id: 'step',
          title: 'Leave with one concrete step.',
          body: 'Techniques when you want them. Not a lecture. A next move.',
          screenshot: 'tccProtocol',
          reverse: true,
        },
      ],
      reviews: {
        title: 'Real people. Difficult nights.',
        sourceLabel: 'Public reviews on the App Store',
        starsAria: '5 stars on the App Store',
      },
      pricing: {
        title: 'Start when you need it.',
        subtitle: 'One free day. Full access on every plan. Cancel anytime.',
        popularBadge: 'Most chosen',
        cards: [
          { period: '1 month', price: `$${PRICING_USD.month.toFixed(2)}`, unit: 'USD / month' },
          {
            period: '3 months',
            price: `$${PRICING_USD.threeMonths.toFixed(2)}`,
            unit: 'USD',
            popular: true,
          },
          {
            period: '6 months',
            price: `$${PRICING_USD.sixMonths.toFixed(2)}`,
            unit: 'USD',
            save: 'Save 12%',
          },
          {
            period: '1 year',
            price: `$${PRICING_USD.year.toFixed(2)}`,
            unit: 'USD',
            save: 'Save 17%',
          },
        ],
        ctaMicro: `${trial.short} · No card required`,
      },
      faq: {
        title: 'What people usually ask.',
        items: [
          {
            question: 'What is Anto?',
            answer:
              'Anto is an app for ongoing emotional support: a place to land between sessions or day to day. It uses AI assistance in the background. It does not replace clinical care — a human therapist or professional remains the stronger recommendation. Available on iPhone.',
          },
          {
            question: 'Are my conversations private?',
            answer:
              'Yes. Conversations are encrypted and we do not sell or share your information with third parties.',
          },
          {
            question: 'Does Anto replace therapy?',
            answer:
              'No. Anto accompanies you between sessions or on days when you need a place to land. It is not a substitute for professional care.',
          },
          {
            question: 'Is there a free trial?',
            answer: trial.faqPremiumAnswer,
          },
        ],
        moreHref: localePath('en', '/recursos'),
        moreLabel: 'More resources',
      },
      finalCta: {
        title: 'When the intensity needs to ease.',
        subtitle: 'Start today. One free day, no card.',
        imageAlt: 'Person sitting on the edge of a bed at dusk, facing the window',
      },
    };
  }

  return {
    hero: {
      brand: 'Anto',
      titleLine1: 'Cuando todo cuesta',
      titleAccent: 'un poco más.',
      support:
        'Acompañamiento emocional continuo para las horas quietas: escribe lo que sientes, sal con claridad y un paso concreto. Complementa — no reemplaza — a un terapeuta humano.',
      ctaStoreLabel: 'Descargar en',
      ctaStoreText: 'App Store',
      ctaBadge: trial.short,
      ctaMicro: `${trial.short} · Sin tarjeta · Cancela cuando quieras`,
      storeAria: 'Descargar Anto en App Store',
      androidLink: 'Acceso anticipado Android',
      androidCta: 'Quiero acceso Android',
      screenshot: 'chatAnxiety',
    },
    recognize: {
      lead: 'Hay días en que no estás exactamente mal.',
      body: 'Solo sientes que todo cuesta un poco más. Anto está para esas horas quietas. Sin cita previa.',
      imageAlt: 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida',
    },
    moments: [
      {
        id: 'patterns',
        title: 'Ves qué se repite.',
        body: 'Conexiones entre conversaciones y lo que de verdad ayudó, sin ruido.',
        screenshot: 'sessionSummary',
      },
      {
        id: 'step',
        title: 'Sales con un paso concreto.',
        body: 'Técnicas cuando las quieras. No una clase. Un siguiente movimiento.',
        screenshot: 'tccProtocol',
        reverse: true,
      },
    ],
    reviews: {
      title: 'Personas reales. Noches difíciles.',
      sourceLabel: 'Reseñas públicas en App Store',
      starsAria: '5 estrellas en App Store',
    },
    pricing: {
      title: 'Empieza cuando lo necesites.',
      subtitle: 'Un día gratis. Acceso completo en todos los planes. Cancela cuando quieras.',
      popularBadge: 'El más elegido',
      cards: [
        { period: '1 mes', price: `$${PRICING_USD.month.toFixed(2)}`, unit: 'USD / mes' },
        {
          period: '3 meses',
          price: `$${PRICING_USD.threeMonths.toFixed(2)}`,
          unit: 'USD',
          popular: true,
        },
        {
          period: '6 meses',
          price: `$${PRICING_USD.sixMonths.toFixed(2)}`,
          unit: 'USD',
          save: 'Ahorra 12%',
        },
        {
          period: '1 año',
          price: `$${PRICING_USD.year.toFixed(2)}`,
          unit: 'USD',
          save: 'Ahorra 17%',
        },
      ],
      ctaMicro: `${trial.short} · Sin tarjeta`,
    },
    faq: {
      title: 'Lo que suele preguntarse.',
      items: [
        {
          question: '¿Qué es Anto?',
          answer:
            'Anto es una app de acompañamiento emocional continuo: un lugar donde aterrizar entre sesiones o en el día a día. Usa asistencia de IA en segundo plano. No sustituye atención clínica: un terapeuta o profesional humano sigue siendo lo más recomendable. Disponible en iPhone.',
        },
        {
          question: '¿Mis conversaciones son privadas?',
          answer:
            'Sí. Están cifradas y no vendemos ni compartimos tu información con terceros.',
        },
        {
          question: '¿Anto reemplaza la terapia?',
          answer:
            'No. Te acompaña entre sesiones o en los días en que necesitas un lugar donde aterrizar. No sustituye atención profesional.',
        },
        {
          question: '¿Hay prueba gratis?',
          answer: trial.faqPremiumAnswer,
        },
      ],
      moreHref: localePath('es', '/recursos'),
      moreLabel: 'Más recursos',
    },
    finalCta: {
      title: 'Cuando necesites bajar la intensidad.',
      subtitle: 'Empieza hoy. Un día gratis, sin tarjeta.',
      imageAlt: 'Persona sentada al borde de la cama al anochecer, de espaldas a la cámara',
    },
  };
}

export function getHomeV2Copy(locale: Locale): HomeV2Copy {
  return buildHomeV2Copy(locale);
}
