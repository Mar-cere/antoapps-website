import type { PsychoeducationGuide, PsychoeducationSlug } from './types';

const SLUGS = {
  tcc: 'que-es-tcc' as const,
  distortions: 'distorsiones-cognitivas' as const,
  distortionsMap: 'mapa-distorsiones-cognitivas' as const,
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
  stress: 'estres-y-carga' as const,
  emotionRegulation: 'regulacion-emocional' as const,
  grief: 'duelo-y-perdida' as const,
  burnout: 'agotamiento-y-burnout' as const,
};

const guides: Record<PsychoeducationSlug, PsychoeducationGuide> = {
  [SLUGS.tcc]: {
    slug: SLUGS.tcc,
    readingMinutes: 7,
    meta: {
      title: '¿Qué es la terapia cognitivo-conductual (TCC)? | Guía Anto',
      description:
        'Qué es la TCC, cómo funciona y por qué es una de las intervenciones con más evidencia para ansiedad y depresión. Psicoeducación; no sustituye atención profesional.',
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
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Este texto es el marco amplio. Para patrones de pensamiento concretos o un registro situacional, sigue aquí:',
      links: [
        {
          label: 'Distorsiones cognitivas (mapa completo)',
          description:
            'Definición clínica, tipos, mantenimiento, reestructuración y relación con ansiedad o depresión.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'Distorsiones cognitivas (guía breve)',
          description:
            'Entrada práctica: ejemplos cotidianos y un ejercicio corto para mirar un pensamiento de cerca.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'Técnica ABC',
          description:
            'Registro situacional: Activating event → Belief → Consequence.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Ansiedad y preocupación',
          description:
            'Mapa de activación, evitación e intervenciones con base en TCC.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Evidencia que informa Anto',
          description:
            'Cómo leemos TCC, escalas y salud mental digital — y qué no afirmamos.',
          href: '/investigacion',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortionsMap, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'Esta guía es material de psicoeducación y no constituye diagnóstico ni tratamiento. Si tus síntomas son intensos o persistentes, consulta con un profesional de salud mental.',
    cta: { label: 'Practicar técnicas en Anto →', path: '/bienvenida' },
  },
  [SLUGS.distortions]: {
    slug: SLUGS.distortions,
    readingMinutes: 8,
    meta: {
      title: 'Distorsiones cognitivas: reconocerlas y cuestionarlas | Anto',
      description:
        'Qué son las distorsiones cognitivas, ejemplos del día a día (catastrofismo, todo o nada, lectura de mente) y un ejercicio breve para mirarlas de cerca. Psicoeducación práctica con enlace al mapa clínico completo. No sustituye atención profesional.',
      openGraphTitle: 'Distorsiones cognitivas — reconocer y cuestionar',
      openGraphDescription:
        'Cuando la mente salta a conclusiones: ejemplos cotidianos, un paso a paso para crear distancia y el camino al mapa clínico completo.',
      keywords:
        'distorsiones cognitivas, pensamientos en bucle, pensamientos automáticos, catastrofismo, todo o nada, lectura de mente, filtro mental, sobregeneralización, reformulación, mapa de distorsiones, TCC, técnica ABC, psicoeducación, Anto',
    },
    hero: {
      title: 'Distorsiones cognitivas',
      subtitle:
        'Esos atajos mentales que hacen que un silencio se sienta como un veredicto. Nombrarlos ayuda a no creerlos al instante — sin obligarte a “pensar positivo”.',
    },
    pullQuote:
      'A veces la mente no miente del todo. Solo exagera. Y en esa exageración se te va el resto del día.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Persona en una mesa junto a la ventana, con el teléfono abierto a un mensaje sin respuesta, café y cuaderno — el momento en que la mente empieza a llenar el silencio',
      caption:
        'Un mensaje sin contestar. El hecho es uno. La historia que inventamos encima suele ser otra.',
      width: 1536,
      height: 1024,
      /*
       * Escena densa: el cuaderno (lectura de mente escrita) vive abajo.
       * Mantener 3/2 en desktop evita el panorámico que se come la historia.
       */
      objectPosition: '42% 52%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Qué son',
        paragraphs: [
          'Las distorsiones cognitivas son atajos que la mente toma bajo estrés, cansancio o miedo. No significan que “pienses mal”: son hábitos. Útiles para sobrevivir un momento intenso; poco fiables como mapa del día.',
          'En la práctica, nombrar uno ya cambia algo: “esto suena a catastrofismo” en vez de “así son las cosas”. No se trata de silenciar la mente. Se trata de ganar un poco de aire antes de decidir qué haces.',
          'Antes de ponerle nombre, suele haber una señal: el cuerpo se tensa, la emoción sube rápido y el pensamiento llega cerrado, como si ya fuera verdad.',
        ],
        bullets: [
          'Ganas de creerlo al instante (“ya está, es así”).',
          'Palabras absolutas: siempre, nunca, todo el mundo, imposible.',
          'Ansiedad, vergüenza o rabia que llegan antes de mirar los hechos.',
        ],
      },
      {
        heading: 'Ejemplos del día a día',
        paragraphs: [
          'No hace falta memorizar una lista. Conviene reconocer las que más se te repiten:',
        ],
        bullets: [
          'Todo o nada: «si no sale perfecto, es un fracaso total».',
          'Catastrofismo: «si me equivoco en la reunión, se acabó mi carrera».',
          'Lectura de mente: «seguro piensa que soy un pesado».',
          'Sobregeneralización: un tropiezo se vuelve «siempre me pasa».',
        ],
      },
      {
        heading: 'Ejercicio: mirar un pensamiento de cerca',
        paragraphs: [
          'Hazlo cuando no estés en el pico. Si estás en 8 o 9, primero baja un poco (respirar, pies en el suelo, un poco de grounding) y recién después escribe.',
        ],
        ordered: true,
        bullets: [
          'Escribe el pensamiento tal cual aparece — sin editarlo ni “arreglarlo”.',
          'Ponle un nombre tentativo (catastrofismo, todo o nada, lectura de mente…).',
          'Puntúa cómo te sientes del 0 al 10.',
          'Anota qué evidencia hay a favor y en contra, como si ayudaras a un amigo.',
          'Escribe una versión más equilibrada y, si cabe, una acción pequeña.',
        ],
      },
      {
        heading: 'Qué no es esto',
        paragraphs: [
          'Mirar una distorsión no es “pensar positivo” ni restarle importancia a lo que sientes. A veces el pensamiento apunta a algo real; lo que tuerce es el absoluto o la certeza imposible.',
          'Tampoco es un diagnóstico. Ver un patrón no dice quién eres: dice qué hábito se te activó. Y los hábitos se pueden entrenar — solo o con ayuda.',
        ],
      },
      {
        heading: 'Cuándo pedir ayuda',
        paragraphs: [
          'Vale la pena hablar con un profesional si estos bucles no aflojan, te quitan el sueño, el trabajo o las ganas de estar con gente, o si la rumia te deja sin margen para actuar.',
          'Si hay ideas de hacerte daño, riesgo inmediato o no puedes cuidarte: busca emergencias o una línea de crisis de tu país. Anto puede ofrecer recursos; no reemplaza esos servicios.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando la mente llena un silencio con la peor historia, puedes escribirlo tal cual y recibir una pregunta que abra otra lectura — sin presión de “arreglarlo todo”.',
      afterHeading: 'Ejercicio: mirar un pensamiento de cerca',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto cuando un mensaje no tiene respuesta',
        messages: [
          {
            role: 'user',
            text: 'Le escribí hace tres horas. No contesta. Seguro ya se arrepintió de quedar.',
          },
          {
            role: 'anto',
            text: 'Duele esperar así. ¿Es que no ha contestado, o ya estás seguro de lo que piensa?',
          },
          {
            role: 'user',
            text: 'No lo sé. Suena exagerado cuando lo digo… pero lo siento.',
          },
          {
            role: 'anto',
            text: 'Eso ya es un buen dato. Escribamos el pensamiento tal cual — y después miramos si hay otra lectura posible.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Mirar el pensamiento de cerca', 'Separar hecho de historia'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Esta página es práctica y breve. Si quieres el mapa clínico amplio — tipos, mantenimiento, reestructuración — empieza aquí:',
      links: [
        {
          label: 'Distorsiones cognitivas (mapa completo)',
          description:
            'Definición clínica, pensamientos automáticos vs. distorsiones, mantenimiento e intervenciones con evidencia.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'Qué es la TCC',
          description:
            'Cómo se relacionan pensamientos, emociones y conductas, y por qué ayuda cuestionar lo que damos por cierto.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Técnica ABC',
          description:
            'Un registro simple: qué pasó → qué te dijiste → qué sentiste y hiciste.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Ansiedad y preocupación',
          description:
            'Cuando el pensamiento catastrófico viene con el cuerpo acelerado: mapa e intervenciones.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support:
        'Fuentes clásicas de TCC sobre pensamientos automáticos y distorsiones. No sustituyen una evaluación personal.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Marco fundacional de la terapia cognitiva y el papel de las interpretaciones en el malestar emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Manual clínico de TCC: identificación de pensamientos automáticos y reestructuración cognitiva.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/322160/the-feeling-good-handbook-by-david-d-burns-md/',
          note: 'Catálogo accesible de distorsiones cognitivas y ejercicios de cuestionamiento para el lector general.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación o tratamiento clínico. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si quieres compañía para mirar un pensamiento de cerca — sin presión — puedes seguir en el teléfono.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Mirar un pensamiento de cerca',
      description:
        'Ejercicio breve para nombrar un pensamiento automático, revisar evidencia y escribir una versión más equilibrada.',
      totalTime: 'PT10M',
      steps: [
        'Escribe el pensamiento automático tal como aparece.',
        'Ponle un nombre tentativo (catastrofismo, todo o nada, etc.).',
        'Puntúa cómo te sientes del 0 al 10.',
        'Lista evidencia a favor y en contra.',
        'Escribe una versión más equilibrada y una acción pequeña si hace falta.',
      ],
    },
  },
  [SLUGS.distortionsMap]: {
    slug: SLUGS.distortionsMap,
    readingMinutes: 12,
    meta: {
      title: 'Distorsiones cognitivas: mapa clínico completo | Anto',
      description:
        'Mapa de psicoeducación sobre distorsiones cognitivas: definición clínica, pensamientos automáticos vs. sesgos, tipos frecuentes, mecanismos de mantenimiento, reestructuración cognitiva, relación con ansiedad y depresión, y criterios para pedir evaluación. Complementa la guía breve de pensamientos en bucle. No diagnostica ni sustituye terapia.',
      openGraphTitle: 'Distorsiones cognitivas — mapa completo',
      openGraphDescription:
        'De la definición clínica a la reestructuración: tipos, mantenimiento, intervenciones con base en TCC y cuándo pedir evaluación.',
      keywords:
        'distorsiones cognitivas, mapa clínico, mapa de distorsiones, pensamientos en bucle, pensamientos automáticos, reestructuración cognitiva, sesgos cognitivos, catastrofismo, dicotomía, lectura de mente, sobregeneralización, personalización, Beck, Burns, TCC, psicoeducación clínica, Anto',
    },
    hero: {
      title: 'Distorsiones cognitivas: mapa completo',
      subtitle:
        'Una lectura más clínica: qué son en el modelo cognitivo, cómo se clasifican, por qué se mantienen y qué intervenciones suelen usarse en TCC.',
    },
    pullQuote:
      'El sesgo no es un defecto de carácter. Es un atajo perceptual que, repetido, organiza la emoción y la conducta — a veces a costa de la evidencia.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-desk-rain.webp',
      alt: 'Escritorio junto a una ventana con lluvia — cuaderno, luz tenue y el espacio quieto donde se revisa un pensamiento',
      caption:
        'La reestructuración no ocurre en el pico. Suele empezar cuando hay margen para escribir el pensamiento tal cual.',
      width: 1536,
      height: 1024,
      objectPosition: '48% 42%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Definición clínica',
        paragraphs: [
          'En terapia cognitiva, las distorsiones cognitivas designan errores sistemáticos de procesamiento de la información: interpretaciones sesgadas, selectivas o absolutistas que distorsionan la relación entre estímulo y significado (Beck, 1976; Beck, 2020). No equivalen a “pensar mal” ni a falta de inteligencia: son hábitos de inferencia que aparecen con mayor frecuencia bajo carga afectiva, fatiga o amenaza percibida.',
          'Clínicamente interesan porque median entre el evento activador y la respuesta emocional-conductual. El mismo hecho (un mensaje sin respuesta) puede sostener tristeza leve o ansiedad intensa según la inferencia. Esta guía es psicoeducación: organiza el mapa; no diagnostica un trastorno ni sustituye evaluación profesional.',
          'El objetivo clínico no es “pensar positivo”. Es recuperar flexibilidad cognitiva: poder sostener hipótesis alternativas, gradientes de probabilidad y acciones proporcionales a la evidencia disponible.',
        ],
      },
      {
        heading: 'Pensamientos automáticos vs. distorsiones',
        paragraphs: [
          'Los pensamientos automáticos (automatic thoughts) son cogniciones rápidas, a menudo telegráficas, que aparecen en situación sin elaboración deliberada. Pueden ser realistas, parcialmente útiles o claramente sesgados. La distorsión nombra el tipo de sesgo cuando el pensamiento automático se aparta de forma predecible de la evidencia o de una evaluación proporcional.',
          'En el modelo de Beck, por debajo de los automáticos suelen operar creencias intermedias (reglas, “deberías”) y creencias nucleares (esquemas sobre sí, el mundo o el futuro). Nombrar la distorsión en el nivel automático es el acceso más frecuente en psicoeducación y en las primeras fases de TCC; no implica mapear todo el esquema de una vez.',
        ],
        bullets: [
          'Pensamiento automático: contenido situacional (“no va a contestar”).',
          'Distorsión: forma del error (lectura de mente, catastrofismo, etc.).',
          'Creencia intermedia/nuclear: regla o esquema más estable que predispone al sesgo.',
        ],
      },
      {
        heading: 'Tipos frecuentes',
        paragraphs: [
          'Las taxonomías varían (Burns, 1999; Beck, 2020). Lo útil no es memorizar una lista cerrada, sino reconocer las formas que se repiten en tu registro. A continuación, presentaciones frecuentes en clínica y autoayuda informada por TCC:',
        ],
        bullets: [
          'Pensamiento dicotómico (todo o nada): categorías extremas sin gradiente (“si no es perfecto, es un fracaso”).',
          'Catastrofismo: sobrestimar la probabilidad o la gravedad de un resultado adverso.',
          'Lectura de mente: atribuir intenciones o juicios ajenos sin datos suficientes.',
          'Sobregeneralización: inferir una regla global a partir de un episodio (“siempre me pasa”).',
          'Filtro mental / abstracción selectiva: atender solo al dato negativo e ignorar el contexto.',
          'Personalización: atribuirse causalidad excesiva por eventos externos o compartidos.',
          'Deberías / imperativos: reglas rígidas que generan culpa, rabia o ansiedad al incumplirse.',
          'Etiquetado: reducir a una etiqueta global (“soy un fracaso”) en lugar de describir una conducta.',
          'Adivinación del futuro: tratar una predicción como certeza (“va a salir mal”).',
          'Razonamiento emocional: tomar el sentimiento como prueba del hecho (“lo siento, luego es verdad”).',
        ],
      },
      {
        heading: 'Cómo se mantienen',
        paragraphs: [
          'Las distorsiones se consolidan por sesgo de confirmación y por el alivio a corto plazo que produce actuar como si fueran ciertas: evitar, revisar, pedir certeza, postergar. Ese alivio opera como refuerzo negativo y reduce oportunidades de desconfirmación (aprendizaje correctivo).',
          'También interviene la fusión cognitiva: el pensamiento se experimenta como hecho, no como hipótesis. Bajo hiperactivación (ansiedad alta, irritabilidad, fatiga), baja la capacidad de matizar y sube la probabilidad de absolutos. Por eso, en picos intensos, la intervención prioriza regulación de la arousal antes que debate cognitivo detallado.',
        ],
        bullets: [
          'Confirmación selectiva: buscas (o recuerdas) solo lo que encaja con el sesgo.',
          'Evitación / checking: bajas la ansiedad al instante y bloqueas evidencia contradictoria.',
          'Rumia: repites el contenido sin actualizar la probabilidad ni la acción.',
          'Contexto somático: con el cuerpo en 8/10, el absolutismo es más plausible subjetivamente.',
        ],
      },
      {
        heading: 'Intervenciones con evidencia',
        paragraphs: [
          'La reestructuración cognitiva es un componente central de la TCC: identificar el pensamiento automático, examinar la evidencia, generar alternativas equilibradas y, cuando corresponde, diseñar un experimento conductual (Beck, 2020). No es “discutir contigo mismo” hasta rendirte: es un procedimiento estructurado que combina evaluación cognitiva y prueba en la vida real.',
          'En la práctica clínica y en psicoeducación guiada suelen combinarse:',
        ],
        bullets: [
          'Identificación y etiquetado: capturar el pensamiento literal y nombrar la distorsión probable.',
          'Examen de evidencia: columnas a favor / en contra; distinguir hecho de inferencia.',
          'Descatastrofización: ¿qué tan probable? ¿qué tan grave si ocurriera? ¿qué harías entonces?',
          'Continuum / gradientes: sustituir dicotomías por escalas (0–100) de desempeño o amenaza.',
          'Experimentos conductuales: probar una predicción en dosis pequeñas (p. ej. no revisar el mensaje 30 minutos).',
          'Registro ABC: situar Activador → Creencia → Consecuencia emocional/conductual.',
          'Regulación previa: si la intensidad afectiva es ≥8/10, bajar arousal (respiración, grounding) antes de reestructurar.',
        ],
      },
      {
        heading: 'Ejercicio: reestructuración paso a paso',
        paragraphs: [
          'Protocolo breve alineado con el trabajo de pensamientos automáticos en TCC. Hazlo fuera del pico cuando puedas. Si estás muy activado, regula primero y escribe después.',
        ],
        ordered: true,
        bullets: [
          'Situación (hecho observable): qué ocurrió, sin interpretaciones.',
          'Pensamiento automático: escríbelo tal cual; puntúa creencia 0–100% e intensidad emocional 0–10.',
          'Nombre tentativo de la distorsión (puede haber más de una).',
          'Evidencia a favor y en contra — como si evaluaras el caso de un tercero.',
          'Pensamiento alternativo equilibrado (no necesariamente “positivo”); vuelve a puntuar creencia e intensidad.',
          'Si aplica: una acción o experimento pequeño para probar la predicción esta semana.',
        ],
      },
      {
        heading: 'Relación con ansiedad y depresión',
        paragraphs: [
          'En ansiedad, predominan sesgos de amenaza: catastrofismo, adivinación del futuro, sobrestimación de probabilidad/gravedad y, a menudo, lectura de mente en contextos sociales. El mantenimiento se entrelaza con evitación y conductas de seguridad.',
          'En depresión, son más frecuentes el filtro mental, la sobregeneralización, el etiquetado global y la personalización con sesgo interno estable (“es por cómo soy”). La reestructuración suele combinarse con activación conductual: sin contacto con refuerzos, el material cognitivo se vuelve autorreferencial y pobre en datos nuevos.',
          'Estos son patrones descriptivos frecuentes en la literatura clínica, no una regla diagnóstica. Una misma persona puede mostrar ambos perfiles según el episodio.',
        ],
      },
      {
        heading: 'Cuándo pedir evaluación',
        paragraphs: [
          'Conviene evaluación profesional si los sesgos son persistentes, generan deterioro funcional (sueño, trabajo, vínculos), se acompañan de anhedonia o desesperanza intensas, o si la rumia deja poco margen para actuar. También si hay uso de sustancias para modular el malestar o si intentos reiterados de “razonar” no modifican la intensidad.',
          'Ante ideación suicida, riesgo inmediato o incapacidad de cuidarte: contacta emergencias o una línea de crisis de tu país. Anto puede detectar señales de riesgo y ofrecer recursos; no sustituye servicios de emergencia ni tratamiento clínico.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando un pensamiento llega cerrado — como veredicto —, puedes escribirlo literal y trabajar evidencia y alternativas sin presión de “arreglarlo todo”.',
      afterHeading: 'Intervenciones con evidencia',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto sobre un pensamiento dicotómico',
        messages: [
          {
            role: 'user',
            text: 'Si la presentación no sale perfecta, fue un fracaso. No hay punto medio.',
          },
          {
            role: 'anto',
            text: 'Suena a todo o nada. ¿Qué parte es el hecho de la presentación, y qué parte es la regla de “perfecto o fracaso”?',
          },
          {
            role: 'user',
            text: 'El hecho es que me trabé dos veces. La regla… la siento como verdad.',
          },
          {
            role: 'anto',
            text: 'Escribamos el pensamiento tal cual y puntúalo. Después miramos evidencia y un gradiente — no “pensar positivo”, sino una lectura más proporcional.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Reestructuración paso a paso', 'Separar hecho de inferencia'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Este texto es el mapa amplio. Para la entrada breve, un registro situacional o el marco TCC, sigue aquí:',
      links: [
        {
          label: 'Distorsiones cognitivas (guía breve)',
          description:
            'Versión práctica y corta: ejemplos del día a día y un ejercicio de 10 minutos.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'Técnica ABC',
          description:
            'Registro situacional: Activating event → Belief → Consequence.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Ansiedad y preocupación',
          description:
            'Cuando el sesgo de amenaza viene con hiperactivación: mapa e intervenciones.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Qué es la TCC',
          description:
            'Modelo cognitivo-conductual: pensamientos, emociones, conductas y exposición.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Evidencia que informa Anto',
          description:
            'Cómo leemos TCC, escalas y salud mental digital — y qué no afirmamos. Citas APA con DOI.',
          href: '/investigacion',
        },
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support:
        'Fuentes clínicas y de psicoeducación que sustentan definiciones, taxonomías e intervenciones mencionadas arriba. No sustituyen evaluación clínica individual.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Marco fundacional: interpretaciones sesgadas y su papel en el malestar emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Manual clínico: pensamientos automáticos, creencias y reestructuración cognitiva.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/322160/the-feeling-good-handbook-by-david-d-burns-md/',
          note: 'Catálogo accesible de distorsiones y ejercicios de cuestionamiento.',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Revisión de metaanálisis sobre la eficacia de la TCC en distintos problemas clínicos.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación o tratamiento clínico. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si quieres compañía para registrar un pensamiento automático — con evidencia y alternativas — puedes seguir en el teléfono.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Reestructuración cognitiva paso a paso',
      description:
        'Protocolo breve para identificar un pensamiento automático, examinar evidencia, escribir una alternativa equilibrada y, si cabe, un experimento conductual.',
      totalTime: 'PT15M',
      steps: [
        'Describe la situación como hecho observable.',
        'Escribe el pensamiento automático y puntúa creencia (0–100%) e intensidad emocional (0–10).',
        'Nombra la distorsión probable.',
        'Lista evidencia a favor y en contra.',
        'Escribe un pensamiento alternativo equilibrado y vuelve a puntuar.',
        'Define, si aplica, un experimento conductual pequeño.',
      ],
    },
  },
  [SLUGS.abc]: {
    slug: SLUGS.abc,
    readingMinutes: 6,
    meta: {
      title: 'Técnica ABC paso a paso | Psicoeducación Anto',
      description:
        'Aprende la técnica ABC (Activador, Creencia, Consecuencia) para analizar situaciones difíciles y cambiar respuestas emocionales. Psicoeducación; no sustituye atención profesional.',
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
    relatedSlugs: [SLUGS.tcc, SLUGS.distortionsMap, SLUGS.anxiety],
    disclaimer:
      'Guía de psicoeducación. No reemplaza terapia individual. Si estás en crisis, contacta servicios de emergencia de tu país.',
    cta: { label: 'Probar Anto gratis 1 día →', path: '/bienvenida' },
  },
  [SLUGS.anxiety]: {
    slug: SLUGS.anxiety,
    readingMinutes: 12,
    meta: {
      title: 'Ansiedad y preocupación: mapa para entenderla | Anto',
      description:
        'Psicoeducación sobre ansiedad y preocupación: activación del sistema nervioso, preocupación vs. ansiedad, síntomas, conductas de seguridad, presentaciones frecuentes, intervenciones (regulación, grounding, exposición, posposición de la preocupación), cribado GAD-7 y criterios para buscar ayuda. No diagnostica ni sustituye terapia.',
      openGraphTitle: 'Ansiedad y preocupación — guía completa',
      openGraphDescription:
        'De la activación anticipatoria al mapa: síntomas, evitación, intervenciones con base en TCC y cuándo pedir evaluación.',
      keywords:
        'ansiedad, preocupación, TAG, trastorno de ansiedad generalizada, ataque de pánico, conductas de seguridad, evitación, GAD-7, exposición graduada, grounding, psicoeducación, TCC, Anto',
    },
    hero: {
      title: 'Ansiedad y preocupación',
      subtitle:
        'Un mapa para leer la activación anticipatoria: síntomas, ciclos de evitación, intervenciones con evidencia y cuándo conviene evaluación clínica.',
    },
    pullQuote:
      'La ansiedad no siempre miente. A veces avisa. El problema es cuando el aviso se queda encendido aunque el peligro ya no esté.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-morning-pause.webp',
      alt: 'Mañana en pausa junto a una ventana con luz suave — espacio quieto cuando la preocupación no suelta',
      caption:
        'A veces el día empieza antes de que el cuerpo esté listo. Nombrar la activación ya es un primer dato clínico.',
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: 'Qué es la ansiedad',
        paragraphs: [
          'La ansiedad es una respuesta de amenaza del sistema nervioso autónomo — sobre todo la rama simpática — ante un peligro real, anticipado o interpretado. Eleva arousal: taquicardia, tensión muscular, respiración más superficial, atención sesgada hacia lo que podría salir mal. En dosis adaptativa, prepara la acción. Cuando se cronifica, el futuro ocupa el presente.',
          'Clínicamente se describe como un patrón de tres canales: somático (cuerpo), cognitivo (anticipación, catastrofización) y conductual (evitación y conductas de seguridad). No es lo mismo que “ser nervioso”: implica intensidad, persistencia o deterioro funcional.',
          'Esta guía es psicoeducación. No diagnostica un trastorno. Sirve para reconocer el patrón, ensayar intervenciones de bajo riesgo y decidir cuándo pedir evaluación profesional.',
        ],
      },
      {
        heading: 'Preocupación vs. ansiedad',
        paragraphs: [
          'En la literatura clínica suele distinguirse la preocupación (worry) — proceso cognitivo verbal, ensayar escenarios en lenguaje — de la ansiedad como estado afectivo-somático (Borkovec et al., 1983a). Preocuparse ante un examen o una factura puede ser adaptativo: hay un estímulo concreto y un margen de control.',
          'La preocupación se vuelve disfuncional cuando es excesiva, difícil de controlar, invade varios dominios y deja de orientarse a solución. La ansiedad clínicamente relevante suele ir acompañada de hiperactivación sostenida, evitación y deterioro en sueño, trabajo o relaciones — a menudo durante semanas.',
        ],
        bullets: [
          'Preocupación adaptativa: acotada, ligada a un problema real, facilita decidir o planificar.',
          'Preocupación patológica: catastrofiza, exige certeza imposible, reaparece tras revisiones (checking).',
          'Ansiedad con impacto: el arousal no remite aunque la evaluación cognitiva diga “no hay peligro objetivo”.',
        ],
      },
      {
        heading: 'Síntomas somáticos y cognitivos',
        paragraphs: [
          'Antes de intervenir sobre el pensamiento, conviene mapear la señal. En ansiedad, el canal somático suele activarse primero o en paralelo al cognitivo.',
        ],
        bullets: [
          'Somáticos: tensión (mandíbula, cuello, hombros), diaforesis o manos frías, palpitaciones, disnea subjetiva, molestias gastrointestinales.',
          'Cognitivos: sesgo atencional al peligro, pensamientos intrusivos, dificultad de concentración, irritabilidad.',
          'Sueño: fragmentación, despertar precoz, fatiga diurna desproporcionada al esfuerzo.',
          'Urgencia subjetiva (“tengo que resolver esto ya”) sin tarea operativa clara — típica de la hiperactivación.',
        ],
      },
      {
        heading: 'Evitación y conductas de seguridad',
        paragraphs: [
          'Un mecanismo central es el refuerzo negativo: aparece incertidumbre o miedo → realizas una conducta que baja la ansiedad al instante (revisar, preguntar, evitar) → el alivio enseña al sistema que “solo así estás a salvo” → la amenaza percibida se consolida. Las conductas de seguridad (safety-seeking behaviours) pueden impedir la desconfirmación de la amenaza (Salkovskis, 1991).',
          'La evitación y las conductas de seguridad son comprensibles. También mantienen el problema a medio plazo: impiden habituación y aprendizaje correctivo (“el daño no ocurrió aunque no evitara”). La alternativa clínica no es “valentía total”, sino exposición graduada — dosis tolerables, a menudo con acompañamiento (Craske et al., 2014).',
        ],
        bullets: [
          'Checking: revisar síntomas, mensajes, noticias o el cuerpo de forma repetida.',
          'Reassurance-seeking: pedir certeza reiterada a otras personas o a búsquedas online.',
          'Evitación situacional: cancelar, posponer o no decidir “por si acaso”.',
          'Evitación cognitiva: distracción total que no procesa el estímulo temido y lo deja intacto.',
        ],
      },
      {
        heading: 'Presentaciones frecuentes (no diagnóstico)',
        paragraphs: [
          'Los cuadros de ansiedad se agrupan en categorías clínicas (p. ej. en manuales diagnósticos), pero aquí se listan como presentaciones descriptivas — no como etiqueta que puedas autoasignarte:',
        ],
        bullets: [
          'Tipo TAG / preocupación generalizada: preocupación excesiva y difícil de controlar sobre varios dominios (salud, dinero, trabajo, familia).',
          'Ansiedad social: miedo intenso a evaluación negativa, inhibición o evitación de situaciones interpersonales.',
          'Ataques de pánico: oleadas intensas de miedo con síntomas autonómicos marcados; suelen alcanzar pico en minutos (no siempre equivalen a trastorno de pánico).',
          'Ansiedad por la salud: hipervigilancia interoceptiva y búsqueda de tranquilidad ante sensaciones corporales.',
          'Ansiedad situacional o reactiva: ligada a un estresor identificable (mudanza, duelo, cambio laboral) que no remite al ceder el pico agudo.',
        ],
      },
      {
        heading: 'Intervenciones que suelen ayudar',
        paragraphs: [
          'Metaanálisis de ensayos controlados con placebo indican que la TCC es eficaz para trastornos de ansiedad en adultos (Hofmann & Smits, 2008). En la práctica se combina: (1) regulación de la arousal, (2) trabajo cognitivo sobre interpretaciones amenazantes, y (3) exposición o reducción de conductas de seguridad. Si la intensidad es alta, prioriza estabilización y apoyo profesional.',
        ],
        bullets: [
          'Regulación autonómica: respiración lenta con exhalación prolongada; grounding sensorial 5-4-3-2-1; contacto con el suelo.',
          'Etiquetado afectivo: nombrar “esto es ansiedad” puede reducir fusión cognitiva con el pensamiento catastrófico.',
          'Posposición de la preocupación (stimulus control): ventana horaria para worry; fuera de ella, anotar y diferir.',
          'Exposición graduada: acercamiento jerárquico a lo evitado, sin exigir certeza absoluta.',
          'Higiene de arousal basal: sueño, actividad física moderada y cafeína — modulan la línea base simpática.',
          'Registro ABC o diario de pensamientos: situación → pensamiento → emoción/intensidad → conducta — para detectar sesgos.',
        ],
      },
      {
        heading: 'Ejercicio: posposición de la preocupación',
        paragraphs: [
          'Técnica de control de estímulos descrita para preocupación crónica (Borkovec et al., 1983b): no elimina el worry; lo concentra en un intervalo para recuperar el resto del día y reducir el refuerzo continuo de la rumia.',
        ],
        ordered: true,
        bullets: [
          'Define 15–20 minutos diarios (horario estable si puedes) y un lugar fijo para la “ventana de preocupación”.',
          'En esa ventana, escribe preocupaciones con detalle — sin intentar resolverlas todas.',
          'Fuera de la ventana: si aparece una, regístrala en una lista (“para las 18:00”) y vuelve a la tarea en curso.',
          'Al abrir la ventana, revisa la lista. Distingue: ¿hay una acción conductual pequeña hoy? Si no, ciérrala hasta mañana.',
          'Si la intensidad subjetiva es ≥8/10, primero baja la arousal (respiración o grounding) y recién después escribe.',
        ],
      },
      {
        heading: 'Cribado y seguimiento (GAD-7)',
        paragraphs: [
          'El GAD-7 (Generalized Anxiety Disorder-7) es una escala breve de cribado de síntomas de ansiedad en las últimas dos semanas (Spitzer et al., 2006). No diagnostica por sí sola. En el estudio de validación, un punto de corte ≥10 optimizó sensibilidad y especificidad para probable TAG; rangos 5–9 se usan con frecuencia como sintomatología leve a vigilar.',
          'Anto puede integrar este tipo de seguimiento en el historial. Un día atípico no define la tendencia: importan series temporales y el contexto (duelo, enfermedad física, estimulantes).',
        ],
      },
      {
        heading: 'Cuándo pedir evaluación',
        paragraphs: [
          'Conviene evaluación profesional si los síntomas persisten varias semanas, empeoran, generan deterioro funcional claro, o si hay uso de alcohol u otras sustancias para modular la ansiedad. También si la evitación reduce de forma progresiva el rango de vida.',
          'Ante ideación suicida, riesgo inmediato o incapacidad de cuidarte: contacta emergencias o una línea de crisis de tu país. Anto puede detectar señales de riesgo y ofrecer recursos; no sustituye servicios de emergencia ni tratamiento clínico.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando la preocupación se vuelve sostenida, puedes describirla y recibir un paso concreto — regulación o posposición — sin pretender resolverlo todo de una vez.',
      afterHeading: 'Intervenciones que suelen ayudar',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto sobre preocupación sostenida',
        messages: [
          {
            role: 'user',
            text: 'Llevo días ensayando lo peor. No es un ataque de pánico, pero el cuerpo no baja.',
          },
          {
            role: 'anto',
            text: 'Eso agota. ¿Es un pico agudo de ahora, o preocupación difícil de controlar desde hace días?',
          },
          {
            role: 'user',
            text: 'Difícil de controlar. Trabajo, salud, varias áreas a la vez.',
          },
          {
            role: 'anto',
            text: 'Primero regulamos un poco la activación. Después podemos probar posponer la preocupación a una ventana, para no reforzar la rumia todo el día.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Posposición de la preocupación', 'Regulación de la activación'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Este texto es el mapa amplio. Para una técnica puntual, una escala o el marco TCC, sigue aquí:',
      links: [
        {
          label: 'Cuando la ansiedad sube (grounding)',
          description:
            'Anclas sensoriales y 5-4-3-2-1 para picos de activación autonómica.',
          href: '/recursos/grounding-ansiedad-crisis',
        },
        {
          label: 'Distorsiones cognitivas (mapa completo)',
          description:
            'Definición clínica, tipos, mantenimiento, reestructuración y relación con ansiedad o depresión.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'PHQ-9 y GAD-7',
          description:
            'Escalas de cribado: qué miden, rangos orientativos y límites frente al diagnóstico.',
          href: '/recursos/escalas-phq9-gad7',
        },
        {
          label: 'Qué es la TCC',
          description:
            'Modelo cognitivo-conductual: pensamientos, emociones, conductas y exposición.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Evidencia que informa Anto',
          description:
            'Cómo leemos TCC, escalas y salud mental digital — y qué no afirmamos. Citas APA con DOI.',
          href: '/investigacion',
        },
        {
          label: 'NIMH — Trastornos de ansiedad (español)',
          description:
            'Material clínico público del National Institute of Mental Health (EE. UU.).',
          href: 'https://www.nimh.nih.gov/health/publications/espanol/trastorno-de-ansiedad-generalizada-cuando-no-se-pueden-controlar-las-preocupaciones-new',
          external: true,
        },
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support:
        'Fuentes revisadas por pares que sustentan distinciones, mecanismos e intervenciones mencionadas arriba. No sustituyen evaluación clínica individual.',
      items: [
        {
          apa: 'Borkovec, T. D., Robinson, E., Pruzinsky, T., & DePree, J. A. (1983a). Preliminary exploration of worry: Some characteristics and processes. Behaviour Research and Therapy, 21(1), 9–16. https://doi.org/10.1016/0005-7967(83)90121-3',
          href: 'https://doi.org/10.1016/0005-7967(83)90121-3',
          note: 'Caracteriza la preocupación como proceso cognitivo y su relación con ansiedad.',
        },
        {
          apa: 'Borkovec, T. D., Wilkinson, L., Folensbee, R., & Lerman, C. (1983b). Stimulus control applications to the treatment of worry. Behaviour Research and Therapy, 21(3), 247–251. https://doi.org/10.1016/0005-7967(83)90206-1',
          href: 'https://doi.org/10.1016/0005-7967(83)90206-1',
          note: 'Base experimental de la posposición / ventana de preocupación (control de estímulos).',
        },
        {
          apa: 'Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T., & Vervliet, B. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy, 58, 10–23. https://doi.org/10.1016/j.brat.2014.04.006',
          href: 'https://doi.org/10.1016/j.brat.2014.04.006',
          note: 'Marco de exposición basado en aprendizaje inhibitorio (vs. solo habituación).',
        },
        {
          apa: 'Hofmann, S. G., & Smits, J. A. J. (2008). Cognitive-behavioral therapy for adult anxiety disorders: A meta-analysis of randomized placebo-controlled trials. The Journal of Clinical Psychiatry, 69(4), 621–632. https://doi.org/10.4088/jcp.v69n0415',
          href: 'https://doi.org/10.4088/jcp.v69n0415',
          note: 'Metaanálisis: eficacia de la TCC frente a placebo en trastornos de ansiedad del adulto.',
        },
        {
          apa: 'Salkovskis, P. M. (1991). The importance of behaviour in the maintenance of anxiety and panic: A cognitive account. Behavioural Psychotherapy, 19(1), 6–19. https://doi.org/10.1017/S0141347300011472',
          href: 'https://doi.org/10.1017/S0141347300011472',
          note: 'Modelo cognitivo de conductas de seguridad y mantenimiento de la ansiedad.',
        },
        {
          apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
          href: 'https://doi.org/10.1001/archinte.166.10.1092',
          note: 'Validación del GAD-7 como escala de cribado y severidad en atención primaria.',
        },
      ],
    },
    relatedSlugs: [SLUGS.grounding, SLUGS.distortionsMap, SLUGS.tcc],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación o tratamiento clínico. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si quieres compañía entre sesiones — o mientras decides pedir evaluación — puedes seguir en el teléfono, a tu ritmo.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Posposición de la preocupación (ventana de worry)',
      description:
        'Técnica de control de estímulos para concentrar la preocupación crónica en un intervalo diario y reducir el refuerzo continuo de la rumia.',
      totalTime: 'PT20M',
      steps: [
        'Define 15–20 minutos fijos y un lugar para la ventana de preocupación.',
        'En esa ventana, anota preocupaciones con detalle sin resolverlas todas.',
        'Fuera de la ventana, si aparece una, regístrala para ese horario y vuelve a la actividad.',
        'Al abrir la ventana, revisa la lista y elige solo una acción conductual pequeña si existe.',
        'Si la intensidad es muy alta, regula la arousal primero (respiración o grounding) y luego escribe.',
      ],
    },
  },
  [SLUGS.scales]: {
    slug: SLUGS.scales,
    readingMinutes: 6,
    meta: {
      title: 'PHQ-9 y GAD-7: qué miden y cómo interpretarlas | Anto',
      description:
        'Guía sobre PHQ-9 (depresión) y GAD-7 (ansiedad): qué miden, cómo interpretarlas y por qué no sirven para autodiagnosticarse. Psicoeducación; no sustituye evaluación clínica.',
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
        'Qué significa la autocompasión en psicología basada en evidencia, por qué no es indulgencia y cómo practicarla en momentos difíciles. Psicoeducación; no sustituye atención profesional.',
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
        'Cómo el sueño afecta el ánimo y la ansiedad, hábitos de higiene del sueño basados en evidencia y cuándo consultar a un especialista. Psicoeducación; no sustituye atención profesional.',
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
        'Qué es el mindfulness, mitos frecuentes, ejercicios de 3–5 minutos y cómo combinarlo con terapia o apoyo digital. Psicoeducación; no sustituye atención profesional.',
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
        'Qué es la depresión, señales frecuentes, diferencia con tristeza normal y estrategias como activación conductual. Psicoeducación; no sustituye diagnóstico ni atención clínica.',
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
        'Qué es la activación conductual, por qué ayuda en depresión y cómo planificar actividades pequeñas aunque no tengas motivación. Psicoeducación; no sustituye atención profesional.',
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
        'Qué es el trastorno obsesivo-compulsivo, cómo funcionan obsesiones y compulsiones, y por qué la ERP es el enfoque con más evidencia. Psicoeducación; no sustituye tratamiento con un profesional.',
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
        'Qué es el trauma psicológico, síntomas frecuentes del TEPT, por qué aparecen flashbacks y cuándo buscar ayuda especializada. Psicoeducación; no sustituye atención profesional.',
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
        'Qué dispara la ira, señales corporales tempranas y técnicas de regulación basadas en TCC para responder con más control. Psicoeducación; no sustituye atención profesional.',
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
    readingMinutes: 7,
    meta: {
      title: 'Cuando la ansiedad sube: técnicas de grounding | Anto',
      description:
        'Grounding y ejercicio 5-4-3-2-1 para ansiedad o crisis: anclas sensoriales, señales en el cuerpo y cuándo pedir ayuda. Psicoeducación práctica con enlaces a material más clínico. No sustituye terapia ni emergencias.',
      openGraphTitle: 'Cuando la ansiedad sube — grounding 5-4-3-2-1',
      openGraphDescription:
        'Aterriza en el presente con cinco sentidos. Guía breve de grounding + camino a lectura más completa sobre ansiedad.',
      keywords:
        'grounding, aterrizaje, ansiedad, crisis, 5-4-3-2-1, cinco sentidos, pánico, psicoeducación, anclas sensoriales, Anto',
    },
    hero: {
      title: 'Cuando la ansiedad sube',
      subtitle:
        'Técnicas de grounding para anclarte al aquí y ahora cuando el cuerpo reacciona como si el peligro fuera inmediato.',
    },
    pullQuote:
      'No se trata de “pensar positivo”. Se trata de volver al cuerpo el tiempo suficiente para que la ola no te arrastre entera.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-desk-rain.webp',
      alt: 'Escritorio de noche con lluvia en la ventana, lámpara y cuaderno abierto — momento quieto para aterrizar cuando la ansiedad sube',
      caption:
        'Lluvia, luz cercana, algo que tocar. El grounding empieza por lo que ya está aquí.',
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: 'Qué es el grounding',
        paragraphs: [
          'Grounding — aterrizaje — son gestos sencillos que llevan la atención a lo que puedes ver, tocar, oír, oler o saborear ahora mismo.',
          'No resuelven lo que duele de fondo. Bajan la activación del sistema nervioso para que puedas pensar un poco más claro, pedir ayuda o esperar a que pase la ola.',
          'Se usan en ansiedad intensa, pánico, disociación leve o cuando un recuerdo te arranca del presente. Son herramientas de estabilización — no un tratamiento por sí solas.',
        ],
      },
      {
        heading: 'Cómo se siente en el cuerpo',
        paragraphs: [
          'Antes de “hacer algo”, ayuda reconocer la señal: corazón acelerado, pecho apretado, manos frías, mente que salta, sensación de no estar del todo aquí.',
        ],
        bullets: [
          'El cuerpo interpreta amenaza aunque no haya peligro objetivo.',
          'El grounding no niega la emoción: le da un marco sensorial más amplio.',
          'Si la intensidad es 9/10, empieza por un solo ancla (pies en el suelo) antes del 5-4-3-2-1 completo.',
        ],
      },
      {
        heading: 'Ejercicio 5-4-3-2-1',
        paragraphs: [
          'Hazlo despacio. Si un sentido no responde, salta al siguiente. No hay nota perfecta: cuenta con lo que encuentres.',
        ],
        ordered: true,
        bullets: [
          '5 cosas que ves — elige detalles concretos (un borde, un color, una sombra), no inventar la habitación entera.',
          '4 cosas que tocas — temperatura, textura, peso. La ropa, el asiento, tus propias manos.',
          '3 cosas que oyes — cerca o lejos: un motor, tu respiración, un reloj, voces en otra habitación.',
          '2 cosas que hueles — o, si no hay olor claro, recuerda uno familiar sin forzar la escena.',
          '1 cosa que saboreas — un trago de agua, el sabor en la boca, o simplemente notar la lengua.',
        ],
      },
      {
        heading: 'Otras opciones rápidas',
        paragraphs: [
          'Si el 5-4-3-2-1 se siente largo, prueba un solo ancla: un cubito de hielo en la mano, nombrar en voz alta dónde estás y qué día es, o empujar suavemente los pies contra el suelo.',
          'También puedes contar hacia atrás de 3 en 3, o describir un objeto como si se lo explicaras a alguien que no puede verlo.',
          'La clave es involucrar sentidos, no analizar el problema en ese momento.',
        ],
      },
      {
        heading: 'Cuándo es crisis',
        paragraphs: [
          'Si hay ideas de hacerte daño, riesgo inmediato o no puedes cuidarte, contacta emergencias o una línea de crisis de tu país.',
          'Anto puede detectar señales de riesgo y ofrecer recursos, pero no sustituye servicios de emergencia.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando la ansiedad sube, puedes escribirlo y recibir un paso concreto — sin presión de “arreglarlo todo”.',
      afterHeading: 'Ejercicio 5-4-3-2-1',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto cuando la ansiedad sube',
        messages: [
          {
            role: 'user',
            text: 'Estoy en 8. El pecho apretado y la mente no baja.',
          },
          {
            role: 'anto',
            text: 'Se siente intensa. Antes de analizarlo, ¿probamos anclarte un momento a lo que hay aquí?',
          },
          {
            role: 'user',
            text: 'Sí. No quiero que se me vaya más.',
          },
          {
            role: 'anto',
            text: 'Empecemos simple: nombra 5 cosas que ves, con detalle concreto. Sin prisa.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Ejercicio 5-4-3-2-1', 'Un solo ancla'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Esta página es práctica y breve. Si quieres el mapa amplio — síntomas, ciclos, estrategias, cuándo pedir ayuda — empieza aquí:',
      links: [
        {
          label: 'Ansiedad y preocupación (mapa completo)',
          description:
            'Activación autonómica, conductas de seguridad, intervenciones tipo TCC, GAD-7 y cuándo pedir evaluación.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Evidencia que informa Anto',
          description:
            'Cómo leemos TCC, escalas y salud mental digital — y qué no afirmamos. Citas APA con DOI.',
          href: '/investigacion',
        },
        {
          label: 'NIMH — Trastornos de ansiedad (español)',
          description: 'Material clínico público del National Institute of Mental Health (EE. UU.).',
          href: 'https://www.nimh.nih.gov/health/publications/espanol/trastorno-de-ansiedad-generalizada-cuando-no-se-pueden-controlar-las-preocupaciones-new',
          external: true,
        },
      ],
    },
    relatedSlugs: [SLUGS.anxiety, SLUGS.mindfulness, SLUGS.trauma],
    disclaimer:
      'Psicoeducación. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Cuando baje un poco la ola, puedes seguir con compañía en el teléfono — sin presión.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Ejercicio de grounding 5-4-3-2-1',
      description:
        'Técnica sensorial para bajar la activación cuando la ansiedad sube: cinco sentidos, un paso a la vez.',
      totalTime: 'PT5M',
      steps: [
        'Nombra 5 cosas que puedes ver, con detalle concreto.',
        'Nota 4 cosas que puedes tocar (textura, temperatura o peso).',
        'Escucha 3 sonidos, cerca o lejos.',
        'Identifica 2 olores, o recuerda uno familiar con calma.',
        'Nota 1 sabor o la sensación en la boca.',
      ],
    },
  },
  [SLUGS.stress]: {
    slug: SLUGS.stress,
    readingMinutes: 6,
    meta: {
      title: 'Estrés: cómo responde el cuerpo y qué hacer | Anto',
      description:
        'Qué es el estrés, señales físicas y emocionales, estrés agudo vs. crónico y formas de cuidarte sin esperar al burnout. Psicoeducación; no sustituye atención profesional.',
      openGraphTitle: 'Estrés — guía de psicoeducación',
      openGraphDescription: 'Entiende la respuesta al estrés y herramientas prácticas para recuperar equilibrio.',
    },
    hero: {
      title: 'Estrés',
      subtitle: 'Cómo responde tu cuerpo ante la presión y formas de cuidarte antes de llegar al agotamiento.',
    },
    sections: [
      {
        heading: 'Estrés agudo vs. crónico',
        paragraphs: [
          'El estrés agudo es la activación breve ante un desafío (examen, plazo, conflicto). Puede ayudarte a concentrarte. El estrés crónico es la tensión sostenida: trabajo exigente, cuidado de otros, inseguridad económica. Ahí el cuerpo deja de recuperarse.',
        ],
      },
      {
        heading: 'Señales frecuentes',
        bullets: [
          'Tensión muscular, dolor de cabeza o estómago',
          'Irritabilidad, impaciencia o llanto fácil',
          'Sueño ligero o mente acelerada',
          'Más enfermedades menores por sistema inmune bajo presión',
        ],
      },
      {
        heading: 'Qué puedes hacer',
        paragraphs: [
          'Prioriza sueño, pausas reales y límites en tareas. Respiración lenta, movimiento breve y hablar con alguien de confianza reducen la carga. Si el estrés dura meses y afecta tu salud, busca apoyo profesional.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'El chat puede ayudarte a ordenar prioridades, practicar micro-pausas y conectar con técnicas de regulación del hub de técnicas.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.burnout, SLUGS.anxiety, SLUGS.mindfulness],
    disclaimer:
      'Material de psicoeducación. No sustituye evaluación médica ni psicológica. Si el estrés incluye síntomas físicos intensos, consulta a un profesional.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
  },
  [SLUGS.emotionRegulation]: {
    slug: SLUGS.emotionRegulation,
    readingMinutes: 6,
    meta: {
      title: 'Regulación emocional: guía práctica | Anto',
      description:
        'Habilidades para reconocer, nombrar y modular emociones intensas sin reprimirlas ni reaccionar en automático. Psicoeducación; no sustituye atención profesional.',
      openGraphTitle: 'Regulación emocional — guía breve',
      openGraphDescription: 'Aprende a reconocer emociones y elegir respuestas más útiles.',
    },
    hero: {
      title: 'Regulación emocional',
      subtitle: 'Habilidades para reconocer y modular emociones — no eliminarlas, sino relacionarte mejor con ellas.',
    },
    sections: [
      {
        heading: 'Qué significa regular',
        paragraphs: [
          'Regular no es «no sentir». Es notar la emoción, entender qué señal trae y elegir una respuesta que encaje con tus valores. Con práctica, reduces reacciones impulsivas y recuperas claridad más rápido.',
        ],
      },
      {
        heading: 'Pasos básicos',
        bullets: [
          'Nombrar la emoción con precisión (no solo «mal»)',
          'Puntuar intensidad del 0 al 10',
          'Pausar antes de actuar si estás por encima de 7',
          'Elegir una acción pequeña: respirar, escribir, caminar, pedir apoyo',
        ],
      },
      {
        heading: 'Herramientas útiles',
        paragraphs: [
          'Mindfulness breve, grounding 5-4-3-2-1, técnica ABC y autocompasión encajan aquí. La clave es usarlas cuando la ola sube, no solo cuando ya pasó la crisis.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Encuentra ejercicios de regulación en el hub de técnicas y en el chat, que puede sugerir micro-pasos según lo que expreses.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.grounding, SLUGS.abc],
    disclaimer:
      'Psicoeducación general. Si las emociones te desbordan de forma recurrente o hay riesgo de daño, busca ayuda profesional.',
    cta: { label: 'Practicar técnicas →', path: '/app' },
  },
  [SLUGS.grief]: {
    slug: SLUGS.grief,
    readingMinutes: 7,
    meta: {
      title: 'Duelo y pérdida: guía de psicoeducación | Anto',
      description:
        'Cómo suele desarrollarse el duelo, mitos frecuentes y formas de acompañarte sin forzar un «cierre» prematuro. Psicoeducación; no sustituye atención profesional.',
      openGraphTitle: 'Duelo y pérdida — guía breve',
      openGraphDescription: 'Entiende el duelo como proceso humano y cómo cuidarte con paciencia.',
    },
    hero: {
      title: 'Duelo y pérdida',
      subtitle: 'Cómo suele desarrollarse el duelo y formas de acompañarte sin apresurar el proceso.',
    },
    sections: [
      {
        heading: 'El duelo no es lineal',
        paragraphs: [
          'Tras una pérdida (muerte, ruptura, salud, proyecto vital) es normal alternar tristeza, rabia, entumecimiento, culpa o incluso alivio. No hay un orden «correcto» ni una fecha de caducidad para sentir.',
        ],
      },
      {
        heading: 'Mitós frecuentes',
        bullets: [
          '«Debería superarlo en X meses» — cada proceso es distinto',
          '«Si lloro menos, ya sané» — el duelo no se mide solo por lágrimas',
          '«Tengo que estar fuerte» — pedir ayuda es parte del cuidado',
        ],
      },
      {
        heading: 'Cómo apoyarte',
        paragraphs: [
          'Mantén rutinas mínimas (sueño, comida, una salida breve). Habla con personas seguras. Reduce exigencias mayores si puedes. Si el aislamiento o la desesperanza persisten mucho tiempo, un profesional puede acompañarte.',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Anto puede ofrecer espacio para ordenar lo que sientes entre sesiones con un terapeuta o red de apoyo; no sustituye duelo terapéutico especializado.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.selfCompassion, SLUGS.emotionRegulation, SLUGS.depression],
    disclaimer:
      'No sustituye terapia de duelo ni atención en crisis. Si tienes ideas de hacerte daño, busca ayuda de emergencia.',
    cta: { label: 'Acompañamiento en Anto →', path: '/bienvenida' },
  },
  [SLUGS.burnout]: {
    slug: SLUGS.burnout,
    readingMinutes: 7,
    meta: {
      title: 'Agotamiento y burnout: señales y primeros pasos | Anto',
      description:
        'Señales de sobrecarga sostenida, diferencia con cansancio normal y pasos iniciales de recuperación. Psicoeducación; no sustituye atención profesional.',
      openGraphTitle: 'Agotamiento y burnout — guía breve',
      openGraphDescription: 'Reconoce el burnout y empieza a recuperar energía con cambios realistas.',
    },
    hero: {
      title: 'Agotamiento y burnout',
      subtitle: 'Señales de sobrecarga sostenida y primeros pasos de recuperación — sin culparte por estar cansado/a.',
    },
    sections: [
      {
        heading: 'Más que estar cansado',
        paragraphs: [
          'El burnout es agotamiento emocional y físico por estrés prolongado, a menudo vinculado a trabajo o cuidado constante. Incluye cinismo, sensación de ineficacia y que descansar un fin de semana ya no alcanza.',
        ],
      },
      {
        heading: 'Señales frecuentes',
        bullets: [
          'Vacío o desconexión de lo que haces',
          'Irritabilidad y dificultad para concentrarte',
          'Sueño que no repara, dolores somáticos',
          'Evitar responsabilidades aunque generen culpa',
        ],
      },
      {
        heading: 'Primeros pasos de recuperación',
        paragraphs: [
          'Identifica fuentes de carga que puedas modular (límites, delegar, pausas reales). Recupera lo básico: sueño, alimentación, movimiento suave. Cambios estructurales (menos horas, apoyo laboral) a veces son necesarios, no solo «más autocuidado».',
        ],
      },
      {
        heading: 'En Anto',
        paragraphs: [
          'Usa tareas/hábitos para micro-descansos, técnicas de regulación y chat para desahogo estructurado. El burnout severo merece evaluación profesional y cambios en la fuente de estrés.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.stress, SLUGS.sleep, SLUGS.selfCompassion],
    disclaimer:
      'Psicoeducación. El burnout puede requerir intervención médica o laboral. Consulta a un profesional si los síntomas son intensos.',
    cta: { label: 'Recuperar rutina con Anto →', path: '/app' },
  },
};

export function getPsychoeducationGuidesEs(): Record<PsychoeducationSlug, PsychoeducationGuide> {
  return guides;
}

export function getPsychoeducationGuideEs(slug: string): PsychoeducationGuide | undefined {
  return guides[slug as PsychoeducationSlug];
}
