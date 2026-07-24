import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/investigacion';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

export type ResearchPillar = {
  title: string;
  body: string;
};

export type ResearchLiteratureItem = {
  /** Cita APA 7 completa */
  apa: string;
  href: string;
  /** Qué idea informa en Anto (tono honesto, no “prueba que Anto cura”). */
  note: string;
  kind: string;
};

export type ResearchReference = {
  apa: string;
  href: string;
  note?: string;
};

export type ResearchPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  crumbAria: string;
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  pullQuote: string;
  approach: {
    title: string;
    paragraphs: readonly string[];
    pillarsTitle: string;
    pillars: readonly ResearchPillar[];
  };
  literature: {
    title: string;
    support: string;
    items: readonly ResearchLiteratureItem[];
  };
  limits: {
    title: string;
    paragraphs: readonly string[];
  };
  references: {
    title: string;
    support: string;
    items: readonly ResearchReference[];
  };
  disclaimer: string;
  cta: {
    bridge: string;
    contactLabel: string;
    contactHref: string;
    emailLabel: string;
    emailHref: string;
  };
  resourcesLink: {
    label: string;
    href: string;
  };
  externalLinkHint: string;
};

/** Bibliografía curada — solo papers verificables con DOI/URL estable. */
const LITERATURE: readonly Omit<ResearchLiteratureItem, 'note' | 'kind'>[] = [
  {
    apa: 'Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017). Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot): A randomized controlled trial. JMIR Mental Health, 4(2), e19. https://doi.org/10.2196/mental.7785',
    href: 'https://doi.org/10.2196/mental.7785',
  },
  {
    apa: 'Firth, J., Torous, J., Nicholas, J., Carney, R., Pratap, A., Rosenbaum, S., & Sarris, J. (2017a). The efficacy of smartphone-based mental health interventions for depressive symptoms: A meta-analysis of randomized controlled trials. World Psychiatry, 16(3), 287–298. https://doi.org/10.1002/wps.20472',
    href: 'https://doi.org/10.1002/wps.20472',
  },
  {
    apa: 'Firth, J., Torous, J., Nicholas, J., Carney, R., Rosenbaum, S., & Sarris, J. (2017b). Can smartphone mental health interventions reduce symptoms of anxiety? A meta-analysis of randomized controlled trials. Journal of Affective Disorders, 218, 15–22. https://doi.org/10.1016/j.jad.2017.04.046',
    href: 'https://doi.org/10.1016/j.jad.2017.04.046',
  },
  {
    apa: 'Hofmann, S. G., & Smits, J. A. J. (2008). Cognitive-behavioral therapy for adult anxiety disorders: A meta-analysis of randomized placebo-controlled trials. The Journal of Clinical Psychiatry, 69(4), 621–632. https://doi.org/10.4088/jcp.v69n0415',
    href: 'https://doi.org/10.4088/jcp.v69n0415',
  },
  {
    apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
    href: 'https://doi.org/10.1001/archinte.166.10.1092',
  },
  {
    apa: 'Vaidyam, A. N., Wisniewski, H., Halamka, J. D., Kashavan, M. S., & Torous, J. (2019). Chatbots and conversational agents in mental health: A review of the psychiatric landscape. The Canadian Journal of Psychiatry, 64(7), 456–464. https://doi.org/10.1177/0706743719828977',
    href: 'https://doi.org/10.1177/0706743719828977',
  },
  {
    apa: 'Torok, M., Han, J., Baker, S., Werner-Seidler, A., Wong, I., Larsen, M. E., & Christensen, H. (2020). Suicide prevention using self-guided digital interventions: A systematic review and meta-analysis of randomised controlled trials. The Lancet Digital Health, 2(1), e25–e36. https://doi.org/10.1016/S2589-7500(19)30222-5',
    href: 'https://doi.org/10.1016/S2589-7500(19)30222-5',
  },
  {
    apa: 'Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T., & Vervliet, B. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy, 58, 10–23. https://doi.org/10.1016/j.brat.2014.04.006',
    href: 'https://doi.org/10.1016/j.brat.2014.04.006',
  },
] as const;

