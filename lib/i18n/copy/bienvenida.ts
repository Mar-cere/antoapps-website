import type { Locale } from '@/lib/i18n/config';
import { appStoreRatingWithReviews } from '@/lib/app-store-social-proof';
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
    tagline: string;
    lead: Record<BienvenidaVariant, string>;
  };
  trial: {
    heroCta: Record<BienvenidaVariant, string>;
    stickyCta: Record<BienvenidaVariant, string>;
    stickyAndroidCta: string;
    stickyDesktopCta: string;
    stickyAndroidAria: string;
    stickyDesktopAria: string;
    finalCta: string;
    line: string;
    pricingLine: string;
    noCreditCard: string;
    aria: string;
    stickyAria: string;
    faqAnswer: string;
  };
  privacyBadge: string;
  androidHeroCta: string;
  desktopQr: {
    label: string;
    hint: string;
    fallbackLink: string;
  };
  testimonial: {
    quote: string;
    attribution: string;
  };
  inAppHint: {
    iosBrowser: string;
    androidBrowser: string;
  };
  highlights: string;
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
  appPreview: {
    ariaLabel: string;
    userMessage: string;
    antoMessage: string;
    inputPlaceholder: string;
  };
  screenshots: {
    sectionTitle: string;
    images: readonly { src: string; alt: string }[];
  };
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
        tagline: 'AI emotional support app for iPhone',
        lead: {
          A: 'Write what you feel and get clear guidance in seconds.',
          B: 'Write what you feel and get clear guidance in seconds.',
        },
      },
      trial: {
        heroCta: {
          A: 'Download on iPhone',
          B: 'Start on iPhone',
        },
        stickyCta: {
          A: `Start — ${trial.short}`,
          B: `Download — ${trial.short}`,
        },
        stickyAndroidCta: 'Join Android waitlist',
        stickyDesktopCta: 'Scan QR with iPhone',
        stickyAndroidAria: 'Go to Android waitlist form',
        stickyDesktopAria: 'Go to App Store QR code',
        finalCta: `Download on the App Store — ${trial.short}`,
        line: `${trial.short} · cancel anytime in the App Store`,
        pricingLine: 'Then $3.990/mo · cancel anytime',
        noCreditCard: 'No credit card required to start',
        aria: 'Download Anto on the App Store. Includes a 1-day free trial.',
        stickyAria: 'Download Anto on the App Store. 1-day free trial.',
        faqAnswer: trial.faqPricingAnswer,
      },
      privacyBadge: 'Your conversations are private',
      androidHeroCta: 'Android waitlist',
      desktopQr: {
        label: 'QR code to download Anto on the App Store',
        hint: 'Scan with your iPhone camera',
        fallbackLink: 'Or open the App Store link',
      },
      testimonial: {
        quote: 'It helped me put words to what I was feeling when I had no one to talk to.',
        attribution: '— App Store user',
      },
      inAppHint: {
        iosBrowser: 'Open in Safari',
        androidBrowser: 'Open in Chrome',
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
        ratingOnAppStore: appStoreRatingWithReviews('en'),
        availableOn: 'Available on iPhone',
      },
      highlights:
        'PHQ-9/GAD-7 scales · 8 evidence-based protocols · 24/7 crisis detection · ES/EN',
      androidWaitlist: 'On Android? Join the waitlist',
      androidCta: 'I want Android access',
      appPreview: {
        ariaLabel: 'Anto app preview',
        userMessage: "I can't stop thinking about everything going wrong",
        antoMessage:
          "That sounds exhausting. What's weighing on you most right now: fear, guilt, or uncertainty?",
        inputPlaceholder: 'Write a message…',
      },
      screenshots: {
        sectionTitle: 'Inside the app',
        images: [
          {
            src: '/assets/images/hero/phone-mockup-landing.webp',
            alt: 'Anto chat screen on iPhone showing an emotional support conversation',
          },
          {
            src: '/assets/images/hero/phone-in-hand-landing.webp',
            alt: 'Person holding an iPhone with the Anto app open',
          },
        ],
      },
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
      tagline: 'La app de apoyo emocional con IA para iPhone',
      lead: {
        A: 'Escribe lo que sientes y recibe guía clara en segundos.',
        B: 'Escribes lo que sientes y recibes guía clara en segundos.',
      },
    },
    trial: {
      heroCta: {
        A: 'Descargar en iPhone',
        B: 'Empezar en iPhone',
      },
      stickyCta: {
        A: `Empieza — ${trial.short}`,
        B: `Descargar — ${trial.short}`,
      },
      stickyAndroidCta: 'Lista de espera Android',
      stickyDesktopCta: 'Escanea QR con iPhone',
      stickyAndroidAria: 'Ir al formulario de lista de espera Android',
      stickyDesktopAria: 'Ir al código QR de App Store',
      finalCta: `Descargar en App Store — ${trial.short}`,
      line: `${trial.short} · cancelas cuando quieras en App Store`,
      pricingLine: 'Luego $3.990/mes · cancela cuando quieras',
      noCreditCard: 'Sin tarjeta de crédito para empezar',
      aria: 'Descargar Anto en App Store. Incluye 1 día de prueba gratis.',
      stickyAria: 'Descargar Anto en App Store. Prueba gratis de 1 día.',
      faqAnswer: trial.faqPricingAnswer,
    },
    privacyBadge: 'Tus conversaciones son privadas',
    androidHeroCta: 'Lista de espera Android',
    desktopQr: {
      label: 'Código QR para descargar Anto en App Store',
      hint: 'Escanéalo con la cámara de tu iPhone',
      fallbackLink: 'O abre el enlace de App Store',
    },
    testimonial: {
      quote: 'Me ayudó a poner palabras a lo que sentía cuando no tenía con quién hablar.',
      attribution: '— Usuario de App Store',
    },
    inAppHint: {
      iosBrowser: 'Abrir en Safari',
      androidBrowser: 'Abrir en Chrome',
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
      ratingOnAppStore: appStoreRatingWithReviews('es'),
      availableOn: 'Disponible en iPhone',
    },
    highlights:
      'Escalas PHQ-9/GAD-7 · 8 protocolos basados en evidencia · Detección de crisis 24/7 · ES/EN',
    androidWaitlist: '¿Usas Android? Únete a la lista de espera',
    androidCta: 'Quiero acceso Android',
    appPreview: {
      ariaLabel: 'Vista previa de la app Anto',
      userMessage: 'no puedo parar de pensar en todo malo',
      antoMessage:
        'Suena agotador. ¿Qué pesa más ahora: el miedo, la culpa o la incertidumbre?',
      inputPlaceholder: 'Escribe un mensaje…',
    },
    screenshots: {
      sectionTitle: 'Así se ve la app',
      images: [
        {
          src: '/assets/images/hero/phone-mockup-landing.webp',
          alt: 'Pantalla de chat de Anto en iPhone con una conversación de apoyo emocional',
        },
        {
          src: '/assets/images/hero/phone-in-hand-landing.webp',
          alt: 'Persona sosteniendo un iPhone con la app Anto abierta',
        },
      ],
    },
  };
}

const cache: Partial<Record<Locale, BienvenidaCopy>> = {};

export function getBienvenidaCopy(locale: Locale): BienvenidaCopy {
  if (!cache[locale]) {
    cache[locale] = buildBienvenidaCopy(locale);
  }
  return cache[locale]!;
}
