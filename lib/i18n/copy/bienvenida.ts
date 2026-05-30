import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type BienvenidaVariant = 'A' | 'B';

export type BienvenidaCopy = {
  meta: {
    title: string;
    description: string;
    socialDescription: string;
    ogSubline: string;
    ogAlt: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: Record<BienvenidaVariant, string>;
    lead: Record<BienvenidaVariant, string>;
  };
  trial: {
    heroCta: Record<BienvenidaVariant, string>;
    stickyCta: Record<BienvenidaVariant, string>;
    finalCta: string;
    line: string;
    aria: string;
    stickyAria: string;
    faqAnswer: string;
  };
  how: {
    sectionTitle: string;
    steps: readonly string[];
  };
  faq: {
    sectionTitle: string;
    items: readonly { question: string; answer: string; privacyLinkLabel: string }[];
  };
  final: {
    headline: string;
  };
  disclaimer: string;
  footer: {
    privacy: string;
    terms: string;
    contact: string;
    tagline: string;
  };
  trustStrip: {
    availableOn: string;
    ratingOnAppStore: string;
  };
  androidWaitlist: string;
  androidCta: string;
};

function buildBienvenidaCopy(locale: Locale): BienvenidaCopy {
  const trial = getTrialCopy(locale);

  if (locale === 'en') {
    return {
      meta: {
        title: 'Anto — Mental calm in minutes | Download on the App Store',
        description:
          'When your mind won\'t slow down, write what you feel and get clear guidance in seconds. 1-day free trial on iPhone.',
        socialDescription: 'Download on the App Store. ★ 5.0 · 1-day free trial.',
        ogSubline:
          'Write freely and get practical clarity in seconds. 1-day free trial on iPhone.',
        ogAlt: 'Anto — Mental calm in minutes',
      },
      hero: {
        titleLine1: 'When your mind won\'t slow down,',
        titleLine2: {
          A: 'Sort through what you feel with Anto',
          B: 'Anto helps you make sense of it',
        },
        lead: {
          A: 'Write what you feel and get clear guidance in seconds.',
          B: 'Write what you feel and get clear guidance in seconds.',
        },
      },
      trial: {
        heroCta: {
          A: `Start on iPhone — ${trial.short}`,
          B: `Download on iPhone — ${trial.short}`,
        },
        stickyCta: {
          A: `Start — ${trial.short}`,
          B: `Download — ${trial.short}`,
        },
        finalCta: `Download on the App Store — ${trial.short}`,
        line: `${trial.short} · cancel anytime in the App Store`,
        aria: 'Download Anto on the App Store. Includes a 1-day free trial.',
        stickyAria: 'Download Anto on the App Store. 1-day free trial.',
        faqAnswer: trial.faqPricingAnswer,
      },
      how: {
        sectionTitle: 'How it works',
        steps: [
          'Write what you feel, without filtering yourself.',
          'Get clarity and one concrete step for today.',
          'Come back whenever you need it.',
        ],
      },
      faq: {
        sectionTitle: 'Common questions',
        items: [
          {
            question: 'Is this the same as therapy?',
            answer:
              'No. Anto is AI emotional support: it helps you sort what you feel and move forward with concrete steps. It does not diagnose or replace clinical care.',
            privacyLinkLabel: 'Privacy Policy',
          },
          {
            question: 'What does it cost after the trial?',
            answer: trial.faqPricingAnswer,
            privacyLinkLabel: 'Privacy Policy',
          },
          {
            question: 'Who sees what I write?',
            answer:
              'Your conversations are private. We do not sell your data or use it for advertising. More detail in our',
            privacyLinkLabel: 'Privacy Policy',
          },
        ],
      },
      final: {
        headline: 'Want to try Anto?',
      },
      disclaimer:
        'Anto does not replace therapy or clinical care. If you are in crisis, seek professional or emergency help in your country.',
      footer: {
        privacy: 'Privacy',
        terms: 'Terms',
        contact: 'Contact',
        tagline: '© {year} Anto · Made with care in Chile',
      },
      trustStrip: {
        ratingOnAppStore: '★★★★★ 5.0 on the App Store',
        availableOn: 'Available on iPhone',
      },
      androidWaitlist: 'On Android? Join the waitlist',
      androidCta: 'I want Android access',
    };
  }

  return {
    meta: {
      title: 'Anto — Calma mental en minutos | Descarga en App Store',
      description:
        'Cuando tu mente va a mil, escribe lo que sientes y recibe guía clara en segundos. Prueba 1 día gratis en iPhone.',
      socialDescription: 'Descarga en App Store. ★ 5.0 · Prueba 1 día gratis.',
      ogSubline:
        'Escribe como te salga y recibe claridad práctica en segundos. Prueba 1 día gratis en iPhone.',
      ogAlt: 'Anto — Calma mental en minutos',
    },
    hero: {
      titleLine1: 'Cuando tu mente va a mil,',
      titleLine2: {
        A: 'Ordena lo que sientes con Anto',
        B: 'Anto te ayuda a ordenarlo',
      },
      lead: {
        A: 'Escribe lo que sientes y recibe guía clara en segundos.',
        B: 'Escribes lo que sientes y recibes guía clara en segundos.',
      },
    },
    trial: {
      heroCta: {
        A: `Empieza en iPhone — ${trial.short}`,
        B: `Descargar en iPhone — ${trial.short}`,
      },
      stickyCta: {
        A: `Empieza — ${trial.short}`,
        B: `Descargar — ${trial.short}`,
      },
      finalCta: `Descargar en App Store — ${trial.short}`,
      line: `${trial.short} · cancelas cuando quieras en App Store`,
      aria: 'Descargar Anto en App Store. Incluye 1 día de prueba gratis.',
      stickyAria: 'Descargar Anto en App Store. Prueba gratis de 1 día.',
      faqAnswer: trial.faqPricingAnswer,
    },
    how: {
      sectionTitle: 'Así funciona',
      steps: [
        'Escribe lo que sientes, sin filtro.',
        'Recibe claridad y un paso concreto para hoy.',
        'Vuelve cuando lo necesites.',
      ],
    },
    faq: {
      sectionTitle: 'Dudas frecuentes',
      items: [
        {
          question: '¿Es lo mismo que terapia?',
          answer:
            'No. Anto es apoyo emocional con IA: te ayuda a ordenar lo que sientes y avanzar con pasos concretos. No diagnostica ni sustituye atención clínica.',
          privacyLinkLabel: 'Política de Privacidad',
        },
        {
          question: '¿Cuánto cuesta después de la prueba?',
          answer: trial.faqPricingAnswer,
          privacyLinkLabel: 'Política de Privacidad',
        },
        {
          question: '¿Quién ve lo que escribo?',
          answer:
            'Tus conversaciones son privadas. No vendemos tus datos ni los usamos para publicidad. Más detalle en nuestra',
          privacyLinkLabel: 'Política de Privacidad',
        },
      ],
    },
    final: {
      headline: '¿Quieres probar Anto?',
    },
    disclaimer:
      'Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional o de emergencia en tu país.',
    footer: {
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
      tagline: '© {year} Anto · Hecho con cuidado en Chile',
    },
    trustStrip: {
      ratingOnAppStore: '★★★★★ 5.0 en App Store',
      availableOn: 'Disponible en iPhone',
    },
    androidWaitlist: '¿Usas Android? Únete a la lista de espera',
    androidCta: 'Quiero acceso Android',
  };
}

const cache: Partial<Record<Locale, BienvenidaCopy>> = {};

export function getBienvenidaCopy(locale: Locale): BienvenidaCopy {
  if (!cache[locale]) {
    cache[locale] = buildBienvenidaCopy(locale);
  }
  return cache[locale]!;
}
