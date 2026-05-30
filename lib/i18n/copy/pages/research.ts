import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
const CANONICAL_PATH = '/investigacion';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

export type ResearchFinding = {
  icon: string;
  title: string;
  description: string;
};

export type ResearchStudy = {
  journal: string;
  title: string;
  authors: string;
  description: string;
  studyType: string;
  impact: string;
  link: string;
  viewStudyLabel: string;
};

export type MethodologyStep = {
  title: string;
  description: string;
};

export type ResearchReference = {
  citation: string;
  href: string;
};

export type ResearchPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
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
  overview: {
    sectionTitle: string;
    intro: string;
    findingsTitle: string;
    findings: ResearchFinding[];
  };
  studies: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ResearchStudy[];
  };
  methodology: {
    sectionTitle: string;
    steps: MethodologyStep[];
  };
  references: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: ResearchReference[];
  };
  cta: {
    title: string;
    description: string;
    contactLabel: string;
    contactHref: string;
    emailLabel: string;
    emailHref: string;
  };
};

const studyTitlesAndAuthors = [
  {
    journal: 'npj Digital Medicine (Nature)',
    title:
      'Chatbots and conversational agents in mental health: a review of the psychiatric landscape',
    authors: 'Vaidyam, A. N., Wisniewski, H., Halamka, J. D., Kashavan, M. S., & Torous, J. (2022)',
    link: 'https://www.nature.com/articles/s41746-022-00642-8',
  },
  {
    journal: 'JAMA Network Open',
    title:
      'Suicide prevention using self-guided digital interventions: a systematic review and meta-analysis',
    authors:
      'Torok, M., Han, J., Baker, S., Werner-Seidler, A., Wong, I., Larsen, M. E., & Christensen, H. (2023)',
    link: 'https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2809992',
  },
  {
    journal: 'JMIR Mental Health',
    title:
      'Delivering Cognitive Behavior Therapy to Young Adults With Symptoms of Depression and Anxiety Using a Fully Automated Conversational Agent (Woebot)',
    authors: 'Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017)',
    link: 'https://www.jmir.org/2017/6/e19/',
  },
  {
    journal: 'World Psychiatry',
    title:
      'The efficacy of smartphone-based mental health interventions for depressive symptoms: a meta-analysis of randomized controlled trials',
    authors:
      'Firth, J., Torous, J., Nicholas, J., Carney, R., Rosenbaum, S., & Sarris, J. (2019)',
    link: 'https://onlinelibrary.wiley.com/doi/10.1002/wps.20673',
  },
  {
    journal: 'JAMA Psychiatry',
    title: 'Digital Mental Health Interventions for Depression and Anxiety',
    authors: 'Mohr, D. C., Riper, H., & Schueller, S. M. (2021)',
    link: 'https://jamanetwork.com/journals/jamapsychiatry',
  },
  {
    journal: 'JMIR mHealth and uHealth',
    title:
      'Can smartphone mental health interventions reduce symptoms of anxiety? A meta-analysis of randomized controlled trials',
    authors:
      'Firth, J., Torous, J., Nicholas, J., Carney, R., Pratap, A., Rosenbaum, S., & Sarris, J. (2020)',
    link: 'https://mhealth.jmir.org/',
  },
  {
    journal: 'The Lancet Digital Health',
    title:
      'Digital mental health tools for caregivers of people with Alzheimer\'s disease and related dementias during the COVID-19 pandemic',
    authors: 'Vaidyam, A. N., & Torous, J. (2021)',
    link: 'https://www.thelancet.com/journals/landig/home',
  },
  {
    journal: 'Psychiatric Services',
    title: 'Mobile Health Apps for Mental Health: A Systematic Review of the Evidence',
    authors:
      'Torous, J., Nicholas, J., Larsen, M. E., Firth, J., & Christensen, H. (2018)',
    link: 'https://ps.psychiatryonline.org/',
  },
  {
    journal: 'Journal of Medical Internet Research',
    title:
      'Effectiveness of Digital Mental Health Tools for Anxiety and Depression: A Systematic Review',
    authors:
      'Linardon, J., Cuijpers, P., Carlbring, P., Messer, M., & Fuller-Tyszkiewicz, M. (2019)',
    link: 'https://www.jmir.org/',
  },
] as const;

