import { localePath, type Locale } from '@/lib/i18n/config';
import { PRICING_USD } from '@/lib/pricing/plans';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type HomeV2ChatRole = 'user' | 'anto';

export type HomeV2ChatBubble = {
  role: HomeV2ChatRole;
  text: string;
};

export type HomeV2ChatThread = {
  ariaLabel: string;
  messages: readonly HomeV2ChatBubble[];
};

export type HomeV2SummaryPanel = {
  ariaLabel: string;
  chromeTitle: string;
  moodFrom: string;
  moodTo: string;
  moodLabel: string;
  theme: string;
  patternLabel: string;
  pattern: string;
  helpedLabel: string;
  helped: string;
};

export type HomeV2TechniqueStep = {
  letter: string;
  label: string;
  value: string;
};

export type HomeV2TechniquePanel = {
  ariaLabel: string;
  chromeTitle: string;
  name: string;
  tag: string;
  duration: string;
  steps: readonly HomeV2TechniqueStep[];
  nextMoveLabel: string;
  nextMove: string;
};

export type HomeV2PrivacyPanel = {
  ariaLabel: string;
  chromeTitle: string;
  lead: string;
  points: readonly string[];
};

export type HomeV2DistortionPanel = {
  ariaLabel: string;
  chromeTitle: string;
  thoughtLabel: string;
  thought: string;
  labelHint: string;
  labelName: string;
  reframeLabel: string;
  reframe: string;
  techniqueLabel: string;
  technique: string;
};

export type HomeV2EvidenceBar = {
  label: string;
  value: number;
};

export type HomeV2EvidencePanel = {
  ariaLabel: string;
  chromeTitle: string;
  scaleName: string;
  scaleRange: string;
  currentLabel: string;
  currentValue: string;
  trendLabel: string;
  trend: string;
  bars: readonly HomeV2EvidenceBar[];
  /** Máximo de la escala (p. ej. 21 en GAD-7) para altura relativa. */
  scaleMax: number;
  insightLabel: string;
  insight: string;
  disclaimer: string;
};

export type HomeV2MomentMedia =
  | { kind: 'chat'; chat: HomeV2ChatThread }
  | { kind: 'summary'; summary: HomeV2SummaryPanel }
  | { kind: 'technique'; technique: HomeV2TechniquePanel }
  | { kind: 'distortion'; distortion: HomeV2DistortionPanel }
  | { kind: 'evidence'; evidence: HomeV2EvidencePanel }
  | { kind: 'privacy'; privacy: HomeV2PrivacyPanel };

export type HomeV2Moment = {
  id: string;
  title: string;
  body: string;
  media: HomeV2MomentMedia;
  reverse?: boolean;
  imageAlt?: string;
};

export type HomeV2PriceCard = {
  period: string;
  /** Total del plan (o tarifa mensual en el plan de 1 mes). */
  price: string;
  /** Unidad junto al número grande o al total de la fila (`USD`, `/ mes`, `/ mo`). */
  unit: string;
  /** Equivalente mensual a 2 decimales (total ÷ meses). No redondear 4.21 a 4.20. */
  perMonth?: string;
  save?: string;
  popular?: boolean;
};

