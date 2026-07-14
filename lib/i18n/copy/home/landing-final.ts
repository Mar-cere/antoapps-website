import { localePath, type Locale } from '@/lib/i18n/config';
import { getAppStoreReviewSnippets } from '@/lib/app-store-reviews';
import { PRICING_USD } from '@/lib/pricing/plans';
import type { HomeLandingScreenshotKey } from '@/lib/assets/app-screenshots';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeFeatureRow = {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  tags: readonly string[];
  screenshot: HomeLandingScreenshotKey;
  screenshotCrop?: boolean;
  reverse?: boolean;
};

export type HomeCredentialStat = {
  value: string;
  label: string;
  detail: string;
};

export type HomeProtocolCard = {
  title: string;
  subtitle: string;
};

export type HomePricingCard = {
  period: string;
  price: string;
  unit: string;
  save?: string;
  popular?: boolean;
};

export type HomeLandingFinalCopy = {
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    subtitle: string;
    ctaStoreLabel: string;
    ctaStoreText: string;
    ctaBadge: string;
    ctaMicro: string;
    androidLink: string;
    storeAria: string;
    androidCta: string;
    heroReview: { quote: string; author: string; source: string };
    starsAria: string;
    heroScreenshot: HomeLandingScreenshotKey;
  };
  featureRows: readonly HomeFeatureRow[];
  credentials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: readonly HomeCredentialStat[];
    protocols: readonly HomeProtocolCard[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    popularBadge: string;
    cards: readonly HomePricingCard[];
    ctaMicro: string;
    unitMonth: string;
    unitTotal: string;
    saveLabel: (pct: number) => string;
  };
  footerTrust: {
    items: readonly { label: string }[];
    disclaimer: string;
  };
  minimalNav: {
    cta: string;
    aria: string;
    logoAria: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    sourceLabel: string;
    starsAria: string;
  };
  faqLite: {
    eyebrow: string;
    title: string;
    items: readonly { question: string; answer: string }[];
    moreHref: string;
    moreLabel: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
  };
  minimalFooter: {
    links: readonly { href: string; label: string }[];
    copyright: string;
    linksAria: string;
  };
};

