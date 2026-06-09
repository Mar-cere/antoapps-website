import type { Locale } from '@/lib/i18n/config';
import { getAppStoreReviewSnippets } from '@/lib/app-store-reviews';
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
    subheadline: Record<BienvenidaVariant, string>;
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
  desktopPicker: {
    prompt: string;
    iphone: string;
    android: string;
    changeDevice: string;
    iphoneHint: string;
  };
  androidDevice: {
    waitlistLine: string;
    iosFallback: string;
  };
  androidWaitlist: {
    incentive: string;
    counterTemplate: string;
  };
  reviews: {
    sectionTitle: string;
    sourceLabel: string;
    starsAria: string;
    items: readonly { quote: string; author: string }[];
  };
  clinicalPillars: {
    sectionTitle: string;
    items: readonly {
      icon: 'evidence' | 'crisis' | 'privacy';
      title: string;
      description: string;
    }[];
  };
  conversationDemo: {
    ariaLabel: string;
    label: string;
    messages: readonly { role: 'user' | 'anto'; text: string }[];
  };
  audience: {
    sectionTitle: string;
    items: readonly { title: string; description: string }[];
  };
  inAppHint: {
    iosBrowser: string;
    androidBrowser: string;
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
        socialDescription:
          'AI emotional support when your mind won\'t slow down. Clarity in minutes — 1-day free trial on iPhone.',
        ogSubline:
          'Write what you feel. Get clarity and one concrete step — not just a chatbot reply.',
        ogAlt: 'Anto — Mental calm in minutes',
      },
      hero: {
        titleLine1: 'When your mind won\'t slow down,',
        titleLine2: {
          A: 'Sort through what you feel with Anto',
          B: 'Anto helps you make sense of it',
        },
        subheadline: {
          A: 'Write what you feel — AI gives you clarity and one concrete step in seconds.',
          B: 'Write what you feel — AI gives you clarity and one concrete step in seconds.',
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
        stickyDesktopCta: 'See download options',
        stickyAndroidAria: 'Go to Android waitlist form',
        stickyDesktopAria: 'Go to download options',
        finalCta: `Download on the App Store — ${trial.short}`,
        line: `${trial.short} · cancel anytime in the App Store`,
        pricingLine: 'Then US$4.20/mo · cancel anytime',
        noCreditCard: 'No credit card required to start',
        aria: 'Download Anto on the App Store. Includes a 1-day free trial.',
        stickyAria: 'Download Anto on the App Store. 1-day free trial.',
        faqAnswer: trial.faqPricingAnswer,
      },
      privacyBadge: 'Your conversations are private',
      androidHeroCta: 'Android waitlist',
      desktopPicker: {
        prompt: 'Which device do you use?',
        iphone: 'I have an iPhone',
        android: 'I have Android',
        changeDevice: 'Change device',
        iphoneHint: 'Opens the App Store — install on your iPhone',
      },
      androidDevice: {
        waitlistLine: 'Join the waitlist and we will notify you when Anto is on Google Play.',
        iosFallback: 'On iPhone? Download on the App Store',
      },
      androidWaitlist: {
        incentive: 'Early access — be among the first on the waitlist',
        counterTemplate: '{count} people on the waitlist',
      },
      reviews: {
        sectionTitle: 'What users say on the App Store',
        sourceLabel: 'Public App Store reviews',
        starsAria: '5 out of 5 stars',
        items: getAppStoreReviewSnippets('en'),
      },
      clinicalPillars: {
        sectionTitle: 'Why Anto is different',
        items: [
          {
            icon: 'evidence',
            title: 'Clinically grounded',
            description: 'PHQ-9/GAD-7 scales and 8 evidence-based protocols — not generic chat.',
          },
          {
            icon: 'crisis',
            title: '24/7 crisis detection',
            description: 'Proactive alerts and resources if you need urgent support.',
          },
          {
            icon: 'privacy',
            title: 'Total privacy',
            description: 'Your conversations stay yours. No ads, no data sold.',
          },
        ],
      },
      conversationDemo: {
        ariaLabel: 'Animated Anto conversation demo',
        label: 'A real conversation, start to finish',
        messages: [
          { role: 'user', text: "I can't sleep — my mind won't stop replaying everything" },
          {
            role: 'anto',
            text: 'That sounds exhausting. What weighs most right now: fear, guilt, or uncertainty?',
          },
          { role: 'user', text: 'Mostly fear about work tomorrow' },
          {
            role: 'anto',
            text: "Let's narrow it down. One step for tonight: write the 3 things you can control tomorrow. Want to try?",
          },
        ],
      },
      audience: {
        sectionTitle: 'Anto is for you if…',
        items: [
          {
            title: 'Anxiety keeps you up at night',
            description: 'You need to land your thoughts at 2 a.m., not wait until therapy on Tuesday.',
          },
          {
            title: 'Work stress is overflowing',
            description: 'You want one concrete step today — not another productivity lecture.',
          },
          {
            title: 'You are processing a breakup or loss',
            description: 'You need a safe space to untangle what you feel, at your own pace.',
          },
        ],
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
      androidCta: 'Join the waitlist',
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
      socialDescription:
        'Apoyo emocional con IA cuando tu mente no para. Claridad en minutos — prueba 1 día gratis en iPhone.',
      ogSubline:
        'Escribe lo que sientes. Recibe claridad y un paso concreto — no solo una respuesta genérica.',
      ogAlt: 'Anto — Calma mental en minutos',
    },
    hero: {
      titleLine1: 'Cuando tu mente va a mil,',
      titleLine2: {
        A: 'Ordena lo que sientes con Anto',
        B: 'Anto te ayuda a ordenarlo',
      },
      subheadline: {
        A: 'Escribe lo que sientes — la IA te da claridad y un paso concreto en segundos.',
        B: 'Escribe lo que sientes — la IA te da claridad y un paso concreto en segundos.',
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
      stickyDesktopCta: 'Ver opciones de descarga',
      stickyAndroidAria: 'Ir al formulario de lista de espera Android',
      stickyDesktopAria: 'Ir a las opciones de descarga',
      finalCta: `Descargar en App Store — ${trial.short}`,
      line: `${trial.short} · cancelas cuando quieras en App Store`,
      pricingLine: 'Luego US$4.20/mes · cancela cuando quieras',
      noCreditCard: 'Sin tarjeta de crédito para empezar',
      aria: 'Descargar Anto en App Store. Incluye 1 día de prueba gratis.',
      stickyAria: 'Descargar Anto en App Store. Prueba gratis de 1 día.',
      faqAnswer: trial.faqPricingAnswer,
    },
    privacyBadge: 'Tus conversaciones son privadas',
    androidHeroCta: 'Lista de espera Android',
    desktopPicker: {
      prompt: '¿Desde qué dispositivo nos visitas?',
      iphone: 'Tengo iPhone',
      android: 'Tengo Android',
      changeDevice: 'Cambiar dispositivo',
      iphoneHint: 'Abre App Store — instálala en tu iPhone',
    },
    androidDevice: {
      waitlistLine: 'Únete a la lista y te avisamos cuando Anto esté en Google Play.',
      iosFallback: '¿Tienes iPhone? Descarga en App Store',
    },
    androidWaitlist: {
      incentive: 'Acceso anticipado — sé de los primeros en la lista',
      counterTemplate: '{count} personas en la lista de espera',
    },
    reviews: {
      sectionTitle: 'Lo que dicen en App Store',
      sourceLabel: 'Reseñas públicas en App Store',
      starsAria: '5 de 5 estrellas',
      items: getAppStoreReviewSnippets('es'),
    },
    clinicalPillars: {
      sectionTitle: 'Por qué Anto es distinto',
      items: [
        {
          icon: 'evidence',
          title: 'Basado en evidencia clínica',
          description: 'Escalas PHQ-9/GAD-7 y 8 protocolos con respaldo — no es un chat genérico.',
        },
        {
          icon: 'crisis',
          title: 'Detecta crisis 24/7',
          description: 'Alertas proactivas y recursos si necesitas apoyo urgente.',
        },
        {
          icon: 'privacy',
          title: 'Privacidad total',
          description: 'Tus conversaciones son tuyas. Sin publicidad ni venta de datos.',
        },
      ],
    },
    conversationDemo: {
      ariaLabel: 'Demo animada de conversación con Anto',
      label: 'Una conversación real, de principio a fin',
      messages: [
        { role: 'user', text: 'no puedo dormir, sigo pensando en todo malo del trabajo' },
        {
          role: 'anto',
          text: 'Suena agotador. ¿Qué pesa más ahora: el miedo, la culpa o la incertidumbre?',
        },
        { role: 'user', text: 'más el miedo por mañana en la pega' },
        {
          role: 'anto',
          text: 'Aterricemos. Un paso para hoy: escribe 3 cosas que sí controlas mañana. ¿Lo probamos?',
        },
      ],
    },
    audience: {
      sectionTitle: 'Anto es para ti si…',
      items: [
        {
          title: 'La ansiedad no te deja dormir',
          description: 'Necesitas aterrizar a las 2 a.m., no esperar hasta el martes en terapia.',
        },
        {
          title: 'El estrés laboral te desborda',
          description: 'Quieres un paso concreto hoy — no otra charla de productividad.',
        },
        {
          title: 'Estás procesando una ruptura o pérdida',
          description: 'Necesitas un espacio seguro para desenredar lo que sientes, a tu ritmo.',
        },
      ],
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
    androidCta: 'Unirme a la lista',
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
