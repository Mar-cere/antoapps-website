import type { PsychoeducationGuide, PsychoeducationSlug } from './types';

const SLUGS = {
  tcc: 'que-es-tcc' as const,
  distortions: 'distorsiones-cognitivas' as const,
  abc: 'tecnica-abc' as const,
  anxiety: 'ansiedad-y-preocupacion' as const,
  scales: 'escalas-phq9-gad7' as const,
  selfCompassion: 'autocompasion' as const,
  sleep: 'higiene-sueno-salud-mental' as const,
  mindfulness: 'mindfulness-guia-breve' as const,
  depression: 'depresion-guia-breve' as const,
  behavioralActivation: 'activacion-conductual' as const,
  ocdErp: 'toc-y-erp' as const,
  trauma: 'trauma-y-tept' as const,
  anger: 'manejo-ira' as const,
  grounding: 'grounding-ansiedad-crisis' as const,
};

const guides: Record<PsychoeducationSlug, PsychoeducationGuide> = {
  [SLUGS.tcc]: {
    slug: SLUGS.tcc,
    readingMinutes: 7,
    meta: {
      title: '¿Qué es la terapia cognitivo-conductual (TCC)? | Guía Anto',
      description:
        'Qué es la TCC, cómo funciona y por qué es una de las intervenciones con más evidencia para ansiedad y depresión. Psicoeducación basada en ciencia.',
      openGraphTitle: '¿Qué es la TCC? Guía de psicoeducación',
      openGraphDescription:
        'Aprende los principios de la terapia cognitivo-conductual y cómo aplicarlos en tu día a día.',
    },
    hero: {
      title: '¿Qué es la terapia cognitivo-conductual (TCC)?',
      subtitle:
        'Una guía breve sobre cómo pensamientos, emociones y conductas se influyen entre sí — y qué puedes hacer con eso.',
    },
    sections: [
      {
        heading: 'La idea central',
        paragraphs: [
          'La terapia cognitivo-conductual (TCC) parte de una premisa sencilla: no siempre reaccionamos a los hechos en sí, sino a la forma en que los interpretamos. Un mismo evento puede generar emociones muy distintas según el significado que le demos.',
          'La TCC trabaja en tres niveles conectados: pensamientos (cogniciones), emociones y conductas. El objetivo no es «pensar positivo», sino detectar patrones poco útiles y probar alternativas más realistas y accionables.',
        ],
      },
      {
        heading: '¿Para qué suele usarse?',
        paragraphs: [
          'La TCC es una de las intervenciones psicológicas con mayor respaldo científico para problemas como depresión, ansiedad generalizada, fobias, insomnio y estrés prolongado. No sustituye una evaluación clínica presencial, pero sí ofrece herramientas concretas para el día a día.',
        ],
        bullets: [
          'Identificar pensamientos automáticos ante situaciones difíciles',
          'Cuestionar interpretaciones extremas o poco realistas',
          'Probar conductas pequeñas que rompan el ciclo de evitación',
          'Registrar emociones y patrones para ver progreso',
        ],
      },
      {
        heading: 'Ejemplo cotidiano',
        paragraphs: [
          'Imagina que un mensaje de un amigo no recibe respuesta. Un pensamiento automático podría ser: «hice algo mal y ya no quiere hablar conmigo». Eso puede activar tristeza o ansiedad y llevarte a evitar escribirle.',
          'En TCC, el paso siguiente sería revisar evidencia a favor y en contra, considerar explicaciones alternativas (está ocupado, no vio el mensaje) y elegir una acción pequeña: enviar un mensaje breve o esperar un tiempo razonable antes de sacar conclusiones.',
        ],
      },
      {
        heading: 'Cómo encaja con Anto',
        paragraphs: [
          'Anto integra enfoques alineados con TCC en el chat, en protocolos estructurados y en el hub de técnicas (incluida la técnica ABC). La app puede sugerir micro-pasos y ayudarte a registrar patrones, pero no reemplaza terapia con un profesional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'Esta guía es material de psicoeducación y no constituye diagnóstico ni tratamiento. Si tus síntomas son intensos o persistentes, consulta con un profesional de salud mental.',
    cta: { label: 'Practicar técnicas en Anto →', path: '/bienvenida' },
  },
  [SLUGS.distortions]: {
    slug: SLUGS.distortions,
    readingMinutes: 8,
    meta: {
      title: 'Distorsiones cognitivas: guía con ejemplos | Anto',
      description:
        'Qué son las distorsiones cognitivas, ejemplos frecuentes (catastrofismo, todo o nada, lectura de mente) y cómo empezar a cuestionarlas.',
      openGraphTitle: 'Distorsiones cognitivas — guía breve',
      openGraphDescription: 'Aprende a reconocer patrones de pensamiento poco útiles y qué hacer cuando aparecen.',
    },
    hero: {
      title: 'Distorsiones cognitivas: qué son y cómo reconocerlas',
      subtitle:
        'Patrones de pensamiento que amplifican el malestar. Identificarlos es el primer paso para cuestionarlos con calma.',
    },
    sections: [
      {
        heading: 'Definición',
        paragraphs: [
          'Las distorsiones cognitivas son atajos mentales habituales que distorsionan la realidad de forma pessimista o rígida. No significan que «pienses mal» como persona: son respuestas aprendidas bajo estrés, cansancio o experiencias difíciles.',
          'En terapia cognitivo-conductual, nombrar una distorsión ayuda a crear distancia: «esto suena a catastrofismo» en lugar de asumir que el pensamiento es un hecho.',
        ],
      },
      {
        heading: 'Ejemplos frecuentes',
        bullets: [
          'Todo o nada: «si no sale perfecto, es un fracaso total»',
          'Catastrofismo: «si me equivoco en la reunión, perderé mi carrera»',
          'Lectura de mente: «seguro piensan que soy aburrido/a»',
          'Filtro mental: solo recuerdas lo negativo de un día mixto',
          'Personalización: asumir culpa por eventos fuera de tu control',
          'Deberías: «debería poder con todo sin ayuda»',
        ],
      },
      {
        heading: 'Qué hacer cuando aparecen',
        paragraphs: [
          'Primero, baja la intensidad: respira, escribe el pensamiento tal como aparece y puntúa la emoción del 0 al 10. Luego pregúntate: ¿qué evidencia tengo a favor y en contra? ¿Qué le diría a un amigo en la misma situación?',
          'El objetivo no es forzar optimismo, sino encontrar una formulación más equilibrada y una acción pequeña si hace falta.',
        ],
      },
      {
        heading: 'En la app Anto',
        paragraphs: [
          'Anto puede detectar distorsiones cognitivas durante el chat y sugerir reformulaciones o técnicas relacionadas. También puedes explorarlas en el hub de técnicas y conectarlas con tu grafo de insights para ver qué patrones se repiten.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.tcc, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'Material educativo. No sustituye evaluación ni tratamiento profesional. Busca ayuda especializada si el malestar interfiere con tu vida diaria.',
    cta: { label: 'Explorar el hub de técnicas →', path: '/app' },
  },
  [SLUGS.abc]: {
    slug: SLUGS.abc,
    readingMinutes: 6,
    meta: {
      title: 'Técnica ABC paso a paso | Psicoeducación Anto',
      description:
        'Aprende la técnica ABC (Activador, Creencia, Consecuencia) para analizar situaciones difíciles y cambiar respuestas emocionales.',
      openGraphTitle: 'Técnica ABC — guía paso a paso',
      openGraphDescription: 'Registra situaciones, pensamientos y emociones con el modelo ABC de la TCC.',
    },
    hero: {
      title: 'Técnica ABC: paso a paso',
      subtitle: 'Una herramienta clásica de la TCC para desarmar reacciones automáticas ante situaciones estresantes.',
    },
    sections: [
      {
        heading: 'Las tres columnas',
        bullets: [
          'A — Activador: qué pasó (hecho observable, sin interpretar)',
          'B — Creencia o pensamiento: qué te dijiste en ese momento',
          'C — Consecuencia: emoción y conducta que siguieron',
        ],
      },
      {
        heading: 'Ejemplo rápido',
        paragraphs: [
          'A: Tu jefe no saludó al entrar a la oficina. B: «Está enfadado conmigo». C: Ansiedad 7/10 y evitas pedirle feedback.',
          'Revisión: ¿hay otras explicaciones? ¿Qué harías si un compañero estuviera distraído? Nueva B: «puede estar concentrado; no tengo evidencia de un problema». Nueva C: ansiedad 4/10 y decides saludar tú con normalidad.',
        ],
      },
      {
        heading: 'Consejos prácticos',
        paragraphs: [
          'Escribe en tiempo presente o pasado reciente, con frases cortas. Separa hechos de interpretaciones en la columna A. Si la emoción es muy alta, primero regula (respiración, grounding) y luego completa el ABC.',
        ],
      },
      {
        heading: 'Practicar en Anto',
        paragraphs: [
          'Desde la versión 1.5, Anto incluye un lienzo ABC interactivo en el hub de técnicas, conectado con el grafo de insights para ver qué situaciones y creencias se repiten en el tiempo.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.tcc, SLUGS.distortions, SLUGS.anxiety],
    disclaimer:
      'Guía de psicoeducación. No reemplaza terapia individual. Si estás en crisis, contacta servicios de emergencia de tu país.',
    cta: { label: 'Probar Anto gratis 1 día →', path: '/bienvenida' },
  },
  [SLUGS.anxiety]: {
    slug: SLUGS.anxiety,
    readingMinutes: 7,
    meta: {
      title: 'Ansiedad y preocupación: ¿cuándo es normal? | Anto',
      description:
        'Diferencias entre preocupación cotidiana y ansiedad problemática, señales de alerta y estrategias basadas en evidencia para el día a día.',
      openGraphTitle: 'Ansiedad y preocupación — guía breve',
      openGraphDescription: 'Entiende la ansiedad y qué herramientas pueden ayudarte entre sesiones con un profesional.',
    },
    hero: {
      title: 'Ansiedad y preocupación: guía breve',
      subtitle: 'Cuándo es una respuesta adaptativa y cuándo conviene buscar más apoyo.',
    },
    sections: [
      {
        heading: 'Preocupación vs. ansiedad',
        paragraphs: [
          'Preocuparse ante un examen o una entrevista es habitual: el cuerpo se activa para afrontar un desafío. La ansiedad se vuelve más problemática cuando es intensa, persistente, aparece sin motivo claro o limita trabajo, sueño o relaciones.',
        ],
      },
      {
        heading: 'Señales frecuentes',
        bullets: [
          'Tensión muscular, palpitaciones o respiración acelerada',
          'Pensamientos repetitivos difíciles de soltar',
          'Evitación de situaciones (social, laboral, médica)',
          'Sueño fragmentado o irritabilidad',
        ],
      },
      {
        heading: 'Estrategias útiles',
        paragraphs: [
          'Técnicas de respiración lenta, grounding (5 sentidos), exposición gradual a lo que evitas con apoyo, y registro de pensamientos (ABC o diario breve). La actividad física moderada y la higiene del sueño también influyen.',
          'La escala GAD-7 es una herramienta de cribado que Anto puede integrar en tu seguimiento; no es un diagnóstico, pero ayuda a ver tendencias.',
        ],
      },
      {
        heading: 'Cuándo pedir ayuda profesional',
        paragraphs: [
          'Si los síntomas duran semanas, empeoran o incluyen ideas de hacerse daño, contacta a un profesional o línea de crisis. Anto puede acompañarte entre sesiones, no sustituir atención clínica.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.scales, SLUGS.mindfulness, SLUGS.tcc],
    disclaimer:
      'No es consejo médico. Ante crisis o riesgo, busca ayuda de emergencia local de inmediato.',
    cta: { label: 'Acompañamiento con IA en Anto →', path: '/bienvenida' },
  },
  [SLUGS.scales]: {
    slug: SLUGS.scales,
    readingMinutes: 6,
    meta: {
      title: 'PHQ-9 y GAD-7: qué miden y cómo interpretarlas | Anto',
      description:
        'Guía sobre las escalas clínicas PHQ-9 (depresión) y GAD-7 (ansiedad): para qué sirven, cómo se puntúan y qué no pueden decirte.',
      openGraphTitle: 'Escalas PHQ-9 y GAD-7 explicadas',
      openGraphDescription: 'Entiende las escalas que Anto usa para seguimiento de síntomas depresivos y de ansiedad.',
    },
    hero: {
      title: 'PHQ-9 y GAD-7: guía de interpretación',
      subtitle: 'Escalas validadas de cribado — útiles para seguir tendencias, no para autodiagnosticar.',
    },
    sections: [
      {
        heading: '¿Qué son?',
        paragraphs: [
          'PHQ-9 (Patient Health Questionnaire-9) evalúa síntomas depresivos en las últimas dos semanas. GAD-7 (Generalized Anxiety Disorder-7) mide síntomas de ansiedad generalizada en el mismo periodo. Ambas son ampliamente usadas en atención primaria y salud mental.',
        ],
      },
      {
        heading: 'Cómo se usan en Anto',
        paragraphs: [
          'Anto puede completar estas escalas a partir del análisis de conversaciones y mostrar historial con tendencias. Esto ayuda a ver si los síntomas suben o bajan con el tiempo, especialmente junto a un profesional o como autocuidado informado.',
        ],
      },
      {
        heading: 'Límites importantes',
        bullets: [
          'Son herramientas de cribado, no diagnóstico clínico',
          'Un día malo puede subir la puntuación temporalmente',
          'Factores físicos, duelo o estrés agudo influyen en las respuestas',
          'Solo un profesional puede diagnosticar y planificar tratamiento',
        ],
      },
      {
        heading: 'Qué hacer con los resultados',
        paragraphs: [
          'Si las puntuaciones son persistentemente altas, comparte los reportes con tu médico o psicólogo. Si son moderadas, combina seguimiento con hábitos de sueño, actividad, técnicas de regulación y apoyo social.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.sleep],
    disclaimer:
      'Las escalas no sustituyen evaluación presencial. Anto no diagnostica condiciones de salud mental.',
    cta: { label: 'Ver cómo funciona Anto →', path: '/app' },
  },
  [SLUGS.selfCompassion]: {
    slug: SLUGS.selfCompassion,
    readingMinutes: 6,
    meta: {
      title: 'Autocompasión: qué es y ejercicios breves | Anto',
      description:
        'Qué significa la autocompasión en psicología basada en evidencia, por qué no es indulgencia y cómo practicarla en momentos difíciles.',
      openGraphTitle: 'Guía de autocompasión',
      openGraphDescription: 'Aprende a tratarte con el mismo cuidado que ofrecerías a alguien que quieres.',
    },
    hero: {
      title: 'Autocompasión: guía breve',
      subtitle: 'Tratarte con amabilidad firme cuando fallas, sufres o te comparas con otros.',
    },
    sections: [
      {
        heading: 'Tres componentes',
        bullets: [
          'Amabilidad hacia uno mismo frente al sufrimiento',
          'Humanidad compartida: el malestar forma parte de la experiencia humana',
          'Mindfulness: notar el dolor sin exagerarlo ni reprimirlo',
        ],
      },
      {
        heading: 'No es «autoindulgencia»',
        paragraphs: [
          'La autocompasión no significa excusar todo ni evitar responsabilidades. De hecho, suele facilitar aprender del error porque reduces la vergüenza paralizante. Es el tono interno con el que te hablas cuando las cosas van mal.',
        ],
      },
      {
        heading: 'Ejercicio breve',
        paragraphs: [
          'Cuando notes autocrítica dura, detente un momento. Pon la mano en el pecho si te ayuda. Di en voz baja: «esto es un momento difícil; no estoy solo/a en sentir esto; ¿qué necesito ahora que sea pequeño y posible?»',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Anto incluye un protocolo de autocompasión entre sus 8 rutas estructuradas, accesible desde el chat y el hub de técnicas cuando el contexto lo amerita.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.tcc, SLUGS.distortions],
    disclaimer:
      'Psicoeducación general. Si la autocrítica está ligada a trauma o ideación suicida, busca ayuda profesional especializada.',
    cta: { label: 'Empezar en Anto →', path: '/bienvenida' },
  },
  [SLUGS.sleep]: {
    slug: SLUGS.sleep,
    readingMinutes: 7,
    meta: {
      title: 'Higiene del sueño y salud mental | Guía Anto',
      description:
        'Cómo el sueño afecta el ánimo y la ansiedad, hábitos de higiene del sueño basados en evidencia y cuándo consultar a un especialista.',
      openGraphTitle: 'Higiene del sueño y bienestar emocional',
      openGraphDescription: 'Mejora tu descanso con hábitos concretos y entiende su vínculo con la salud mental.',
    },
    hero: {
      title: 'Higiene del sueño y salud mental',
      subtitle: 'Dormir mejor no cura todo, pero el sueño pobre amplifica ansiedad, irritabilidad y pensamientos negativos.',
    },
    sections: [
      {
        heading: 'Sueño y emociones',
        paragraphs: [
          'La privación de sueño reduce la tolerancia al estrés y dificulta regular emociones. Muchas personas notan más rumiación nocturna o despertares a las 3am con preocupaciones en bucle.',
        ],
      },
      {
        heading: 'Hábitos recomendados',
        bullets: [
          'Horario regular de acostarte y levantarte (también fines de semana)',
          'Rutina de 30–60 min sin pantallas antes de dormir',
          'Evitar cafeína tarde y alcohol como «ayuda» para dormir',
          'Cama solo para dormir y descanso (no trabajo ni scroll infinito)',
          'Si no concilias en ~20 min, levántate a otra estancia con luz tenue',
        ],
      },
      {
        heading: 'Si la mente no para',
        paragraphs: [
          'Escribe en un papel tres preocupaciones y una acción mínima para mañana. Prueba respiración 4-7-8 o un audio breve de relajación. Evita revisar el móvil «solo un minuto».',
        ],
      },
      {
        heading: 'Protocolo en Anto',
        paragraphs: [
          'Anto ofrece un protocolo de higiene del sueño entre sus rutas estructuradas, además de técnicas de relajación en el hub de técnicas.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.mindfulness, SLUGS.scales],
    disclaimer:
      'El insomnio persistente puede requerir evaluación médica. Esta guía no sustituye consulta con especialista del sueño.',
    cta: { label: 'Herramientas de bienestar en Anto →', path: '/app' },
  },
  [SLUGS.mindfulness]: {
    slug: SLUGS.mindfulness,
    readingMinutes: 6,
    meta: {
      title: 'Mindfulness: guía breve para empezar | Anto',
      description:
        'Qué es el mindfulness, mitos frecuentes, ejercicios de 3–5 minutos y cómo combinarlo con terapia o apoyo digital.',
      openGraphTitle: 'Mindfulness — guía para empezar',
      openGraphDescription: 'Atención plena sin misticismo: ejercicios cortos para calmar el sistema nervioso.',
    },
    hero: {
      title: 'Mindfulness: guía breve para empezar',
      subtitle: 'Entrenar la atención al presente, sin vaciar la mente ni necesitar una hora libre.',
    },
    sections: [
      {
        heading: 'Qué es (y qué no)',
        paragraphs: [
          'Mindfulness es prestar atención al momento presente, con actitud abierta y sin juzgar. No es eliminar pensamientos ni alcanzar un estado especial: es notar que la mente se fue y volver amablemente al ancla (respiración, sonidos, sensaciones).',
        ],
      },
      {
        heading: 'Ejercicio de 3 minutos',
        bullets: [
          'Siéntate cómodo. Cierra los ojos si quieres.',
          'Siente tres respiraciones completas en el abdomen.',
          'Cuando aparezca un pensamiento, nómbralo («pensando») y vuelve a la respiración.',
          'Abre los ojos y nota un sonido y una sensación corporal.',
        ],
      },
      {
        heading: 'Beneficios esperables',
        paragraphs: [
          'Con práctica regular, muchas personas reportan menos reactividad emocional y mejor capacidad de pausar antes de actuar. Los estudios muestran beneficios modestos pero consistentes en estrés y ansiedad cuando se combina con otras intervenciones.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Encontrarás ejercicios de mindfulness y relajación en el hub de técnicas y en protocolos de bienestar. Puedes usarlos solos o junto al chat cuando necesites bajar la intensidad emocional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.selfCompassion, SLUGS.sleep],
    disclaimer:
      'Guía de psicoeducación. Si el mindfulness activa recuerdos traumáticos intensos, interrumpe y consulta con un profesional formado en trauma.',
    cta: { label: 'Probar Anto 1 día gratis →', path: '/bienvenida' },
  },
  [SLUGS.depression]: {
    slug: SLUGS.depression,
    readingMinutes: 7,
    meta: {
      title: 'Depresión: señales y qué puedes hacer | Guía Anto',
      description:
        'Qué es la depresión, señales frecuentes, diferencia con tristeza normal y estrategias basadas en evidencia como activación conductual. Psicoeducación, no diagnóstico.',
      openGraphTitle: 'Depresión — guía de psicoeducación',
      openGraphDescription:
        'Entiende los síntomas depresivos y herramientas prácticas para empezar a recuperar rutina y conexión.',
    },
    hero: {
      title: 'Depresión: guía breve de psicoeducación',
      subtitle:
        'Cuándo puede ser más que un bajón pasajero y qué pasos pequeños suelen ayudar, según la evidencia.',
    },
    sections: [
      {
        heading: 'Más que tristeza',
        paragraphs: [
          'La depresión no es solo «estar triste». Suele incluir pérdida de interés, cansancio persistente, dificultad para concentrarse, cambios de sueño o apetito, sentimientos de culpa y, a veces, pensamientos de que no vale la pena seguir.',
          'La tristeza ante una pérdida es humana y suele estar conectada a un evento concreto. La depresión puede persistir semanas, afectar varias áreas de la vida y no aliviarse solo con descansar.',
        ],
      },
      {
        heading: 'Señales frecuentes',
        bullets: [
          'Anhedonia: las cosas que antes gustaban ya no motivan',
          'Fatiga o lentitud, incluso sin esfuerzo físico',
          'Autocrítica intensa o sensación de inutilidad',
          'Aislamiento social y abandono de rutinas',
          'Pensamientos recurrentes de muerte (requiere ayuda urgente)',
        ],
      },
      {
        heading: 'Qué suele ayudar',
        paragraphs: [
          'La evidencia apoya la terapia (especialmente TCC y activación conductual), apoyo social, actividad física moderada y, cuando un profesional lo indica, tratamiento farmacológico. El primer paso práctico suele ser retomar acciones pequeñas aunque no tengas ganas.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Anto incluye protocolo de depresión basado en TCC, escala PHQ-9 para seguimiento de tendencias y tareas/hábitos unificados para estructurar micro-pasos. No diagnostica ni prescribe medicación.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.behavioralActivation, SLUGS.scales, SLUGS.tcc],
    disclaimer:
      'Material de psicoeducación. No sustituye evaluación ni tratamiento profesional. Si tienes ideas de hacerte daño, busca ayuda de emergencia de inmediato.',
    cta: { label: 'Acompañamiento en Anto →', path: '/bienvenida' },
  },
  [SLUGS.behavioralActivation]: {
    slug: SLUGS.behavioralActivation,
    readingMinutes: 6,
    meta: {
      title: 'Activación conductual: guía práctica | Anto',
      description:
        'Qué es la activación conductual, por qué funciona en depresión y cómo planificar actividades pequeñas aunque no tengas motivación.',
      openGraphTitle: 'Activación conductual — guía breve',
      openGraphDescription: 'Recupera rutina y ánimo con pasos conductuales pequeños y sostenibles.',
    },
    hero: {
      title: 'Activación conductual',
      subtitle: 'Hacer primero, sentir después: una pieza clave de la TCC para la depresión.',
    },
    sections: [
      {
        heading: 'La idea',
        paragraphs: [
          'En depresión, el ciclo «me siento mal → me aíslo → me siento peor» es muy común. La activación conductual propone planificar actividades con valor (social, placer, logro, salud) aunque la motivación esté baja.',
          'No se trata de hacer todo de golpe: se empieza con pasos pequeños y se registra cómo cambia el ánimo antes y después.',
        ],
      },
      {
        heading: 'Tipos de actividad',
        bullets: [
          'Placer: algo que antes disfrutabas, aunque sea 10 minutos',
          'Logro: una tarea mínima (ducharse, ordenar un rincón)',
          'Social: un mensaje o llamada breve',
          'Salud: caminata corta, comer algo nutritivo',
        ],
      },
      {
        heading: 'Cómo empezar hoy',
        paragraphs: [
          'Elige una sola actividad de menos de 15 minutos. Antes, puntúa tu ánimo del 0 al 10. Hazla. Después, vuelve a puntuar. Si no sube, no significa fracaso: la consistencia importa más que un día.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Usa tareas y hábitos unificados para programar micro-pasos, recordatorios y Pomodoro. El protocolo de depresión y el chat pueden sugerir actividades alineadas con tu contexto.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.depression, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psicoeducación basada en evidencia. No reemplaza terapia individual. Si no puedes salir de la cama varios días, consulta a un profesional.',
    cta: { label: 'Organizar tareas en Anto →', path: '/app' },
  },
  [SLUGS.ocdErp]: {
    slug: SLUGS.ocdErp,
    readingMinutes: 8,
    meta: {
      title: 'TOC y exposición con prevención de respuesta (ERP) | Anto',
      description:
        'Qué es el trastorno obsesivo-compulsivo, cómo funcionan obsesiones y compulsiones, y por qué la ERP es el tratamiento con más evidencia.',
      openGraphTitle: 'TOC y ERP — guía de psicoeducación',
      openGraphDescription: 'Entiende el ciclo obsesivo-compulsivo y el enfoque terapéutico recomendado.',
    },
    hero: {
      title: 'TOC y exposición con prevención de respuesta (ERP)',
      subtitle: 'Obsesiones, compulsiones y el tratamiento con mayor respaldo para el trastorno obsesivo-compulsivo.',
    },
    sections: [
      {
        heading: 'Qué es el TOC',
        paragraphs: [
          'El trastorno obsesivo-compulsivo (TOC) implica obsesiones (pensamientos, imágenes o impulsos intrusivos que generan ansiedad) y compulsiones (conductas o rituales mentales para reducir el malestar). El ciclo se refuerza a corto plazo pero mantiene el problema.',
        ],
      },
      {
        heading: 'Ejemplos frecuentes',
        bullets: [
          'Miedo a contaminación y lavado excesivo',
          'Duda («¿cerré la puerta?») y comprobación repetida',
          'Pensamientos intrusivos de daño y rituales de neutralización',
          'Necesidad de simetría u orden «perfecto»',
        ],
      },
      {
        heading: '¿Qué es la ERP?',
        paragraphs: [
          'La exposición con prevención de respuesta (ERP) consiste en enfrentar gradualmente los disparadores (exposición) sin realizar la compulsión (prevención de respuesta). Con repetición, el cerebro aprende que la ansiedad baja sin el ritual.',
          'ERP debe planificarse con un profesional formado en TOC, especialmente si los síntomas son graves.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Anto incluye protocolo de TOC (ERP) entre sus 8 rutas estructuradas. El chat puede ayudarte a identificar patrones, pero el tratamiento de TOC moderado o severo requiere acompañamiento clínico especializado.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psicoeducación. No es diagnóstico de TOC ni sustituye tratamiento profesional. La ERP sin supervisión puede empeorar síntomas en casos graves. Consulta con un especialista.',
    cta: { label: 'Conocer protocolos de Anto →', path: '/app' },
  },
  [SLUGS.trauma]: {
    slug: SLUGS.trauma,
    readingMinutes: 8,
    meta: {
      title: 'Trauma y TEPT: respuestas normales del cuerpo | Anto',
      description:
        'Qué es el trauma psicológico, síntomas frecuentes del TEPT, por qué aparecen flashbacks y cuándo buscar ayuda especializada.',
      openGraphTitle: 'Trauma y TEPT — guía breve',
      openGraphDescription: 'Psicoeducación sobre respuestas al trauma y caminos de recuperación basados en evidencia.',
    },
    hero: {
      title: 'Trauma y TEPT: guía de psicoeducación',
      subtitle: 'Tu cuerpo y tu mente pueden reaccionar de formas intensas después de eventos abrumadores — eso no significa que estés «roto/a».',
    },
    sections: [
      {
        heading: 'Qué es el trauma',
        paragraphs: [
          'El trauma psicológico ocurre cuando una experiencia supera tu capacidad de afrontamiento en ese momento. Puede ser un evento único (accidente, agresión) o prolongado (maltrato, negligencia). La reacción depende del contexto, no de la «fuerza» de la persona.',
        ],
      },
      {
        heading: 'Síntomas frecuentes del TEPT',
        bullets: [
          'Reexperimentación: recuerdos intrusivos, pesadillas, flashbacks',
          'Evitación de lugares, personas o sensaciones que recuerdan el evento',
          'Hipervigilancia: sobresaltos, tensión, dificultad para relajarse',
          'Cambios en ánimo y pensamiento (culpa, desconfianza, entumecimiento)',
        ],
      },
      {
        heading: 'Tratamientos con evidencia',
        paragraphs: [
          'Terapias como la TCC centrada en trauma, EMDR y exposición prolongada tienen respaldo para TEPT. El apoyo social seguro y la estabilización (sueño, rutina, regulación) también importan. El proceso lleva tiempo y no se apura.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Anto incluye protocolo de trauma y TEPT entre sus rutas estructuradas. Puede acompañarte entre sesiones, pero trauma complejo requiere terapeuta formado en trauma — no sustituye ese trabajo.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.grounding, SLUGS.mindfulness, SLUGS.anxiety],
    disclaimer:
      'Material educativo. No diagnostica TEPT. Si tienes flashbacks intensos o riesgo de daño, busca ayuda profesional especializada.',
    cta: { label: 'Apoyo entre sesiones →', path: '/bienvenida' },
  },
  [SLUGS.anger]: {
    slug: SLUGS.anger,
    readingMinutes: 6,
    meta: {
      title: 'Manejo de la ira: guía práctica | Anto',
      description:
        'Qué dispara la ira, señales corporales tempranas y técnicas de regulación basadas en TCC para responder con más control.',
      openGraphTitle: 'Manejo de la ira — guía breve',
      openGraphDescription: 'Identifica disparadores y aprende a bajar la intensidad antes de reaccionar.',
    },
    hero: {
      title: 'Manejo de la ira',
      subtitle: 'La ira no es el enemigo: el objetivo es entenderla y elegir respuestas que no dañen a ti ni a otros.',
    },
    sections: [
      {
        heading: 'Ira vs. agresión',
        paragraphs: [
          'Sentir ira es normal cuando percibes injusticia, falta de respeto o amenaza. El problema surge cuando la expresión es impulsiva, desproporcionada o dañina. La ira suele tener una curva: sube rápido y baja si no se alimenta con rumiación.',
        ],
      },
      {
        heading: 'Señales tempranas',
        bullets: [
          'Tensión en mandíbula, puños o pecho',
          'Pensamientos de «siempre» o «nunca»',
          'Calor en la cara, respiración acelerada',
          'Impulso de interrumpir, gritar o golpear',
        ],
      },
      {
        heading: 'Estrategias útiles',
        paragraphs: [
          'Para la escalada: pausa de 90 segundos, respiración lenta, salir físicamente de la situación si es seguro. Para el largo plazo: identificar disparadores, cuestionar interpretaciones (¿fue a propósito?), practicar asertividad y resolver problemas concretos.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'El protocolo de manejo de ira guía pasos estructurados en el chat. También puedes usar técnicas ABC y grounding del hub cuando notes que la intensidad sube.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.abc, SLUGS.distortions, SLUGS.grounding],
    disclaimer:
      'Guía de psicoeducación. No sustituye terapia ni evaluación profesional. Si la ira lleva a violencia o miedo en tu entorno, busca ayuda profesional y, si hay riesgo, servicios de protección.',
    cta: { label: 'Practicar en Anto →', path: '/bienvenida' },
  },
  [SLUGS.grounding]: {
    slug: SLUGS.grounding,
    readingMinutes: 5,
    meta: {
      title: 'Técnicas de grounding para ansiedad y crisis | Anto',
      description:
        'Ejercicios de grounding (5 sentidos, contacto con el presente) para bajar la intensidad emocional y cuándo activar recursos de crisis.',
      openGraphTitle: 'Grounding — guía práctica',
      openGraphDescription: 'Vuelve al presente cuando la ansiedad o un recuerdo abrumador te desborda.',
    },
    hero: {
      title: 'Grounding: técnicas para ansiedad y momentos de crisis',
      subtitle: 'Anclarte al aquí y ahora cuando el cuerpo reacciona como si el peligro fuera inmediato.',
    },
    sections: [
      {
        heading: 'Qué es el grounding',
        paragraphs: [
          'Grounding («aterrizaje») son técnicas que dirigen la atención al presente sensorial para reducir ansiedad intensa, disociación leve o espiral de pensamientos. No elimina el problema de fondo, pero baja la activación para poder pensar con más claridad.',
        ],
      },
      {
        heading: 'Ejercicio 5-4-3-2-1',
        bullets: [
          '5 cosas que puedes ver',
          '4 que puedes tocar (textura, temperatura)',
          '3 que puedes oír',
          '2 que puedes oler',
          '1 que puedes saborear',
        ],
      },
      {
        heading: 'Otras opciones rápidas',
        paragraphs: [
          'Sostener un cubito de hielo, describir en voz alta dónde estás, apoyar los pies en el suelo y presionar suavemente, nombrar colores a tu alrededor. La clave es involucrar sentidos, no analizar el problema en ese momento.',
        ],
      },
      {
        heading: 'Cuándo es crisis',
        paragraphs: [
          'Si hay ideas de hacerte daño, riesgo inmediato o no puedes cuidarte, contacta emergencias o una línea de crisis de tu país. Anto detecta señales de riesgo y puede ofrecer recursos de apoyo, pero no sustituye servicios de emergencia.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.mindfulness, SLUGS.trauma],
    disclaimer:
      'Psicoeducación. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    cta: { label: 'Apoyo 24/7 en Anto →', path: '/bienvenida' },
  },
};

export function getPsychoeducationGuidesEs(): Record<PsychoeducationSlug, PsychoeducationGuide> {
  return guides;
}

export function getPsychoeducationGuideEs(slug: string): PsychoeducationGuide | undefined {
  return guides[slug as PsychoeducationSlug];
}
