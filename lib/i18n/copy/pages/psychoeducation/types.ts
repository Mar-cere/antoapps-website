export type PsychoeducationSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type PsychoeducationGuide = {
  slug: string;
  readingMinutes: number;
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  sections: readonly PsychoeducationSection[];
  relatedSlugs: readonly PsychoeducationSlug[];
  disclaimer: string;
  cta: {
    label: string;
    /** Path lógico sin prefijo /en (p. ej. /bienvenida). */
    path: string;
  };
};

export const PSYCHOEDUCATION_SLUGS = [
  'que-es-tcc',
  'distorsiones-cognitivas',
  'tecnica-abc',
  'ansiedad-y-preocupacion',
  'escalas-phq9-gad7',
  'autocompasion',
  'higiene-sueno-salud-mental',
  'mindfulness-guia-breve',
] as const;

export type PsychoeducationSlug = (typeof PSYCHOEDUCATION_SLUGS)[number];