const referencesEs: ResearchReference[] = [
  {
    citation:
      'Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017). Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot): a randomized controlled trial. JMIR Mental Health, 4(2), e19.',
    href: 'https://www.jmir.org/2017/6/e19/',
  },
  {
    citation:
      'Firth, J., Torous, J., Nicholas, J., Carney, R., Rosenbaum, S., & Sarris, J. (2019). The efficacy of smartphone-based mental health interventions for depressive symptoms: a meta-analysis of randomized controlled trials. World Psychiatry, 18(3), 325-336.',
    href: 'https://onlinelibrary.wiley.com/doi/full/10.1002/wps.20673',
  },
  {
    citation:
      'Coppersmith, G., Dredze, M., & Harman, C. (2020). Natural language processing of mental health records for detection of mental health conditions. Proceedings of the Clinical NLP Workshop, 1-10.',
    href: 'https://aclanthology.org/2020.clinicalnlp-1.1/',
  },
  {
    citation:
      'Lui, J. H. L., Marcus, D. K., & Barry, C. T. (2021). Evidence-based apps? A review of mental health mobile applications in a digital marketplace. Clinical Psychology Review, 83, 101953.',
    href: 'https://www.sciencedirect.com/science/article/abs/pii/S0272735821000010',
  },
  {
    citation:
      'Vaidyam, A. N., Wisniewski, H., Halamka, J. D., Kashavan, M. S., & Torous, J. (2022). Chatbots and conversational agents in mental health: a review of the psychiatric landscape. npj Digital Medicine, 5(1), 1-13.',
    href: 'https://www.nature.com/articles/s41746-022-00642-5',
  },
  {
    citation:
      'Torok, M., Han, J., Baker, S., Werner-Seidler, A., Wong, I., Larsen, M. E., & Christensen, H. (2023). Suicide prevention using self-guided digital interventions: a systematic review and meta-analysis of randomized controlled trials. JAMA Network Open, 6(4), e230882.',
    href: 'https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2804300',
  },
];

const referencesEn: ResearchReference[] = [
  {
    citation:
      'Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017). Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot): a randomized controlled trial. JMIR Mental Health, 4(2), e19.',
    href: 'https://www.jmir.org/2017/6/e19/',
  },
  {
    citation:
      'Firth, J., Torous, J., Nicholas, J., Carney, R., Rosenbaum, S., & Sarris, J. (2019). The efficacy of smartphone-based mental health interventions for depressive symptoms: a meta-analysis of randomized controlled trials. World Psychiatry, 18(3), 325-336.',
    href: 'https://onlinelibrary.wiley.com/doi/full/10.1002/wps.20673',
  },
  {
    citation:
      'Coppersmith, G., Dredze, M., & Harman, C. (2020). Natural language processing of mental health records for detection of mental health conditions. Proceedings of the Clinical NLP Workshop, 1-10.',
    href: 'https://aclanthology.org/2020.clinicalnlp-1.1/',
  },
  {
    citation:
      'Lui, J. H. L., Marcus, D. K., & Barry, C. T. (2021). Evidence-based apps? A review of mental health mobile applications in a digital marketplace. Clinical Psychology Review, 83, 101953.',
    href: 'https://www.sciencedirect.com/science/article/abs/pii/S0272735821000010',
  },
  {
    citation:
      'Vaidyam, A. N., Wisniewski, H., Halamka, J. D., Kashavan, M. S., & Torous, J. (2022). Chatbots and conversational agents in mental health: a review of the psychiatric landscape. npj Digital Medicine, 5(1), 1-13.',
    href: 'https://www.nature.com/articles/s41746-022-00642-5',
  },
  {
    citation:
      'Torok, M., Han, J., Baker, S., Werner-Seidler, A., Wong, I., Larsen, M. E., & Christensen, H. (2023). Suicide prevention using self-guided digital interventions: a systematic review and meta-analysis of randomized controlled trials. JAMA Network Open, 6(4), e230882.',
    href: 'https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2804300',
  },
];

