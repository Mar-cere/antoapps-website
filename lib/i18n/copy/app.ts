import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

export type AppPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

export type AppBenefitCard = {
  icon: string;
  label: string;
  description: string;
  link?: { href: string; label: string };
};

export type AppPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
    badges: {
      versionLabel: string;
      availability: string;
      privacy: string;
      languages: string;
    };
  };
  whatIs: {
    title: string;
    body: string;
    imageAlt: string;
  };
  screenshots: {
    title: string;
    subtitle: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    cards: AppBenefitCard[];
  };
  latestUpdates: {
    title: string;
    subtitle: string;
    cards: AppBenefitCard[];
    note: {
      beforeChangelog: string;
      changelogLabel: string;
      changelogHref: string;
      betweenChangelogBienvenida: string;
      bienvenidaLabel: string;
      bienvenidaHref: string;
      betweenBienvenidaPrivacidad: string;
      privacidadLabel: string;
      privacidadHref: string;
      afterPrivacidad: string;
    };
  };
  featuresLink: {
    title: string;
    subtitle: string;
    label: string;
    href: string;
    resourcesLabel: string;
    resourcesHref: string;
  };
  cta: {
    title: string;
    subtitle: string;
    appStoreLabel: string;
    playLabel: string;
    appStoreAria: string;
    playAria: string;
    contactLabel: string;
    contactHref: string;
  };
};

const metadataByLocale: Record<Locale, AppPageMetadata> = {
  es: {
    title: 'Anto — App para iPhone y Android | Acompañamiento emocional',
    description:
      'Descarga Anto en App Store (iPhone) o Google Play (Android): acompañamiento emocional continuo, privacidad y herramientas para el día a día. Prueba disponible al instalar. Complementa — no reemplaza — a un terapeuta o profesional humano. Versión {versionLabel}.',
    openGraph: {
      title: 'Anto — App para iPhone y Android',
      description:
        'Descarga en App Store o Google Play. Acompañamiento emocional continuo en iPhone y Android. Complementa — no reemplaza — a un terapeuta humano.',
      url: 'https://antoapps.com/app',
    },
  },
  en: {
    title: 'Anto — iPhone and Android app | Ongoing emotional support',
    description:
      'Download Anto on the App Store (iPhone) or Google Play (Android): ongoing emotional support, privacy, and everyday tools. Trial available when you install. Complements — does not replace — a human therapist or professional. Version {versionLabel}.',
    openGraph: {
      title: 'Anto — iPhone and Android app',
      description:
        'Download on the App Store or Google Play. Ongoing emotional support on iPhone and Android. Complements — does not replace — a human therapist.',
      url: 'https://antoapps.com/en/app',
    },
  },
  pt: {
    title: 'Anto — Aplicativo para iPhone e Android | Acompanhamento emocional',
    description:
      'Baixe a Anto na App Store (iPhone) ou no Google Play (Android): acompanhamento emocional contínuo, privacidade e ferramentas para o dia a dia. Teste disponível ao instalar. Complementa — não substitui — um terapeuta ou profissional humano. Versão {versionLabel}.',
    openGraph: {
      title: 'Anto — Aplicativo para iPhone e Android',
      description:
        'Baixe na App Store ou no Google Play. Acompanhamento emocional contínuo no iPhone e no Android. Complementa — não substitui — um terapeuta humano.',
      url: 'https://antoapps.com/pt/app',
    },
  },
};

