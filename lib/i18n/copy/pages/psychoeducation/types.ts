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
  /**
   * CSS object-position para el crop (p. ej. desktop panorámico).
   * Útil cuando el sujeto narrativo no está centrado.
   */
  objectPosition?: string;
  /**
   * aspect-ratio del frame en desktop (≥960px). Por defecto 2.4 / 1.
   * Usar un valor más bajo (p. ej. 2 / 1) si la foto necesita más altura útil.
   */
  desktopAspectRatio?: string;
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

/** Referencia bibliográfica (APA 7) con enlace estable (DOI preferido). */
export type PsychoeducationReference = {
  apa: string;
  href: string;
  /** Qué idea de la guía sustenta esta fuente. */
  note?: string;
};

export type PsychoeducationReferences = {
  title: string;
  support: string;
  items: readonly PsychoeducationReference[];
};

export type PsychoeducationChatBubble = {
  role: 'user' | 'anto';
  text: string;
};

/** Momento de producto editorial (viñeta de chat + sugerencias) tras una sección. */
export type PsychoeducationProductMoment = {
  title: string;
  body: string;
  /** Heading exacto de la sección tras la cual se inserta. */
  afterHeading: string;
  chat: {
    ariaLabel: string;
    messages: readonly PsychoeducationChatBubble[];
  };
  suggestionsLabel: string;
  suggestions: readonly string[];
};

export type PsychoeducationGuide = {
  slug: string;
  readingMinutes: number;
  /**
   * Variante de composición desktop.
   * - default: ensayo en dos columnas (resto de guías)
   * - cascade: longform centrado (una medida, sin díptico)
   */
  layout?: 'default' | 'cascade';
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
    /**
     * Enlace discreto a la hermana breve/completa (p. ej. mapa ↔ guía práctica).
     * Path lógico sin locale (p. ej. /recursos/distorsiones-cognitivas).
     */
    companionLink?: {
      href: string;
      label: string;
      support?: string;
    };
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
  /** Bibliografía APA (papers / guías reales) que sustentan la psicoeducación. */
  references?: PsychoeducationReferences;
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
  'mapa-distorsiones-cognitivas',
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