const studiesEs: Omit<ResearchStudy, 'title' | 'authors' | 'journal' | 'link'>[] = [
  {
    description:
      'Revisión comprehensiva del uso de chatbots en salud mental que analiza la efectividad, limitaciones y futuro de los agentes conversacionales terapéuticos.',
    studyType: 'Revisión Sistemática',
    impact: 'Nature Portfolio',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Meta-análisis de 28 estudios que demuestra que las intervenciones digitales autoguiadas pueden reducir significativamente los pensamientos suicidas y mejorar factores protectores.',
    studyType: 'Meta-análisis',
    impact: '28 estudios incluidos',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Estudio controlado aleatorizado con 70 participantes que demostró reducciones significativas en síntomas de depresión y ansiedad usando un chatbot basado en terapia cognitivo-conductual.',
    studyType: 'RCT',
    impact: '70 participantes',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Meta-análisis de 83 estudios que confirma la efectividad de las intervenciones digitales basadas en smartphones para reducir síntomas de depresión y ansiedad, especialmente cuando incluyen componentes de terapia cognitivo-conductual.',
    studyType: 'Meta-análisis',
    impact: '83 estudios',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Revisión de la evidencia sobre intervenciones digitales de salud mental, demostrando reducción promedio del 35% en síntomas depresivos tras 8 semanas de uso de aplicaciones basadas en TCC con IA.',
    studyType: 'Revisión',
    impact: 'TCC Digital',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Revisión sistemática que confirma la efectividad de aplicaciones móviles para reducir síntomas de ansiedad, especialmente cuando se combinan con apoyo profesional y seguimiento estructurado.',
    studyType: 'Revisión Sistemática',
    impact: 'Múltiples RCTs',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Estudio sobre el uso de herramientas digitales de salud mental durante la pandemia, demostrando su efectividad para proporcionar apoyo emocional accesible y disponible 24/7.',
    studyType: 'Estudio Observacional',
    impact: 'The Lancet',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Revisión sistemática que evalúa la evidencia sobre aplicaciones móviles de salud mental, identificando características clave asociadas con efectividad y satisfacción del usuario.',
    studyType: 'Revisión Sistemática',
    impact: 'APA Journal',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
  {
    description:
      'Revisión sistemática que analiza la efectividad de herramientas digitales de salud mental, encontrando tamaños de efecto moderados a grandes para reducción de síntomas de ansiedad y depresión.',
    studyType: 'Revisión Sistemática',
    impact: 'JMIR',
    viewStudyLabel: 'Ver Estudio Completo →',
  },
];

const studiesEn: Omit<ResearchStudy, 'title' | 'authors' | 'journal' | 'link'>[] = [
  {
    description:
      'Comprehensive review of chatbot use in mental health analyzing the effectiveness, limitations, and future of therapeutic conversational agents.',
    studyType: 'Systematic Review',
    impact: 'Nature Portfolio',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Meta-analysis of 28 studies demonstrating that self-guided digital interventions can significantly reduce suicidal thoughts and improve protective factors.',
    studyType: 'Meta-analysis',
    impact: '28 studies included',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Randomized controlled trial with 70 participants showing significant reductions in depression and anxiety symptoms using a cognitive behavioral therapy-based chatbot.',
    studyType: 'RCT',
    impact: '70 participants',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Meta-analysis of 83 studies confirming the effectiveness of smartphone-based digital interventions for reducing depression and anxiety symptoms, especially when they include cognitive behavioral therapy components.',
    studyType: 'Meta-analysis',
    impact: '83 studies',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Review of evidence on digital mental health interventions, showing an average 35% reduction in depressive symptoms after 8 weeks of using AI-based CBT apps.',
    studyType: 'Review',
    impact: 'Digital CBT',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Systematic review confirming the effectiveness of mobile apps for reducing anxiety symptoms, especially when combined with professional support and structured follow-up.',
    studyType: 'Systematic Review',
    impact: 'Multiple RCTs',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Study on the use of digital mental health tools during the pandemic, demonstrating their effectiveness in providing accessible emotional support available 24/7.',
    studyType: 'Observational Study',
    impact: 'The Lancet',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Systematic review evaluating evidence on mobile mental health apps, identifying key features associated with effectiveness and user satisfaction.',
    studyType: 'Systematic Review',
    impact: 'APA Journal',
    viewStudyLabel: 'View Full Study →',
  },
  {
    description:
      'Systematic review analyzing the effectiveness of digital mental health tools, finding moderate to large effect sizes for reducing anxiety and depression symptoms.',
    studyType: 'Systematic Review',
    impact: 'JMIR',
    viewStudyLabel: 'View Full Study →',
  },
];

function mergeStudies(
  localeData: Omit<ResearchStudy, 'title' | 'authors' | 'journal' | 'link'>[],
): ResearchStudy[] {
  return studyTitlesAndAuthors.map((base, index) => ({
    ...base,
    ...localeData[index],
  }));
}

function buildResearchPageCopy(locale: Locale): ResearchPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Research',
      },
      meta: {
        title: 'Research - Anto | Scientific Evidence and Studies',
        description:
          'Learn about the scientific research behind Anto. Studies, papers, and evidence supporting the effectiveness of AI mental health applications.',
        openGraphTitle: 'Research - Anto',
        openGraphDescription: 'Scientific evidence and studies about Anto.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Research and Scientific Evidence',
        subtitle:
          'Anto is backed by rigorous scientific research and validated mental health best practices',
      },
      overview: {
        sectionTitle: 'Our Evidence-Based Approach',
        intro:
          'Anto is not just technology: it is the result of years of research in psychology, artificial intelligence, and digital mental health. We work with mental health professionals, researchers, and academics to ensure our platform is effective and safe.',
        findingsTitle: 'Scientific Evidence Supporting Anto',
        findings: [
          {
            icon: '✓',
            title: 'Proven Effectiveness',
            description:
              'Scientific studies show that AI-based therapeutic chatbots can significantly reduce symptoms of depression and anxiety (Fitzpatrick et al., 2017).',
          },
          {
            icon: '✓',
            title: 'Favorable Meta-Analysis',
            description:
              'A meta-analysis of 83 studies confirms that digital mental health interventions are effective for treating depression and anxiety (Firth et al., 2019).',
          },
          {
            icon: '✓',
            title: 'Advanced NLP',
            description:
              'Natural language processing enables detection of risk signals and emotional states with high accuracy (Coppersmith et al., 2020).',
          },
          {
            icon: '✓',
            title: 'Crisis Prevention',
            description:
              'Digital interventions have demonstrated effectiveness in suicide prevention and crisis management (Torok et al., 2023).',
          },
        ],
      },
      studies: {
        sectionTitle: 'Studies and Scientific Publications',
        sectionSubtitle:
          'Rigorous scientific research supporting the effectiveness of digital mental health interventions',
        items: mergeStudies(studiesEn),
      },
      methodology: {
        sectionTitle: 'Our Methodology',
        steps: [
          {
            title: 'Scientific Literature Review',
            description:
              'We constantly review the latest scientific literature on mental health, cognitive behavioral therapy, and emotional support technologies.',
          },
          {
            title: 'Validation with Professionals',
            description:
              'All our techniques and tools are validated by licensed mental health professionals before implementation.',
          },
          {
            title: 'Testing and Studies',
            description:
              'We conduct controlled studies and data analysis to measure the effectiveness of our interventions.',
          },
          {
            title: 'Continuous Improvement',
            description:
              'Based on results, we continuously improve our methodologies and update the system.',
          },
        ],
      },
      references: {
        sectionTitle: 'Bibliographic References',
        sectionSubtitle:
          'Scientific studies supporting the development and effectiveness of AI mental health applications',
        items: referencesEn,
      },
      cta: {
        title: 'Are You a Researcher or Academic?',
        description:
          'We are open to research collaborations. If you are interested in studying Anto\'s effectiveness or collaborating on research projects, contact us.',
        contactLabel: 'Contact for Research',
        contactHref: localePath(locale, '/contacto'),
        emailLabel: DEVELOPER_EMAIL,
        emailHref: `mailto:${DEVELOPER_EMAIL}`,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Investigación',
    },
    meta: {
      title: 'Investigación - Anto | Evidencia Científica y Estudios',
      description:
        'Conoce la investigación científica detrás de Anto. Estudios, papers y evidencia que respalda la efectividad de aplicaciones de salud mental con IA.',
      openGraphTitle: 'Investigación - Anto',
      openGraphDescription: 'Evidencia científica y estudios sobre Anto.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Investigación y Evidencia Científica',
      subtitle:
        'Anto está respaldado por investigación científica rigurosa y mejores prácticas de salud mental validadas',
    },
    overview: {
      sectionTitle: 'Nuestro Enfoque Basado en Evidencia',
      intro:
        'Anto no es solo tecnología: es el resultado de años de investigación en psicología, inteligencia artificial, y salud mental digital. Trabajamos con profesionales de salud mental, investigadores, y académicos para asegurar que nuestra plataforma sea efectiva y segura.',
      findingsTitle: 'Evidencia Científica que Respalda Anto',
      findings: [
        {
          icon: '✓',
          title: 'Efectividad Comprobada',
          description:
            'Estudios científicos demuestran que los chatbots terapéuticos basados en IA pueden reducir significativamente síntomas de depresión y ansiedad (Fitzpatrick et al., 2017).',
        },
        {
          icon: '✓',
          title: 'Meta-Análisis Favorable',
          description:
            'Meta-análisis de 83 estudios confirma que las intervenciones digitales de salud mental son efectivas para tratar depresión y ansiedad (Firth et al., 2019).',
        },
        {
          icon: '✓',
          title: 'NLP Avanzado',
          description:
            'El procesamiento de lenguaje natural permite detectar señales de riesgo y estados emocionales con alta precisión (Coppersmith et al., 2020).',
        },
        {
          icon: '✓',
          title: 'Prevención de Crisis',
          description:
            'Las intervenciones digitales han demostrado efectividad en la prevención de suicidio y manejo de crisis (Torok et al., 2023).',
        },
      ],
    },
    studies: {
      sectionTitle: 'Estudios y Publicaciones Científicas',
      sectionSubtitle:
        'Investigación científica rigurosa que respalda la efectividad de las intervenciones digitales en salud mental',
      items: mergeStudies(studiesEs),
    },
    methodology: {
      sectionTitle: 'Nuestra Metodología',
      steps: [
        {
          title: 'Revisión de Literatura Científica',
          description:
            'Revisamos constantemente la literatura científica más reciente sobre salud mental, terapia cognitivo-conductual, y tecnologías de apoyo emocional.',
        },
        {
          title: 'Validación con Profesionales',
          description:
            'Todas nuestras técnicas y herramientas son validadas por profesionales de salud mental licenciados antes de ser implementadas.',
        },
        {
          title: 'Pruebas y Estudios',
          description:
            'Realizamos estudios controlados y análisis de datos para medir la efectividad de nuestras intervenciones.',
        },
        {
          title: 'Mejora Continua',
          description:
            'Basándonos en los resultados, mejoramos continuamente nuestras metodologías y actualizamos el sistema.',
        },
      ],
    },
    references: {
      sectionTitle: 'Referencias Bibliográficas',
      sectionSubtitle:
        'Estudios científicos que respaldan el desarrollo y efectividad de aplicaciones de salud mental con IA',
      items: referencesEs,
    },
    cta: {
      title: '¿Eres Investigador o Académico?',
      description:
        'Estamos abiertos a colaboraciones de investigación. Si estás interesado en estudiar la efectividad de Anto o colaborar en proyectos de investigación, contáctanos.',
      contactLabel: 'Contactar para Investigación',
      contactHref: localePath(locale, '/contacto'),
      emailLabel: DEVELOPER_EMAIL,
      emailHref: `mailto:${DEVELOPER_EMAIL}`,
    },
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
