import { localePath, type Locale } from '@/lib/i18n/config';
import { PRICING_USD } from '@/lib/pricing/plans';
import type { HomeLandingScreenshotKey } from '@/lib/assets/app-screenshots';

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
  minimalFooter: {
    links: readonly { href: string; label: string }[];
    copyright: string;
    linksAria: string;
  };
};

const landingFinalCopy: Record<Locale, HomeLandingFinalCopy> = {
  es: {
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
          'Conversación empática, análisis clínico y herramientas de bienestar integradas. Anto entiende el contexto, detecta patrones y sugiere el siguiente paso concreto.',
        tags: ['Respuesta empática', 'Detección de patrones', 'Paso concreto', 'Disponible 24/7'],
        screenshot: 'chatAnxiety',
      },
      {
        id: 'analysis',
        eyebrow: 'Análisis clínico',
        titlePrefix: 'Entiende',
        titleHighlight: 'tu mente.',
        subtitle:
          'Después de cada conversación, Anto detecta el patrón de pensamiento activo, mide la intensidad emocional y te propone un protocolo concreto. No solo escucha — analiza.',
        tags: ['15 distorsiones cognitivas', 'Intensidad emocional', 'Siguiente paso sugerido'],
        screenshot: 'sessionSummary',
        reverse: true,
      },
      {
        id: 'protocols',
        eyebrow: 'Profundidad clínica',
        titlePrefix: 'Técnicas reales,',
        titleHighlight: 'guiadas paso a paso.',
        subtitle:
          '8 protocolos basados en evidencia — TCC, exposición, autocompasión, mindfulness. Anto te guía por cada paso sin reemplazar al terapeuta, complementándolo.',
        tags: ['TCC · CBT', '8 protocolos validados', 'Paso a paso', 'PHQ-9 · GAD-7'],
        screenshot: 'tccProtocol',
      },
      {
        id: 'progress',
        eyebrow: 'Seguimiento real',
        titlePrefix: 'Tu progreso,',
        titleHighlight: 'visible en el tiempo.',
        subtitle:
          'Resúmenes semanales y mensuales, micro-logros, tendencias emocionales y hábitos. Anto recuerda tu historia y la convierte en datos que puedes entender.',
        tags: ['Resumen semanal', 'Micro-logros', 'Tendencias emocionales', 'Hábitos'],
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
        { value: '8', label: 'Protocolos basados en evidencia clínica' },
        { value: '15', label: 'Distorsiones cognitivas detectadas automáticamente' },
        { value: '5.0', label: 'Calificación App Store' },
        { value: '24/7', label: 'Disponibilidad sin excepciones' },
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
    minimalFooter: {
      links: [
        { href: localePath('es', '/privacidad'), label: 'Privacidad' },
        { href: localePath('es', '/terminos'), label: 'Términos' },
        { href: localePath('es', '/contacto'), label: 'Contacto' },
        { href: localePath('es', '/changelog'), label: 'Changelog' },
      ],
      copyright: '© 2026 Anto · Hecho con cuidado en Chile',
      linksAria: 'Enlaces legales y de contacto',
    },
  },
  en: {
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
          'Empathetic conversation, clinical analysis, and integrated wellness tools. Anto understands context, detects patterns, and suggests the next concrete step.',
        tags: ['Empathetic response', 'Pattern detection', 'Concrete step', 'Available 24/7'],
        screenshot: 'chatAnxiety',
      },
      {
        id: 'analysis',
        eyebrow: 'Clinical analysis',
        titlePrefix: 'Understand',
        titleHighlight: 'your mind.',
        subtitle:
          'After each conversation, Anto detects the active thought pattern, measures emotional intensity, and proposes a concrete protocol. It does not just listen — it analyses.',
        tags: ['15 cognitive distortions', 'Emotional intensity', 'Suggested next step'],
        screenshot: 'sessionSummary',
        reverse: true,
      },
      {
        id: 'protocols',
        eyebrow: 'Clinical depth',
        titlePrefix: 'Real techniques,',
        titleHighlight: 'guided step by step.',
        subtitle:
          '8 evidence-based protocols — CBT, exposure, self-compassion, mindfulness. Anto guides you through each step without replacing your therapist — complementing them.',
        tags: ['CBT', '8 validated protocols', 'Step by step', 'PHQ-9 · GAD-7'],
        screenshot: 'tccProtocol',
      },
      {
        id: 'progress',
        eyebrow: 'Real tracking',
        titlePrefix: 'Your progress,',
        titleHighlight: 'visible over time.',
        subtitle:
          'Weekly and monthly summaries, micro-achievements, emotional trends, and habits. Anto remembers your story and turns it into data you can understand.',
        tags: ['Weekly summary', 'Micro-achievements', 'Emotional trends', 'Habits'],
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
        { value: '8', label: 'Evidence-based clinical protocols' },
        { value: '15', label: 'Cognitive distortions detected automatically' },
        { value: '5.0', label: 'App Store rating' },
        { value: '24/7', label: 'Availability without exceptions' },
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
    minimalFooter: {
      links: [
        { href: localePath('en', '/privacidad'), label: 'Privacy' },
        { href: localePath('en', '/terminos'), label: 'Terms' },
        { href: localePath('en', '/contacto'), label: 'Contact' },
        { href: localePath('en', '/changelog'), label: 'Changelog' },
      ],
      copyright: '© 2026 Anto · Made with care in Chile',
      linksAria: 'Legal and contact links',
    },
  },
};

export function getHomeLandingFinalCopy(locale: Locale): HomeLandingFinalCopy {
  return landingFinalCopy[locale];
}