function usdAmount(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** Equivalente mensual: total ÷ meses, siempre 2 decimales. */
function usdPerMonth(total: number, months: number): string {
  return usdAmount(total / months);
}

export type HomeV2FoundationPillar = {
  title: string;
  body: string;
  example?: 'guide';
};

export type HomeV2ExploreLink = {
  href: string;
  label: string;
  description: string;
};

export type HomeV2Copy = {
  hero: {
    brand: string;
    titleLine1: string;
    titleAccent: string;
    support: string;
    ctaStoreLabel: string;
    ctaStoreText: string;
    ctaBadge: string;
    ctaMicro: string;
    storeAria: string;
    ctaPlayLabel: string;
    ctaPlayText: string;
    ctaPlayBadge: string;
    androidStoreAria: string;
    imageAlt: string;
    chat: HomeV2ChatThread;
  };
  nav: {
    cta: string;
    ctaAria: string;
  };
  recognize: {
    lead: string;
    body: string;
    imageAlt: string;
  };
  moments: readonly HomeV2Moment[];
  product: {
    chatCaption: string;
    youLabel: string;
    antoLabel: string;
    chat: readonly { role: 'user' | 'anto'; text: string }[];
    guideKicker: string;
    guideTitle: string;
    guideDek: string;
    guideSteps: readonly { title: string; body: string }[];
    guideRead: { href: string; label: string };
  };
  foundation: {
    title: string;
    support: string;
    pillars: readonly HomeV2FoundationPillar[];
    guide: {
      href: string;
      label: string;
      note: string;
    };
  };
  still: {
    line: string;
    imageAlt: string;
  };
  reviews: {
    title: string;
    sourceLabel: string;
    starsAria: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    popularBadge: string;
    cards: readonly HomeV2PriceCard[];
    ctaMicro: string;
  };
  faq: {
    title: string;
    items: readonly { question: string; answer: string }[];
    moreHref: string;
    moreLabel: string;
  };
  explore: {
    title: string;
    links: readonly HomeV2ExploreLink[];
    coda: {
      trust: readonly string[];
      disclaimer: string;
    };
  };
  finalCta: {
    title: string;
    subtitle: string;
    imageAlt: string;
  };
};

function buildHomeV2Copy(locale: Locale): HomeV2Copy {
  const trial = getTrialCopy(locale);

  if (locale === 'en') {
    return {
      hero: {
        brand: 'Anto',
        titleLine1: 'When everything costs',
        titleAccent: 'a little more.',
        support:
          'For the quiet hours, between a session and the rest of the day. You write what keeps looping and leave with one step for tonight.',
        ctaStoreLabel: 'Download on',
        ctaStoreText: 'App Store',
        ctaBadge: trial.short,
        ctaMicro: `${trial.short} · No card · Cancel anytime`,
        storeAria: 'Download Anto on the App Store',
        ctaPlayLabel: 'Get it on',
        ctaPlayText: 'Google Play',
        ctaPlayBadge: trial.short,
        androidStoreAria: 'Download Anto on Google Play',
        imageAlt: 'Quiet evening light through a window, empty room at dusk',
        chat: {
          ariaLabel: 'Sample Anto conversation about work anxiety',
          messages: [
            {
              role: 'user',
              text: "Can't sleep. Presentation Friday and my head won't shut up.",
            },
            {
              role: 'anto',
              text: "What's the part that keeps looping?",
            },
            {
              role: 'user',
              text: 'Blanking out. Looking stupid in front of everyone.',
            },
            {
              role: 'anto',
              text: 'Tonight just open slide one. Two minutes. Then close it. It does not have to go well.',
            },
          ],
        },
      },
      nav: {
        cta: 'Download',
        ctaAria: 'Download Anto for your device',
      },
      recognize: {
        lead: 'Some days you are not exactly unwell.',
        body: 'You do not need a full crisis to need company. Anto is there for the stretch between the day and sleep, without an appointment.',
        imageAlt: 'Rainy night desk with an open notebook and a warm lamp',
      },
      moments: [
        {
          id: 'distortion',
          imageAlt: 'Hands by a window, a phone, a cup, and an open notebook',
          title: 'It catches the spiral. Then helps you loosen it.',
          body: 'When your mind jumps to the worst ending, Anto names it and offers a small way through.',
          media: {
            kind: 'distortion',
            distortion: {
              ariaLabel: 'Example of naming a worst-case thought and suggesting a short exercise',
              chromeTitle: 'In the chat',
              thoughtLabel: 'What showed up',
              thought: '“If I blank out, my career is over.”',
              labelHint: 'Sounds like',
              labelName: 'Jumping to the worst ending',
              reframeLabel: 'Another way to hold it',
              reframe: 'Blanking on one slide is awkward, not the end of a career.',
              techniqueLabel: 'A next move',
              technique: 'A short exercise (~3 min): separate what happened from what you imagined.',
            },
          },
        },
        {
          id: 'evidence',
          title: 'Quiet check-ins. So you notice what eased.',
          body: 'Not a diagnosis. Just a mirror of how the weeks have felt.',
          reverse: true,
          media: {
            kind: 'evidence',
            evidence: {
              ariaLabel: 'Sample of how anxiety felt across four weeks',
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
              insight: 'The nights you scrolled less, things felt a bit quieter the next day',
              disclaimer:
                'Just an example. These check-ins help you notice patterns. They do not diagnose or replace professional care.',
            },
          },
        },
        {
          id: 'privacy',
          title: 'Your space stays yours.',
          body: 'Anto and the model read the text only to provide the service.',
          media: {
            kind: 'privacy',
            privacy: {
              ariaLabel: 'Privacy commitments in Anto',
              chromeTitle: 'Privacy',
              lead: 'Care without an audience.',
              points: [
                'Conversations encrypted in transit and at rest',
                'We do not sell your data',
                'No ads built on your story',
              ],
            },
          },
        },
      ],
      product: {
        chatCaption: 'This is how Anto answers that night.',
        youLabel: 'You',
        antoLabel: 'Anto',
        chat: [
          {
            role: 'anto',
            text: 'Your mind is doing overtime before Friday. Try writing down the three most urgent thoughts on paper, then set them aside for tonight. If you want, I can help you sort those thoughts into “fix now” and “leave for later.”',
          },
          {
            role: 'anto',
            text: "That sounds like the worst part: not the presentation itself, but the image your mind is pushing at you. Let's stay with the immediate moment first—what is the strongest thought repeating right now?",
          },
        ],
        guideKicker: 'Micro-guide',
        guideTitle: 'Social anxiety',
        guideDek: 'Prep for interactions that raise tension.',
        guideSteps: [
          {
            title: 'Prediction',
            body: 'What do you think will happen? Write it as a hypothesis.',
          },
          {
            title: 'Alternative',
            body: 'What other explanation is possible?',
          },
          {
            title: 'Micro-step',
            body: 'Define the smallest social gesture (greet, one question).',
          },
        ],
        guideRead: {
          href: localePath('en', '/recursos/ansiedad-y-preocupacion'),
          label: 'Anxiety and worry',
        },
      },
      foundation: {
        title: 'Not a chat that forgets.',
        support: 'What you say today is still there the next time.',
        guide: {
          href: localePath('en', '/recursos/grounding-ansiedad-crisis'),
          label: 'When anxiety rises',
          note: 'A short grounding guide, if the moment tightens.',
        },
        pillars: [
          {
            title: 'Memory that stays with you',
            body: 'Themes that return and patterns you can notice, not a blank conversation every time.',
          },
          {
            title: 'Techniques when you need them',
            body: 'Short guides in the hub, a few minutes each.',
            example: 'guide',
          },
          {
            title: 'Between sessions',
            body: 'Available any hour, including nights when there is no appointment in sight.',
          },
        ],
      },
      still: {
        line: 'Some nights just need a place to land.',
        imageAlt: 'Morning light on an empty chair by the window',
      },
      reviews: {
        title: 'Real people. Difficult nights.',
        sourceLabel: 'Public reviews on the App Store',
        starsAria: '5 stars on the App Store',
      },
      pricing: {
        title: 'Start when you need it.',
        subtitle: 'One free day. Full access on every plan. Cancel anytime.',
        popularBadge: 'Most chosen',
        cards: [
          { period: '1 month', price: usdAmount(PRICING_USD.month), unit: '/ mo' },
          {
            period: '3 months',
            price: usdAmount(PRICING_USD.threeMonths),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.threeMonths, 3)} / mo · USD`,
            popular: true,
          },
          {
            period: '6 months',
            price: usdAmount(PRICING_USD.sixMonths),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.sixMonths, 6)} / mo`,
            save: 'Save 12%',
          },
          {
            period: '1 year',
            price: usdAmount(PRICING_USD.year),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.year, 12)} / mo`,
            save: 'Save 17%',
          },
        ],
        ctaMicro: `${trial.short} · No card required`,
      },
      faq: {
        title: 'What people usually ask.',
        items: [
          {
            question: 'What is Anto?',
            answer:
              'Anto is an app for ongoing emotional support between sessions or day to day. It uses AI assistance in the background. It does not replace clinical care. A human therapist remains the stronger recommendation. Available on iPhone and Android.',
          },
          {
            question: 'What else is there besides chat?',
            answer:
              'Theme memory, a techniques hub (including an interactive ABC canvas), check-ins to notice patterns, and a home screen for the day. Conversation is one part, not the whole product.',
          },
          {
            question: 'Are my conversations private?',
            answer:
              'Yes. They are encrypted in transit (TLS) and at rest. We do not sell the thread or use it for ads.',
          },
          {
            question: 'Does Anto replace therapy?',
            answer:
              'No. It stays with you on hard days and between one session and the next. Professional care remains separate.',
          },
          {
            question: 'Is there a free trial?',
            answer: trial.faqPremiumAnswer,
          },
        ],
        moreHref: localePath('en', '/recursos'),
        moreLabel: 'More resources',
      },
      explore: {
        title: 'Keep exploring',
        links: [
          {
            href: '/recursos',
            label: 'Resources',
            description: 'Anxiety, grounding, CBT, and more guides',
          },
          {
            href: '/recursos/grounding-ansiedad-crisis',
            label: 'When anxiety rises',
            description: 'Grounding 5-4-3-2-1 for intense moments',
          },
          {
            href: '/recursos/ansiedad-y-preocupacion',
            label: 'Anxiety and worry',
            description: 'The map, including social anxiety',
          },
          {
            href: '/app',
            label: 'The app',
            description: 'What Anto includes on iPhone and Android',
          },
          {
            href: '/seguridad',
            label: 'Security',
            description: 'Why the thread is read, and how it is kept',
          },
        ],
        coda: {
          trust: ['Private by design', 'No card required'],
          disclaimer:
            'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
        },
      },
      finalCta: {
        title: 'When you need the intensity to ease.',
        subtitle: 'Start today. One free day, no card.',
        imageAlt: 'Quiet sleepless night: dim room, soft lamp light near an empty bed',
      },
    };
  }

  if (locale === 'pt') {
    return {
      hero: {
        brand: 'Anto',
        titleLine1: 'Quando tudo custa',
        titleAccent: 'um pouco mais.',
        support:
          'Para as horas quietas, entre uma sessão e o resto do dia. Você escreve o que fica se repetindo e sai com um passo para esta noite.',
        ctaStoreLabel: 'Baixar na',
        ctaStoreText: 'App Store',
        ctaBadge: trial.short,
        ctaMicro: `${trial.short} · Sem cartão · Cancele quando quiser`,
        storeAria: 'Baixar a Anto na App Store',
        ctaPlayLabel: 'Disponível no',
        ctaPlayText: 'Google Play',
        ctaPlayBadge: trial.short,
        androidStoreAria: 'Baixar a Anto no Google Play',
        imageAlt: 'Luz do fim da tarde num quarto quieto, janela ao anoitecer',
        chat: {
          ariaLabel: 'Conversa de exemplo na Anto sobre ansiedade no trabalho',
          messages: [
            {
              role: 'user',
              text: 'Não consigo dormir. Apresentação na sexta e a cabeça não para.',
            },
            {
              role: 'anto',
              text: 'O que mais fica voltando?',
            },
            {
              role: 'user',
              text: 'Ficar em branco. Que todo mundo perceba.',
            },
            {
              role: 'anto',
              text: 'Esta noite, abra só o primeiro slide. Dois minutos. Depois feche. Não precisa sair bem.',
            },
          ],
        },
      },
      nav: {
        cta: 'Baixar',
        ctaAria: 'Baixar a Anto para o seu celular',
      },
      recognize: {
        lead: 'Tem dias em que você não está exatamente mal.',
        body: 'Não precisa estar em crise para precisar de companhia. A Anto fica nesse intervalo entre o dia e a cama, sem hora marcada.',
        imageAlt: 'Escrivaninha à noite, chuva na janela, caderno aberto e abajur aceso',
      },
      moments: [
        {
          id: 'distortion',
          imageAlt: 'Mãos junto à janela, um celular, uma xícara e um caderno aberto',
          title: 'Segura a espiral. Depois ajuda a soltar.',
          body: 'Quando a mente salta para o pior final, a Anto dá nome a isso e oferece um caminho pequeno.',
          media: {
            kind: 'distortion',
            distortion: {
              ariaLabel: 'Exemplo de nomear um pensamento catastrófico e sugerir um exercício breve',
              chromeTitle: 'No chat',
              thoughtLabel: 'O que apareceu',
              thought: '“Se eu ficar em branco, acabou a minha carreira.”',
              labelHint: 'Parece',
              labelName: 'Imaginar o pior final',
              reframeLabel: 'Outro jeito de ver',
              reframe: 'Ficar em branco num slide é constrangedor, não o fim de uma carreira.',
              techniqueLabel: 'Um próximo passo',
              technique: 'Um exercício curto (~3 min): separar o que aconteceu do que você imaginou.',
            },
          },
        },
        {
          id: 'evidence',
          title: 'Check-ins quietos. Para notar o que aliviou.',
          body: 'Não é um diagnóstico. Só um espelho de como as semanas se sentiram.',
          reverse: true,
          media: {
            kind: 'evidence',
            evidence: {
              ariaLabel: 'Exemplo de como a ansiedade se sentiu em quatro semanas',
              chromeTitle: 'Check-in',
              scaleName: 'Ansiedade',
              scaleRange: 'check-in breve',
              currentLabel: 'Esta semana',
              currentValue: '8',
              trendLabel: 'Ultimamente',
              trend: 'Um pouco mais leve do que há um mês',
              scaleMax: 21,
              bars: [
                { label: 'S1', value: 14 },
                { label: 'S2', value: 12 },
                { label: 'S3', value: 10 },
                { label: 'S4', value: 8 },
              ],
              insightLabel: 'O que se notou',
              insight: 'Nas noites em que você olhou menos o celular, o dia seguinte pareceu um pouco mais quieto',
              disclaimer:
                'Só um exemplo. Esses check-ins ajudam a notar padrões. Não diagnosticam nem substituem o cuidado profissional.',
            },
          },
        },
        {
          id: 'privacy',
          title: 'O seu espaço continua sendo seu.',
          body: 'A Anto e o modelo leem o texto só para prestar o serviço.',
          media: {
            kind: 'privacy',
            privacy: {
              ariaLabel: 'Compromissos de privacidade na Anto',
              chromeTitle: 'Privacidade',
              lead: 'Cuidado sem plateia.',
              points: [
                'Conversas criptografadas em trânsito e em repouso',
                'Não vendemos os seus dados',
                'Sem anúncios em cima da sua história',
              ],
            },
          },
        },
      ],
      product: {
        chatCaption: 'É assim que a Anto responde nessa noite.',
        youLabel: 'Você',
        antoLabel: 'Anto',
        chat: [
          {
            role: 'anto',
            text: 'A cabeça entrou em modo de alerta, e isso cansa demais. Se servir, a gente pode baixar um pouco a pressão desta noite e ordenar o que mais está voltando.',
          },
          {
            role: 'anto',
            text: 'Isso pesa porque não é só a apresentação. É a ideia de se expor e sentir que todo mundo veria. Se você quiser, a gente pode ficar nesse medo e deixá-lo um pouco mais manejável.',
          },
        ],
        guideKicker: 'Microguia',
        guideTitle: 'Ansiedade social',
        guideDek: 'Preparação para interações que geram tensão.',
        guideSteps: [
          {
            title: 'Predição',
            body: 'O que você acha que vai acontecer? Escreva como hipótese, não como fato.',
          },
          {
            title: 'Evidência alternativa',
            body: 'Que outra explicação é possível?',
          },
          {
            title: 'Micropasso',
            body: 'Defina o menor gesto social (cumprimentar, uma pergunta).',
          },
        ],
        guideRead: {
          href: localePath('pt', '/recursos/ansiedad-y-preocupacion'),
          label: 'Ansiedade e preocupação',
        },
      },
      foundation: {
        title: 'Não é um chat que esquece.',
        support: 'O que você conta hoje continua na próxima conversa.',
        guide: {
          href: localePath('pt', '/recursos/grounding-ansiedad-crisis'),
          label: 'Quando a ansiedade sobe',
          note: 'Um guia curto de grounding, se o momento apertar.',
        },
        pillars: [
          {
            title: 'Memória que acompanha',
            body: 'Temas que voltam e padrões que se notam, não uma conversa em branco toda vez.',
          },
          {
            title: 'Técnicas quando fazem falta',
            body: 'Guias de alguns minutos, no hub.',
            example: 'guide',
          },
          {
            title: 'Entre sessões',
            body: 'Disponível a qualquer hora, também nas noites em que não há consulta à vista.',
          },
        ],
      },
      still: {
        line: 'Tem noites que só precisam de um lugar para pousar.',
        imageAlt: 'Luz da manhã sobre uma cadeira vazia junto à janela',
      },
      reviews: {
        title: 'Pessoas reais. Noites difíceis.',
        sourceLabel: 'Avaliações públicas na App Store',
        starsAria: '5 estrelas na App Store',
      },
      pricing: {
        title: 'Comece quando precisar.',
        subtitle: 'Um dia grátis. Acesso completo em todos os planos. Cancele quando quiser.',
        popularBadge: 'O mais escolhido',
        cards: [
          { period: '1 mês', price: usdAmount(PRICING_USD.month), unit: '/ mês' },
          {
            period: '3 meses',
            price: usdAmount(PRICING_USD.threeMonths),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.threeMonths, 3)} / mês · USD`,
            popular: true,
          },
          {
            period: '6 meses',
            price: usdAmount(PRICING_USD.sixMonths),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.sixMonths, 6)} / mês`,
            save: 'Economize 12%',
          },
          {
            period: '1 ano',
            price: usdAmount(PRICING_USD.year),
            unit: 'USD',
            perMonth: `${usdPerMonth(PRICING_USD.year, 12)} / mês`,
            save: 'Economize 17%',
          },
        ],
        ctaMicro: `${trial.short} · Sem cartão`,
      },
      faq: {
        title: 'O que costuma ser perguntado.',
        items: [
          {
            question: 'O que é a Anto?',
            answer:
              'A Anto é um aplicativo de acompanhamento emocional contínuo entre sessões ou no dia a dia. Usa assistência de IA em segundo plano. Não substitui atendimento clínico: um terapeuta ou profissional humano continua sendo o mais recomendável. Disponível no iPhone e no Android.',
          },
          {
            question: 'O que existe além do chat?',
            answer:
              'Memória de temas, um hub de técnicas (com um quadro ABC interativo), check-ins para notar padrões e o início do dia. A conversa é uma parte, não o produto inteiro.',
          },
          {
            question: 'Minhas conversas são privadas?',
            answer:
              'Sim. Vão criptografadas em trânsito (TLS) e em repouso. Não vendemos a conversa nem a usamos para anúncios.',
          },
          {
            question: 'A Anto substitui a terapia?',
            answer:
              'Não. Acompanha você nos dias difíceis e entre uma sessão e a seguinte. O atendimento profissional continua sendo outra coisa.',
          },
          {
            question: 'Tem teste grátis?',
            answer: trial.faqPremiumAnswer,
          },
        ],
        moreHref: localePath('pt', '/recursos'),
        moreLabel: 'Mais recursos',
      },
      explore: {
        title: 'Continuar explorando',
        links: [
          {
            href: '/recursos',
            label: 'Recursos',
            description: 'Guias de ansiedade, grounding, TCC e mais',
          },
          {
            href: '/recursos/grounding-ansiedad-crisis',
            label: 'Quando a ansiedade sobe',
            description: 'Grounding 5-4-3-2-1 para momentos intensos',
          },
          {
            href: '/recursos/ansiedad-y-preocupacion',
            label: 'Ansiedade e preocupação',
            description: 'O mapa, incluindo a ansiedade social',
          },
          {
            href: '/app',
            label: 'O aplicativo',
            description: 'O que a Anto inclui no iPhone e no Android',
          },
          {
            href: '/seguridad',
            label: 'Segurança',
            description: 'Por que a conversa é lida, e como ela é cuidada',
          },
        ],
        coda: {
          trust: ['Privado de propósito', 'Sem cartão'],
          disclaimer:
            'A Anto não substitui terapia nem atendimento clínico profissional. Se você estiver em crise, procure ajuda de emergência no seu país.',
        },
      },
      finalCta: {
        title: 'Quando você precisar diminuir a intensidade.',
        subtitle: 'Comece hoje. Um dia grátis, sem cartão.',
        imageAlt: 'Noite em claro: quarto na penumbra, luz suave de abajur junto a uma cama',
      },
    };
  }

  return {
    hero: {
      brand: 'Anto',
      titleLine1: 'Cuando todo cuesta',
      titleAccent: 'un poco más.',
      support:
        'Para las horas quietas, entre una sesión y el resto del día. Escribes lo que da vueltas y te llevas un paso para esta noche.',
      ctaStoreLabel: 'Descargar en',
      ctaStoreText: 'App Store',
      ctaBadge: trial.short,
      ctaMicro: `${trial.short} · Sin tarjeta · Cancela cuando quieras`,
      storeAria: 'Descargar Anto en App Store',
      ctaPlayLabel: 'Disponible en',
      ctaPlayText: 'Google Play',
      ctaPlayBadge: trial.short,
      androidStoreAria: 'Descargar Anto en Google Play',
      imageAlt: 'Luz de tarde en una habitación quieta, ventana al anochecer',
      chat: {
        ariaLabel: 'Conversación de ejemplo en Anto sobre ansiedad laboral',
        messages: [
          {
            role: 'user',
            text: 'No puedo dormir. Presentación el viernes y la cabeza no para.',
          },
          {
            role: 'anto',
            text: '¿Qué es lo que más te da vueltas?',
          },
          {
            role: 'user',
            text: 'Quedarme en blanco. Que se note delante de todos.',
          },
          {
            role: 'anto',
            text: 'Esta noche solo abre la primera diapositiva. Dos minutos. Después cierras. No tiene que salir bien.',
          },
        ],
      },
    },
    nav: {
      cta: 'Descargar',
      ctaAria: 'Descargar Anto para tu dispositivo',
    },
    recognize: {
      lead: 'Hay días en que no estás exactamente mal.',
      body: 'No hace falta estar en crisis para necesitar compañía. Anto está para ese rato entre el día y la cama, sin cita previa.',
      imageAlt: 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida',
    },
    moments: [
      {
        id: 'distortion',
        imageAlt: 'Manos junto a la ventana, un teléfono, una taza y una libreta abierta',
        title: 'Atrapa la espiral. Después ayuda a soltarla.',
        body: 'Cuando la mente salta al peor final, Anto lo nombra y ofrece un camino pequeño.',
        media: {
          kind: 'distortion',
          distortion: {
            ariaLabel: 'Ejemplo de nombrar un pensamiento catastrófico y sugerir un ejercicio breve',
            chromeTitle: 'En el chat',
            thoughtLabel: 'Lo que apareció',
            thought: '“Si me quedo en blanco, se acabó mi carrera.”',
            labelHint: 'Suena a',
            labelName: 'Imaginar el peor final',
            reframeLabel: 'Otra forma de verlo',
            reframe: 'Quedarte en blanco en una diapositiva es incómodo, no el fin de una carrera.',
            techniqueLabel: 'Un siguiente paso',
            technique: 'Un ejercicio corto (~3 min): separar lo que pasó de lo que imaginaste.',
          },
        },
      },
      {
        id: 'evidence',
        title: 'Chequeos quietos. Para notar qué aflojó.',
        body: 'No es un diagnóstico. Solo un espejo de cómo se sintieron las semanas.',
        reverse: true,
        media: {
          kind: 'evidence',
          evidence: {
            ariaLabel: 'Ejemplo de cómo se sintió la ansiedad en cuatro semanas',
            chromeTitle: 'Chequeo',
            scaleName: 'Ansiedad',
            scaleRange: 'chequeo breve',
            currentLabel: 'Esta semana',
            currentValue: '8',
            trendLabel: 'Últimamente',
            trend: 'Un poco más leve que hace un mes',
            scaleMax: 21,
            bars: [
              { label: 'S1', value: 14 },
              { label: 'S2', value: 12 },
              { label: 'S3', value: 10 },
              { label: 'S4', value: 8 },
            ],
            insightLabel: 'Lo que se notó',
            insight: 'Las noches en que miraste menos el teléfono, al día siguiente se sintió un poco más quieto',
            disclaimer:
              'Solo un ejemplo. Estos chequeos ayudan a notar patrones. No diagnostican ni reemplazan el cuidado profesional.',
          },
        },
      },
      {
        id: 'privacy',
        title: 'Tu espacio sigue siendo tuyo.',
        body: 'Anto y el modelo leen el texto solo para prestarte el servicio.',
        media: {
          kind: 'privacy',
          privacy: {
            ariaLabel: 'Compromisos de privacidad en Anto',
            chromeTitle: 'Privacidad',
            lead: 'Cuidado sin audiencia.',
            points: [
              'Conversaciones cifradas en tránsito y en reposo',
              'No vendemos tus datos',
              'Sin anuncios sobre tu historia',
            ],
          },
        },
      },
    ],
    product: {
      chatCaption: 'Así responde Anto en esa noche.',
      youLabel: 'Tú',
      antoLabel: 'Anto',
      chat: [
        {
          role: 'anto',
          text: 'La cabeza se te quedó en modo alerta, y eso agota mucho. Si te sirve, podemos bajar un poco la presión de esta noche y ordenar qué es lo que más te está dando vueltas.',
        },
        {
          role: 'anto',
          text: 'Eso pesa mucho porque no es solo la presentación; es la idea de exponerte y sentir que todos lo verían. Si quieres, podemos aterrizar justo ese miedo y dejarlo un poco más manejable.',
        },
      ],
      guideKicker: 'Micro-guía',
      guideTitle: 'Ansiedad social',
      guideDek: 'Preparación para interacciones que te generan tensión.',
      guideSteps: [
        {
          title: 'Predicción',
          body: '¿Qué crees que ocurrirá? Escríbelo como hipótesis, no hecho.',
        },
        {
          title: 'Evidencia alternativa',
          body: '¿Qué otra explicación es posible?',
        },
        {
          title: 'Micro-paso',
          body: 'Define el primer gesto social mínimo (saludar, una pregunta).',
        },
      ],
      guideRead: {
        href: localePath('es', '/recursos/ansiedad-y-preocupacion'),
        label: 'Ansiedad y preocupación',
      },
    },
    foundation: {
      title: 'No es un chat que olvida.',
      support: 'Lo que cuentas hoy queda para la próxima conversación.',
      guide: {
        href: localePath('es', '/recursos/grounding-ansiedad-crisis'),
        label: 'Cuando la ansiedad sube',
        note: 'Una guía corta de grounding, si el momento aprieta.',
      },
      pillars: [
        {
          title: 'Memoria que acompaña',
          body: 'Temas que vuelven y patrones que se notan, no una conversación en blanco cada vez.',
        },
        {
          title: 'Técnicas cuando hacen falta',
          body: 'Guías de unos minutos, en el hub.',
          example: 'guide',
        },
        {
          title: 'Entre sesiones',
          body: 'Disponible a cualquier hora, también las noches en que no hay cita a la vista.',
        },
      ],
    },
    still: {
      line: 'Hay noches que solo necesitan un lugar donde aterrizar.',
      imageAlt: 'Luz de mañana sobre una silla vacía junto a la ventana',
    },
    reviews: {
      title: 'Personas reales. Noches difíciles.',
      sourceLabel: 'Reseñas públicas en App Store',
      starsAria: '5 estrellas en App Store',
    },
    pricing: {
      title: 'Empieza cuando lo necesites.',
      subtitle: 'Un día gratis. Acceso completo en todos los planes. Cancela cuando quieras.',
      popularBadge: 'El más elegido',
      cards: [
        { period: '1 mes', price: usdAmount(PRICING_USD.month), unit: '/ mes' },
        {
          period: '3 meses',
          price: usdAmount(PRICING_USD.threeMonths),
          unit: 'USD',
          perMonth: `${usdPerMonth(PRICING_USD.threeMonths, 3)} / mes · USD`,
          popular: true,
        },
        {
          period: '6 meses',
          price: usdAmount(PRICING_USD.sixMonths),
          unit: 'USD',
          perMonth: `${usdPerMonth(PRICING_USD.sixMonths, 6)} / mes`,
          save: 'Ahorra 12%',
        },
        {
          period: '1 año',
          price: usdAmount(PRICING_USD.year),
          unit: 'USD',
          perMonth: `${usdPerMonth(PRICING_USD.year, 12)} / mes`,
          save: 'Ahorra 17%',
        },
      ],
      ctaMicro: `${trial.short} · Sin tarjeta`,
    },
    faq: {
      title: 'Lo que suele preguntarse.',
      items: [
        {
          question: '¿Qué es Anto?',
          answer:
            'Anto es una app de acompañamiento emocional continuo entre sesiones o en el día a día. Usa asistencia de IA en segundo plano. No sustituye atención clínica: un terapeuta o profesional humano sigue siendo lo más recomendable. Disponible en iPhone y Android.',
        },
        {
          question: '¿Qué hay además del chat?',
          answer:
            'Memoria de temas, un hub de técnicas (incluido un lienzo ABC interactivo), chequeos para notar patrones y el inicio del día. La conversación es una parte, no el producto entero.',
        },
        {
          question: '¿Mis conversaciones son privadas?',
          answer:
            'Sí. Van cifradas en tránsito (TLS) y en reposo. No vendemos el hilo ni lo usamos para anuncios.',
        },
        {
          question: '¿Anto reemplaza la terapia?',
          answer:
            'No. Te acompaña en los días duros y entre una sesión y la siguiente. La atención profesional sigue siendo otra cosa.',
        },
        {
          question: '¿Hay prueba gratis?',
          answer: trial.faqPremiumAnswer,
        },
      ],
      moreHref: localePath('es', '/recursos'),
      moreLabel: 'Más recursos',
    },
    explore: {
      title: 'Seguir explorando',
      links: [
        {
          href: '/recursos',
          label: 'Recursos',
          description: 'Guías de ansiedad, grounding, TCC y más',
        },
        {
          href: '/recursos/grounding-ansiedad-crisis',
          label: 'Cuando la ansiedad sube',
          description: 'Grounding 5-4-3-2-1 para momentos intensos',
        },
        {
          href: '/recursos/ansiedad-y-preocupacion',
          label: 'Ansiedad y preocupación',
          description: 'El mapa, incluida la ansiedad social',
        },
        {
          href: '/app',
          label: 'La app',
          description: 'Qué incluye Anto en iPhone y Android',
        },
        {
          href: '/seguridad',
          label: 'Seguridad',
          description: 'Por qué se lee el hilo, y cómo se cuida',
        },
      ],
      coda: {
        trust: ['Privado por diseño', 'Sin tarjeta'],
        disclaimer:
          'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
      },
    },
    finalCta: {
      title: 'Cuando necesites bajar la intensidad.',
      subtitle: 'Empieza hoy. Un día gratis, sin tarjeta.',
      imageAlt: 'Noche en vela: habitación en penumbra, luz suave de lámpara junto a una cama',
    },
  };
}

export function getHomeV2Copy(locale: Locale): HomeV2Copy {
  return buildHomeV2Copy(locale);
}
