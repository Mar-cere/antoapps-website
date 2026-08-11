import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import type {
  HomeV2ChatThread,
  HomeV2EvidencePanel,
  HomeV2SummaryPanel,
} from '@/lib/i18n/copy/home/home-v2';

const CANONICAL_PATH = '/investigacion';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';
const EDITORIAL_WIDTH = 1536;
const EDITORIAL_HEIGHT = 1024;

export type ResearchTake = {
  title: string;
  body: string;
};

export type ResearchFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ResearchProductMedia =
  | { kind: 'chat'; chat: HomeV2ChatThread }
  | { kind: 'evidence'; evidence: HomeV2EvidencePanel }
  | { kind: 'summary'; summary: HomeV2SummaryPanel };

export type ResearchProductBridge = {
  title: string;
  body: string;
  media: ResearchProductMedia;
};

export type ResearchReference = {
  apa: string;
  href: string;
  label: string;
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
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  pullQuote: string;
  reading: {
    title: string;
    paragraphs: readonly string[];
  };
  figure: ResearchFigure;
  takes: {
    title: string;
    support: string;
    items: readonly ResearchTake[];
  };
  product: {
    title: string;
    support: string;
    items: readonly ResearchProductBridge[];
  };
  limits: {
    title: string;
    paragraphs: readonly string[];
  };
  references: {
    title: string;
    summaryLabel: string;
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
const REFERENCES: readonly Omit<ResearchReference, 'label'>[] = [
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

function referencesFor(locale: Locale): ResearchReference[] {
  const labelsEs = [
    'Woebot — RCT conversacional con TCC',
    'Firth et al. (2017a) — apps y depresión',
    'Firth et al. (2017b) — apps y ansiedad',
    'Hofmann & Smits (2008) — TCC y ansiedad',
    'Spitzer et al. (2006) — GAD-7',
    'Vaidyam et al. (2019) — chatbots',
    'Torok et al. (2020) — prevención digital',
    'Craske et al. (2014) — exposición inhibitoria',
  ] as const;
  const labelsEn = [
    'Woebot — conversational CBT RCT',
    'Firth et al. (2017a) — apps and depression',
    'Firth et al. (2017b) — apps and anxiety',
    'Hofmann & Smits (2008) — CBT and anxiety',
    'Spitzer et al. (2006) — GAD-7',
    'Vaidyam et al. (2019) — chatbots',
    'Torok et al. (2020) — digital prevention',
    'Craske et al. (2014) — inhibitory exposure',
  ] as const;
  const labels = locale === 'en' ? labelsEn : labelsEs;
  return REFERENCES.map((item, index) => ({
    ...item,
    label: labels[index],
  }));
}

function buildResearchPageCopy(locale: Locale): ResearchPageCopy {
  const references = referencesFor(locale);

  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Research',
      },
      crumbAria: 'Breadcrumb',
      meta: {
        title: 'Research — evidence that informs Anto | Anto',
        description:
          'How Anto reads clinical and digital mental-health evidence: CBT, GAD-7, conversational agents — and what it does not claim. Category literature with APA DOIs. Complements, does not replace, professional care.',
        openGraphTitle: 'Research — evidence that informs Anto',
        openGraphDescription:
          'An editorial look at the literature behind Anto: what we take, how it shows up in the product, and clear limits.',
        canonicalPath: CANONICAL_PATH,
        keywords:
          'Anto research, CBT evidence, GAD-7, digital mental health, conversational agents, APA citations, category evidence, mental health app evidence',
      },
      hero: {
        title: 'We read the evidence. We do not turn it into a promise.',
        subtitle:
          'Anto is shaped by clinical and digital mental-health literature — not by trials of Anto itself, and not as a substitute for human therapy.',
      },
      pullQuote:
        'Evidence guides the design. It does not turn an app into a diagnosis, a cure, or a replacement for a clinician.',
      reading: {
        title: 'How we read',
        paragraphs: [
          'The field is expanding: conversational support, CBT-informed techniques, validated screens, risk pathways. The literature shows promise and limits. We design toward the former and name the latter.',
          'This page does not claim Anto-specific randomised trials. It shows the category evidence that shapes protocols, psychoeducation, and product choices — with sources you can open.',
        ],
      },
      figure: {
        src: getEditorialImagePath('deskRain'),
        alt: 'Night desk by a rainy window — open notebook and warm lamp, a quiet place to read what informs the product',
        caption:
          'Evidence is read at a desk, not announced as a cure — ordinary hours, real constraints.',
        width: EDITORIAL_WIDTH,
        height: EDITORIAL_HEIGHT,
      },
      takes: {
        title: 'What we take',
        support: 'Four ideas that actually move the product — not a paper dump.',
        items: [
          {
            title: 'CBT as a clinical frame',
            body: 'Meta-analyses support CBT for adult anxiety versus placebo (Hofmann & Smits, 2008). Anto’s paths borrow that model: thoughts, emotions, behaviours — without calling the chat therapy.',
          },
          {
            title: 'Digital effects are usually modest',
            body: 'Smartphone meta-analyses report symptom reductions versus controls, often larger against inactive ones (Firth et al., 2017a, 2017b). Real, small-to-moderate — not remission as a promise.',
          },
          {
            title: 'Agents as a category, with gaps',
            body: 'RCTs such as Woebot (Fitzpatrick et al., 2017) and chatbot reviews (Vaidyam et al., 2019) suggest help between sessions for some people — and underline ethics, safety, and evidence gaps.',
          },
          {
            title: 'Screening, not diagnosis',
            body: 'GAD-7 (Spitzer et al., 2006) tracks trends in primary care. In Anto it supports observation over time — never a clinical label on its own.',
          },
        ],
      },
      product: {
        title: 'How it shows up in Anto',
        support:
          'Editorial vignettes — the tone of the product, not App Store screenshots as proof.',
        items: [
          {
            title: 'Conversation with structure',
            body: 'When someone names anxiety, Anto can stay with the moment and offer a concrete next step — closer to a conversational agent with CBT components than to open-ended chat.',
            media: {
              kind: 'chat',
              chat: {
                ariaLabel: 'Sample Anto chat: anxiety named, then one concrete step',
                messages: [
                  {
                    role: 'user',
                    text: 'I am at an 8. Chest tight. Mind will not slow down.',
                  },
                  {
                    role: 'anto',
                    text: 'That intensity is real. Before we analyse it — one small step: name one thing you can feel under your feet.',
                  },
                  {
                    role: 'user',
                    text: 'The floor. Cold.',
                  },
                  {
                    role: 'anto',
                    text: 'Stay with that for two breaths. Then we can look at what the mind is spinning — without forcing it to stop.',
                  },
                ],
              },
            },
          },
          {
            title: 'Trends, not labels',
            body: 'Brief check-ins borrow the idea of validated screens: patterns over weeks, not a diagnosis stamped on a score.',
            media: {
              kind: 'evidence',
              evidence: {
                ariaLabel: 'Sample anxiety check-in across four weeks — not a diagnosis',
                chromeTitle: 'Check-in',
                scaleName: 'Anxiety',
                scaleRange: 'brief check-in',
                currentLabel: 'This week',
                currentValue: '8',
                trendLabel: 'Lately',
                trend: 'A little lighter than a month ago',
                scaleMax: 21,
                bars: [
                  { label: 'W1', value: 14 },
                  { label: 'W2', value: 12 },
                  { label: 'W3', value: 10 },
                  { label: 'W4', value: 8 },
                ],
                insightLabel: 'What stood out',
                insight: 'Quieter nights followed days with one clear next step',
                disclaimer:
                  'Example only. Informed by brief screens such as GAD-7 — trends, not a clinical label.',
              },
            },
          },
          {
            title: 'A closing that names the pattern',
            body: 'Session closings surface thought–emotion–behaviour links — the CBT triangle — without claiming a treatment course.',
            media: {
              kind: 'summary',
              summary: {
                ariaLabel: 'Sample session closing that names a thought–emotion pattern',
                chromeTitle: 'Closing',
                moodFrom: 'Tight',
                moodTo: 'Steadier',
                moodLabel: 'mood arc',
                theme: 'Work anxiety before a presentation — the mind jumped to the worst ending.',
                patternLabel: 'Pattern',
                pattern: 'Thought → body alarm → urge to avoid preparing',
                helpedLabel: 'What helped',
                helped: 'One concrete step (open the first slide) instead of solving the whole fear',
              },
            },
          },
        ],
      },
      limits: {
        title: 'What we do not claim',
        paragraphs: [
          'Anto does not diagnose, prescribe, or replace emergency care. Digital risk signals can surface resources; they do not replace a crisis line or local emergency services.',
          'Category evidence is not an Anto efficacy trial. When Anto-specific research exists, it will be listed here with the same bibliographic standard.',
        ],
      },
      references: {
        title: 'References (APA)',
        summaryLabel: 'Show full citations',
        support: 'Stable DOI links for every source named on this page.',
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
      title: 'Investigación — evidencia que informa Anto | Anto',
      description:
        'Cómo Anto lee evidencia clínica y de salud mental digital: TCC, GAD-7, agentes conversacionales — y qué no afirma. Literatura de categoría con DOI APA. Complementa; no sustituye atención profesional.',
      openGraphTitle: 'Investigación — evidencia que informa Anto',
      openGraphDescription:
        'Una lectura editorial de la literatura detrás de Anto: qué tomamos, cómo se ve en el producto y límites claros.',
      canonicalPath: CANONICAL_PATH,
      keywords:
        'Anto investigación, evidencia TCC, GAD-7, salud mental digital, agentes conversacionales, citas APA, evidencia de categoría, base científica Anto',
    },
    hero: {
      title: 'Leemos la evidencia. No la convertimos en promesa.',
      subtitle:
        'Anto se informa de literatura clínica y de salud mental digital — no de ensayos propios de Anto, ni como sustituto de la terapia humana.',
    },
    pullQuote:
      'La evidencia orienta el diseño. No convierte una app en diagnóstico, cura ni reemplazo de un clínico.',
    reading: {
      title: 'Cómo leemos',
      paragraphs: [
        'El campo crece: acompañamiento conversacional, técnicas con base en TCC, escalas validadas, rutas de riesgo. La literatura muestra promesa y límites. Diseñamos hacia lo primero y nombramos lo segundo.',
        'Esta página no afirma ensayos aleatorizados propios de Anto. Muestra la evidencia de categoría que moldea protocolos, psicoeducación y decisiones de producto — con fuentes que puedes abrir.',
      ],
    },
    figure: {
      src: getEditorialImagePath('deskRain'),
      alt: 'Escritorio de noche junto a una ventana con lluvia — cuaderno abierto y lámpara cálida, un lugar quieto para leer lo que informa el producto',
      caption:
        'La evidencia se lee en un escritorio, no se anuncia como cura — horas ordinarias, límites reales.',
      width: EDITORIAL_WIDTH,
      height: EDITORIAL_HEIGHT,
    },
    takes: {
      title: 'Qué tomamos',
      support: 'Cuatro ideas que sí mueven el producto — no un volcado de papers.',
      items: [
        {
          title: 'TCC como marco clínico',
          body: 'Metaanálisis apoyan la TCC para ansiedad en adultos frente a placebo (Hofmann & Smits, 2008). Las rutas de Anto toman ese modelo: pensamientos, emociones, conductas — sin llamar terapia al chat.',
        },
        {
          title: 'Efectos digitales, por lo general modestos',
          body: 'Metaanálisis de apps reportan reducción de síntomas frente a control, a menudo mayor frente a controles inactivos (Firth et al., 2017a, 2017b). Reales, pequeños a moderados — no remisión como promesa.',
        },
        {
          title: 'Agentes como categoría, con vacíos',
          body: 'RCTs como Woebot (Fitzpatrick et al., 2017) y revisiones de chatbots (Vaidyam et al., 2019) sugieren ayuda entre sesiones para algunas personas — y subrayan ética, seguridad y vacíos de evidencia.',
        },
        {
          title: 'Cribado, no diagnóstico',
          body: 'El GAD-7 (Spitzer et al., 2006) sigue tendencias en atención primaria. En Anto sirve para observar el tiempo — nunca como etiqueta clínica por sí solo.',
        },
      ],
    },
    product: {
      title: 'Cómo se ve en Anto',
      support:
        'Viñetas editoriales — el tono del producto, no capturas de App Store como prueba.',
      items: [
        {
          title: 'Conversación con estructura',
          body: 'Cuando alguien nombra la ansiedad, Anto puede quedarse en el momento y ofrecer un siguiente paso concreto — más cerca de un agente con componentes de TCC que de un chat abierto.',
          media: {
            kind: 'chat',
            chat: {
              ariaLabel: 'Ejemplo de chat en Anto: ansiedad nombrada y un paso concreto',
              messages: [
                {
                  role: 'user',
                  text: 'Estoy en 8. Pecho apretado. La mente no baja.',
                },
                {
                  role: 'anto',
                  text: 'Esa intensidad es real. Antes de analizarla — un paso pequeño: nombra una cosa que sientes bajo los pies.',
                },
                {
                  role: 'user',
                  text: 'El suelo. Frío.',
                },
                {
                  role: 'anto',
                  text: 'Quédate ahí dos respiraciones. Después miramos qué gira en la mente — sin forzar que pare.',
                },
              ],
            },
          },
        },
        {
          title: 'Tendencias, no etiquetas',
          body: 'Los chequeos breves toman la idea de escalas validadas: patrones en semanas, no un diagnóstico sellado sobre un puntaje.',
          media: {
            kind: 'evidence',
            evidence: {
              ariaLabel: 'Ejemplo de chequeo de ansiedad en cuatro semanas — no un diagnóstico',
              chromeTitle: 'Chequeo',
              scaleName: 'Ansiedad',
              scaleRange: 'chequeo breve',
              currentLabel: 'Esta semana',
              currentValue: '8',
              trendLabel: 'Últimamente',
              trend: 'Un poco más liviana que hace un mes',
              scaleMax: 21,
              bars: [
                { label: 'S1', value: 14 },
                { label: 'S2', value: 12 },
                { label: 'S3', value: 10 },
                { label: 'S4', value: 8 },
              ],
              insightLabel: 'Lo que destacó',
              insight: 'Las noches más quietas siguieron a días con un siguiente paso claro',
              disclaimer:
                'Solo un ejemplo. Informado por cribados breves como el GAD-7 — tendencias, no etiqueta clínica.',
            },
          },
        },
        {
          title: 'Un cierre que nombra el patrón',
          body: 'Los cierres de sesión destacan vínculos pensamiento–emoción–conducta — el triángulo TCC — sin afirmar un curso de tratamiento.',
          media: {
            kind: 'summary',
            summary: {
              ariaLabel: 'Ejemplo de cierre de sesión que nombra un patrón pensamiento–emoción',
              chromeTitle: 'Cierre',
              moodFrom: 'Apretado',
              moodTo: 'más firme',
              moodLabel: 'arco del ánimo',
              theme: 'Ansiedad laboral antes de una presentación — la mente saltó al peor final.',
              patternLabel: 'Patrón',
              pattern: 'Pensamiento → alarma en el cuerpo → ganas de evitar preparar',
              helpedLabel: 'Qué ayudó',
              helped: 'Un paso concreto (abrir la primera diapositiva) en lugar de resolver todo el miedo',
            },
          },
        },
      ],
    },
    limits: {
      title: 'Qué no afirmamos',
      paragraphs: [
        'Anto no diagnostica, no prescribe ni sustituye emergencias. Las señales digitales de riesgo pueden mostrar recursos; no reemplazan una línea de crisis ni los servicios de emergencia locales.',
        'La evidencia de categoría no es un ensayo de eficacia de Anto. Cuando exista investigación propia, figurará aquí con el mismo estándar bibliográfico.',
      ],
    },
    references: {
      title: 'Referencias (APA)',
      summaryLabel: 'Ver citas completas',
      support: 'Enlaces DOI estables para cada fuente nombrada en esta página.',
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
  const copy = buildResearchPageCopy(locale);
  const { meta, figure } = copy;
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
      type: 'article',
      images: [
        {
          url: figure.src,
          width: figure.width,
          height: figure.height,
          alt: figure.alt,
        },
      ],
    },
  });
}
