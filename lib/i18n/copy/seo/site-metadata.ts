import type { Locale } from '@/lib/i18n/config';

export const siteKeywords: Record<Locale, string> = {
  es:
    'salud mental, bienestar emocional, psicoeducación, terapia cognitivo conductual, distorsiones cognitivas, técnica ABC, app ansiedad, PHQ-9, GAD-7, mindfulness, autocompasión, app depresión chile, chatbot salud mental, asistente IA bienestar, técnicas CBT app',
  en:
    'mental health app, psychoeducation, cognitive behavioural therapy, cognitive distortions, ABC technique, anxiety app, PHQ-9, GAD-7, mindfulness, self-compassion, depression support app, mental health chatbot, wellbeing assistant, CBT techniques app',
};

export const manifestPath: Record<Locale, string> = {
  es: '/manifest.json',
  en: '/manifest.en.json',
};
