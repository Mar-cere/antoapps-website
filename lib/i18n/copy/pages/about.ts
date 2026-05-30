import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';

const SITE_ORIGIN = 'https://antoapps.com';
const CANONICAL_PATH = '/sobre-nosotros';

export type AboutMissionCard = {
  icon: string;
  title: string;
  description: string;
};

export type AboutValue = {
  icon: string;
  title: string;
  description: string;
};

export type AboutProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type AboutCommitment = {
  title: string;
  description: string;
};

export type AboutPageCopy = {
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
  story: {
    sectionTitle: string;
    paragraphs: string[];
    emphasis: string;
  };
  mission: {
    cards: AboutMissionCard[];
  };
  values: {
    sectionTitle: string;
    items: AboutValue[];
  };
  process: {
    sectionTitle: string;
    steps: AboutProcessStep[];
  };
  commitment: {
    sectionTitle: string;
    items: AboutCommitment[];
  };
  cta: {
    title: string;
    description: string;
    downloadLabel: string;
    downloadHref: string;
    contactLabel: string;
    contactHref: string;
  };
};

function siteUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}

function buildAboutPageCopy(locale: Locale): AboutPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'About Us',
      },
      meta: {
        title: 'About Us - Anto | Our Mission and Vision',
        description:
          'Learn about Anto\'s story, mission, and values. Discover how we are transforming access to mental health with cutting-edge technology.',
        openGraphTitle: 'About Us - Anto',
        openGraphDescription: 'Learn about Anto\'s story, mission, and values.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'About Anto',
        subtitle: 'Transforming access to mental health, one conversation at a time',
      },
      story: {
        sectionTitle: 'Our Story',
        emphasis: 'mental health should be accessible to everyone',
        paragraphs: [
          'Anto was born from a simple but powerful idea: mental health should be accessible to everyone, no matter where you live, how much you earn, or what time it is.',
          'We recognized that millions of people worldwide face significant barriers to accessing professional emotional support: prohibitive costs, long waiting lists, social stigma, and geographic limitations.',
          'We decided that technology, specifically artificial intelligence, could be the solution to democratize access to quality mental health care. Thus Anto was born: an app that combines human empathy with the power of AI to offer emotional support 24/7.',
        ],
      },
      mission: {
        cards: [
          {
            icon: '🎯',
            title: 'Our Mission',
            description:
              'Democratize access to quality mental health through innovative technology. We believe every person, regardless of economic situation, geographic location, or personal circumstances, deserves access to professional emotional support and mental wellness tools.',
          },
          {
            icon: '👁️',
            title: 'Our Vision',
            description:
              'A world where mental health is a priority, not a luxury. We envision a future where emotional support is instantly available to anyone who needs it, removing barriers and reducing the stigma associated with seeking help for mental wellness.',
          },
        ],
      },
      values: {
        sectionTitle: 'Our Core Values',
        items: [
          {
            icon: '💚',
            title: 'Empathy',
            description:
              'We understand that every person is unique. Our AI assistant is designed to recognize and respond to human emotions with genuine empathy, not just preprogrammed responses.',
          },
          {
            icon: '🛡️',
            title: 'Privacy',
            description:
              'Your information is sacred. We guarantee maximum security and confidentiality with end-to-end encryption and strict compliance with international regulations.',
          },
          {
            icon: '💡',
            title: 'Innovation',
            description:
              'We use cutting-edge technology to offer you the best possible experience. Our team constantly works to improve the AI assistant and add new features.',
          },
          {
            icon: '🤝',
            title: 'Accessibility',
            description:
              'We believe mental wellness should be within reach for everyone, without economic, geographic, or language barriers. That is why we offer affordable plans and support in multiple languages.',
          },
          {
            icon: '🔬',
            title: 'Scientific Evidence',
            description:
              'All our tools and techniques are based on scientific evidence and mental health best practices. We work with licensed professionals to ensure quality.',
          },
          {
            icon: '🌍',
            title: 'Social Impact',
            description:
              'We are committed to making a positive difference in people\'s lives. Every improvement in a user\'s wellness brings us closer to our goal of transforming global mental health.',
          },
        ],
      },
      process: {
        sectionTitle: 'How We Work',
        steps: [
          {
            number: '1',
            title: 'Research and Development',
            description:
              'Our team of engineers and mental health professionals constantly works to improve the AI assistant, applying the latest advances in natural language processing and machine learning.',
          },
          {
            number: '2',
            title: 'Collaboration with Experts',
            description:
              'We work with psychologists, therapists, and licensed mental health professionals to ensure our tools are effective and safe.',
          },
          {
            number: '3',
            title: 'Continuous Feedback',
            description:
              'We actively listen to our users and use their feedback to constantly improve the app. Your experience matters.',
          },
          {
            number: '4',
            title: 'Constant Innovation',
            description:
              'We release regular updates with new features, security improvements, and performance optimizations to offer you the best possible experience.',
          },
        ],
      },
      commitment: {
        sectionTitle: 'Our Commitment to You',
        items: [
          {
            title: '🔒 Total Privacy',
            description:
              'Your conversations are completely confidential. We never share your personal information with third parties without your explicit consent.',
          },
          {
            title: '⚡ Continuous Improvement',
            description:
              'We are committed to constantly improving the app based on your feedback and the latest technological advances.',
          },
          {
            title: '💬 Responsive Support',
            description:
              'Our support team is available to help you when you need it. We usually respond within 24 hours.',
          },
          {
            title: '🎯 Transparency',
            description:
              'We are transparent about how our technology works, how we protect your data, and how we continuously improve.',
          },
        ],
      },
      cta: {
        title: 'Join Our Mission',
        description:
          'Be part of a community that is transforming access to mental health. Download Anto today and start your path to wellness.',
        downloadLabel: 'Download on App Store',
        downloadHref: localePath(locale, '/bienvenida'),
        contactLabel: 'Contact Us',
        contactHref: localePath(locale, '/contacto'),
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Sobre Nosotros',
    },
    meta: {
      title: 'Sobre Nosotros - Anto | Nuestra Misión y Visión',
      description:
        'Conoce la historia, misión y valores de Anto. Descubre cómo estamos transformando el acceso a la salud mental con tecnología de vanguardia.',
      openGraphTitle: 'Sobre Nosotros - Anto',
      openGraphDescription: 'Conoce la historia, misión y valores de Anto.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Sobre Anto',
      subtitle: 'Transformando el acceso a la salud mental, una conversación a la vez',
    },
    story: {
      sectionTitle: 'Nuestra Historia',
      emphasis: 'la salud mental debe ser accesible para todos',
      paragraphs: [
        'Anto nació de una simple pero poderosa idea: la salud mental debe ser accesible para todos, sin importar dónde vivas, cuánto ganes, o qué hora sea.',
        'Reconocimos que millones de personas en todo el mundo enfrentan barreras significativas para acceder a apoyo emocional profesional: costos prohibitivos, largas listas de espera, estigma social, y limitaciones geográficas.',
        'Decidimos que la tecnología, específicamente la inteligencia artificial, podría ser la solución para democratizar el acceso a la salud mental de calidad. Así nació Anto: una aplicación que combina la empatía humana con la potencia de la IA para ofrecer apoyo emocional 24/7.',
      ],
    },
    mission: {
      cards: [
        {
          icon: '🎯',
          title: 'Nuestra Misión',
          description:
            'Democratizar el acceso a la salud mental de calidad mediante tecnología innovadora. Creemos que cada persona, independientemente de su situación económica, ubicación geográfica, o circunstancias personales, merece acceso a apoyo emocional profesional y herramientas de bienestar mental.',
        },
        {
          icon: '👁️',
          title: 'Nuestra Visión',
          description:
            'Un mundo donde la salud mental sea una prioridad, no un lujo. Visualizamos un futuro donde el apoyo emocional esté disponible instantáneamente para cualquier persona que lo necesite, eliminando barreras y reduciendo el estigma asociado con buscar ayuda para el bienestar mental.',
        },
      ],
    },
    values: {
      sectionTitle: 'Nuestros Valores Fundamentales',
      items: [
        {
          icon: '💚',
          title: 'Empatía',
          description:
            'Entendemos que cada persona es única. Nuestro asistente AI está diseñado para reconocer y responder a las emociones humanas con genuina empatía, no solo con respuestas preprogramadas.',
        },
        {
          icon: '🛡️',
          title: 'Privacidad',
          description:
            'Tu información es sagrada. Garantizamos la máxima seguridad y confidencialidad con encriptación de extremo a extremo y cumplimiento estricto de regulaciones internacionales.',
        },
        {
          icon: '💡',
          title: 'Innovación',
          description:
            'Utilizamos tecnología de vanguardia para ofrecerte la mejor experiencia posible. Nuestro equipo trabaja constantemente en mejorar el asistente AI y agregar nuevas funcionalidades.',
        },
        {
          icon: '🤝',
          title: 'Accesibilidad',
          description:
            'Creemos que el bienestar mental debe estar al alcance de todos, sin barreras económicas, geográficas o de idioma. Por eso ofrecemos planes accesibles y soporte en múltiples idiomas.',
        },
        {
          icon: '🔬',
          title: 'Evidencia Científica',
          description:
            'Todas nuestras herramientas y técnicas están basadas en evidencia científica y mejores prácticas de salud mental. Trabajamos con profesionales licenciados para asegurar la calidad.',
        },
        {
          icon: '🌍',
          title: 'Impacto Social',
          description:
            'Estamos comprometidos con hacer una diferencia positiva en la vida de las personas. Cada mejora en el bienestar de un usuario nos acerca más a nuestro objetivo de transformar la salud mental global.',
        },
      ],
    },
    process: {
      sectionTitle: 'Cómo Trabajamos',
      steps: [
        {
          number: '1',
          title: 'Investigación y Desarrollo',
          description:
            'Nuestro equipo de ingenieros y profesionales de salud mental trabaja constantemente en mejorar el asistente AI, aplicando los últimos avances en procesamiento de lenguaje natural y machine learning.',
        },
        {
          number: '2',
          title: 'Colaboración con Expertos',
          description:
            'Trabajamos con psicólogos, terapeutas y profesionales de salud mental licenciados para asegurar que nuestras herramientas sean efectivas y seguras.',
        },
        {
          number: '3',
          title: 'Feedback Continuo',
          description:
            'Escuchamos activamente a nuestros usuarios y utilizamos su feedback para mejorar constantemente la aplicación. Tu experiencia importa.',
        },
        {
          number: '4',
          title: 'Innovación Constante',
          description:
            'Lanzamos actualizaciones regulares con nuevas funcionalidades, mejoras de seguridad, y optimizaciones de rendimiento para ofrecerte la mejor experiencia posible.',
        },
      ],
    },
    commitment: {
      sectionTitle: 'Nuestro Compromiso Contigo',
      items: [
        {
          title: '🔒 Privacidad Total',
          description:
            'Tus conversaciones son completamente confidenciales. Nunca compartimos tu información personal con terceros sin tu consentimiento explícito.',
        },
        {
          title: '⚡ Mejora Continua',
          description:
            'Estamos comprometidos a mejorar constantemente la aplicación basándonos en tu feedback y los últimos avances tecnológicos.',
        },
        {
          title: '💬 Soporte Responsivo',
          description:
            'Nuestro equipo de soporte está disponible para ayudarte cuando lo necesites. Generalmente respondemos en menos de 24 horas.',
        },
        {
          title: '🎯 Transparencia',
          description:
            'Somos transparentes sobre cómo funciona nuestra tecnología, cómo protegemos tus datos, y cómo mejoramos continuamente.',
        },
      ],
    },
    cta: {
      title: 'Únete a Nuestra Misión',
      description:
        'Forma parte de una comunidad que está transformando el acceso a la salud mental. Descarga Anto hoy y comienza tu camino al bienestar.',
      downloadLabel: 'Descargar en App Store',
      downloadHref: localePath(locale, '/bienvenida'),
      contactLabel: 'Contáctanos',
      contactHref: localePath(locale, '/contacto'),
    },
  };
}

export function getAboutPageCopy(locale: Locale): AboutPageCopy {
  return buildAboutPageCopy(locale);
}

export function aboutPageMetadata(locale: Locale): Metadata {
  const { meta } = buildAboutPageCopy(locale);
  const canonical = siteUrl(locale, meta.canonicalPath);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        es: siteUrl('es', meta.canonicalPath),
        en: siteUrl('en', meta.canonicalPath),
        'x-default': siteUrl('es', meta.canonicalPath),
      },
    },
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
      url: canonical,
    },
  };
}
