import type { FeatureIconId, SecurityIconId } from '@/lib/types/feature-icons';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type FeatureCard = {
  icon: FeatureIconId;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type StudyCard = {
  badge: string;
  title: string;
  authors: string;
  abstract: string;
  metrics: string[];
  linkText: string;
  href: string;
};

export type TechItem = {
  name: string;
  description: string;
};

export type TechCategory = {
  title: string;
  items: TechItem[];
};

export type SecurityCard = {
  icon: SecurityIconId;
  title: string;
  description: string;
  features: string[];
};

export type AIExplainedStep = {
  title: string;
  description: string;
  techBadges: string[];
};

export type HomeSectionsCopy = {
  features: {
    title: string;
    subtitle: string;
    cards: FeatureCard[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
    proTip: {
      title: string;
      description: string;
    };
  };
  appShowcase: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
  };
  scienceBacked: {
    title: string;
    subtitle: string;
    studies: StudyCard[];
    cta: string;
    ctaHref: string;
  };
  technologies: {
    title: string;
    subtitle: string;
    categories: TechCategory[];
  };
  security: {
    title: string;
    subtitle: string;
    cards: SecurityCard[];
    cta: string;
    ctaHref: string;
  };
  aiExplained: {
    title: string;
    subtitle: string;
    steps: AIExplainedStep[];
    cta: string;
    ctaHref: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    valueBanner: {
      label: string;
      highlight: string;
    };
  };
};

const sectionsCopy: Record<Locale, (trialNote: string) => HomeSectionsCopy> = {
  es: (trialNote) => ({
    features: {
      title: 'Características Principales',
      subtitle: 'Desde el chat hasta el hub de técnicas y el grafo de insights — todo en la versión 1.5',
      cards: [
        {
          icon: 'ai',
          title: 'Asistente de IA',
          description:
            'Chat con memoria de temas recurrentes, sugerencias que persisten al reabrir y mejor manejo de mensajes breves o pensamientos difíciles. Modos de conversación y tono profesional.',
        },
        {
          icon: 'dashboard',
          title: 'Home personalizado',
          description:
            'Insight diario adaptado a ti, racha de ecosistema centrada en el chat y un panel de foco claro para empezar cada día con dirección.',
        },
        {
          icon: 'techniques',
          title: 'Hub de técnicas',
          description:
            'Catálogo completo de técnicas terapéuticas en la navegación: acceso rápido, lienzo ABC interactivo y conexión directa con el grafo de insights.',
        },
        {
          icon: 'insights',
          title: 'Grafo e informes',
          description:
            'Visualiza patrones, «lo que te ayuda» navegable, informes observacionales accionables y WAI post-sesión (alianza terapéutica en 4 ejes).',
        },
        {
          icon: 'scales',
          title: 'Escalas PHQ-9 y GAD-7',
          description:
            'Evaluación automática con escalas clínicas validadas para depresión y ansiedad, con historial, tendencias y reportes.',
        },
        {
          icon: 'protocols',
          title: 'Hub de ejercicios',
          description:
            'En el hub hay ejercicios (TCC, ABC, mindfulness) para cuando hablar no alcanza. No es tratamiento ni reemplaza a un profesional.',
        },
        {
          icon: 'tasks',
          title: 'Tareas y hábitos unificados',
          description:
            'Una sola pantalla para tu rutina terapéutica: recordatorios, Pomodoro al enfocar una tarea y copy orientado al bienestar.',
        },
        {
          icon: 'crisis',
          title: 'Si estás en crisis',
          description:
            'Líneas de ayuda, contactos de emergencia y recursos de apoyo. No reemplaza servicios de urgencia.',
        },
        {
          icon: 'language',
          title: 'Bilingüe y sesión persistente',
          description:
            'App en español e inglés. Vuelve sin reingresar contraseña en cada apertura gracias a sesión persistente y refresh automático de JWT.',
        },
      ],
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle:
        'En solo 4 pasos simples, comienza tu camino al bienestar. Anto está diseñado para ser intuitivo y accesible, sin importar tu nivel de experiencia con tecnología.',
      steps: [
        {
          title: 'Descarga la App',
          description:
            'Disponible gratis en App Store y Google Play. La descarga es rápida (menos de 40MB) y la instalación toma menos de un minuto.',
        },
        {
          title: 'Crea tu Perfil',
          description:
            'Configura tu perfil de forma privada y segura en menos de 2 minutos. Solo necesitas un email y puedes empezar. Toda tu información está encriptada desde el primer momento.',
        },
        {
          title: 'Comienza a Chatear',
          description:
            'Inicia una conversación con nuestro asistente AI que entiende tus emociones. Puedes escribir libremente, hacer preguntas, o usar nuestras guías de conversación sugeridas.',
        },
        {
          title: 'Recibe Apoyo Personalizado',
          description:
            'Obtén respuestas adaptadas, herramientas de bienestar y seguimiento continuo. El sistema aprende de cada interacción para ofrecerte un apoyo cada vez más personalizado.',
        },
      ],
      proTip: {
        title: 'Consejo',
        description:
          'Para obtener los mejores resultados, usa Anto con regularidad. El asistente aprende más sobre ti con cada conversación y puede ofrecerte orientación cada vez más precisa.',
      },
    },
    appShowcase: {
      label: 'Más que un chat',
      title: 'Tu bienestar,\norganizado.',
      subtitle: 'Hábitos, pendientes y seguimiento emocional en un solo lugar.',
      description:
        'El panel de inicio te muestra tu progreso, tareas y estado emocional sin perder el foco en lo que importa.',
    },
    scienceBacked: {
      title: 'Respaldado por Ciencia',
      subtitle:
        'Anto está respaldado por estudios científicos publicados en revistas reconocidas internacionalmente',
      studies: [
        {
          badge: '📄 JMIR Mental Health',
          title: 'Efectividad de Chatbots Terapéuticos',
          authors: 'Fitzpatrick et al. (2017)',
          abstract:
            'Estudio controlado aleatorizado que demostró reducciones significativas en síntomas de depresión y ansiedad con chatbots basados en terapia cognitivo-conductual.',
          metrics: ['RCT', '70 participantes'],
          linkText: 'Ver Estudio Completo →',
          href: 'https://www.jmir.org/2017/6/e19/',
        },
        {
          badge: '📊 World Psychiatry',
          title: 'Meta-Análisis de Apps Móviles',
          authors: 'Firth et al. (2019)',
          abstract:
            'Meta-análisis de 83 estudios confirma que las intervenciones digitales son efectivas para reducir síntomas de depresión y ansiedad.',
          metrics: ['Meta-análisis', '83 estudios'],
          linkText: 'Ver Estudio Completo →',
          href: 'https://onlinelibrary.wiley.com/doi/10.1002/wps.20673',
        },
        {
          badge: '🔬 npj Digital Medicine',
          title: 'Chatbots de IA en Salud Mental',
          authors: 'Vaidyam et al. (2022)',
          abstract:
            'Revisión que analiza la efectividad de chatbots de IA, concluyendo que son herramientas valiosas para apoyo emocional y detección temprana.',
          metrics: ['Nature', 'Revisión'],
          linkText: 'Ver Estudio Completo →',
          href: 'https://www.nature.com/articles/s41746-022-00642-8',
        },
      ],
      cta: 'Ver todos los estudios científicos →',
      ctaHref: localePath('es', '/investigacion'),
    },
    technologies: {
      title: 'Stack Tecnológico Moderno',
      subtitle:
        'Tecnologías de vanguardia (2025) seleccionadas por su rendimiento, escalabilidad y ecosistema activo',
      categories: [
        {
          title: 'Inteligencia Artificial',
          items: [
            { name: 'OpenAI GPT-5.4 Mini', description: 'API principal para conversaciones inteligentes' },
            { name: 'NLP Processing', description: 'Procesamiento de lenguaje natural' },
            { name: 'Sentiment Analysis', description: 'Análisis emocional en tiempo real' },
          ],
        },
        {
          title: 'Frontend',
          items: [
            { name: 'React Native', description: 'Framework multiplataforma iOS/Android' },
            { name: 'Expo SDK', description: 'Desarrollo y deployment rápido' },
            { name: 'React Navigation', description: 'Navegación fluida' },
          ],
        },
        {
          title: 'Backend',
          items: [
            { name: 'Node.js', description: 'Runtime JavaScript' },
            { name: 'Express.js', description: 'Framework web' },
            { name: 'MongoDB', description: 'Base de datos NoSQL' },
            { name: 'Socket.IO', description: 'WebSockets en tiempo real' },
          ],
        },
        {
          title: 'Seguridad',
          items: [
            { name: 'JWT', description: 'Autenticación segura' },
            { name: 'bcrypt', description: 'Hashing de contraseñas' },
            { name: 'Helmet.js', description: 'Headers de seguridad' },
          ],
        },
        {
          title: 'Integraciones',
          items: [
            { name: 'Mercado Pago', description: 'Procesamiento de pagos' },
            { name: 'SendGrid', description: 'Emails transaccionales' },
            { name: 'OpenAI API', description: 'IA conversacional' },
          ],
        },
      ],
    },
    security: {
      title: 'Tus datos, protegidos',
      subtitle:
        'Cifrado AES-256, autenticación segura y cumplimiento con estándares internacionales de privacidad.',
      cards: [
        {
          icon: 'encryption',
          title: 'Cifrado en tránsito y en reposo',
          description:
            'Tus conversaciones se cifran en tránsito (TLS) y en reposo. Anto y el modelo leen el texto para prestar el servicio.',
          features: [
            '✓ TLS en tránsito',
            '✓ Cifrado en reposo',
            '✓ El modelo lee el texto para prestar el servicio',
            '✓ Verificación de integridad de datos',
          ],
        },
        {
          icon: 'compliance',
          title: 'Cumplimiento regulatorio',
          description:
            'Diseñado para alinearse con GDPR, HIPAA, LGPD y PIPEDA.',
          features: ['✓ GDPR (Europa)', '✓ HIPAA (Estados Unidos)', '✓ LGPD (Brasil)', '✓ PIPEDA (Canadá)'],
        },
        {
          icon: 'auth',
          title: 'Autenticación segura',
          description:
            'Verificación en dos pasos, tokens seguros y detección de accesos inusuales.',
          features: [
            '✓ Autenticación de dos factores (2FA)',
            '✓ Tokens JWT seguros',
            '✓ Detección de accesos sospechosos',
            '✓ Sesión persistente con refresh seguro de JWT',
          ],
        },
      ],
      cta: 'Ver información completa de seguridad →',
      ctaHref: localePath('es', '/seguridad'),
    },
    aiExplained: {
      title: 'Cómo Funciona Nuestra Inteligencia Artificial',
      subtitle:
        'Tecnología de vanguardia diseñada específicamente para entender y responder a las emociones humanas',
      steps: [
        {
          title: 'Integración con OpenAI API',
          description:
            'Conexión directa con GPT-5.4 Mini mediante API REST. Prioriza un tono profesional y práctico (orientación y micro-pasos; no sustituye terapia clínica). Las conversaciones se guardan para dar continuidad entre sesiones.',
          techBadges: ['OpenAI GPT-5.4 Mini', 'MongoDB', 'NLP'],
        },
        {
          title: 'Recursos en momentos difíciles',
          description:
            'Líneas de ayuda y, si el usuario lo configura, aviso a contactos de confianza vía Twilio (WhatsApp/SMS) y SendGrid. No reemplaza servicios de urgencia.',
          techBadges: ['Análisis de Patrones', 'Twilio', 'SendGrid'],
        },
        {
          title: 'Motor de apoyo estructurado',
          description:
            'Según el contexto de cada conversación, el sistema sugiere ejercicios del hub (TCC, ABC, mindfulness). No es tratamiento ni reemplaza a un profesional.',
          techBadges: ['Automatizado', 'Basado en Evidencia', 'Contextual'],
        },
        {
          title: 'Comunicación en Tiempo Real',
          description:
            'WebSockets con Socket.IO para respuestas en menos de 2,5 segundos. El backend Node.js consulta el historial en MongoDB antes de generar cada respuesta.',
          techBadges: ['Socket.IO', 'WebSockets', 'Tiempo Real'],
        },
      ],
      cta: 'Ver detalles técnicos completos →',
      ctaHref: localePath('es', '/desarrollo'),
    },
    pricing: {
      title: 'Planes y Precios',
      subtitle: `Elige la duración que mejor se adapte a tus necesidades. Todos los planes incluyen acceso completo a la app. ${trialNote}`,
      valueBanner: {
        label: 'Mejor valor',
        highlight:
          'Los planes de mayor duración ofrecen hasta un 17% de ahorro. Todas las funcionalidades están incluidas.',
      },
    },
  }),
  en: (trialNote) => ({
    features: {
      title: 'Key Features',
      subtitle: 'From chat to the techniques hub and insights graph — all in version 1.5',
      cards: [
        {
          icon: 'ai',
          title: 'AI assistant',
          description:
            'Chat with recurring topic memory, suggestions that persist when you reopen, and better handling of short messages or difficult thoughts. Conversation modes and a professional tone.',
        },
        {
          icon: 'dashboard',
          title: 'Personalised home',
          description:
            'Daily insight tailored to you, a chat-centered ecosystem streak, and a clear focus panel to start each day with direction.',
        },
        {
          icon: 'techniques',
          title: 'Techniques hub',
          description:
            'Full catalog of therapeutic techniques in navigation: quick access, interactive ABC canvas, and direct connection to the insights graph.',
        },
        {
          icon: 'insights',
          title: 'Graph and reports',
          description:
            'Visualise patterns, navigable "what helps you", actionable observational reports, and post-session WAI (therapeutic alliance across 4 axes).',
        },
        {
          icon: 'scales',
          title: 'PHQ-9 and GAD-7 scales',
          description:
            'Automatic assessment with validated clinical scales for depression and anxiety, with history, trends, and reports.',
        },
        {
          icon: 'protocols',
          title: 'Exercise hub',
          description:
            'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional.',
        },
        {
          icon: 'tasks',
          title: 'Unified tasks and habits',
          description:
            'One screen for your therapeutic routine: reminders, Pomodoro when focusing a task, and wellbeing-oriented copy.',
        },
        {
          icon: 'crisis',
          title: 'If you are in crisis',
          description:
            'Helplines, emergency contacts, and support resources. It does not replace emergency services.',
        },
        {
          icon: 'language',
          title: 'Bilingual and persistent session',
          description:
            'App in Spanish and English. Return without re-entering your password each time thanks to persistent session and automatic JWT refresh.',
        },
      ],
    },
    howItWorks: {
      title: 'How It Works',
      subtitle:
        'In just 4 simple steps, begin your path to wellbeing. Anto is designed to be intuitive and accessible, regardless of your experience with technology.',
      steps: [
        {
          title: 'Download the App',
          description:
            'Available free on the App Store and Google Play. The download is quick (under 40MB) and installation takes less than a minute.',
        },
        {
          title: 'Create Your Profile',
          description:
            'Set up your profile privately and securely in under 2 minutes. You only need an email to get started. All your information is encrypted from the first moment.',
        },
        {
          title: 'Start Chatting',
          description:
            'Start a conversation with our AI assistant that understands your emotions. You can write freely, ask questions, or use our suggested conversation guides.',
        },
        {
          title: 'Receive Personalised Support',
          description:
            'Get tailored responses, wellbeing tools, and ongoing tracking. The system learns from each interaction to offer increasingly personalised support.',
        },
      ],
      proTip: {
        title: 'Tip',
        description:
          'For the best results, use Anto regularly. The assistant learns more about you with each conversation and can offer increasingly precise guidance.',
      },
    },
    appShowcase: {
      label: 'More than a chat',
      title: 'Your wellbeing,\norganized.',
      subtitle: 'Habits, tasks, and emotional tracking in one place.',
      description:
        'The home dashboard shows your progress, tasks, and emotional state without losing focus on what matters.',
    },
    scienceBacked: {
      title: 'Backed by Science',
      subtitle:
        'Anto is supported by scientific studies published in internationally recognised journals',
      studies: [
        {
          badge: '📄 JMIR Mental Health',
          title: 'Effectiveness of Therapeutic Chatbots',
          authors: 'Fitzpatrick et al. (2017)',
          abstract:
            'Randomised controlled trial demonstrating significant reductions in depression and anxiety symptoms with cognitive behavioural therapy-based chatbots.',
          metrics: ['RCT', '70 participants'],
          linkText: 'View Full Study →',
          href: 'https://www.jmir.org/2017/6/e19/',
        },
        {
          badge: '📊 World Psychiatry',
          title: 'Meta-Analysis of Mobile Apps',
          authors: 'Firth et al. (2019)',
          abstract:
            'Meta-analysis of 83 studies confirms that digital interventions are effective for reducing depression and anxiety symptoms.',
          metrics: ['Meta-analysis', '83 studies'],
          linkText: 'View Full Study →',
          href: 'https://onlinelibrary.wiley.com/doi/10.1002/wps.20673',
        },
        {
          badge: '🔬 npj Digital Medicine',
          title: 'AI Chatbots in Mental Health',
          authors: 'Vaidyam et al. (2022)',
          abstract:
            'Review analysing the effectiveness of AI chatbots, concluding they are valuable tools for emotional support and early detection.',
          metrics: ['Nature', 'Review'],
          linkText: 'View Full Study →',
          href: 'https://www.nature.com/articles/s41746-022-00642-8',
        },
      ],
      cta: 'View all scientific studies →',
      ctaHref: localePath('en', '/investigacion'),
    },
    technologies: {
      title: 'Modern Technology Stack',
      subtitle:
        'Cutting-edge technologies (2025) selected for performance, scalability, and an active ecosystem',
      categories: [
        {
          title: 'Artificial Intelligence',
          items: [
            { name: 'OpenAI GPT-5.4 Mini', description: 'Primary API for intelligent conversations' },
            { name: 'NLP Processing', description: 'Natural language processing' },
            { name: 'Sentiment Analysis', description: 'Real-time emotional analysis' },
          ],
        },
        {
          title: 'Frontend',
          items: [
            { name: 'React Native', description: 'Cross-platform iOS/Android framework' },
            { name: 'Expo SDK', description: 'Rapid development and deployment' },
            { name: 'React Navigation', description: 'Smooth navigation' },
          ],
        },
        {
          title: 'Backend',
          items: [
            { name: 'Node.js', description: 'JavaScript runtime' },
            { name: 'Express.js', description: 'Web framework' },
            { name: 'MongoDB', description: 'NoSQL database' },
            { name: 'Socket.IO', description: 'Real-time WebSockets' },
          ],
        },
        {
          title: 'Security',
          items: [
            { name: 'JWT', description: 'Secure authentication' },
            { name: 'bcrypt', description: 'Password hashing' },
            { name: 'Helmet.js', description: 'Security headers' },
          ],
        },
        {
          title: 'Integrations',
          items: [
            { name: 'Mercado Pago', description: 'Payment processing' },
            { name: 'SendGrid', description: 'Transactional emails' },
            { name: 'OpenAI API', description: 'Conversational AI' },
          ],
        },
      ],
    },
    security: {
      title: 'Your data, protected',
      subtitle:
        'AES-256 encryption, secure authentication, and compliance with international privacy standards.',
      cards: [
        {
          icon: 'encryption',
          title: 'Encryption in transit and at rest',
          description:
            'Conversations are encrypted in transit (TLS) and at rest. Anto and the model read the text to provide the service.',
          features: [
            '✓ TLS in transit',
            '✓ Encryption at rest',
            '✓ The model reads the text to provide the service',
            '✓ Data integrity verification',
          ],
        },
        {
          icon: 'compliance',
          title: 'Regulatory compliance',
          description:
            'Designed to align with GDPR, HIPAA, LGPD, and PIPEDA.',
          features: ['✓ GDPR (Europe)', '✓ HIPAA (United States)', '✓ LGPD (Brazil)', '✓ PIPEDA (Canada)'],
        },
        {
          icon: 'auth',
          title: 'Secure authentication',
          description:
            'Two-step verification, secure tokens, and unusual access detection.',
          features: [
            '✓ Two-factor authentication (2FA)',
            '✓ Secure JWT tokens',
            '✓ Suspicious access detection',
            '✓ Persistent session with secure JWT refresh',
          ],
        },
      ],
      cta: 'View full security information →',
      ctaHref: localePath('en', '/seguridad'),
    },
    aiExplained: {
      title: 'How Our Artificial Intelligence Works',
      subtitle:
        'Cutting-edge technology designed specifically to understand and respond to human emotions',
      steps: [
        {
          title: 'OpenAI API Integration',
          description:
            'Direct connection to GPT-5.4 Mini via REST API. Prioritises a professional, practical tone (guidance and micro-steps; not a substitute for clinical therapy). Conversations are stored to maintain continuity between sessions.',
          techBadges: ['OpenAI GPT-5.4 Mini', 'MongoDB', 'NLP'],
        },
        {
          title: 'Resources in hard moments',
          description:
            'Helplines and, if the user sets them up, notices to trusted contacts via Twilio (WhatsApp/SMS) and SendGrid. It does not replace emergency services.',
          techBadges: ['Pattern Analysis', 'Twilio', 'SendGrid'],
        },
        {
          title: 'Structured support engine',
          description:
            'Based on each conversation, the system suggests hub exercises (CBT, ABC, mindfulness). It is not treatment and does not replace a professional.',
          techBadges: ['Automated', 'Evidence-Based', 'Contextual'],
        },
        {
          title: 'Real-Time Communication',
          description:
            'WebSockets with Socket.IO for responses in under 2.5 seconds. The Node.js backend reads history from MongoDB before generating each reply.',
          techBadges: ['Socket.IO', 'WebSockets', 'Real-Time'],
        },
      ],
      cta: 'View full technical details →',
      ctaHref: localePath('en', '/desarrollo'),
    },
    pricing: {
      title: 'Plans and Pricing',
      subtitle: `Choose the duration that best fits your needs. All plans include full access to the app. ${trialNote}`,
      valueBanner: {
        label: 'Best value',
        highlight:
          'Longer plans offer up to 17% savings. All features are included.',
      },
    },
  }),
};

export function getHomeSectionsCopy(locale: Locale): HomeSectionsCopy {
  const trial = getTrialCopy(locale);
  return sectionsCopy[locale](trial.pricingNote);
}