function literatureFor(
  locale: Locale,
): ResearchLiteratureItem[] {
  const kindsEs = [
    'Ensayo controlado aleatorizado',
    'Metaanálisis',
    'Metaanálisis',
    'Metaanálisis',
    'Validación de escala',
    'Revisión',
    'Revisión sistemática y metaanálisis',
    'Artículo teórico-clínico',
  ] as const;
  const kindsEn = [
    'Randomized controlled trial',
    'Meta-analysis',
    'Meta-analysis',
    'Meta-analysis',
    'Scale validation',
    'Review',
    'Systematic review and meta-analysis',
    'Theoretical–clinical article',
  ] as const;
  const notesEs = [
    'Muestra que un agente conversacional con componentes de TCC puede reducir síntomas en un RCT — evidencia de categoría, no un ensayo de Anto.',
    'Síntesis de 18 RCTs (n ≈ 3.414): apps pueden reducir síntomas depresivos vs. control, con efectos mayores frente a controles inactivos.',
    'Síntesis sobre intervenciones por smartphone para ansiedad: señal favorable con heterogeneidad; no equivale a “cura digital”.',
    'Base de eficacia de la TCC para trastornos de ansiedad en adultos frente a placebo — marco de los protocolos psicoeducativos de Anto.',
    'Validación del GAD-7 como cribado breve en atención primaria — escala que Anto puede usar para tendencias, no para diagnóstico.',
    'Panorama de chatbots en salud mental: potencial, límites éticos y necesidad de evidencia más sólida.',
    'Intervenciones digitales autoguiadas y prevención del suicidio: señal prometedora con matices; no sustituye crisis ni emergencia.',
    'Marco de exposición por aprendizaje inhibitorio — informa cómo Anto habla de evitación y acercamiento gradual.',
  ] as const;
  const notesEn = [
    'Shows a conversational agent with CBT components can reduce symptoms in an RCT — category evidence, not an Anto trial.',
    'Synthesis of 18 RCTs (n ≈ 3,414): apps can reduce depressive symptoms vs. control, with larger effects against inactive controls.',
    'Synthesis on smartphone interventions for anxiety: a favourable signal with heterogeneity; not the same as a “digital cure”.',
    'Efficacy base for CBT for adult anxiety disorders versus placebo — the frame behind Anto’s psychoeducation protocols.',
    'Validation of GAD-7 as a brief primary-care screen — a scale Anto can use for trends, not diagnosis.',
    'Landscape of mental-health chatbots: potential, ethical limits, and the need for stronger evidence.',
    'Self-guided digital interventions and suicide prevention: a promising signal with caveats; does not replace crisis or emergency care.',
    'Inhibitory-learning exposure frame — informs how Anto talks about avoidance and graded approach.',
  ] as const;

  const kinds = locale === 'en' ? kindsEn : kindsEs;
  const notes = locale === 'en' ? notesEn : notesEs;

  return LITERATURE.map((item, index) => ({
    ...item,
    kind: kinds[index],
    note: notes[index],
  }));
}

function referencesFromLiterature(locale: Locale): ResearchReference[] {
  return literatureFor(locale).map(({ apa, href, note }) => ({ apa, href, note }));
}

