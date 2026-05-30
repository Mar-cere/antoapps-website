import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type FaqCategoryId = 'all' | 'privacidad' | 'funcionalidad' | 'precios' | 'tecnica' | 'empresarial';

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category: Exclude<FaqCategoryId, 'all'>;
};

export type HomeFaqCopy = {
  title: string;
  subtitle: string;
  ui: {
    searchPlaceholder: string;
    searchAriaLabel: string;
    clearSearchAriaLabel: string;
    clearSearch: string;
    showMore: string;
    noResultsPrefix: string;
    resultCount: {
      singular: string;
      plural: string;
    };
  };
  categories: { id: FaqCategoryId; label: string }[];
  faqData: FaqItem[];
  faqMoreData: FaqItem[];
};

function buildFaqCopy(locale: Locale): HomeFaqCopy {
  const trial = getTrialCopy(locale);

  if (locale === 'es') {
    return {
      title: 'Preguntas Frecuentes',
      subtitle: 'Encuentra respuestas a las preguntas más comunes sobre Anto',
      ui: {
        searchPlaceholder: 'Buscar en preguntas frecuentes...',
        searchAriaLabel: 'Buscar preguntas frecuentes',
        clearSearchAriaLabel: 'Limpiar búsqueda',
        clearSearch: 'Limpiar búsqueda',
        showMore: 'Ver todas las preguntas frecuentes →',
        noResultsPrefix: 'No se encontraron resultados para',
        resultCount: {
          singular: 'resultado encontrado',
          plural: 'resultados encontrados',
        },
      },
      categories: [
        { id: 'all', label: 'Todas' },
        { id: 'privacidad', label: 'Privacidad' },
        { id: 'funcionalidad', label: 'Funcionalidad' },
        { id: 'precios', label: 'Precios' },
        { id: 'tecnica', label: 'Técnica' },
        { id: 'empresarial', label: 'Empresarial' },
      ],
      faqData: [
        {
          id: 1,
          question: '¿Mis conversaciones son realmente privadas?',
          answer:
            'Sí, absolutamente. Todas tus conversaciones están encriptadas de extremo a extremo (E2E) utilizando estándares de grado militar (AES-256). Esto significa que solo tú y el sistema pueden leer tus mensajes. Ni siquiera nuestros administradores pueden acceder al contenido de tus conversaciones. Nunca compartimos, vendemos o comercializamos tu información con terceros. Tu privacidad es nuestra máxima prioridad y cumplimos con todas las regulaciones internacionales de protección de datos, incluyendo GDPR y HIPAA.',
          category: 'privacidad',
        },
        {
          id: 2,
          question: '¿Cómo funciona el asistente AI?',
          answer:
            'El asistente usa NLP de última generación (OpenAI GPT-5.4 Mini) con enfoque de bienestar emocional y técnicas alineadas con evidencia (p. ej. enfoques tipo CBT cuando encajan). Por defecto el tono es profesional y práctico; no sustituye terapia presencial ni diagnóstico clínico. Incluye escalas validadas (PHQ-9, GAD-7), detección de distorsiones cognitivas y protocolos estructurados. Puedes ajustar preferencias de estilo de respuesta cuando la app lo ofrece (v1.4+). El sistema contextualiza tus mensajes y mejora la personalización con el uso; la app y el backend se actualizan según el diseño del producto y buenas prácticas de seguridad.',
          category: 'funcionalidad',
        },
        {
          id: 3,
          question: '¿Puedo usar Anto si ya tengo un terapeuta?',
          answer:
            'Por supuesto. Anto está diseñado específicamente para complementar, no reemplazar, la terapia tradicional. Muchos usuarios lo usan como apoyo entre sesiones, para hacer seguimiento diario de su estado emocional, o como herramienta adicional de bienestar. Algunos terapeutas incluso recomiendan Anto a sus pacientes como complemento. Puedes compartir tus reportes y análisis con tu terapeuta si lo deseas, lo que puede enriquecer vuestras sesiones.',
          category: 'funcionalidad',
        },
        {
          id: 4,
          question: '¿Qué pasa si el sistema detecta una crisis?',
          answer:
            'Nuestro sistema de detección de crisis utiliza algoritmos avanzados para identificar señales de riesgo. Si detectamos una situación de crisis, inmediatamente te ofrecemos recursos de apoyo, incluyendo líneas de ayuda 24/7, contactos de emergencia locales, y técnicas de estabilización. En casos graves donde detectamos riesgo inminente, podemos ayudarte a contactar servicios de emergencia. El sistema está diseñado para ser proactivo pero respetuoso, priorizando siempre tu seguridad y bienestar.',
          category: 'funcionalidad',
        },
        {
          id: 5,
          question: '¿Hay un período de prueba gratis?',
          answer: trial.faqPremiumAnswer,
          category: 'precios',
        },
        {
          id: 6,
          question: '¿En qué dispositivos está disponible?',
          answer:
            'Anto está disponible con descarga directa en App Store para iOS (iPhone y iPad con iOS 13 o superior). En Android, actualmente operamos con acceso anticipado por invitación enviada por correo. Estamos trabajando activamente en una versión web que estará disponible en los próximos meses.',
          category: 'tecnica',
        },
        {
          id: 7,
          question: '¿Cuánto cuesta usar Anto?',
          answer:
            'Ofrecemos planes flexibles basados en duración: 1 Mes ($3.990 CLP / US$4.20 aprox.), 3 Meses ($11.990 CLP / US$12.62 aprox.), 6 Meses ($20.990 CLP / US$22.09 aprox.) y 1 Año ($39.990 CLP / US$42.09 aprox.). Todos los planes incluyen las mismas funcionalidades premium: acceso completo al asistente AI, análisis emocional avanzado, detección de crisis proactiva, herramientas de bienestar y soporte 24/7.',
          category: 'precios',
        },
        {
          id: 8,
          question: '¿Anto está disponible en inglés?',
          answer:
            'Sí. Desde la versión 1.4, Anto es bilingüe: puedes usar la app, el chat, los correos y las notificaciones push en español o inglés. El backend adapta las respuestas y los resúmenes de sesión al idioma configurado en tu perfil.',
          category: 'funcionalidad',
        },
        {
          id: 9,
          question: '¿Qué son los modos de conversación?',
          answer:
            'Son distintos enfoques del asistente según lo que necesites en cada momento: orientación práctica con micro-pasos, exploración emocional más conversada o acompañamiento estructurado con protocolos basados en evidencia. Puedes elegir el modo que mejor encaje con tu situación.',
          category: 'funcionalidad',
        },
        {
          id: 10,
          question: '¿Qué escalas clínicas usa Anto?',
          answer:
            'Anto integra las escalas validadas PHQ-9 (depresión) y GAD-7 (ansiedad). Se completan de forma automática a partir del análisis de tus conversaciones y se reflejan en tu historial con tendencias y reportes. No sustituyen una evaluación clínica presencial.',
          category: 'funcionalidad',
        },
        {
          id: 11,
          question: '¿Qué protocolos terapéuticos incluye Anto?',
          answer:
            'Anto incluye 8 protocolos estructurados basados en evidencia: depresión (CBT), ansiedad generalizada (CBT), manejo de ira, autocompasión, higiene del sueño, trauma, TOC (ERP) y TEPT. Se activan cuando el sistema detecta síntomas relevantes y guían el apoyo paso a paso.',
          category: 'funcionalidad',
        },
      ],
      faqMoreData: [
        {
          id: 12,
          question: '¿Necesito conexión a internet para usar Anto?',
          answer:
            'Sí, Anto requiere conexión a internet para la mayoría de las funciones, ya que el procesamiento del asistente AI y el análisis emocional se realizan en servidores seguros. Sin embargo, algunas funciones básicas como ejercicios de mindfulness y técnicas de relajación están disponibles offline. Estamos trabajando en una versión offline más completa que permitirá guardar conversaciones localmente y sincronizarlas cuando tengas conexión.',
          category: 'tecnica',
        },
        {
          id: 13,
          question: '¿Cómo funciona el análisis emocional?',
          answer:
            'El análisis emocional de Anto utiliza procesamiento de lenguaje natural y machine learning para analizar tus conversaciones, patrones de uso, y respuestas a cuestionarios. El sistema identifica emociones, detecta patrones a lo largo del tiempo, y te proporciona insights personalizados sobre tu bienestar mental. Recibirás gráficos visuales de tu estado emocional, alertas proactivas cuando detectemos cambios significativos, y reportes semanales y mensuales con recomendaciones personalizadas.',
          category: 'funcionalidad',
        },
        {
          id: 14,
          question: '¿Puedo exportar mis datos?',
          answer:
            'Sí, tienes control total sobre tus datos. Puedes exportar toda tu información en cualquier momento en formatos estándar (JSON, CSV, PDF). Esto incluye tus conversaciones, análisis emocionales, y reportes. También puedes solicitar la eliminación completa de tus datos en cualquier momento desde la configuración de la aplicación. Cumplimos con el derecho al olvido (GDPR) y eliminaremos permanentemente tu información dentro de 30 días tras tu solicitud.',
          category: 'privacidad',
        },
        {
          id: 15,
          question: '¿Anto puede diagnosticar condiciones de salud mental?',
          answer:
            'No, Anto no puede y no debe usarse para diagnosticar condiciones de salud mental. Anto es una herramienta de apoyo y bienestar, no un reemplazo para el diagnóstico profesional. Si tienes preocupaciones sobre tu salud mental, te recomendamos consultar con un profesional de salud mental licenciado. Anto puede ayudarte a identificar patrones y proporcionar apoyo, pero el diagnóstico debe ser realizado por un profesional cualificado.',
          category: 'funcionalidad',
        },
        {
          id: 16,
          question: '¿Cómo puedo cancelar mi suscripción?',
          answer:
            'Puedes cancelar tu suscripción en cualquier momento desde la configuración de la aplicación o contactándonos directamente. Si cancelas, seguirás teniendo acceso hasta el final del período de facturación actual. No hay penalizaciones ni cargos por cancelación. Si cancelas durante el período de prueba, no se te cobrará nada. Tu cuenta se convertirá automáticamente en una cuenta gratuita limitada, y podrás reactivar tu suscripción en cualquier momento.',
          category: 'precios',
        },
        {
          id: 17,
          question: '¿Anto es adecuado para adolescentes?',
          answer:
            'Anto está diseñado para usuarios de 18 años o más. Para menores de 18 años, recomendamos que usen la aplicación bajo la supervisión de un padre o tutor legal. Estamos desarrollando una versión específica para adolescentes (13-17 años) con contenido adaptado y controles parentales, que estará disponible próximamente. Si eres padre o tutor y tienes preguntas sobre el uso de Anto por parte de un menor, contáctanos en marcelo.ull@antoapps.com o a través de nuestro Telegram: t.me/marcere23.',
          category: 'funcionalidad',
        },
        {
          id: 18,
          question: '¿Qué tipo de ejercicios de bienestar incluye Anto?',
          answer:
            'Anto incluye una biblioteca completa de más de 100 ejercicios de bienestar, incluyendo meditaciones guiadas personalizadas, técnicas de respiración (4-7-8, respiración diafragmática), ejercicios de mindfulness, técnicas de relajación muscular progresiva, visualizaciones guiadas, ejercicios de gratitud, y técnicas de grounding. Todos los ejercicios están diseñados por profesionales de salud mental y se adaptan a tu estado emocional actual. Puedes acceder a ellos en cualquier momento, incluso offline.',
          category: 'funcionalidad',
        },
        {
          id: 19,
          question: '¿Qué hace único a Anto como herramienta de bienestar?',
          answer:
            'Anto combina un asistente de IA contextual con escalas clínicas validadas (PHQ-9, GAD-7), detección de 15 distorsiones cognitivas, 8 protocolos estructurados, detección proactiva de crisis, tareas y hábitos, y soporte bilingüe ES/EN. Priorizamos privacidad, transparencia y utilidad práctica — sin vender datos de usuarios. ' +
            trial.differentiatorSuffix,
          category: 'funcionalidad',
        },
        {
          id: 20,
          question: '¿Puedo usar Anto en múltiples dispositivos?',
          answer:
            'Sí, puedes usar Anto en múltiples dispositivos con una sola cuenta. En iOS, tus datos, conversaciones y análisis se sincronizan automáticamente de forma segura. En Android, esta continuidad aplica para cuentas que ya tengan acceso anticipado habilitado.',
          category: 'funcionalidad',
        },
        {
          id: 21,
          question: '¿Qué hago si tengo problemas técnicos?',
          answer:
            'Ofrecemos soporte técnico 24/7 a través de múltiples canales: email (marcelo.ull@antoapps.com), Telegram (t.me/marcere23), y LinkedIn. Nuestro equipo de soporte responde típicamente en menos de 2 horas. También tenemos una sección de ayuda dentro de la aplicación con guías paso a paso y solución de problemas comunes. Si encuentras un bug o problema, puedes reportarlo directamente desde la app y lo solucionaremos lo antes posible.',
          category: 'tecnica',
        },
      ],
    };
  }

  return {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to the most common questions about Anto',
    ui: {
      searchPlaceholder: 'Search frequently asked questions...',
      searchAriaLabel: 'Search frequently asked questions',
      clearSearchAriaLabel: 'Clear search',
      clearSearch: 'Clear search',
      showMore: 'View all frequently asked questions →',
      noResultsPrefix: 'No results found for',
      resultCount: {
        singular: 'result found',
        plural: 'results found',
      },
    },
    categories: [
      { id: 'all', label: 'All' },
      { id: 'privacidad', label: 'Privacy' },
      { id: 'funcionalidad', label: 'Features' },
      { id: 'precios', label: 'Pricing' },
      { id: 'tecnica', label: 'Technical' },
      { id: 'empresarial', label: 'Business' },
    ],
    faqData: [
      {
        id: 1,
        question: 'Are my conversations really private?',
        answer:
          'Yes, absolutely. All your conversations are end-to-end (E2E) encrypted using military-grade standards (AES-256). This means only you and the system can read your messages. Not even our administrators can access the content of your conversations. We never share, sell, or commercialise your information with third parties. Your privacy is our top priority and we comply with all international data protection regulations, including GDPR and HIPAA.',
        category: 'privacidad',
      },
      {
        id: 2,
        question: 'How does the AI assistant work?',
        answer:
          'The assistant uses state-of-the-art NLP (OpenAI GPT-5.4 Mini) with an emotional wellbeing focus and evidence-aligned techniques (e.g. CBT-style approaches when appropriate). By default the tone is professional and practical; it does not replace in-person therapy or clinical diagnosis. It includes validated scales (PHQ-9, GAD-7), cognitive distortion detection, and structured protocols. You can adjust response style preferences when the app offers them (v1.4+). The system contextualises your messages and improves personalisation with use; the app and backend are updated according to product design and security best practices.',
        category: 'funcionalidad',
      },
      {
        id: 3,
        question: 'Can I use Anto if I already have a therapist?',
        answer:
          'Of course. Anto is specifically designed to complement, not replace, traditional therapy. Many users rely on it for support between sessions, daily emotional tracking, or as an additional wellbeing tool. Some therapists even recommend Anto to their patients as a complement. You can share your reports and analyses with your therapist if you wish, which can enrich your sessions.',
        category: 'funcionalidad',
      },
      {
        id: 4,
        question: 'What happens if the system detects a crisis?',
        answer:
          'Our crisis detection system uses advanced algorithms to identify risk signals. If we detect a crisis situation, we immediately offer support resources, including 24/7 helplines, local emergency contacts, and stabilisation techniques. In severe cases where we detect imminent risk, we can help you contact emergency services. The system is designed to be proactive yet respectful, always prioritising your safety and wellbeing.',
        category: 'funcionalidad',
      },
      {
        id: 5,
        question: 'Is there a free trial period?',
        answer: trial.faqPremiumAnswer,
        category: 'precios',
      },
      {
        id: 6,
        question: 'Which devices is Anto available on?',
        answer:
          'Anto is available for direct download on the App Store for iOS (iPhone and iPad with iOS 13 or later). On Android, we currently operate with early access by email invitation. We are actively working on a web version that will be available in the coming months.',
        category: 'tecnica',
      },
      {
        id: 7,
        question: 'How much does Anto cost?',
        answer:
          'We offer flexible duration-based plans: 1 Month ($3,990 CLP / approx. US$4.20), 3 Months ($11,990 CLP / approx. US$12.62), 6 Months ($20,990 CLP / approx. US$22.09), and 1 Year ($39,990 CLP / approx. US$42.09). All plans include the same premium features: full access to the AI assistant, advanced emotional analysis, proactive crisis detection, wellbeing tools, and 24/7 support.',
        category: 'precios',
      },
      {
        id: 8,
        question: 'Is Anto available in English?',
        answer:
          'Yes. Since version 1.4, Anto is bilingual: you can use the app, chat, emails, and push notifications in Spanish or English. The backend adapts responses and session summaries to the language set in your profile.',
        category: 'funcionalidad',
      },
      {
        id: 9,
        question: 'What are conversation modes?',
        answer:
          'They are different assistant approaches depending on what you need: practical guidance with micro-steps, more conversational emotional exploration, or structured support with evidence-based protocols. You can choose the mode that best fits your situation.',
        category: 'funcionalidad',
      },
      {
        id: 10,
        question: 'Which clinical scales does Anto use?',
        answer:
          'Anto integrates the validated PHQ-9 (depression) and GAD-7 (anxiety) scales. They are completed automatically from the analysis of your conversations and reflected in your history with trends and reports. They do not replace an in-person clinical assessment.',
        category: 'funcionalidad',
      },
      {
        id: 11,
        question: 'Which therapeutic protocols does Anto include?',
        answer:
          'Anto includes 8 evidence-based structured protocols: depression (CBT), generalised anxiety (CBT), anger management, self-compassion, sleep hygiene, trauma, OCD (ERP), and PTSD. They activate when relevant symptoms are detected and guide support step by step.',
        category: 'funcionalidad',
      },
    ],
    faqMoreData: [
      {
        id: 12,
        question: 'Do I need an internet connection to use Anto?',
        answer:
          'Yes, Anto requires an internet connection for most features, as AI assistant processing and emotional analysis are performed on secure servers. However, some basic features such as mindfulness exercises and relaxation techniques are available offline. We are working on a more complete offline version that will allow you to save conversations locally and sync them when you have a connection.',
        category: 'tecnica',
      },
      {
        id: 13,
        question: 'How does emotional analysis work?',
        answer:
          'Anto\'s emotional analysis uses natural language processing and machine learning to analyse your conversations, usage patterns, and questionnaire responses. The system identifies emotions, detects patterns over time, and provides personalised insights about your mental wellbeing. You will receive visual charts of your emotional state, proactive alerts when we detect significant changes, and weekly and monthly reports with personalised recommendations.',
        category: 'funcionalidad',
      },
      {
        id: 14,
        question: 'Can I export my data?',
        answer:
          'Yes, you have full control over your data. You can export all your information at any time in standard formats (JSON, CSV, PDF). This includes your conversations, emotional analyses, and reports. You can also request complete deletion of your data at any time from the app settings. We comply with the right to erasure (GDPR) and will permanently delete your information within 30 days of your request.',
        category: 'privacidad',
      },
      {
        id: 15,
        question: 'Can Anto diagnose mental health conditions?',
        answer:
          'No, Anto cannot and should not be used to diagnose mental health conditions. Anto is a support and wellbeing tool, not a replacement for professional diagnosis. If you have concerns about your mental health, we recommend consulting a licensed mental health professional. Anto can help you identify patterns and provide support, but diagnosis must be performed by a qualified professional.',
        category: 'funcionalidad',
      },
      {
        id: 16,
        question: 'How can I cancel my subscription?',
        answer:
          'You can cancel your subscription at any time from the app settings or by contacting us directly. If you cancel, you will retain access until the end of the current billing period. There are no penalties or cancellation fees. If you cancel during the trial period, you will not be charged. Your account will automatically convert to a limited free account, and you can reactivate your subscription at any time.',
        category: 'precios',
      },
      {
        id: 17,
        question: 'Is Anto suitable for teenagers?',
        answer:
          'Anto is designed for users aged 18 and over. For users under 18, we recommend using the app under the supervision of a parent or legal guardian. We are developing a specific version for teenagers (13–17) with adapted content and parental controls, which will be available soon. If you are a parent or guardian and have questions about a minor using Anto, contact us at marcelo.ull@antoapps.com or via Telegram: t.me/marcere23.',
        category: 'funcionalidad',
      },
      {
        id: 18,
        question: 'What kind of wellbeing exercises does Anto include?',
        answer:
          'Anto includes a complete library of over 100 wellbeing exercises, including personalised guided meditations, breathing techniques (4-7-8, diaphragmatic breathing), mindfulness exercises, progressive muscle relaxation, guided visualisations, gratitude exercises, and grounding techniques. All exercises are designed by mental health professionals and adapt to your current emotional state. You can access them at any time, even offline.',
        category: 'funcionalidad',
      },
      {
        id: 19,
        question: 'What makes Anto unique as a wellness tool?',
        answer:
          'Anto combines a contextual AI assistant with validated clinical scales (PHQ-9, GAD-7), detection of 15 cognitive distortions, 8 structured protocols, proactive crisis detection, tasks and habits, and bilingual ES/EN support. We prioritise privacy, transparency, and practical utility — without selling user data. ' +
          trial.differentiatorSuffix,
        category: 'funcionalidad',
      },
      {
        id: 20,
        question: 'Can I use Anto on multiple devices?',
        answer:
          'Yes, you can use Anto on multiple devices with a single account. On iOS, your data, conversations, and analyses sync automatically and securely. On Android, this continuity applies to accounts that already have early access enabled.',
        category: 'funcionalidad',
      },
      {
        id: 21,
        question: 'What should I do if I have technical problems?',
        answer:
          'We offer 24/7 technical support through multiple channels: email (marcelo.ull@antoapps.com), Telegram (t.me/marcere23), and LinkedIn. Our support team typically responds in under 2 hours. We also have a help section within the app with step-by-step guides and common troubleshooting. If you find a bug or issue, you can report it directly from the app and we will fix it as soon as possible.',
        category: 'tecnica',
      },
    ],
  };
}

export function getHomeFaqCopy(locale: Locale): HomeFaqCopy {
  return buildFaqCopy(locale);
}
