import type { Locale } from '@/lib/i18n/config';

export type HomeChapterId = 'producto' | 'valor' | 'plan' | 'detalle';

export type HomeChapterCopy = {
  eyebrow: string;
  title: string;
  lede: string;
};

export type HomeChaptersCopy = Record<HomeChapterId, HomeChapterCopy>;

const chaptersCopy: Record<Locale, HomeChaptersCopy> = {
  es: {
    producto: {
      eyebrow: 'El producto',
      title: 'Así es Anto en tu día a día',
      lede: 'Mira la app, descubre qué incluye y cómo empezar en pocos pasos.',
    },
    valor: {
      eyebrow: 'Por qué Anto',
      title: 'Apoyo que encaja contigo',
      lede: 'Beneficios según tu perfil y respaldo basado en evidencia, sin perder de vista la privacidad.',
    },
    plan: {
      eyebrow: 'Empieza hoy',
      title: 'Precio claro y datos protegidos',
      lede: 'Prueba la app y revisa cómo cuidamos tu información antes de suscribirte.',
    },
    detalle: {
      eyebrow: 'Más información',
      title: 'Actualizaciones, tecnología y respuestas',
      lede: 'Novedades de versión, stack técnico y preguntas frecuentes si quieres profundizar.',
    },
  },
  en: {
    producto: {
      eyebrow: 'The product',
      title: 'Anto in everyday use',
      lede: 'See the app, what it includes, and how to get started in a few steps.',
    },
    valor: {
      eyebrow: 'Why Anto',
      title: 'Support that fits you',
      lede: 'Benefits for your profile and evidence-backed design, with privacy front and centre.',
    },
    plan: {
      eyebrow: 'Get started',
      title: 'Clear pricing and protected data',
      lede: 'Try the app and see how we safeguard your information before you subscribe.',
    },
    detalle: {
      eyebrow: 'Learn more',
      title: 'Updates, technology, and answers',
      lede: 'Version highlights, technical stack, and FAQs if you want to go deeper.',
    },
  },
};

export function getHomeChaptersCopy(locale: Locale): HomeChaptersCopy {
  return chaptersCopy[locale];
}