function buildLandingFinalCopy(locale: Locale): HomeLandingFinalCopy {
  const trial = getTrialCopy(locale);

  if (locale === 'es') {
    return {
    hero: {
      kicker: 'Apoyo emocional con IA · iOS',
      titleLine1: 'Tu mente tiene',
      titleLine2: 'un lugar donde',
      titleAccent: 'aterrizar.',
      subtitle:
        'Anto combina IA avanzada con protocolos clínicos validados para acompañarte cuando más lo necesitas. Sin citas. Sin horarios. Sin juicios.',
      ctaStoreLabel: 'Descargar en',
      ctaStoreText: 'App Store',
      ctaBadge: 'Gratis',
      ctaMicro: '1 día de prueba · Sin tarjeta · Cancela cuando quieras',
      androidLink: 'Solicitar acceso anticipado para Android',
      storeAria: 'Descargar Anto en App Store',
      androidCta: 'Quiero acceso Android',
      heroReview: {
        quote: 'La uso cuando la ansiedad me despierta. En minutos bajo un poco la intensidad.',
        author: 'Camila S.',
        source: 'App Store',
      },
      starsAria: '5 estrellas en App Store',
      heroScreenshot: 'chatAnxiety',
    },
    featureRows: [
      {
        id: 'product',
        eyebrow: 'El producto',
        titlePrefix: 'No es un chatbot.',
        titleHighlight: 'Es un sistema.',
        subtitle:
          'Chat con memoria de temas, sugerencias que persisten al reabrir y un home renovado con insight diario. Anto entiende el contexto, detecta patrones y sugiere el siguiente paso concreto.',
        tags: [
          'Responde en menos de 3 s',
          'Hub de técnicas',
          '8 protocolos clínicos',
          'PHQ-9 · GAD-7',
        ],
        screenshot: 'chatAnxiety',
      },
      {
        id: 'analysis',
        eyebrow: 'Grafo e insights',
        titlePrefix: 'Patrones que',
        titleHighlight: 'puedes actuar.',
        subtitle:
          'Visualiza conexiones entre conversaciones y técnicas concretas. «Lo que te ayuda» navegable, informes accionables y WAI post-sesión para reflexionar sobre la alianza terapéutica.',
        tags: [
          'Grafo de insights',
          'WAI post-sesión (4 ejes)',
          'Lo que te ayuda',
        ],
        screenshot: 'sessionSummary',
        reverse: true,
      },
      {
        id: 'protocols',
        eyebrow: 'Hub de técnicas',
        titlePrefix: 'Catálogo completo,',
        titleHighlight: 'acceso inmediato.',
        subtitle:
          'Técnicas terapéuticas en la navegación principal, lienzo ABC interactivo y 8 protocolos basados en evidencia — TCC, exposición, autocompasión y mindfulness.',
        tags: ['ABC interactivo', '8 protocolos validados', 'TCC paso a paso', 'Basados en evidencia'],
        screenshot: 'tccProtocol',
      },
      {
        id: 'progress',
        eyebrow: 'Tu día a día',
        titlePrefix: 'Home, tareas',
        titleHighlight: 'y racha.',
        subtitle:
          'Tareas y hábitos unificados en una pantalla, Pomodoro al enfocar una tarea, racha centrada en el chat y sesión persistente para volver sin reingresar contraseña.',
        tags: [
          'Insight diario',
          '1 pantalla unificada',
          'Sesión persistente',
          'Pomodoro integrado',
        ],
        screenshot: 'weeklySummary',
        screenshotCrop: true,
        reverse: true,
      },
    ],
    credentials: {
      eyebrow: 'Credenciales',
      title: 'Construido sobre\nevidencia real.',
      subtitle: 'No es intuición — es ciencia clínica integrada en cada conversación.',
      stats: [
        {
          value: '8',
          label: 'Protocolos clínicos',
          detail: 'TCC, exposición, autocompasión y mindfulness — basados en evidencia',
        },
        {
          value: '15',
          label: 'Distorsiones detectadas',
          detail: 'Catastrofismo, personalización y más — identificadas en cada sesión',
        },
        {
          value: '5.0',
          label: 'En App Store',
          detail: 'Calificación pública de usuarios reales',
        },
        {
          value: '24/7',
          label: 'Siempre disponible',
          detail: 'Sin citas, sin horarios, sin lista de espera',
        },
      ],
      protocols: [
        { title: 'Depresión · Ansiedad', subtitle: 'Protocolos CBT validados clínicamente' },
        { title: 'Trauma · TOC · TEPT', subtitle: 'Rutas estructuradas basadas en evidencia' },
        { title: 'Autocompasión · Ira · Sueño', subtitle: 'Acompañamiento paso a paso' },
      ],
    },
    pricing: {
      eyebrow: 'Planes',
      title: 'Sin compromisos.',
      subtitle: 'Empieza gratis. Elige lo que necesitas.',
      popularBadge: 'Más popular',
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
      ctaMicro: 'Todos los planes incluyen acceso completo · 1 día gratis',
      unitMonth: 'USD / mes',
      unitTotal: 'USD',
      saveLabel: (pct) => `Ahorra ${pct}%`,
    },
    footerTrust: {
      items: [
        { label: 'Privado por diseño' },
        { label: 'Sin tarjeta' },
        { label: 'Hecho en Chile' },
      ],
      disclaimer:
        'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
    },
    minimalNav: {
      cta: 'Descargar gratis',
      aria: 'Navegación principal',
      logoAria: 'Anto — Ir al inicio',
    },
    reviews: {
      eyebrow: 'App Store',
      title: 'Personas reales, noches difíciles.',
      sourceLabel: 'Reseñas públicas en App Store',
      starsAria: '5 estrellas en App Store',
    },
    faqLite: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo esencial, sin rodeos.',
      items: [
        {
          question: '¿Mis conversaciones son privadas?',
          answer:
            'Sí. Tus conversaciones están cifradas (AES-256) y no vendemos ni compartimos tu información con terceros.',
        },
        {
          question: '¿Anto reemplaza la terapia?',
          answer:
            'No. Anto complementa el apoyo profesional: te acompaña entre sesiones con herramientas basadas en evidencia.',
        },
        {
          question: '¿Hay prueba gratis?',
          answer: trial.faqPremiumAnswer,
        },
        {
          question: '¿Qué incluye el hub de técnicas?',
          answer:
            'Catálogo completo en la navegación, lienzo ABC interactivo y conexión con el grafo de insights para ver qué técnicas encajan con tus patrones. También puedes lanzar Pomodoro al enfocar una tarea.',
        },
      ],
      moreHref: localePath('es', '/recursos'),
      moreLabel: 'Explorar biblioteca de recursos →',
    },
    finalCta: {
      title: 'Tu mente merece un lugar donde aterrizar.',
      subtitle: 'Empieza hoy. Un día gratis, sin tarjeta.',
    },
    minimalFooter: {
      links: [
        { href: localePath('es', '/recursos'), label: 'Recursos' },
        { href: localePath('es', '/app'), label: 'App' },
        { href: localePath('es', '/seguridad'), label: 'Seguridad' },
        { href: localePath('es', '/privacidad'), label: 'Privacidad' },
        { href: localePath('es', '/terminos'), label: 'Términos' },
        { href: localePath('es', '/contacto'), label: 'Contacto' },
      ],
      copyright: '© 2026 Anto · Hecho con cuidado en Chile',
      linksAria: 'Enlaces del sitio',
    },
  };
  }

  return {
    hero: {
      kicker: 'AI emotional support · iOS',
      titleLine1: 'Your mind has',
      titleLine2: 'a place to',
      titleAccent: 'land.',
      subtitle:
        'Anto combines advanced AI with validated clinical protocols to support you when you need it most. No appointments. No schedules. No judgment.',
      ctaStoreLabel: 'Download on',
      ctaStoreText: 'App Store',
      ctaBadge: 'Free',
      ctaMicro: '1-day trial · No card required · Cancel anytime',
      androidLink: 'Request early access for Android',
      storeAria: 'Download Anto on the App Store',
      androidCta: 'I want Android access',
      heroReview: {
        quote: 'I use it when anxiety wakes me up. Within minutes the intensity eases a bit.',
        author: 'Camila S.',
        source: 'App Store',
      },
      starsAria: '5 stars on the App Store',
      heroScreenshot: 'chatAnxiety',
    },
    featureRows: [
      {
        id: 'product',
        eyebrow: 'The product',
        titlePrefix: 'Not a chatbot.',
        titleHighlight: 'A system.',
        subtitle:
          'Chat with topic memory, suggestions that persist when you reopen, and a renewed home with daily insight. Anto understands context, detects patterns, and suggests the next concrete step.',
        tags: [
          'Replies in under 3 s',
          'Techniques hub',
          '8 clinical protocols',
          'PHQ-9 · GAD-7',
        ],
        screenshot: 'chatAnxiety',
      },
      {
        id: 'analysis',
        eyebrow: 'Graph and insights',
        titlePrefix: 'Patterns you',
        titleHighlight: 'can act on.',
        subtitle:
          'Visualise connections between conversations and concrete techniques. Navigable "what helps you", actionable reports, and post-session WAI to reflect on therapeutic alliance.',
        tags: [
          'Insights graph',
          'Post-session WAI (4 axes)',
          'What helps you',
        ],
        screenshot: 'sessionSummary',
        reverse: true,
      },
      {
        id: 'protocols',
        eyebrow: 'Techniques hub',
        titlePrefix: 'Full catalog,',
        titleHighlight: 'instant access.',
        subtitle:
          'Therapeutic techniques in main navigation, interactive ABC canvas, and 8 evidence-based protocols — CBT, exposure, self-compassion, and mindfulness.',
        tags: ['Interactive ABC', '8 validated protocols', 'Step-by-step CBT', 'Evidence-based'],
        screenshot: 'tccProtocol',
      },
      {
        id: 'progress',
        eyebrow: 'Your daily flow',
        titlePrefix: 'Home, tasks',
        titleHighlight: 'and streak.',
        subtitle:
          'Unified tasks and habits on one screen, Pomodoro when focusing a task, chat-centered streak, and persistent session so you return without re-entering your password.',
        tags: [
          'Daily insight',
          '1 unified screen',
          'Persistent session',
          'Built-in Pomodoro',
        ],
        screenshot: 'weeklySummary',
        screenshotCrop: true,
        reverse: true,
      },
    ],
    credentials: {
      eyebrow: 'Credentials',
      title: 'Built on\nreal evidence.',
      subtitle: 'Not intuition — clinical science integrated into every conversation.',
      stats: [
        {
          value: '8',
          label: 'Clinical protocols',
          detail: 'CBT, exposure, self-compassion, and mindfulness — evidence-based',
        },
        {
          value: '15',
          label: 'Distortions detected',
          detail: 'Catastrophizing, personalization, and more — identified each session',
        },
        {
          value: '5.0',
          label: 'On the App Store',
          detail: 'Public rating from real users',
        },
        {
          value: '24/7',
          label: 'Always available',
          detail: 'No appointments, no schedules, no waiting list',
        },
      ],
      protocols: [
        { title: 'Depression · Anxiety', subtitle: 'Clinically validated CBT protocols' },
        { title: 'Trauma · OCD · PTSD', subtitle: 'Structured evidence-based pathways' },
        { title: 'Self-compassion · Anger · Sleep', subtitle: 'Step-by-step guidance' },
      ],
    },
    pricing: {
      eyebrow: 'Plans',
      title: 'No commitments.',
      subtitle: 'Start free. Choose what you need.',
      popularBadge: 'Most popular',
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
      ctaMicro: 'All plans include full access · 1-day free trial',
      unitMonth: 'USD / month',
      unitTotal: 'USD',
      saveLabel: (pct) => `Save ${pct}%`,
    },
    footerTrust: {
      items: [
        { label: 'Private by design' },
        { label: 'No card required' },
        { label: 'Made in Chile' },
      ],
      disclaimer:
        'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
    },
    minimalNav: {
      cta: 'Download free',
      aria: 'Main navigation',
      logoAria: 'Anto — Go to home',
    },
    reviews: {
      eyebrow: 'App Store',
      title: 'Real people, hard nights.',
      sourceLabel: 'Public App Store reviews',
      starsAria: '5 stars on the App Store',
    },
    faqLite: {
      eyebrow: 'FAQ',
      title: 'The essentials, no fluff.',
      items: [
        {
          question: 'Are my conversations private?',
          answer:
            'Yes. Your conversations are encrypted (AES-256) and we do not sell or share your information with third parties.',
        },
        {
          question: 'Does Anto replace therapy?',
          answer:
            'No. Anto complements professional care — it supports you between sessions with evidence-based tools.',
        },
        {
          question: 'Is there a free trial?',
          answer: trial.faqPremiumAnswer,
        },
        {
          question: 'What does the techniques hub include?',
          answer:
            'A full catalog in navigation, an interactive ABC canvas, and connection to the insights graph to see which techniques fit your patterns. You can also launch Pomodoro when focusing a task.',
        },
      ],
      moreHref: localePath('en', '/recursos'),
      moreLabel: 'Explore the resource library →',
    },
    finalCta: {
      title: 'Your mind deserves a place to land.',
      subtitle: 'Start today. One day free, no card required.',
    },
    minimalFooter: {
      links: [
        { href: localePath('en', '/recursos'), label: 'Resources' },
        { href: localePath('en', '/app'), label: 'App' },
        { href: localePath('en', '/seguridad'), label: 'Security' },
        { href: localePath('en', '/privacidad'), label: 'Privacy' },
        { href: localePath('en', '/terminos'), label: 'Terms' },
        { href: localePath('en', '/contacto'), label: 'Contact' },
      ],
      copyright: '© 2026 Anto · Made with care in Chile',
      linksAria: 'Site links',
    },
  };
}

export function getHomeLandingFinalCopy(locale: Locale): HomeLandingFinalCopy {
  return buildLandingFinalCopy(locale);
}

/** Reseñas App Store para la sección de prueba social (derivadas del catálogo central). */
export function getHomeLandingReviews(locale: Locale) {
  return getAppStoreReviewSnippets(locale);
}
