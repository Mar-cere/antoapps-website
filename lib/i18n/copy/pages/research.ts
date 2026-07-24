import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getHomeLandingScreenshotAlt,
  getHomeLandingScreenshotPath,
  type HomeLandingScreenshotKey,
} from '@/lib/assets/app-screenshots';

const CANONICAL_PATH = '/investigacion';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

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

export type ResearchProductBridge = {
  title: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
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
  /** Ficha corta de confianza (camino 3) — revisable / eliminable. */
  trust: {
    title: string;
    support: string;
    bullets: readonly string[];
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

function productBridge(
  locale: Locale,
  key: HomeLandingScreenshotKey,
  title: string,
  body: string,
): ResearchProductBridge {
  return {
    title,
    body,
    src: getHomeLandingScreenshotPath(key),
    alt: getHomeLandingScreenshotAlt(key, locale),
    width: APP_SCREENSHOT_WIDTH,
    height: APP_SCREENSHOT_HEIGHT,
  };
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
        src: getHomeLandingScreenshotPath('tccProtocol'),
        alt: getHomeLandingScreenshotAlt('tccProtocol', locale),
        caption:
          'A structured CBT path in Anto — informed by the clinical frame, without presenting the chat as therapy.',
        width: APP_SCREENSHOT_WIDTH,
        height: APP_SCREENSHOT_HEIGHT,
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
        support: 'A short bridge from literature to product — not proof that Anto “works”.',
        items: [
          productBridge(
            locale,
            'chatAnxiety',
            'Conversation with structure',
            'When someone names anxiety, Anto can stay with the moment and offer a concrete next step — closer to a conversational agent with CBT components than to open-ended chat.',
          ),
          productBridge(
            locale,
            'emotionalDashboard',
            'Trends, not labels',
            'Emotional tracking borrows the idea of brief screens: patterns over time, not a diagnosis stamped on a score.',
          ),
          productBridge(
            locale,
            'sessionSummary',
            'A closing that names the pattern',
            'Session summaries surface thought–emotion–behaviour links — the same triangle the CBT literature uses — without claiming a treatment course.',
          ),
        ],
      },
      limits: {
        title: 'What we do not claim',
        paragraphs: [
          'Anto does not diagnose, prescribe, or replace emergency care. Digital risk signals can surface resources; they do not replace a crisis line or local emergency services.',
          'Category evidence is not an Anto efficacy trial. When Anto-specific research exists, it will be listed here with the same bibliographic standard.',
        ],
      },
      trust: {
        title: 'Quick trust card',
        support: 'If you only have a minute:',
        bullets: [
          'Category evidence (CBT, scales, digital MH) — not Anto RCTs.',
          'Design informed by that literature; chat is not therapy.',
          'No diagnosis, no prescription, no substitute for emergencies.',
          'Full APA citations with DOIs below.',
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
      src: getHomeLandingScreenshotPath('tccProtocol'),
      alt: getHomeLandingScreenshotAlt('tccProtocol', locale),
      caption:
        'Una ruta estructurada de TCC en Anto — informada por el marco clínico, sin presentar el chat como terapia.',
      width: APP_SCREENSHOT_WIDTH,
      height: APP_SCREENSHOT_HEIGHT,
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
      support: 'Un puente corto de literatura a producto — no una prueba de que Anto “funciona”.',
      items: [
        productBridge(
          locale,
          'chatAnxiety',
          'Conversación con estructura',
          'Cuando alguien nombra la ansiedad, Anto puede quedarse en el momento y ofrecer un siguiente paso concreto — más cerca de un agente con componentes de TCC que de un chat abierto.',
        ),
        productBridge(
          locale,
          'emotionalDashboard',
          'Tendencias, no etiquetas',
          'El seguimiento emocional toma la idea de cribados breves: patrones en el tiempo, no un diagnóstico sellado sobre un puntaje.',
        ),
        productBridge(
          locale,
          'sessionSummary',
          'Un cierre que nombra el patrón',
          'Los resúmenes de sesión destacan vínculos pensamiento–emoción–conducta — el mismo triángulo de la literatura TCC — sin afirmar un curso de tratamiento.',
        ),
      ],
    },
    limits: {
      title: 'Qué no afirmamos',
      paragraphs: [
        'Anto no diagnostica, no prescribe ni sustituye emergencias. Las señales digitales de riesgo pueden mostrar recursos; no reemplazan una línea de crisis ni los servicios de emergencia locales.',
        'La evidencia de categoría no es un ensayo de eficacia de Anto. Cuando exista investigación propia, figurará aquí con el mismo estándar bibliográfico.',
      ],
    },
    trust: {
      title: 'Ficha rápida',
      support: 'Si solo tienes un minuto:',
      bullets: [
        'Evidencia de categoría (TCC, escalas, salud mental digital) — no RCTs de Anto.',
        'Diseño informado por esa literatura; el chat no es terapia.',
        'Sin diagnóstico, sin prescripción, sin sustituto de emergencias.',
        'Citas APA completas con DOI más abajo.',
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
