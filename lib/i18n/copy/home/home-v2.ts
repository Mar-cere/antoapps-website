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
    fullScreen: string;
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
        fullScreen: 'View full screen',
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
      fullScreen: 'Ver pantalla completa',
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
