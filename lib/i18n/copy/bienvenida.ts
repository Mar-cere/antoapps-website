import type { Locale } from '@/lib/i18n/config';
import { getAppStoreReviewSnippets } from '@/lib/app-store-reviews';
import { appStoreRatingWithReviews } from '@/lib/app-store-social-proof';
import {
  APP_SCREENSHOT_PATHS,
  getAppScreenshotAlt,
} from '@/lib/assets/app-screenshots';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type BienvenidaVariant = 'A' | 'B' | 'C';

export type BienvenidaV2FeatureIcon = 'privacy' | 'clock' | 'evidence' | 'crisis';

export type BienvenidaV2TrustIcon = 'lock' | 'no-card' | 'chile';

export type BienvenidaV2ChatRole = 'user' | 'anto';

export type BienvenidaV2ChatBubble = {
  role: BienvenidaV2ChatRole;
  text: string;
};

export type BienvenidaV2ChatThread = {
  ariaLabel: string;
  messages: readonly BienvenidaV2ChatBubble[];
};

export type BienvenidaCopy = {
  meta: {
    title: string;
    description: string;
    socialDescription: string;
    /** Headline grande en opengraph-image (compartir / ads preview). */
    ogHeadline: string;
    ogSubline: string;
    ogAlt: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: Record<BienvenidaVariant, string>;
    subheadline: Record<BienvenidaVariant, string>;
  };
  trial: {
    heroCta: Record<BienvenidaVariant, string>;
    stickyCta: Record<BienvenidaVariant, string>;
    stickyAndroidCta: string;
    stickyDesktopCta: string;
    stickyAndroidAria: string;
    stickyDesktopAria: string;
    finalCta: string;
    line: string;
    pricingLine: string;
    noCreditCard: string;
    aria: string;
    stickyAria: string;
    faqAnswer: string;
  };
  privacyBadge: string;
  androidHeroCta: string;
  androidLink: string;
  androidStoreAria: string;
  desktopPicker: {
    prompt: string;
    iphone: string;
    android: string;
    changeDevice: string;
    iphoneHint: string;
  };
  androidDevice: {
    leadLine: string;
    iosFallback: string;
  };
  reviews: {
    sectionTitle: string;
    sourceLabel: string;
    starsAria: string;
    items: readonly { quote: string; author: string }[];
  };
  clinicalPillars: {
    sectionTitle: string;
    items: readonly {
      icon: 'evidence' | 'crisis' | 'privacy';
      title: string;
      description: string;
    }[];
  };
  conversationDemo: {
    ariaLabel: string;
    label: string;
    messages: readonly { role: 'user' | 'anto'; text: string }[];
  };
  audience: {
    sectionTitle: string;
    items: readonly { title: string; description: string }[];
  };
  inAppHint: {
    iosBrowser: string;
    androidBrowser: string;
  };
  how: {
    sectionTitle: string;
    steps: readonly string[];
  };
  faq: {
    sectionTitle: string;
    items: readonly { question: string; answer: string; privacyLinkLabel: string }[];
  };
  final: {
    headline: string;
  };
  disclaimer: string;
  footer: {
    privacy: string;
    terms: string;
    contact: string;
    tagline: string;
  };
  trustStrip: {
    availableOn: string;
    ratingOnAppStore: string;
  };
  androidCta: string;
  appPreview: {
    ariaLabel: string;
    userMessage: string;
    antoMessage: string;
    inputPlaceholder: string;
  };
  screenshots: {
    sectionTitle: string;
    images: readonly { src: string; alt: string }[];
  };
  v2: {
    eyebrow: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSub: string;
    heroReview: { quote: string; author: string; source: string };
    ctaStoreLabel: string;
    ctaStoreText: string;
    ctaBadge: string;
    ctaMicro: string;
    /** Cierre: la misma línea, sin repetir «sin tarjeta». */
    ctaMicroClose: string;
    ctaPlayLabel: string;
    ctaPlayText: string;
    ctaPlayBadge: string;
    chatSectionLabel: string;
    chat: BienvenidaV2ChatThread;
    features: readonly { icon: BienvenidaV2FeatureIcon; title: string; subtitle: string }[];
    dashboard: {
      label: string;
      headline: string;
      subtitle: string;
      mock: {
        title: string;
        quote: string;
        reframe: string;
        step: string;
        footnote: string;
      };
    };
    trustItems: readonly { icon: BienvenidaV2TrustIcon; label: string }[];
    photoAlt: string;
    limitsHeading: string;
    limits: readonly { title: string; body: string }[];
  };
};

