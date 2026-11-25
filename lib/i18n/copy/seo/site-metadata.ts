import type { Locale } from '@/lib/i18n/config';

export const siteKeywords: Record<Locale, string> = {
  es:
    'Anto, acompañamiento emocional continuo, ansiedad, horas quietas, grounding, 5-4-3-2-1, TCC, psicoeducación, iPhone, Android, prueba gratis',
  en:
    'Anto, ongoing emotional support, anxiety, quiet hours, grounding, 5-4-3-2-1, CBT, psychoeducation, iPhone, Android, free trial',
  pt:
    'Anto, acompanhamento emocional contínuo, ansiedade, horas quietas, grounding, 5-4-3-2-1, TCC, psicoeducação, iPhone, Android, teste grátis',
};

export const manifestPath: Record<Locale, string> = {
  es: '/manifest.json',
  en: '/manifest.en.json',
  pt: '/manifest.pt.json',
};
