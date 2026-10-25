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
            'Anto es una app de acompañamiento emocional continuo: un lugar donde aterrizar cuando necesitas apoyo entre sesiones o en el día a día. Usa asistencia de IA en segundo plano, con herramientas y seguimiento pensados para el bienestar. No sustituye atención clínica: un terapeuta o profesional humano sigue siendo lo más recomendable. Disponible en iPhone y Android.',
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
            'Anto está orientado al bienestar emocional: memoria de temas de cuidado, técnicas y ejercicios en el hub, escalas de seguimiento (como PHQ-9 y GAD-7), y un diseño de privacidad pensado para acompañamiento. Un chat generalista puede conversar de todo; Anto está acotado a apoyo emocional continuo y no pretende ser terapia ni diagnóstico.',
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
            'Sí. Van cifradas en tránsito (TLS) y en reposo. Anto y el modelo leen el texto para prestar el servicio. No vendemos el hilo ni lo usamos para anuncios.',
          category: 'privacidad',
        },
        {
          id: 2,
          question: '¿Cómo funciona el asistente de Anto?',
          answer:
            'Conversas en un espacio de acompañamiento emocional. Detrás hay asistencia de IA (OpenAI GPT-5.4 Mini) con técnicas alineadas con evidencia cuando encajan (por ejemplo enfoques tipo CBT), tono profesional y práctico. No sustituye terapia presencial ni diagnóstico clínico. Puede recordar temas recurrentes, conectar patrones con el grafo de insights y el hub de técnicas, e incluir escalas validadas (PHQ-9, GAD-7). Puedes ajustar preferencias de estilo cuando la app lo ofrece.',
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
          question: '¿Qué pasa si estoy en crisis?',
          answer:
            'Si te sientes en riesgo, busca ayuda humana de inmediato: líneas de ayuda 24/7, contactos de emergencia locales o servicios de urgencia. Anto puede orientarte hacia esos recursos. No reemplaza una emergencia.',
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
            'Anto está disponible en App Store para iOS (iPhone y iPad con iOS 13 o superior) y en Google Play para Android. Estamos trabajando activamente en una versión web que estará disponible en los próximos meses.',
          category: 'tecnica',
        },
        {
          id: 7,
          question: '¿Cuánto cuesta usar Anto?',
          answer:
            'Ofrecemos planes flexibles basados en duración: 1 Mes (US$4.20), 3 Meses (US$12.62), 6 Meses (US$22.09) y 1 Año (US$42.09). Todos los planes incluyen las mismas funcionalidades premium: acceso completo al asistente AI, análisis emocional avanzado, herramientas de bienestar y soporte 24/7.',
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
            'Son distintos enfoques del asistente según lo que necesites en cada momento: orientación práctica con micro-pasos, exploración emocional más conversada o acompañamiento estructurado con ejercicios del hub. Puedes elegir el modo que mejor encaje con tu situación.',
          category: 'funcionalidad',
        },
        {
          id: 10,
          question: '¿Qué escalas clínicas usa Anto?',
          answer:
            'Anto integra las escalas validadas PHQ-9 (depresión) y GAD-7 (ansiedad). Se completan de forma automática a partir del análisis de tus conversaciones y se reflejan en tu historial con tendencias y reportes. No sustituyen una evaluación clínica presencial.',
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
            'Sí. Anto está en Google Play para Android y en App Store para iPhone (iOS). Puedes descargarla desde la tienda de tu dispositivo.',
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
            'El análisis emocional de Anto utiliza procesamiento de lenguaje natural y machine learning para analizar tus conversaciones, patrones de uso, y respuestas a cuestionarios. El sistema identifica emociones y patrones a lo largo del tiempo, y te proporciona insights personalizados sobre tu bienestar mental. Recibirás gráficos visuales de tu estado emocional y reportes semanales y mensuales con recomendaciones personalizadas.',
          category: 'funcionalidad',
        },
        {
          id: 14,
          question: '¿Puedo exportar mis datos?',
          answer:
            'Sí. Puedes exportar tu información en formatos estándar (JSON, CSV, PDF): conversaciones, análisis y reportes. También puedes pedir la eliminación de tus datos desde la configuración de la aplicación. Tras esa solicitud, los eliminamos de forma permanente en un plazo de 30 días.',
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
            'Anto combina un asistente de IA con memoria de temas, hub de técnicas, grafo de insights con «lo que te ayuda», tareas y hábitos unificados, home personalizado con insight diario, sesión persistente y soporte bilingüe ES/EN. Priorizamos privacidad, transparencia y utilidad práctica — sin vender datos de usuarios. ' +
            trial.differentiatorSuffix,
          category: 'funcionalidad',
        },
        {
          id: 20,
          question: '¿Puedo usar Anto en múltiples dispositivos?',
          answer:
            'Sí, puedes usar Anto en múltiples dispositivos con una sola cuenta. En iOS y Android, tus datos, conversaciones y análisis se sincronizan automáticamente de forma segura.',
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

  if (locale === 'pt') {
    return {
      title: 'Perguntas frequentes',
      subtitle: 'Respostas às perguntas mais comuns sobre a Anto',
      ui: {
        searchPlaceholder: 'Buscar nas perguntas frequentes...',
        searchAriaLabel: 'Buscar perguntas frequentes',
        clearSearchAriaLabel: 'Limpar busca',
        clearSearch: 'Limpar busca',
        showMore: 'Ver todas as perguntas frequentes →',
        noResultsPrefix: 'Nenhum resultado para',
        resultCount: {
          singular: 'resultado encontrado',
          plural: 'resultados encontrados',
        },
      },
      categories: [
        { id: 'all', label: 'Todas' },
        { id: 'privacidad', label: 'Privacidade' },
        { id: 'funcionalidad', label: 'Funcionalidade' },
        { id: 'precios', label: 'Preços' },
        { id: 'tecnica', label: 'Técnica' },
        { id: 'empresarial', label: 'Empresas' },
      ],
      faqData: [
        {
          id: 101,
          question: 'O que é a Anto?',
          answer:
            'A Anto é um aplicativo de acompanhamento emocional contínuo: um lugar para chegar quando você precisa de apoio entre sessões ou no dia a dia. Usa assistência de IA em segundo plano, com ferramentas e acompanhamento pensados para o cuidado. Não substitui atendimento clínico: um terapeuta ou profissional humano continua sendo o mais recomendável. Disponível no iPhone e no Android.',
          category: 'funcionalidad',
        },
        {
          id: 102,
          question: 'A Anto substitui um terapeuta ou psicólogo?',
          answer:
            'Não. A Anto é um complemento de acompanhamento emocional, não terapia nem atendimento clínico. Um terapeuta, psicólogo ou outro profissional humano capacitado continua sendo o mais recomendável quando você precisa de avaliação, diagnóstico ou tratamento. Se você já tem acompanhamento profissional, a Anto pode ajudar entre sessões; não substitui.',
          category: 'funcionalidad',
        },
        {
          id: 103,
          question: 'A Anto é um aplicativo de IA?',
          answer:
            'Usa assistência de IA para conversar e acompanhar você, mas o foco não é “mais um chat genérico”: é acompanhamento emocional contínuo, com ferramentas, acompanhamento e limites claros. A IA serve ao cuidado; não substitui o critério de um profissional humano.',
          category: 'funcionalidad',
        },
        {
          id: 104,
          question: 'A Anto é grátis?',
          answer: trial.faqPricingAnswer,
          category: 'precios',
        },
        {
          id: 105,
          question: 'Para quem é a Anto?',
          answer:
            'Para adultos que buscam acompanhamento emocional contínuo no dia a dia ou entre sessões com um profissional. Não foi feita para diagnosticar, tratar crises graves sozinha nem substituir atendimento clínico. Se os sintomas estiverem intensos ou você se sentir em risco, priorize ajuda humana especializada.',
          category: 'funcionalidad',
        },
        {
          id: 106,
          question: 'Em que a Anto é diferente do ChatGPT ou de outros chats de IA?',
          answer:
            'A Anto é voltada ao cuidado emocional: memória de temas, técnicas e exercícios no hub, escalas de acompanhamento (como PHQ-9 e GAD-7) e uma privacidade pensada para o acompanhamento. Um chat generalista conversa sobre qualquer coisa; a Anto fica no apoio emocional contínuo e não pretende ser terapia nem diagnóstico.',
          category: 'funcionalidad',
        },
        {
          id: 107,
          question: 'Quando devo procurar ajuda humana em vez da Anto, ou junto com ela?',
          answer:
            'Quando os sintomas são intensos ou persistentes, há risco de se machucar ou de machucar outras pessoas, você precisa de diagnóstico ou tratamento, ou simplesmente prefere a relação com um terapeuta. Nesses casos, um profissional humano vem primeiro. A Anto pode acompanhar em paralelo ou entre sessões, mas não cobre o que o atendimento clínico oferece.',
          category: 'funcionalidad',
        },
        {
          id: 108,
          question: 'Posso usar a Anto só entre sessões com o meu terapeuta?',
          answer:
            'Sim. Esse é um dos usos mais alinhados com a Anto: acompanhamento emocional contínuo entre consultas, um olhar para o dia a dia e um lugar para chegar quando não há sessão. Não substitui o trabalho com o seu terapeuta; complementa, se você e o profissional acharem útil.',
          category: 'funcionalidad',
        },
        {
          id: 1,
          question: 'Minhas conversas são mesmo privadas?',
          answer:
            'Sim. Vão criptografadas em trânsito (TLS) e em repouso. A Anto e o modelo leem o texto para prestar o serviço. Não vendemos a conversa nem a usamos para anúncios.',
          category: 'privacidad',
        },
        {
          id: 2,
          question: 'Como funciona o assistente da Anto?',
          answer:
            'Você conversa num espaço de acompanhamento emocional. Por trás há assistência de IA (OpenAI GPT-5.4 Mini) com técnicas alinhadas à evidência quando cabem (por exemplo abordagens do tipo TCC), num tom profissional e prático. Não substitui terapia presencial nem diagnóstico clínico. Pode lembrar temas recorrentes, ligar padrões ao grafo de insights e ao hub de técnicas, e incluir escalas validadas (PHQ-9, GAD-7). Você pode ajustar preferências de estilo quando o aplicativo oferece.',
          category: 'funcionalidad',
        },
        {
          id: 3,
          question: 'Posso usar a Anto se já tenho um terapeuta?',
          answer:
            'Sim. A Anto foi pensada para complementar — nunca substituir — o trabalho com um terapeuta ou profissional humano. Muita gente usa entre sessões ou para o acompanhamento do dia. Se o seu profissional achar útil, você pode compartilhar relatórios ou insights; a relação terapêutica humana continua sendo o mais importante.',
          category: 'funcionalidad',
        },
        {
          id: 4,
          question: 'O que acontece se eu estiver em crise?',
          answer:
            'Se você se sentir em risco, procure ajuda humana agora: linhas de apoio 24 horas, contatos de emergência locais ou serviços de urgência. A Anto pode indicar esses recursos. Não substitui uma emergência.',
          category: 'funcionalidad',
        },
        {
          id: 5,
          question: 'Tem um período de teste grátis?',
          answer: trial.faqPremiumAnswer,
          category: 'precios',
        },
        {
          id: 6,
          question: 'Em quais aparelhos a Anto está disponível?',
          answer:
            'A Anto está na App Store para iOS (iPhone e iPad com iOS 13 ou superior) e no Google Play para Android. Estamos trabalhando numa versão web do aplicativo, prevista para os próximos meses. O site já está em português; o aplicativo móvel segue em espanhol e inglês.',
          category: 'tecnica',
        },
        {
          id: 7,
          question: 'Quanto custa usar a Anto?',
          answer:
            'Oferecemos planos flexíveis por duração: 1 mês (US$4.20), 3 meses (US$12.62), 6 meses (US$22.09) e 1 ano (US$42.09). Todos os planos incluem as mesmas funções premium: acesso completo ao assistente de IA, análise emocional avançada, ferramentas de cuidado e suporte 24/7.',
          category: 'precios',
        },
        {
          id: 8,
          question: 'O aplicativo está disponível em inglês?',
          answer:
            'Sim. Desde a versão 1.4, o aplicativo é bilíngue: você pode usar o aplicativo, o chat, os e-mails e as notificações push em espanhol ou inglês. O site também está em português. O backend adapta as respostas e os resumos de sessão ao idioma configurado no seu perfil. O aplicativo móvel não está em português.',
          category: 'funcionalidad',
        },
        {
          id: 9,
          question: 'O que são os modos de conversa?',
          answer:
            'São jeitos diferentes do assistente, conforme o que você precisa em cada momento: orientação prática com micropassos, exploração emocional mais conversada ou acompanhamento estruturado com exercícios do hub. Você escolhe o modo que melhor combina com a situação.',
          category: 'funcionalidad',
        },
        {
          id: 10,
          question: 'Quais escalas clínicas a Anto usa?',
          answer:
            'A Anto integra as escalas validadas PHQ-9 (depressão) e GAD-7 (ansiedade). Elas são preenchidas de forma automática a partir da análise das suas conversas e aparecem no histórico, com tendências e relatórios. Não substituem uma avaliação clínica presencial.',
          category: 'funcionalidad',
        },
      ],
      faqMoreData: [
        {
          id: 109,
          question: 'Preciso já ter feito terapia para usar a Anto?',
          answer:
            'Não. Você pode começar sem ter ido à terapia: o aplicativo acompanha com uma linguagem acessível e ferramentas claras. Se você já tem um percurso terapêutico, também pode usar entre sessões. Nos dois casos continua sendo um complemento, não um substituto do atendimento profissional.',
          category: 'funcionalidad',
        },
        {
          id: 110,
          question: 'A Anto está disponível no Android?',
          answer:
            'Sim. A Anto está no Google Play para Android e na App Store para iPhone (iOS). Você pode baixar na loja do seu celular.',
          category: 'tecnica',
        },
        {
          id: 111,
          question: 'Minhas conversas são usadas para treinar modelos de IA?',
          answer:
            'Não vendemos as suas conversas nem as usamos para publicidade. O processamento com fornecedores de IA serve para prestar o serviço de acompanhamento, conforme a nossa Política de Privacidade. Não comercializamos as suas informações com terceiros. Para o detalhe legal, leia a política de privacidade do site.',
          category: 'privacidad',
        },
        {
          id: 12,
          question: 'Preciso de internet para usar a Anto?',
          answer:
            'Sim. A Anto precisa de conexão com a internet para a maior parte das funções, porque o processamento do assistente de IA e a análise emocional acontecem em servidores seguros. Algumas funções básicas, como exercícios de mindfulness e técnicas de relaxamento, ficam disponíveis offline. Estamos trabalhando numa versão offline mais completa, que vai permitir guardar conversas no aparelho e sincronizar quando houver conexão.',
          category: 'tecnica',
        },
        {
          id: 13,
          question: 'Como funciona a análise emocional?',
          answer:
            'A análise emocional da Anto usa processamento de linguagem natural e aprendizado de máquina para ler as suas conversas, padrões de uso e respostas a questionários. O sistema identifica emoções e padrões ao longo do tempo e devolve insights personalizados sobre o seu cuidado. Você recebe gráficos do estado emocional e relatórios semanais e mensais, com recomendações pensadas para você.',
          category: 'funcionalidad',
        },
        {
          id: 14,
          question: 'Posso exportar os meus dados?',
          answer:
            'Sim. Você pode exportar as suas informações em formatos padrão (JSON, CSV, PDF): conversas, análises e relatórios. Também pode pedir a exclusão dos dados na configuração do aplicativo. Depois desse pedido, apagamos de forma permanente em até 30 dias.',
          category: 'privacidad',
        },
        {
          id: 15,
          question: 'A Anto pode diagnosticar condições de saúde mental?',
          answer:
            'Não. A Anto não diagnostica e não deve ser usada para isso. É acompanhamento emocional contínuo e apoio ao cuidado; o diagnóstico cabe a um profissional humano qualificado. Se você estiver preocupado com a sua saúde mental, fale com um terapeuta ou profissional habilitado — isso continua sendo o mais recomendável.',
          category: 'funcionalidad',
        },
        {
          id: 16,
          question: 'Como cancelo a minha assinatura?',
          answer:
            'Você pode cancelar a assinatura a qualquer momento na configuração do aplicativo ou falando com a gente. Se cancelar, o acesso segue até o fim do período de cobrança atual. Não há multa nem taxa de cancelamento. Se cancelar durante o teste, nada é cobrado. A conta passa automaticamente para uma conta gratuita limitada, e você pode reativar a assinatura quando quiser.',
          category: 'precios',
        },
        {
          id: 17,
          question: 'A Anto serve para adolescentes?',
          answer:
            'A Anto foi pensada para usuários de 18 anos ou mais. Para menores de 18, recomendamos o uso com a supervisão de um pai, uma mãe ou um responsável legal. Estamos desenvolvendo uma versão específica para adolescentes (13–17 anos), com conteúdo adaptado e controles parentais, que deve sair em breve. Se você é pai, mãe ou responsável e tem dúvidas sobre o uso da Anto por um menor, escreva para marcelo.ull@antoapps.com ou pelo Telegram: t.me/marcere23.',
          category: 'funcionalidad',
        },
        {
          id: 18,
          question: 'Que tipo de exercícios de cuidado a Anto inclui?',
          answer:
            'A Anto inclui uma biblioteca com mais de 100 exercícios de cuidado: meditações guiadas personalizadas, técnicas de respiração (4-7-8, respiração diafragmática), exercícios de mindfulness, relaxamento muscular progressivo, visualizações guiadas, exercícios de gratidão e técnicas de grounding. Os exercícios foram desenhados por profissionais de saúde mental e se adaptam ao seu estado emocional do momento. Dá para acessar a qualquer hora, mesmo offline.',
          category: 'funcionalidad',
        },
        {
          id: 19,
          question: 'O que torna a Anto uma ferramenta de cuidado diferente?',
          answer:
            'A Anto junta um assistente de IA com memória de temas, hub de técnicas, grafo de insights com «o que ajuda você», tarefas e hábitos unificados, início personalizado com insight diário, sessão persistente e suporte bilíngue ES/EN no aplicativo. O site também está em português. Priorizamos privacidade, transparência e utilidade prática — sem vender dados de usuários. ' +
            trial.differentiatorSuffix,
          category: 'funcionalidad',
        },
        {
          id: 20,
          question: 'Posso usar a Anto em vários aparelhos?',
          answer:
            'Sim. Você pode usar a Anto em vários aparelhos com uma só conta. No iOS e no Android, dados, conversas e análises se sincronizam de forma automática e segura.',
          category: 'funcionalidad',
        },
        {
          id: 21,
          question: 'O que faço se tiver um problema técnico?',
          answer:
            'Oferecemos suporte técnico 24/7 por vários canais: e-mail (marcelo.ull@antoapps.com), Telegram (t.me/marcere23) e LinkedIn. A equipe de suporte costuma responder em menos de 2 horas. Também há uma seção de ajuda dentro do aplicativo, com guias passo a passo e soluções para problemas comuns. Se encontrar um bug, você pode reportar direto no aplicativo e a gente corrige o quanto antes.',
          category: 'tecnica',
        },
        {
          id: 22,
          question: 'O que é o hub de técnicas?',
          answer:
            'É um catálogo completo de técnicas terapêuticas, acessível pela navegação principal do aplicativo (v1.5). Inclui acesso rápido a exercícios, um quadro ABC interativo e conexão direta com o grafo de insights para ver quais técnicas se relacionam com os seus padrões. Você também pode abrir o Pomodoro ao focar uma tarefa na tela unificada de tarefas e hábitos.',
          category: 'funcionalidad',
        },
        {
          id: 23,
          question: 'O que é o WAI pós-sessão?',
          answer:
            'WAI (Working Alliance Inventory) é uma avaliação breve pós-sessão que mede a aliança terapêutica em 4 eixos: vínculo, objetivos, tarefas e feedback. Aparece depois de conversas relevantes e ajuda você a perceber como se sente com o acompanhamento. Não substitui a relação com um profissional presencial, mas traz sinais úteis para o seu acompanhamento.',
          category: 'funcionalidad',
        },
        {
          id: 24,
          question: 'Preciso entrar de novo toda vez que abro o aplicativo?',
          answer:
            'Não. Desde a versão 1.5, a Anto mantém uma sessão persistente com renovação automática do token JWT. Você pode fechar e reabrir o aplicativo sem digitar a senha toda vez. Se sair manualmente ou trocar de aparelho, vai precisar autenticar de novo, por segurança.',
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
          'Anto is an app for ongoing emotional support: a place to land when you need support between sessions or day to day. It uses AI assistance in the background, with tools and tracking designed for wellbeing. It does not replace clinical care — a human therapist or professional remains the stronger recommendation. Available on iPhone and Android.',
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
          'Anto is oriented to emotional wellbeing: care-topic memory, techniques and hub exercises, tracking scales (such as PHQ-9 and GAD-7), and a privacy design built for support. A generalist chat can talk about anything; Anto is scoped to ongoing emotional support and does not claim to be therapy or diagnosis.',
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
          'Yes. They are encrypted in transit (TLS) and at rest. Anto and the model read the text to provide the service. We do not sell the thread or use it for ads.',
        category: 'privacidad',
      },
      {
        id: 2,
        question: 'How does Anto’s assistant work?',
        answer:
          'You converse in a space for emotional support. Behind it is AI assistance (OpenAI GPT-5.4 Mini) with evidence-aligned techniques when they fit (for example CBT-style approaches), in a professional, practical tone. It does not replace in-person therapy or clinical diagnosis. It can remember recurring topics, connect patterns to the insights graph and techniques hub, and include validated scales (PHQ-9, GAD-7). You can adjust style preferences when the app offers them.',
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
        question: 'What happens if I am in crisis?',
        answer:
          'If you feel at risk, seek human help immediately: 24/7 helplines, local emergency contacts, or urgent care. Anto can point you toward those resources. It does not replace an emergency.',
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
          'Anto is available on the App Store for iOS (iPhone and iPad with iOS 13 or later) and on Google Play for Android. We are actively working on a web version that will be available in the coming months.',
        category: 'tecnica',
      },
      {
        id: 7,
        question: 'How much does Anto cost?',
        answer:
          'We offer flexible duration-based plans: 1 Month (US$4.20), 3 Months (US$12.62), 6 Months (US$22.09), and 1 Year (US$42.09). All plans include the same premium features: full access to the AI assistant, advanced emotional analysis, wellbeing tools, and 24/7 support.',
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
          'They are different assistant approaches depending on what you need: practical guidance with micro-steps, more conversational emotional exploration, or structured support with hub exercises. You can choose the mode that best fits your situation.',
        category: 'funcionalidad',
      },
      {
        id: 10,
        question: 'Which clinical scales does Anto use?',
        answer:
          'Anto integrates the validated PHQ-9 (depression) and GAD-7 (anxiety) scales. They are completed automatically from the analysis of your conversations and reflected in your history with trends and reports. They do not replace an in-person clinical assessment.',
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
          'Yes. Anto is on Google Play for Android and on the App Store for iPhone (iOS). You can download it from your device store.',
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
          'Anto\'s emotional analysis uses natural language processing and machine learning to analyse your conversations, usage patterns, and questionnaire responses. The system identifies emotions and patterns over time, and provides personalised insights about your mental wellbeing. You will receive visual charts of your emotional state and weekly and monthly reports with personalised recommendations.',
        category: 'funcionalidad',
      },
      {
        id: 14,
        question: 'Can I export my data?',
        answer:
          'Yes. You can export your information in standard formats (JSON, CSV, PDF): conversations, analyses, and reports. You can also request deletion of your data from the app settings. After that request, we permanently delete it within 30 days.',
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
          'Anto combines an AI assistant with topic memory, a techniques hub, an insights graph with navigable "what helps you", unified tasks and habits, a personalised home with daily insight, persistent session, and bilingual ES/EN support. We prioritise privacy, transparency, and practical utility — without selling user data. ' +
          trial.differentiatorSuffix,
        category: 'funcionalidad',
      },
      {
        id: 20,
        question: 'Can I use Anto on multiple devices?',
        answer:
          'Yes, you can use Anto on multiple devices with a single account. On iOS and Android, your data, conversations, and analyses sync automatically and securely.',
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