function buildBienvenidaCopy(locale: Locale): BienvenidaCopy {
  const trial = getTrialCopy(locale);

  if (locale === 'en') {
    return {
      meta: {
        title: 'When your mind won\'t slow down, Anto helps you land.',
        description:
          'Emotional support app for iPhone and Android: when anxiety or a racing mind won\'t stop, write what you feel and get clarity with one concrete step. 1-day free trial on the App Store or Google Play.',
        socialDescription:
          'Start free today · No card · Private',
        ogHeadline: 'Emotional support when your mind won\'t slow down',
        ogSubline:
          'Write what you feel. Get clarity and one concrete step — not just a chatbot reply.',
        ogAlt: 'Anto — Emotional support for anxiety on iPhone and Android',
      },
      hero: {
        titleLine1: 'When your mind won\'t slow down,',
        titleLine2: {
          A: 'Sort through what you feel with Anto',
          B: 'Anto helps you make sense of it',
          C: 'Anto helps you land',
        },
        subheadline: {
          A: 'Write what you feel — AI gives you clarity and one concrete step in seconds.',
          B: 'Write what you feel — AI gives you clarity and one concrete step in seconds.',
          C: 'Write what you feel. Get clarity and one concrete step in seconds.',
        },
      },
      trial: {
        heroCta: {
          A: 'Download on App Store',
          B: 'Start on App Store',
          C: 'App Store',
        },
        stickyCta: {
          A: `Start — ${trial.short}`,
          B: `Download — ${trial.short}`,
          C: `Download — ${trial.short}`,
        },
        stickyAndroidCta: 'Get it on Google Play',
        stickyDesktopCta: 'See download options',
        stickyAndroidAria: 'Download Anto on Google Play',
        stickyDesktopAria: 'Go to download options',
        finalCta: `Download on the App Store — ${trial.short}`,
        line: `${trial.short} · cancel anytime in the App Store`,
        pricingLine: 'Then US$4.20/mo · cancel anytime',
        noCreditCard: 'No credit card required to start',
        aria: 'Download Anto on the App Store. Includes a 1-day free trial.',
        stickyAria: 'Download Anto on the App Store. 1-day free trial.',
        faqAnswer: trial.faqPricingAnswer,
      },
      privacyBadge: 'Your conversations are private',
      androidHeroCta: 'Google Play',
      androidLink: 'Also on Google Play for Android',
      androidStoreAria: 'Download Anto on Google Play',
      desktopPicker: {
        prompt: 'Which device do you use?',
        iphone: 'I have an iPhone',
        android: 'I have Android',
        changeDevice: 'Change device',
        iphoneHint: 'Opens the App Store — install on your iPhone',
      },
      androidDevice: {
        leadLine: 'Anto is on Google Play. Download it on your Android phone.',
        iosFallback: 'On iPhone? Download on the App Store',
      },
      reviews: {
        sectionTitle: 'What users say on the App Store',
        sourceLabel: 'Public App Store reviews',
        starsAria: '5 out of 5 stars',
        items: getAppStoreReviewSnippets('en'),
      },
      clinicalPillars: {
        sectionTitle: 'Why Anto is different',
        items: [
          {
            icon: 'evidence',
            title: 'Clinically grounded',
            description: 'Exercises in the hub (CBT, ABC, mindfulness) — not generic chat.',
          },
          {
            icon: 'crisis',
            title: 'If you are in crisis',
            description:
              'Anto can point you to helplines and resources. It does not replace emergency care or a professional.',
          },
          {
            icon: 'privacy',
            title: 'Total privacy',
            description: 'Your conversations stay yours. No ads, no data sold.',
          },
        ],
      },
      conversationDemo: {
        ariaLabel: 'Animated Anto conversation demo',
        label: 'A real conversation, start to finish',
        messages: [
          { role: 'user', text: "I can't sleep — my mind won't stop replaying everything" },
          {
            role: 'anto',
            text: 'That sounds exhausting. What weighs most right now: fear, guilt, or uncertainty?',
          },
          { role: 'user', text: 'Mostly fear about work tomorrow' },
          {
            role: 'anto',
            text: "Let's narrow it down. One step for tonight: write the 3 things you can control tomorrow. Want to try?",
          },
        ],
      },
      audience: {
        sectionTitle: 'Anto is for you if…',
        items: [
          {
            title: 'Anxiety keeps you up at night',
            description: 'You need to land your thoughts at 2 a.m., not wait until therapy on Tuesday.',
          },
          {
            title: 'Work stress is overflowing',
            description: 'You want one concrete step today — not another productivity lecture.',
          },
          {
            title: 'You are processing a breakup or loss',
            description: 'You need a safe space to untangle what you feel, at your own pace.',
          },
        ],
      },
      inAppHint: {
        iosBrowser: 'Open in Safari',
        androidBrowser: 'Open in Chrome',
      },
      how: {
        sectionTitle: 'How it works',
        steps: [
          'Write what you feel, without filtering yourself.',
          'Get clarity and one concrete step for today.',
          'Come back whenever you need it.',
        ],
      },
      faq: {
        sectionTitle: 'Common questions',
        items: [
          {
            question: 'Is this the same as therapy?',
            answer:
              'No. Anto is AI emotional support: it helps you sort what you feel and move forward with concrete steps. It does not diagnose or replace clinical care.',
            privacyLinkLabel: 'Privacy Policy',
          },
          {
            question: 'What does it cost after the trial?',
            answer: trial.faqPricingAnswer,
            privacyLinkLabel: 'Privacy Policy',
          },
          {
            question: 'Who sees what I write?',
            answer:
              'Your conversations are private. We do not sell your data or use it for advertising. More detail in our',
            privacyLinkLabel: 'Privacy Policy',
          },
        ],
      },
      final: {
        headline: 'Want to try Anto?',
      },
      disclaimer:
        'Anto does not replace therapy or clinical care. If you are in crisis, seek professional or emergency help in your country.',
      footer: {
        privacy: 'Privacy',
        terms: 'Terms',
        contact: 'Contact',
        tagline: '© {year} anto · Made with care in Chile',
      },
      trustStrip: {
        ratingOnAppStore: appStoreRatingWithReviews('en'),
        availableOn: 'Available on iPhone and Android',
      },
      androidCta: 'Get it on Google Play',
      appPreview: {
        ariaLabel: 'Anto app preview',
        userMessage: "I can't stop thinking about everything going wrong",
        antoMessage:
          "That sounds exhausting. What's weighing on you most right now: fear, guilt, or uncertainty?",
        inputPlaceholder: 'Write a message…',
      },
      screenshots: {
        sectionTitle: 'Inside the app',
        images: [
          {
            src: APP_SCREENSHOT_PATHS.chat,
            alt: getAppScreenshotAlt('chat', 'en'),
          },
          {
            src: APP_SCREENSHOT_PATHS.home,
            alt: getAppScreenshotAlt('home', 'en'),
          },
        ],
      },
      v2: {
        eyebrow: 'Emotional support for anxiety',
        heroTitlePrefix: 'When your mind won\'t slow down,',
        heroTitleHighlight: 'Anto helps you land.',
        heroSub:
          'Write what you feel. Get clarity and one concrete step when anxiety won\'t let go.',
        heroReview: {
          quote:
            'I use it when anxiety wakes me up. Within minutes the intensity eases a bit.',
          author: 'Camila S.',
          source: 'App Store',
        },
        ctaStoreLabel: 'Download on',
        ctaStoreText: 'App Store',
        ctaBadge: trial.short,
        ctaMicro: `Start free today · No card · Private`,
        ctaMicroClose: 'Start free today · Private',
        ctaPlayLabel: 'Get it on',
        ctaPlayText: 'Google Play',
        ctaPlayBadge: trial.short,
        chatSectionLabel: 'On your iPhone',
        chat: {
          ariaLabel: 'Sample Anto chat: racing mind, then one concrete step',
          messages: [
            {
              role: 'user',
              text: "My mind won't stop. I can't sleep.",
            },
            {
              role: 'anto',
              text: 'That sounds exhausting. What weighs most right now?',
            },
            {
              role: 'anto',
              text: 'One step for tonight: write 3 things you can control. Want to try?',
            },
          ],
        },
      features: [
        { icon: 'privacy', title: 'Private', subtitle: 'Anto and the model read the text. Encrypted in transit (TLS) and at rest.' },
        { icon: 'clock', title: 'Anytime', subtitle: 'There when your mind won\'t stop' },
          { icon: 'evidence', title: 'Clear steps', subtitle: 'One concrete next step, not vague advice' },
          { icon: 'crisis', title: 'No judgment', subtitle: 'A calm space to untangle what you feel' },
        ],
        dashboard: {
          label: 'A mirror of what you wrote',
        headline: 'A mirror of what you wrote.',
          subtitle:
            'After you talk, Anto gives back what was heard and one concrete step. No label. No score.',
          mock: {
            title: 'What was heard',
            quote: 'My mind won\'t stop. I can\'t sleep.',
            reframe: 'Tonight is heavy. It does not all have to be solved now.',
            step: 'Write 3 things you can control. Two minutes.',
            footnote: 'Just an example. This is not a diagnosis.',
          },
        },
        trustItems: [
          { icon: 'lock', label: 'Private' },
          { icon: 'chile', label: 'Made in Chile' },
        ],
        photoAlt: 'A quiet bedroom at night when sleep will not come',
        limitsHeading: 'Worth knowing',
        limits: [
          {
            title: 'Not therapy',
            body: 'Anto does not diagnose or replace clinical care.',
          },
          {
            title: 'Private',
            body: 'They are encrypted in transit (TLS) and at rest. Anto and the model read the text to provide the service.',
          },
          {
            title: 'If you are in crisis',
            body: 'Seek professional or emergency help in your country.',
          },
        ],
      },
    };
  }

  if (locale === 'pt') {
    return {
      meta: {
        title: 'Quando a mente não para, a Anto ajuda você a encontrar o chão.',
        description:
          'Aplicativo de acompanhamento emocional para iPhone e Android: quando a ansiedade ou a mente não param, você escreve o que sente e sai com clareza e um passo concreto. Teste de 1 dia grátis na App Store ou no Google Play. Não substitui um terapeuta.',
        socialDescription:
          'Comece grátis hoje · Sem cartão · Privado',
        ogHeadline: 'Acompanhamento emocional quando a mente não para',
        ogSubline:
          'Escreva o que sente. Clareza e um passo concreto — não só uma resposta genérica.',
        ogAlt: 'Anto — Acompanhamento emocional para ansiedade no iPhone e no Android',
      },
      hero: {
        titleLine1: 'Quando a mente não para,',
        titleLine2: {
          A: 'Organize o que você sente com a Anto',
          B: 'A Anto ajuda você a ordenar',
          C: 'A Anto ajuda você a encontrar o chão.',
        },
        subheadline: {
          A: 'Escreva o que sente — a IA devolve clareza e um passo concreto em segundos.',
          B: 'Escreva o que sente — a IA devolve clareza e um passo concreto em segundos.',
          C: 'Escreva o que sente. Clareza e um passo concreto em segundos.',
        },
      },
      trial: {
        heroCta: {
          A: 'Baixar na App Store',
          B: 'Começar na App Store',
          C: 'App Store',
        },
        stickyCta: {
          A: `Comece — ${trial.short}`,
          B: `Baixar — ${trial.short}`,
          C: `Baixar — ${trial.short}`,
        },
        stickyAndroidCta: 'Baixar no Google Play',
        stickyDesktopCta: 'Ver opções para baixar',
        stickyAndroidAria: 'Baixar a Anto no Google Play',
        stickyDesktopAria: 'Ir às opções para baixar',
        finalCta: `Baixar na App Store — ${trial.short}`,
        line: `${trial.short} · cancele quando quiser na App Store`,
        pricingLine: 'Depois US$4.20/mês · cancele quando quiser',
        noCreditCard: 'Sem cartão de crédito para começar',
        aria: 'Baixar a Anto na App Store. Inclui 1 dia de teste grátis.',
        stickyAria: 'Baixar a Anto na App Store. Teste grátis de 1 dia.',
        faqAnswer: trial.faqPricingAnswer,
      },
      privacyBadge: 'Suas conversas são privadas',
      androidHeroCta: 'Google Play',
      androidLink: 'Também no Google Play para Android',
      androidStoreAria: 'Baixar a Anto no Google Play',
      desktopPicker: {
        prompt: 'De qual aparelho você está vindo?',
        iphone: 'Eu tenho iPhone',
        android: 'Eu tenho Android',
        changeDevice: 'Trocar aparelho',
        iphoneHint: 'Abre a App Store — instale no seu iPhone',
      },
      androidDevice: {
        leadLine: 'A Anto está no Google Play. Baixe no seu Android.',
        iosFallback: 'Tem iPhone? Baixe na App Store',
      },
      reviews: {
        sectionTitle: 'O que dizem na App Store',
        sourceLabel: 'Avaliações públicas na App Store',
        starsAria: '5 de 5 estrelas',
        items: [
          {
            quote: 'Me ajuda a organizar o que eu sinto quando não tenho com quem falar nessa hora.',
            author: 'Valentina R.',
          },
          {
            quote: 'Não é uma conversa genérica: sinto que entende o contexto e me deixa um passo concreto.',
            author: 'Tomás M.',
          },
          {
            quote: 'Eu uso quando a ansiedade me acorda. Em minutos a intensidade baixa um pouco.',
            author: 'Camila S.',
          },
        ],
      },
      clinicalPillars: {
        sectionTitle: 'Por que a Anto é diferente',
        items: [
          {
            icon: 'evidence',
            title: 'Com base clínica',
            description: 'Exercícios no hub (TCC, ABC, mindfulness) — não é uma conversa genérica.',
          },
          {
            icon: 'crisis',
            title: 'Se você está em crise',
            description:
              'A Anto pode orientar você a linhas de ajuda e recursos. Não substitui uma emergência nem um profissional.',
          },
          {
            icon: 'privacy',
            title: 'Privacidade total',
            description: 'As conversas são suas. Sem anúncio e sem venda de dados.',
          },
        ],
      },
      conversationDemo: {
        ariaLabel: 'Demonstração animada de uma conversa com a Anto',
        label: 'Uma conversa real, do começo ao fim',
        messages: [
          { role: 'user', text: 'não consigo dormir, fico pensando em tudo de ruim do trabalho' },
          {
            role: 'anto',
            text: 'Parece exaustivo. O que pesa mais agora: o medo, a culpa ou a incerteza?',
          },
          { role: 'user', text: 'mais o medo de amanhã no trabalho' },
          {
            role: 'anto',
            text: 'Vamos deixar isso menor. Um passo para hoje: escreva 3 coisas que você controla amanhã. Quer tentar?',
          },
        ],
      },
      audience: {
        sectionTitle: 'A Anto é para você se…',
        items: [
          {
            title: 'A ansiedade não deixa você dormir',
            description: 'Você precisa encontrar o chão às 2 da manhã, não esperar até terça na terapia.',
          },
          {
            title: 'O estresse do trabalho transborda',
            description: 'Você quer um passo concreto hoje — não mais uma fala sobre produtividade.',
          },
          {
            title: 'Você está atravessando um término ou uma perda',
            description: 'Você precisa de um espaço seguro para desenredar o que sente, no seu ritmo.',
          },
        ],
      },
      inAppHint: {
        iosBrowser: 'Abrir no Safari',
        androidBrowser: 'Abrir no Chrome',
      },
      how: {
        sectionTitle: 'Como funciona',
        steps: [
          'Escreva o que sente, sem filtro.',
          'Receba clareza e um passo concreto para hoje.',
          'Volte quando precisar.',
        ],
      },
      faq: {
        sectionTitle: 'Dúvidas frequentes',
        items: [
          {
            question: 'É a mesma coisa que terapia?',
            answer:
              'Não. A Anto é acompanhamento emocional com IA: ajuda a ordenar o que você sente e a seguir com um passo concreto. Não diagnostica e não substitui atendimento clínico.',
            privacyLinkLabel: 'Política de Privacidade',
          },
          {
            question: 'Quanto custa depois do teste?',
            answer: trial.faqPricingAnswer,
            privacyLinkLabel: 'Política de Privacidade',
          },
          {
            question: 'Quem vê o que eu escrevo?',
            answer:
              'Suas conversas são privadas. Não vendemos os seus dados nem usamos para publicidade. Mais detalhe na nossa',
            privacyLinkLabel: 'Política de Privacidade',
          },
        ],
      },
      final: {
        headline: 'Quer testar a Anto?',
      },
      disclaimer:
        'A Anto não substitui terapia nem atendimento clínico. Se você está em crise, procure ajuda profissional ou de emergência no seu país.',
      footer: {
        privacy: 'Privacidade',
        terms: 'Termos',
        contact: 'Contato',
        tagline: '© {year} anto · Feito com cuidado no Chile',
      },
      trustStrip: {
        ratingOnAppStore: appStoreRatingWithReviews('pt'),
        availableOn: 'Disponível no iPhone e no Android',
      },
      androidCta: 'Baixar no Google Play',
      appPreview: {
        ariaLabel: 'Prévia do aplicativo Anto',
        userMessage: 'não consigo parar de pensar em tudo de ruim',
        antoMessage:
          'Parece exaustivo. O que pesa mais agora: o medo, a culpa ou a incerteza?',
        inputPlaceholder: 'Escreva uma mensagem…',
      },
      screenshots: {
        sectionTitle: 'Assim se vê o aplicativo',
        images: [
          {
            src: APP_SCREENSHOT_PATHS.chat,
            alt: 'Conversa no aplicativo: a pessoa escreve que não consegue dormir e a Anto responde com reconhecimento e um passo concreto',
          },
          {
            src: APP_SCREENSHOT_PATHS.home,
            alt: 'Tela inicial da Anto com hábitos, continuidade do chat e pendências',
          },
        ],
      },
      v2: {
        eyebrow: 'Acompanhamento emocional para ansiedade',
        heroTitlePrefix: 'Quando a mente não para,',
        heroTitleHighlight: 'a Anto ajuda você a encontrar o chão.',
        heroSub:
          'Escreva o que sente. Clareza e um passo concreto quando a ansiedade não solta.',
        heroReview: {
          quote:
            'Eu uso quando a ansiedade me acorda. Em minutos a intensidade baixa um pouco.',
          author: 'Camila S.',
          source: 'App Store',
        },
        ctaStoreLabel: 'Baixar na',
        ctaStoreText: 'App Store',
        ctaBadge: trial.short,
        ctaMicro: 'Comece grátis hoje · Sem cartão · Privado',
        ctaMicroClose: 'Comece grátis hoje · Privado',
        ctaPlayLabel: 'Disponível no',
        ctaPlayText: 'Google Play',
        ctaPlayBadge: trial.short,
        chatSectionLabel: 'Assim no seu iPhone',
        chat: {
          ariaLabel: 'Chat de exemplo na Anto: mente que não para e um passo concreto',
          messages: [
            {
              role: 'user',
              text: 'A mente não para. Não consigo dormir.',
            },
            {
              role: 'anto',
              text: 'Parece exaustivo. O que pesa mais agora?',
            },
            {
              role: 'anto',
              text: 'Um passo para hoje à noite: escreva 3 coisas que você controla. Quer tentar?',
            },
          ],
        },
        features: [
          { icon: 'privacy', title: 'Privado', subtitle: 'A Anto e o modelo leem o texto. Criptografado em trânsito (TLS) e em repouso.' },
          { icon: 'clock', title: 'Quando você precisa', subtitle: 'Ali quando a mente não para' },
          { icon: 'evidence', title: 'Passos claros', subtitle: 'Um passo concreto, não um conselho vago' },
          { icon: 'crisis', title: 'Sem julgamento', subtitle: 'Um espaço calmo para ordenar o que você sente' },
        ],
        dashboard: {
          label: 'Um espelho do que você escreveu',
          headline: 'Um espelho do que você escreveu.',
          subtitle:
            'Depois de falar, a Anto devolve o que foi ouvido e um passo concreto. Sem rótulo. Sem pontuação.',
          mock: {
            title: 'O que foi ouvido',
            quote: 'A mente não para. Não consigo dormir.',
            reframe: 'Esta noite está pesada. Não precisa resolver tudo agora.',
            step: 'Escreva 3 coisas que você controla. Dois minutos.',
            footnote: 'Só um exemplo. Não é um diagnóstico.',
          },
        },
        trustItems: [
          { icon: 'lock', label: 'Privado' },
          { icon: 'chile', label: 'Feito no Chile' },
        ],
        photoAlt: 'Um quarto à noite, quando o sono não chega',
        limitsHeading: 'Vale saber',
        limits: [
          {
            title: 'Não é terapia',
            body: 'A Anto não diagnostica e não substitui atendimento clínico.',
          },
          {
            title: 'Privado',
            body: 'Vão criptografadas em trânsito (TLS) e em repouso. A Anto e o modelo leem o texto para prestar o serviço.',
          },
          {
            title: 'Se você está em crise',
            body: 'Procure ajuda profissional ou de emergência no seu país.',
          },
        ],
      },
    };
  }

  return {
    meta: {
      title: 'Cuando tu mente no para, Anto te ayuda a aterrizar.',
      description:
        'App de apoyo emocional para iPhone y Android: cuando la ansiedad o tu mente no paran, escribe lo que sientes y recibe claridad con un paso concreto. Prueba 1 día gratis en App Store o Google Play.',
      socialDescription:
        'Empieza gratis hoy · Sin tarjeta · Privado',
      ogHeadline: 'Apoyo emocional cuando tu mente no para',
      ogSubline:
        'Escribe lo que sientes. Recibe claridad y un paso concreto — no solo una respuesta genérica.',
      ogAlt: 'Anto — Apoyo emocional para ansiedad en iPhone y Android',
    },
    hero: {
      titleLine1: 'Cuando tu mente va a mil,',
      titleLine2: {
        A: 'Ordena lo que sientes con Anto',
        B: 'Anto te ayuda a ordenarlo',
        C: 'Anto te ayuda a aterrizar.',
      },
      subheadline: {
        A: 'Escribe lo que sientes — la IA te da claridad y un paso concreto en segundos.',
        B: 'Escribe lo que sientes — la IA te da claridad y un paso concreto en segundos.',
        C: 'Escribe lo que sientes. Recibe claridad y un paso concreto en segundos.',
      },
    },
    trial: {
      heroCta: {
        A: 'Descargar en App Store',
        B: 'Empezar en App Store',
        C: 'App Store',
      },
      stickyCta: {
        A: `Empieza — ${trial.short}`,
        B: `Descargar — ${trial.short}`,
        C: `Descargar — ${trial.short}`,
      },
      stickyAndroidCta: 'Descargar en Google Play',
      stickyDesktopCta: 'Ver opciones de descarga',
      stickyAndroidAria: 'Descargar Anto en Google Play',
      stickyDesktopAria: 'Ir a las opciones de descarga',
      finalCta: `Descargar en App Store — ${trial.short}`,
      line: `${trial.short} · cancelas cuando quieras en App Store`,
      pricingLine: 'Luego US$4.20/mes · cancela cuando quieras',
      noCreditCard: 'Sin tarjeta de crédito para empezar',
      aria: 'Descargar Anto en App Store. Incluye 1 día de prueba gratis.',
      stickyAria: 'Descargar Anto en App Store. Prueba gratis de 1 día.',
      faqAnswer: trial.faqPricingAnswer,
    },
    privacyBadge: 'Tus conversaciones son privadas',
    androidHeroCta: 'Google Play',
    androidLink: 'También en Google Play para Android',
    androidStoreAria: 'Descargar Anto en Google Play',
    desktopPicker: {
      prompt: '¿Desde qué dispositivo nos visitas?',
      iphone: 'Tengo iPhone',
      android: 'Tengo Android',
      changeDevice: 'Cambiar dispositivo',
      iphoneHint: 'Abre App Store — instálala en tu iPhone',
    },
    androidDevice: {
      leadLine: 'Anto está en Google Play. Descárgala en tu Android.',
      iosFallback: '¿Tienes iPhone? Descarga en App Store',
    },
    reviews: {
      sectionTitle: 'Lo que dicen en App Store',
      sourceLabel: 'Reseñas públicas en App Store',
      starsAria: '5 de 5 estrellas',
      items: getAppStoreReviewSnippets('es'),
    },
    clinicalPillars: {
      sectionTitle: 'Por qué Anto es distinto',
      items: [
        {
          icon: 'evidence',
          title: 'Basado en evidencia clínica',
          description: 'Ejercicios en el hub (TCC, ABC, mindfulness) — no es un chat genérico.',
        },
        {
          icon: 'crisis',
          title: 'Si estás en crisis',
          description:
            'Anto puede orientarte a líneas de ayuda y recursos. No reemplaza una emergencia ni a un profesional.',
        },
        {
          icon: 'privacy',
          title: 'Privacidad total',
          description: 'Tus conversaciones son tuyas. Sin publicidad ni venta de datos.',
        },
      ],
    },
    conversationDemo: {
      ariaLabel: 'Demo animada de conversación con Anto',
      label: 'Una conversación real, de principio a fin',
      messages: [
        { role: 'user', text: 'no puedo dormir, sigo pensando en todo malo del trabajo' },
        {
          role: 'anto',
          text: 'Suena agotador. ¿Qué pesa más ahora: el miedo, la culpa o la incertidumbre?',
        },
        { role: 'user', text: 'más el miedo por mañana en la pega' },
        {
          role: 'anto',
          text: 'Aterricemos. Un paso para hoy: escribe 3 cosas que sí controlas mañana. ¿Lo probamos?',
        },
      ],
    },
    audience: {
      sectionTitle: 'Anto es para ti si…',
      items: [
        {
          title: 'La ansiedad no te deja dormir',
          description: 'Necesitas aterrizar a las 2 a.m., no esperar hasta el martes en terapia.',
        },
        {
          title: 'El estrés laboral te desborda',
          description: 'Quieres un paso concreto hoy — no otra charla de productividad.',
        },
        {
          title: 'Estás procesando una ruptura o pérdida',
          description: 'Necesitas un espacio seguro para desenredar lo que sientes, a tu ritmo.',
        },
      ],
    },
    inAppHint: {
      iosBrowser: 'Abrir en Safari',
      androidBrowser: 'Abrir en Chrome',
    },
    how: {
      sectionTitle: 'Así funciona',
      steps: [
        'Escribe lo que sientes, sin filtro.',
        'Recibe claridad y un paso concreto para hoy.',
        'Vuelve cuando lo necesites.',
      ],
    },
    faq: {
      sectionTitle: 'Dudas frecuentes',
      items: [
        {
          question: '¿Es lo mismo que terapia?',
          answer:
            'No. Anto es apoyo emocional con IA: te ayuda a ordenar lo que sientes y avanzar con pasos concretos. No diagnostica ni sustituye atención clínica.',
          privacyLinkLabel: 'Política de Privacidad',
        },
        {
          question: '¿Cuánto cuesta después de la prueba?',
          answer: trial.faqPricingAnswer,
          privacyLinkLabel: 'Política de Privacidad',
        },
        {
          question: '¿Quién ve lo que escribo?',
          answer:
            'Tus conversaciones son privadas. No vendemos tus datos ni los usamos para publicidad. Más detalle en nuestra',
          privacyLinkLabel: 'Política de Privacidad',
        },
      ],
    },
    final: {
      headline: '¿Quieres probar Anto?',
    },
    disclaimer:
      'Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional o de emergencia en tu país.',
    footer: {
      privacy: 'Privacidad',
      terms: 'Términos',
      contact: 'Contacto',
      tagline: '© {year} anto · Hecho con cuidado en Chile',
    },
    trustStrip: {
      ratingOnAppStore: appStoreRatingWithReviews('es'),
      availableOn: 'Disponible en iPhone y Android',
    },
    androidCta: 'Descargar en Google Play',
    appPreview: {
      ariaLabel: 'Vista previa de la app Anto',
      userMessage: 'no puedo parar de pensar en todo malo',
      antoMessage:
        'Suena agotador. ¿Qué pesa más ahora: el miedo, la culpa o la incertidumbre?',
      inputPlaceholder: 'Escribe un mensaje…',
    },
    screenshots: {
      sectionTitle: 'Así se ve la app',
      images: [
        {
          src: APP_SCREENSHOT_PATHS.chat,
          alt: getAppScreenshotAlt('chat', 'es'),
        },
        {
          src: APP_SCREENSHOT_PATHS.home,
          alt: getAppScreenshotAlt('home', 'es'),
        },
      ],
    },
    v2: {
      eyebrow: 'Apoyo emocional para ansiedad',
      heroTitlePrefix: 'Cuando tu mente no para,',
      heroTitleHighlight: 'Anto te ayuda a aterrizar.',
      heroSub:
        'Escribe lo que sientes. Claridad y un paso concreto cuando la ansiedad no te deja.',
      heroReview: {
        quote:
          'La uso cuando la ansiedad me despierta. En minutos bajo un poco la intensidad.',
        author: 'Camila S.',
        source: 'App Store',
      },
      ctaStoreLabel: 'Descargar en',
      ctaStoreText: 'App Store',
      ctaBadge: trial.short,
      ctaMicro: `Empieza gratis hoy · Sin tarjeta · Privado`,
      ctaMicroClose: 'Empieza gratis hoy · Privado',
      ctaPlayLabel: 'Disponible en',
      ctaPlayText: 'Google Play',
      ctaPlayBadge: trial.short,
      chatSectionLabel: 'Así se ve en tu iPhone',
      chat: {
        ariaLabel: 'Chat de ejemplo en Anto: mente que no para y un paso concreto',
        messages: [
          {
            role: 'user',
            text: 'Mi mente no para. No puedo dormir.',
          },
          {
            role: 'anto',
            text: 'Suena agotador. ¿Qué pesa más ahora?',
          },
          {
            role: 'anto',
            text: 'Un paso para esta noche: escribe 3 cosas que sí controlas. ¿Lo probamos?',
          },
        ],
      },
      features: [
        { icon: 'privacy', title: 'Privado', subtitle: 'Anto y el modelo leen el texto. Cifrado en tránsito (TLS) y en reposo.' },
        { icon: 'clock', title: 'Cuando lo necesitas', subtitle: 'Ahí cuando tu mente no para' },
        { icon: 'evidence', title: 'Pasos claros', subtitle: 'Un siguiente paso concreto, no consejos vagos' },
        { icon: 'crisis', title: 'Sin juicio', subtitle: 'Un espacio calmado para ordenar lo que sientes' },
      ],
      dashboard: {
        label: 'Un espejo de lo que escribiste',
        headline: 'Un espejo de lo que escribiste.',
        subtitle:
          'Después de hablar, Anto te devuelve lo que se oyó y un paso concreto. Sin etiqueta. Sin puntaje.',
        mock: {
          title: 'Lo que se oyó',
          quote: 'Mi mente no para. No puedo dormir.',
          reframe: 'Esta noche está pesada. No tiene que resolverse toda ahora.',
          step: 'Escribe 3 cosas que sí controlas. Dos minutos.',
          footnote: 'Solo un ejemplo. No es un diagnóstico.',
        },
      },
      trustItems: [
        { icon: 'lock', label: 'Privado' },
        { icon: 'chile', label: 'Hecho en Chile' },
      ],
      photoAlt: 'Una habitación de noche, cuando el sueño no llega',
      limitsHeading: 'Importante saber',
      limits: [
        {
          title: 'No es terapia',
          body: 'Anto no diagnostica ni sustituye atención clínica.',
        },
        {
          title: 'Privado',
          body: 'Van cifradas en tránsito (TLS) y en reposo. Anto y el modelo leen el texto para prestar el servicio.',
        },
        {
          title: 'Si estás en crisis',
          body: 'Busca ayuda profesional o de emergencia en tu país.',
        },
      ],
    },
  };
}

const cache: Partial<Record<Locale, BienvenidaCopy>> = {};

export function getBienvenidaCopy(locale: Locale): BienvenidaCopy {
  if (!cache[locale]) {
    cache[locale] = buildBienvenidaCopy(locale);
  }
  return cache[locale]!;
}
