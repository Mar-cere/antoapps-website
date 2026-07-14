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
          id: 101,
          question: '¿Qué es Anto?',
          answer:
            'Anto es una app de acompañamiento emocional continuo: un lugar donde aterrizar cuando necesitas apoyo entre sesiones o en el día a día. Usa asistencia de IA en segundo plano, con herramientas y seguimiento pensados para el bienestar. No sustituye atención clínica: un terapeuta o profesional humano sigue siendo lo más recomendable. Disponible en iPhone.',
          category: 'funcionalidad',
        },
        {
          id: 102,
          question: '¿Anto reemplaza a un terapeuta o psicólogo?',
          answer:
            'No. Anto es un complemento de acompañamiento emocional, no terapia ni atención clínica. Un terapeuta, psicólogo u otro profesional humano capacitado sigue siendo lo más recomendable cuando necesitas evaluación, diagnóstico o tratamiento. Si ya tienes acompañamiento profesional, Anto puede ayudarte entre sesiones; no lo sustituye.',
          category: 'funcionalidad',
        },
        {
          id: 103,
          question: '¿Anto es una app de IA?',
          answer:
            'Usa asistencia de IA para conversar y acompañarte, pero el foco no es “otro chatbot genérico”: es acompañamiento emocional continuo, con herramientas, seguimiento y límites claros. La IA está al servicio del cuidado; no reemplaza el criterio de un profesional humano.',
          category: 'funcionalidad',
        },
        {
          id: 104,
          question: '¿Anto es gratis?',
          answer: trial.faqPricingAnswer,
          category: 'precios',
        },
        {
          id: 105,
          question: '¿Para quién es Anto?',
          answer:
            'Para adultos que buscan acompañamiento emocional continuo en el día a día o entre sesiones con un profesional. No está pensado para diagnosticar, tratar crisis graves por sí solo ni sustituir atención clínica. Si tus síntomas son intensos o te sientes en riesgo, prioriza ayuda humana especializada.',
          category: 'funcionalidad',
        },
        {
          id: 106,
          question: '¿En qué se diferencia Anto de ChatGPT u otros chats de IA?',
          answer:
            'Anto está orientado al bienestar emocional: memoria de temas de cuidado, técnicas y protocolos, escalas de seguimiento (como PHQ-9 y GAD-7), detección de crisis y un diseño de privacidad pensado para acompañamiento. Un chat generalista puede conversar de todo; Anto está acotado a apoyo emocional continuo y no pretende ser terapia ni diagnóstico.',
          category: 'funcionalidad',
        },
        {
          id: 107,
          question: '¿Cuándo debería buscar ayuda humana en lugar de (o además de) Anto?',
          answer:
            'Cuando los síntomas son intensos o persistentes, hay riesgo de autolesión o daño a otros, necesitas diagnóstico o tratamiento, o simplemente prefieres la relación con un terapeuta. En esos casos, un profesional humano es prioritario. Anto puede acompañarte en paralelo o entre sesiones, pero no alcanza para cubrir lo que da la atención clínica.',
          category: 'funcionalidad',
        },
        {
          id: 108,
          question: '¿Puedo usar Anto solo entre sesiones con mi terapeuta?',
          answer:
            'Sí. Ese es uno de los usos más alineados con Anto: acompañamiento emocional continuo entre citas, seguimiento del día a día y un lugar donde aterrizar cuando no tienes sesión. No reemplaza el trabajo con tu terapeuta; lo complementa si tú y tu profesional lo consideran útil.',
          category: 'funcionalidad',
        },
        {
          id: 1,
          question: '¿Mis conversaciones son realmente privadas?',
          answer:
            'Sí, absolutamente. Todas tus conversaciones están encriptadas de extremo a extremo (E2E) utilizando estándares de grado militar (AES-256). Esto significa que solo tú y el sistema pueden leer tus mensajes. Ni siquiera nuestros administradores pueden acceder al contenido de tus conversaciones. Nunca compartimos, vendemos o comercializamos tu información con terceros. Tu privacidad es nuestra máxima prioridad y cumplimos con todas las regulaciones internacionales de protección de datos, incluyendo GDPR y HIPAA.',
          category: 'privacidad',
        },
        {
          id: 2,
          question: '¿Cómo funciona el asistente de Anto?',
          answer:
            'Conversas en un espacio de acompañamiento emocional. Detrás hay asistencia de IA (OpenAI GPT-5.4 Mini) con técnicas alineadas con evidencia cuando encajan (por ejemplo enfoques tipo CBT), tono profesional y práctico. No sustituye terapia presencial ni diagnóstico clínico. Puede recordar temas recurrentes, conectar patrones con el grafo de insights y el hub de técnicas, e incluir escalas validadas (PHQ-9, GAD-7) y protocolos estructurados. Puedes ajustar preferencias de estilo cuando la app lo ofrece.',
          category: 'funcionalidad',
        },
        {
          id: 3,
          question: '¿Puedo usar Anto si ya tengo un terapeuta?',
          answer:
            'Sí. Anto está pensado para complementar — nunca reemplazar — el trabajo con un terapeuta o profesional humano. Muchas personas lo usan entre sesiones o para el seguimiento diario. Si tu profesional lo ve útil, puedes compartir reportes o insights; la relación terapéutica humana sigue siendo lo más importante.',
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
            'Ofrecemos planes flexibles basados en duración: 1 Mes (US$4.20), 3 Meses (US$12.62), 6 Meses (US$22.09) y 1 Año (US$42.09). Todos los planes incluyen las mismas funcionalidades premium: acceso completo al asistente AI, análisis emocional avanzado, detección de crisis proactiva, herramientas de bienestar y soporte 24/7.',
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
          id: 109,
          question: '¿Necesito experiencia previa en terapia para usar Anto?',
          answer:
            'No. Puedes empezar sin haber ido a terapia: la app acompaña con un lenguaje accesible y herramientas claras. Si ya tienes recorrido terapéutico, también puedes usarla como apoyo entre sesiones. En ambos casos sigue siendo un complemento, no un reemplazo de atención profesional.',
          category: 'funcionalidad',
        },
        {
          id: 110,
          question: '¿Anto está disponible en Android?',
          answer:
            'Por ahora la descarga directa está en App Store para iPhone (iOS). En Android operamos con acceso anticipado por invitación por correo mientras completamos verificaciones. La experiencia principal hoy es iOS; Android se irá abriendo de forma gradual.',
          category: 'tecnica',
        },
        {
          id: 111,
          question: '¿Mis conversaciones se usan para entrenar modelos de IA?',
          answer:
            'No vendemos tus conversaciones ni las usamos para publicidad. El procesamiento con proveedores de IA es para prestarte el servicio de acompañamiento, según nuestra Política de Privacidad. No comercializamos tu información con terceros. Para el detalle legal, revisa la política de privacidad del sitio.',
          category: 'privacidad',
        },
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
            'No. Anto no diagnostica ni debe usarse para eso. Es acompañamiento emocional y apoyo al bienestar; el diagnóstico corresponde a un profesional humano cualificado. Si tienes preocupaciones sobre tu salud mental, consulta con un terapeuta o profesional licenciado — eso sigue siendo lo más recomendable.',
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
            'Anto combina un asistente de IA con memoria de temas, hub de técnicas terapéuticas, grafo de insights con «lo que te ayuda», escalas clínicas validadas (PHQ-9, GAD-7), 8 protocolos estructurados, WAI post-sesión, detección proactiva de crisis, tareas y hábitos unificados, home personalizado con insight diario, sesión persistente y soporte bilingüe ES/EN. Priorizamos privacidad, transparencia y utilidad práctica — sin vender datos de usuarios. ' +
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
        {
          id: 22,
          question: '¿Qué es el hub de técnicas?',
          answer:
            'Es un catálogo completo de técnicas terapéuticas accesible desde la navegación principal de la app (v1.5). Incluye acceso rápido a ejercicios, un lienzo ABC interactivo y conexión directa con el grafo de insights para ver qué técnicas se relacionan con tus patrones. También puedes lanzar Pomodoro al enfocar una tarea desde la pantalla unificada de tareas y hábitos.',
          category: 'funcionalidad',
        },
        {
          id: 23,
          question: '¿Qué es el WAI post-sesión?',
          answer:
            'WAI (Working Alliance Inventory) es una breve evaluación post-sesión que mide la alianza terapéutica en 4 ejes: vínculo, objetivos, tareas y feedback. Aparece tras conversaciones relevantes y te ayuda a reflexionar sobre cómo te sientes con el acompañamiento. No sustituye la relación con un profesional presencial, pero aporta señales útiles para tu seguimiento.',
          category: 'funcionalidad',
        },
        {
          id: 24,
          question: '¿Tengo que iniciar sesión cada vez que abro la app?',
          answer:
            'No. Desde la versión 1.5, Anto mantiene una sesión persistente con refresh automático del token JWT. Puedes cerrar y reabrir la app sin volver a ingresar tu contraseña en cada ocasión. Si cierras sesión manualmente o cambias de dispositivo, deberás autenticarte de nuevo por seguridad.',
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
        id: 101,
        question: 'What is Anto?',
        answer:
          'Anto is an app for ongoing emotional support: a place to land when you need support between sessions or day to day. It uses AI assistance in the background, with tools and tracking designed for wellbeing. It does not replace clinical care — a human therapist or professional remains the stronger recommendation. Available on iPhone.',
        category: 'funcionalidad',
      },
      {
        id: 102,
        question: 'Does Anto replace a therapist or psychologist?',
        answer:
          'No. Anto is a complementary emotional-support companion, not therapy or clinical care. A therapist, psychologist, or other qualified human professional remains the stronger recommendation when you need assessment, diagnosis, or treatment. If you already have professional support, Anto can help between sessions — it does not replace it.',
        category: 'funcionalidad',
      },
      {
        id: 103,
        question: 'Is Anto an AI app?',
        answer:
          'It uses AI assistance to converse and support you, but the focus is not “another generic chatbot”: it is ongoing emotional support, with tools, tracking, and clear limits. AI serves care; it does not replace the judgment of a human professional.',
        category: 'funcionalidad',
      },
      {
        id: 104,
        question: 'Is Anto free?',
        answer: trial.faqPricingAnswer,
        category: 'precios',
      },
      {
        id: 105,
        question: 'Who is Anto for?',
        answer:
          'For adults seeking ongoing emotional support day to day or between sessions with a professional. It is not meant to diagnose, treat severe crises on its own, or replace clinical care. If your symptoms are intense or you feel at risk, prioritise specialised human help.',
        category: 'funcionalidad',
      },
      {
        id: 106,
        question: 'How is Anto different from ChatGPT or other AI chats?',
        answer:
          'Anto is oriented to emotional wellbeing: care-topic memory, techniques and protocols, tracking scales (such as PHQ-9 and GAD-7), crisis detection, and a privacy design built for support. A generalist chat can talk about anything; Anto is scoped to ongoing emotional support and does not claim to be therapy or diagnosis.',
        category: 'funcionalidad',
      },
      {
        id: 107,
        question: 'When should I seek human help instead of (or in addition to) Anto?',
        answer:
          'When symptoms are intense or persistent, there is risk of self-harm or harm to others, you need diagnosis or treatment, or you simply prefer a relationship with a therapist. In those cases, a human professional comes first. Anto can support you in parallel or between sessions, but it cannot cover what clinical care provides.',
        category: 'funcionalidad',
      },
      {
        id: 108,
        question: 'Can I use Anto only between sessions with my therapist?',
        answer:
          'Yes. That is one of the uses most aligned with Anto: ongoing emotional support between appointments, day-to-day check-ins, and a place to land when you do not have a session. It does not replace work with your therapist; it complements it if you and your professional find it useful.',
        category: 'funcionalidad',
      },
      {
        id: 1,
        question: 'Are my conversations really private?',
        answer:
          'Yes, absolutely. All your conversations are end-to-end (E2E) encrypted using military-grade standards (AES-256). This means only you and the system can read your messages. Not even our administrators can access the content of your conversations. We never share, sell, or commercialise your information with third parties. Your privacy is our top priority and we comply with all international data protection regulations, including GDPR and HIPAA.',
        category: 'privacidad',
      },
      {
        id: 2,
        question: 'How does Anto’s assistant work?',
        answer:
          'You converse in a space for emotional support. Behind it is AI assistance (OpenAI GPT-5.4 Mini) with evidence-aligned techniques when they fit (for example CBT-style approaches), in a professional, practical tone. It does not replace in-person therapy or clinical diagnosis. It can remember recurring topics, connect patterns to the insights graph and techniques hub, and include validated scales (PHQ-9, GAD-7) and structured protocols. You can adjust style preferences when the app offers them.',
        category: 'funcionalidad',
      },
      {
        id: 3,
        question: 'Can I use Anto if I already have a therapist?',
        answer:
          'Yes. Anto is meant to complement — never replace — work with a human therapist or professional. Many people use it between sessions or for daily check-ins. If your professional finds it useful, you can share reports or insights; the human therapeutic relationship remains what matters most.',
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
          'We offer flexible duration-based plans: 1 Month (US$4.20), 3 Months (US$12.62), 6 Months (US$22.09), and 1 Year (US$42.09). All plans include the same premium features: full access to the AI assistant, advanced emotional analysis, proactive crisis detection, wellbeing tools, and 24/7 support.',
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
        id: 109,
        question: 'Do I need prior therapy experience to use Anto?',
        answer:
          'No. You can start without having been in therapy: the app supports you with accessible language and clear tools. If you already have a therapeutic journey, you can also use it between sessions. In both cases it remains a complement, not a replacement for professional care.',
        category: 'funcionalidad',
      },
      {
        id: 110,
        question: 'Is Anto available on Android?',
        answer:
          'For now, direct download is on the App Store for iPhone (iOS). On Android we operate with early access by email invitation while we complete verifications. The main experience today is iOS; Android will open gradually.',
        category: 'tecnica',
      },
      {
        id: 111,
        question: 'Are my conversations used to train AI models?',
        answer:
          'We do not sell your conversations or use them for advertising. Processing with AI providers is to deliver the support service, according to our Privacy Policy. We do not commercialise your information with third parties. For legal detail, see the site privacy policy.',
        category: 'privacidad',
      },
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
          'No. Anto does not diagnose and should not be used for that. It is ongoing emotional support and wellbeing accompaniment; diagnosis belongs to a qualified human professional. If you have concerns about your mental health, consult a licensed therapist or clinician — that remains the stronger recommendation.',
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
          'Anto combines an AI assistant with topic memory, a therapeutic techniques hub, an insights graph with navigable "what helps you", validated clinical scales (PHQ-9, GAD-7), 8 structured protocols, post-session WAI, proactive crisis detection, unified tasks and habits, a personalised home with daily insight, persistent session, and bilingual ES/EN support. We prioritise privacy, transparency, and practical utility — without selling user data. ' +
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
      {
        id: 22,
        question: 'What is the techniques hub?',
        answer:
          'It is a full catalog of therapeutic techniques accessible from the app\'s main navigation (v1.5). It includes quick access to exercises, an interactive ABC canvas, and direct connection to the insights graph to see which techniques relate to your patterns. You can also launch Pomodoro when focusing a task from the unified tasks and habits screen.',
        category: 'funcionalidad',
      },
      {
        id: 23,
        question: 'What is post-session WAI?',
        answer:
          'WAI (Working Alliance Inventory) is a brief post-session assessment measuring therapeutic alliance across 4 axes: bond, goals, tasks, and feedback. It appears after relevant conversations and helps you reflect on how you feel about the support. It does not replace a relationship with an in-person professional, but provides useful signals for your tracking.',
        category: 'funcionalidad',
      },
      {
        id: 24,
        question: 'Do I have to log in every time I open the app?',
        answer:
          'No. Since version 1.5, Anto keeps a persistent session with automatic JWT token refresh. You can close and reopen the app without re-entering your password each time. If you log out manually or switch devices, you will need to authenticate again for security.',
        category: 'tecnica',
      },
    ],
  };
}

export function getHomeFaqCopy(locale: Locale): HomeFaqCopy {
  return buildFaqCopy(locale);
}
