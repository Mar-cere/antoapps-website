export type PsychoeducationSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Si true, renderiza <ol> en vez de <ul> (p. ej. ejercicios paso a paso). */
  ordered?: boolean;
};

export type PsychoeducationHowTo = {
  name: string;
  description: string;
  /** Duración ISO-8601, p. ej. PT5M */
  totalTime?: string;
  steps: readonly string[];
};

export type PsychoeducationFigure = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type PsychoeducationFurtherLink = {
  label: string;
  description: string;
  /** Path lógico (p. ej. /recursos/...) o URL absoluta https:// */
  href: string;
  external?: boolean;
};

export type PsychoeducationFurtherReading = {
  title: string;
  support: string;
  links: readonly PsychoeducationFurtherLink[];
};

/** Momento de producto (p. ej. captura de chat) insertado tras una sección. */
export type PsychoeducationProductMoment = {
  title: string;
  body: string;
  /** Heading exacto de la sección tras la cual se inserta. */
  afterHeading: string;
  figure: PsychoeducationFigure;
};

export type PsychoeducationGuide = {
  slug: string;
  readingMinutes: number;
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    /** Keywords naturales para meta + schema (coma-separadas). */
    keywords?: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  /** Cita editorial bajo el hero (ritmo de revista). */
  pullQuote?: string;
  /** Foto lifestyle opcional entre hero y cuerpo. */
  figure?: PsychoeducationFigure;
  sections: readonly PsychoeducationSection[];
  /** Captura de producto contextual (sin sustituir la foto editorial). */
  productMoment?: PsychoeducationProductMoment;
  /** Enlaces a material más clínico / completo. */
  furtherReading?: PsychoeducationFurtherReading;
  relatedSlugs: readonly PsychoeducationSlug[];
  disclaimer: string;
  /** Puente suave entre aviso clínico y CTA de producto. */
  ctaBridge?: string;
  cta: {
    label: string;
    /** Path lógico sin prefijo /en (p. ej. /bienvenida). */
    path: string;
  };
  /** Schema.org HowTo opcional (ejercicios prácticos). */
  howTo?: PsychoeducationHowTo;
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
  'depresion-guia-breve',
  'activacion-conductual',
  'toc-y-erp',
  'trauma-y-tept',
  'manejo-ira',
  'grounding-ansiedad-crisis',
  'estres-y-carga',
  'regulacion-emocional',
  'duelo-y-perdida',
  'agotamiento-y-burnout',
] as const;

export type PsychoeducationSlug = (typeof PSYCHOEDUCATION_SLUGS)[number];