function buildAppPageCopy(locale: Locale): AppPageCopy {
  const trial = getTrialCopy(locale);
  const isEn = locale === 'en';
  const featuresHref = localePath(locale, '/');

  if (isEn) {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'The App',
      },
      hero: {
        title: 'Emotional support, on your phone.',
        subtitle:
          'On iPhone and Android. You write what keeps looping and leave with one step. A 1-day trial. Current version {version}.',
        badges: {
          versionLabel: '{versionLabel}',
          availability: '⏰ Available 24/7',
          privacy: '🔒 Private by design',
          languages: '🌍 Spanish and English',
        },
      },
      whatIs: {
        title: 'What is Anto?',
        body: 'It does not tell you if you have a health condition, and it does not replace help from a professional. It is a daily companion: you write how you feel, receive clear guidance, and build habits that support your wellbeing—with respect for your privacy and your pace.',
        imageAlt: 'Morning light on an empty chair by the window',
      },
      screenshots: {
        title: 'How it reads inside',
        subtitle: 'One night in the thread, and a short guide.',
      },
      benefits: {
        title: 'Why use Anto',
        subtitle: 'Benefits you feel from the first conversations—not a feature checklist.',
        cards: [
          {
            icon: '💬',
            label: 'Someone to talk to, whenever you need',
            description:
              'Open the app when your mind races or you need clarity. No appointments or waiting lists. The app is available any time; it is not an emergency line.',
          },
          {
            icon: '🎯',
            label: 'Guidance that fits you',
            description:
              'Responses adapt to what you share: practical steps, emotional exploration, or structured support.',
          },
          {
            icon: '🔒',
            label: 'A safe space',
            description:
              'Your conversations are private. You decide what to share and how to use the app.',
          },
          {
            icon: '🧘',
            label: 'Tools for everyday life',
            description:
              'Tasks, habits, journaling, and reminders that connect with how you actually feel—not abstract theory.',
          },
          {
            icon: '📈',
            label: 'See your progress',
            description:
              'Trends and summaries help you notice patterns and celebrate small wins over time.',
          },
          {
            icon: '🚨',
            label: 'Support in difficult moments',
            description:
              'If risk signals come up, the app can guide you toward resources and people you trust.',
            link: {
              href: localePath(locale, '/recursos/grounding-ansiedad-crisis'),
              label: 'When anxiety rises',
            },
          },
        ],
      },
      latestUpdates: {
        title: 'What we have been improving',
        subtitle: 'What changed in version 1.7.0.',
      cards: [
        {
          icon: '🏠',
          label: 'A clearer path',
          description:
            'Home, My day, chat, Explore, and Settings, in everyday language.',
        },
        {
          icon: '💬',
          label: 'The first conversation starts in chat',
          description:
            'You choose what matters now and can edit the line you open with.',
        },
        {
          icon: '📝',
          label: 'The close names the thread',
          description:
            'No score or emotion label. You can note what you take with you and ask for one reminder to return.',
        },
      ],
      note: {
        beforeChangelog: 'Full detail in the',
        changelogLabel: 'Version history',
        changelogHref: localePath(locale, '/changelog'),
          betweenChangelogBienvenida: ', explore the',
          bienvenidaLabel: 'Welcome',
          bienvenidaHref: localePath(locale, '/bienvenida'),
          betweenBienvenidaPrivacidad: ' flow, and read',
          privacidadLabel: 'Privacy',
          privacidadHref: localePath(locale, '/privacidad'),
          afterPrivacidad: ' policy.',
        },
      },
      featuresLink: {
        title: 'Looking for more detail?',
        subtitle: 'What Anto includes: chat, exercise hub, check-ins, home.',
        label: 'View on the home page',
        href: featuresHref,
        resourcesLabel: 'View the guides',
        resourcesHref: localePath(locale, '/recursos'),
      },
      cta: {
        title: 'Ready to try Anto?',
        subtitle: `Download the app and start at your own pace. ${trial.heroNote}`,
        appStoreLabel: 'App Store',
        playLabel: 'Google Play',
        appStoreAria: 'Download Anto on the App Store',
        playAria: 'Download Anto on Google Play',
        contactLabel: 'Contact',
        contactHref: localePath(locale, '/contacto'),
      },
    };
  }

  if (locale === 'pt') {
    return {
      breadcrumbs: {
        homeLabel: 'Início',
        homeHref: localePath(locale, '/'),
        currentLabel: 'O aplicativo',
      },
      hero: {
        title: 'Acompanhamento emocional, no celular.',
        subtitle:
          'No iPhone e no Android. Você escreve o que fica em loop e sai com um passo. Teste de 1 dia. Versão atual {version}.',
        badges: {
          versionLabel: '{versionLabel}',
          availability: '⏰ Disponível 24/7',
          privacy: '🔒 Privacidade em primeiro lugar',
          languages: '🌍 Espanhol e inglês',
        },
      },
      whatIs: {
        title: 'O que é a Anto?',
        body: 'Não diz se você tem uma condição de saúde e não substitui a ajuda de um profissional. É um acompanhamento para o dia a dia: você escreve como se sente, recebe uma orientação clara e constrói hábitos no seu ritmo, com respeito à sua privacidade.',
        imageAlt: 'Luz da manhã sobre uma cadeira vazia junto à janela',
      },
      screenshots: {
        title: 'Como se lê por dentro',
        subtitle: 'O fio de uma noite, e um guia curto.',
      },
      benefits: {
        title: 'Por que usar a Anto',
        subtitle: 'O que você nota nas primeiras conversas, não uma lista técnica.',
        cards: [
          {
            icon: '💬',
            label: 'Alguém para conversar, quando você precisar',
            description:
              'Abra o aplicativo quando a mente acelera ou você precisa de clareza. Sem hora marcada nem fila. O aplicativo está disponível a qualquer hora; não é uma linha de emergência.',
          },
          {
            icon: '🎯',
            label: 'Uma orientação que se ajusta a você',
            description:
              'As respostas seguem o que você conta: um passo prático, espaço para nomear o que sente ou um apoio mais estruturado.',
          },
          {
            icon: '🔒',
            label: 'Um espaço seu',
            description:
              'Suas conversas são privadas. Você decide o que compartilhar e como usar o aplicativo.',
          },
          {
            icon: '🧘',
            label: 'Ferramentas para o dia a dia',
            description:
              'Tarefas, hábitos, diário e lembretes ligados ao que você está sentindo de verdade.',
          },
          {
            icon: '📈',
            label: 'Ver o que vai mudando',
            description:
              'Tendências e resumos ajudam a notar padrões e a reconhecer avanços pequenos.',
          },
          {
            icon: '🚨',
            label: 'Apoio em momentos difíceis',
            description:
              'Se aparecerem sinais de risco, o aplicativo pode orientar você para recursos e pessoas de confiança. Não substitui uma emergência.',
            link: {
              href: localePath(locale, '/recursos/grounding-ansiedad-crisis'),
              label: 'Quando a ansiedade sobe',
            },
          },
        ],
      },
      latestUpdates: {
        title: 'O que fomos melhorando',
        subtitle: 'O que mudou na versão 1.7.0.',
        cards: [
          {
            icon: '🏠',
            label: 'Um percurso mais claro',
            description:
              'Início, Meu dia, chat, Explorar e Ajustes, em linguagem do dia a dia.',
          },
          {
            icon: '💬',
            label: 'A primeira conversa começa no chat',
            description:
              'Você escolhe o que importa agora e pode editar a frase com que abre.',
          },
          {
            icon: '📝',
            label: 'Ao fechar, o resumo nomeia o fio',
            description:
              'Sem pontuação nem rótulo de emoção. Você pode anotar o que leva e pedir um único aviso para voltar.',
          },
        ],
        note: {
          beforeChangelog: 'O detalhe completo está no',
          changelogLabel: 'Histórico de versões',
          changelogHref: localePath(locale, '/changelog'),
          betweenChangelogBienvenida: ', veja o fluxo de',
          bienvenidaLabel: 'Boas-vindas',
          bienvenidaHref: localePath(locale, '/bienvenida'),
          betweenBienvenidaPrivacidad: ' e consulte',
          privacidadLabel: 'Privacidade',
          privacidadHref: localePath(locale, '/privacidad'),
          afterPrivacidad: '.',
        },
      },
      featuresLink: {
        title: 'Quer mais detalhe?',
        subtitle: 'O que a Anto inclui: chat, hub de exercícios, checagens, início.',
        label: 'Ver no início',
        href: featuresHref,
        resourcesLabel: 'Ver os guias',
        resourcesHref: localePath(locale, '/recursos'),
      },
      cta: {
        title: 'Quer testar a Anto?',
        subtitle: `Baixe o aplicativo e comece no seu ritmo. ${trial.heroNote}`,
        appStoreLabel: 'App Store',
        playLabel: 'Google Play',
        appStoreAria: 'Baixar a Anto na App Store',
        playAria: 'Baixar a Anto no Google Play',
        contactLabel: 'Falar com a gente',
        contactHref: localePath(locale, '/contacto'),
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'La Aplicación',
    },
    hero: {
      title: 'Acompañamiento emocional, en el teléfono.',
      subtitle:
        'En iPhone y Android. Escribes lo que da vueltas y te llevas un paso. Prueba de 1 día. Versión actual {version}.',
      badges: {
        versionLabel: '{versionLabel}',
        availability: '⏰ Disponible 24/7',
        privacy: '🔒 Privacidad primero',
        languages: '🌍 Español e inglés',
      },
    },
    whatIs: {
      title: '¿Qué es Anto?',
      body: 'No te dice si tienes una condición de salud ni reemplaza la ayuda de un profesional. Es un acompañante para el día a día: escribes cómo te sientes, recibes orientación clara y construyes hábitos que cuidan tu bienestar, con respeto por tu privacidad y tu ritmo.',
      imageAlt: 'Luz de mañana sobre una silla vacía junto a la ventana',
    },
    screenshots: {
      title: 'Así se lee por dentro',
      subtitle: 'El hilo de una noche, y una guía corta.',
    },
    benefits: {
      title: 'Por qué usar Anto',
      subtitle: 'Beneficios que notas desde las primeras conversaciones, no un listado técnico.',
      cards: [
        {
          icon: '💬',
          label: 'Alguien con quien hablar, cuando lo necesites',
          description:
            'Abre la app cuando tu mente va a mil o necesitas claridad. Sin citas ni listas de espera. La app está disponible a cualquier hora; no es una línea de emergencia.',
        },
        {
          icon: '🎯',
          label: 'Guía que se adapta a ti',
          description:
            'Las respuestas se ajustan a lo que compartes: pasos prácticos, exploración emocional o apoyo estructurado.',
        },
        {
          icon: '🔒',
          label: 'Un espacio seguro',
          description:
            'Tus conversaciones son privadas. Tú decides qué compartir y cómo usar la app.',
        },
        {
          icon: '🧘',
          label: 'Herramientas para el día a día',
          description:
            'Tareas, hábitos, diario y recordatorios conectados con cómo te sientes de verdad.',
        },
        {
          icon: '📈',
          label: 'Ver tu progreso',
          description:
            'Tendencias y resúmenes te ayudan a notar patrones y celebrar avances pequeños.',
        },
        {
          icon: '🚨',
          label: 'Apoyo en momentos difíciles',
          description:
            'Si aparecen señales de riesgo, la app puede orientarte hacia recursos y personas de confianza.',
          link: {
            href: localePath(locale, '/recursos/grounding-ansiedad-crisis'),
            label: 'Cuando la ansiedad sube',
          },
        },
      ],
    },
    latestUpdates: {
      title: 'Qué hemos ido mejorando',
      subtitle: 'Lo que cambió en la versión 1.7.0.',
      cards: [
        {
          icon: '🏠',
          label: 'Un recorrido más claro',
          description:
            'Inicio, Mi día, chat, Explorar y Ajustes, con un lenguaje cotidiano.',
        },
        {
          icon: '💬',
          label: 'La primera conversación empieza en el chat',
          description:
            'Eliges qué te importa ahora y puedes editar la frase con la que abres.',
        },
        {
          icon: '📝',
          label: 'Al cerrar, el resumen nombra el hilo',
          description:
            'Sin puntaje ni etiqueta de emoción. Puedes anotar lo que te llevas y pedir un solo aviso para volver.',
        },
      ],
      note: {
        beforeChangelog: 'Detalle completo en',
        changelogLabel: 'Historial de versiones',
        changelogHref: localePath(locale, '/changelog'),
        betweenChangelogBienvenida: ', conoce el flujo de',
        bienvenidaLabel: 'Bienvenida',
        bienvenidaHref: localePath(locale, '/bienvenida'),
        betweenBienvenidaPrivacidad: ' y consulta',
        privacidadLabel: 'Privacidad',
        privacidadHref: localePath(locale, '/privacidad'),
        afterPrivacidad: '.',
      },
    },
    featuresLink: {
      title: '¿Buscas más detalle?',
      subtitle: 'Qué incluye Anto: chat, hub de ejercicios, chequeos, home.',
      label: 'Ver en el inicio',
      href: featuresHref,
      resourcesLabel: 'Ver las guías',
      resourcesHref: localePath(locale, '/recursos'),
    },
    cta: {
      title: '¿Listo para probar Anto?',
      subtitle: `Descarga la app y empieza a tu ritmo. ${trial.heroNote}`,
      appStoreLabel: 'App Store',
      playLabel: 'Google Play',
      appStoreAria: 'Descargar Anto en App Store',
      playAria: 'Descargar Anto en Google Play',
      contactLabel: 'Contactar',
      contactHref: localePath(locale, '/contacto'),
    },
  };
}

const appPageCopyCache: Partial<Record<Locale, AppPageCopy>> = {};

export function appPageMetadata(locale: Locale, versionLabel?: string): Metadata {
  const meta = metadataByLocale[locale];
  const description = versionLabel
    ? meta.description.replace('{versionLabel}', versionLabel)
    : meta.description;

  return buildLocalizedPageMetadata(locale, '/app', {
    title: meta.title,
    description,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: getEditorialImagePath('evening'),
          alt:
            locale === 'en'
              ? 'Low light of an evening at home'
              : locale === 'pt'
                ? 'Luz baixa de uma noite em casa'
                : 'Luz baja de una noche en casa',
        },
      ],
    },
  });
}

export function getAppPageCopy(locale: Locale): AppPageCopy {
  if (!appPageCopyCache[locale]) {
    appPageCopyCache[locale] = buildAppPageCopy(locale);
  }
  return appPageCopyCache[locale]!;
}