function buildResearchPageCopy(locale: Locale): ResearchPageCopy {
  const literature = literatureFor(locale);
  const references = referencesFromLiterature(locale);

  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Research',
      },
      crumbAria: 'Breadcrumb',
      meta: {
        title: 'Research — scientific basis behind Anto | Anto',
        description:
          'How Anto is informed by clinical and digital mental-health evidence: CBT, screening scales (GAD-7), conversational agents, and honest limits. Curated APA references with DOIs. Complements — does not replace — professional care.',
        openGraphTitle: 'Research — scientific basis behind Anto',
        openGraphDescription:
          'Literature that informs Anto’s approach: CBT, scales, digital interventions — with real APA citations and clear limits.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Scientific basis',
        subtitle:
          'Anto is informed by clinical and digital mental-health literature — not a substitute for trials of Anto itself, nor for human therapy.',
      },
      pullQuote:
        'Evidence guides the design. It does not turn an app into a diagnosis, a cure, or a replacement for a clinician.',
      approach: {
        title: 'How we read the evidence',
        paragraphs: [
          'Anto sits in a growing field: conversational support, CBT-informed techniques, symptom tracking with validated screens, and risk pathways. The literature shows promise and limits. We design toward the former and state the latter clearly.',
          'We do not claim Anto-specific randomised trials on this page. What you will find is the category evidence that shapes protocols, psychoeducation, and product decisions — with citations you can open.',
        ],
        pillarsTitle: 'What the literature informs',
        pillars: [
          {
            title: 'CBT as a clinical frame',
            body: 'Meta-analyses support CBT for adult anxiety disorders versus placebo (Hofmann & Smits, 2008). Anto’s structured paths and psychoeducation borrow that model: thoughts, emotions, behaviours — without presenting the chat as therapy.',
          },
          {
            title: 'Digital interventions with modest effects',
            body: 'Smartphone meta-analyses report reductions in depressive and anxiety symptoms versus controls, often larger against inactive controls (Firth et al., 2017a, 2017b). Effects are real and usually small-to-moderate — not a promise of remission.',
          },
          {
            title: 'Conversational agents as a category',
            body: 'RCTs such as Woebot (Fitzpatrick et al., 2017) and reviews of chatbots (Vaidyam et al., 2019) suggest automated agents can help some people between sessions. They also underline ethics, safety, and evidence gaps.',
          },
          {
            title: 'Screening, not diagnosis',
            body: 'Scales such as GAD-7 (Spitzer et al., 2006) help track trends in primary care. In Anto they support observation over time — never a clinical label on their own.',
          },
        ],
      },
      literature: {
        title: 'Selected literature',
        support:
          'A short, curated set. Each note states what the paper informs in Anto — not what it “proves” about the product.',
        items: literature,
      },
      limits: {
        title: 'Limits we do not blur',
        paragraphs: [
          'Anto does not diagnose, prescribe, or replace emergency care. Digital signals of risk can surface resources; they do not replace a crisis line or local emergency services.',
          'Category evidence (other apps, CBT protocols, scales) is not the same as an Anto efficacy trial. When we have Anto-specific research, it will be listed here with the same bibliographic standard.',
          'Collaboration with clinicians and continuous literature review guide updates; they do not turn every feature into a peer-reviewed claim.',
        ],
      },
      references: {
        title: 'References (APA)',
        support: 'Same sources as above, in bibliographic form, with stable DOI links.',
        items: references,
      },
      disclaimer:
        'Psychoeducation and product transparency. Does not replace clinical assessment or treatment. In suicidal risk or violence, seek local emergency help immediately.',
      cta: {
        bridge:
          'If you research digital mental health and want to discuss methods, limits, or collaboration — write to us.',
        contactLabel: 'Contact',
        contactHref: localePath(locale, '/contacto'),
        emailLabel: DEVELOPER_EMAIL,
        emailHref: `mailto:${DEVELOPER_EMAIL}`,
      },
      resourcesLink: {
        label: 'Back to resources',
        href: localePath(locale, '/recursos'),
      },
      externalLinkHint: 'Opens in a new tab',
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Investigación',
    },
    crumbAria: 'Breadcrumb',
    meta: {
      title: 'Investigación — base científica de Anto | Anto',
      description:
        'Cómo Anto se informa de evidencia clínica y de salud mental digital: TCC, escalas (GAD-7), agentes conversacionales y límites honestos. Referencias APA con DOI. Complementa; no sustituye atención profesional.',
      openGraphTitle: 'Investigación — base científica de Anto',
      openGraphDescription:
        'Literatura que informa el enfoque de Anto: TCC, escalas, intervenciones digitales — con citas APA reales y límites claros.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Base científica',
      subtitle:
        'Anto se informa de literatura clínica y de salud mental digital — no es un sustituto de ensayos propios de Anto ni de la terapia humana.',
    },
    pullQuote:
      'La evidencia orienta el diseño. No convierte una app en diagnóstico, cura ni reemplazo de un clínico.',
    approach: {
      title: 'Cómo leemos la evidencia',
      paragraphs: [
        'Anto está en un campo en expansión: acompañamiento conversacional, técnicas con base en TCC, seguimiento con escalas validadas y rutas de riesgo. La literatura muestra promesa y límites. Diseñamos hacia lo primero y nombramos lo segundo.',
        'En esta página no afirmamos ensayos aleatorizados propios de Anto. Lo que encontrarás es evidencia de categoría que moldea protocolos, psicoeducación y decisiones de producto — con citas que puedes abrir.',
      ],
      pillarsTitle: 'Qué informa la literatura',
      pillars: [
        {
          title: 'TCC como marco clínico',
          body: 'Metaanálisis apoyan la TCC para trastornos de ansiedad en adultos frente a placebo (Hofmann & Smits, 2008). Las rutas estructuradas y la psicoeducación de Anto toman ese modelo: pensamientos, emociones, conductas — sin presentar el chat como terapia.',
        },
        {
          title: 'Intervenciones digitales con efectos modestos',
          body: 'Metaanálisis de apps reportan reducción de síntomas depresivos y de ansiedad frente a control, a menudo mayor frente a controles inactivos (Firth et al., 2017a, 2017b). Los efectos son reales y suelen ser pequeños a moderados — no una promesa de remisión.',
        },
        {
          title: 'Agentes conversacionales como categoría',
          body: 'RCTs como Woebot (Fitzpatrick et al., 2017) y revisiones de chatbots (Vaidyam et al., 2019) sugieren que agentes automatizados pueden ayudar a algunas personas entre sesiones. También subrayan ética, seguridad y vacíos de evidencia.',
        },
        {
          title: 'Cribado, no diagnóstico',
          body: 'Escalas como el GAD-7 (Spitzer et al., 2006) ayudan a seguir tendencias en atención primaria. En Anto sirven para observar el tiempo — nunca como etiqueta clínica por sí solas.',
        },
      ],
    },
    literature: {
      title: 'Literatura seleccionada',
      support:
        'Un conjunto corto y curado. Cada nota indica qué informa el paper en Anto — no qué “demuestra” sobre el producto.',
      items: literature,
    },
    limits: {
      title: 'Límites que no difuminamos',
      paragraphs: [
        'Anto no diagnostica, no prescribe ni sustituye emergencias. Las señales digitales de riesgo pueden mostrar recursos; no reemplazan una línea de crisis ni los servicios de emergencia locales.',
        'La evidencia de categoría (otras apps, protocolos TCC, escalas) no es lo mismo que un ensayo de eficacia de Anto. Cuando exista investigación propia, figurará aquí con el mismo estándar bibliográfico.',
        'La colaboración con clínicos y la revisión continua de literatura orientan actualizaciones; no convierten cada función en una afirmación peer-reviewed.',
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support: 'Las mismas fuentes, en forma bibliográfica, con enlaces DOI estables.',
      items: references,
    },
    disclaimer:
      'Psicoeducación y transparencia de producto. No sustituye evaluación ni tratamiento clínico. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    cta: {
      bridge:
        'Si investigas salud mental digital y quieres hablar de métodos, límites o colaboración — escríbenos.',
      contactLabel: 'Contacto',
      contactHref: localePath(locale, '/contacto'),
      emailLabel: DEVELOPER_EMAIL,
      emailHref: `mailto:${DEVELOPER_EMAIL}`,
    },
    resourcesLink: {
      label: 'Volver a recursos',
      href: localePath(locale, '/recursos'),
    },
    externalLinkHint: 'Abre en una pestaña nueva',
  };
}

export function getResearchPageCopy(locale: Locale): ResearchPageCopy {
  return buildResearchPageCopy(locale);
}

export function researchPageMetadata(locale: Locale): Metadata {
  const { meta } = buildResearchPageCopy(locale);
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
    },
  });
}
