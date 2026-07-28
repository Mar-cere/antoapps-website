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
  sleepMap: 'mapa-sueno-e-insomnio' as const,
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
            'Niveles cognitivos, clusters, mantenimiento, experimentos conductuales y perfiles en ansiedad o depresión.',
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
        'Guía breve de distorsiones cognitivas: ejemplos del día a día (catastrofismo, todo o nada, lectura de mente), separar hecho de historia y un ejercicio corto para mirar un pensamiento de cerca. Enlace al mapa clínico (niveles, experimentos). No sustituye atención profesional.',
      openGraphTitle: 'Distorsiones cognitivas — reconocer y cuestionar',
      openGraphDescription:
        'Cuando un silencio se vuelve veredicto: ejemplos cotidianos, hecho vs. historia y el camino al mapa clínico.',
      keywords:
        'distorsiones cognitivas, pensamientos en bucle, mensaje sin respuesta, lectura de mente, hecho vs historia, pensamientos automáticos, catastrofismo, todo o nada, reformulación, guía breve, TCC, técnica ABC, psicoeducación, Anto',
    },
    hero: {
      title: 'Distorsiones cognitivas',
      subtitle:
        'Esos atajos mentales que hacen que un silencio se sienta como un veredicto. Nombrarlos ayuda a no creerlos al instante — sin obligarte a “pensar positivo”.',
      companionLink: {
        href: '/recursos/mapa-distorsiones-cognitivas',
        support: '¿Quieres el mapa clínico?',
        label: 'Ir a la guía completa →',
      },
    },
    pullQuote:
      'A veces la mente no miente del todo. Solo exagera. Y en esa exageración se te va el resto del día.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Manos con el teléfono abierto a un chat sin respuesta y, al lado, un cuaderno con preguntas de lectura de mente escritas a mano',
      caption:
        'El chat no contesta. El cuaderno ya inventó la historia. Separar esas dos cosas es el primer paso.',
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
      body: 'Cuando el silencio del chat ya tiene una historia en el cuaderno, puedes traer esa frase tal cual y mirarla de cerca — sin presión de “arreglarlo todo”.',
      afterHeading: 'Ejercicio: mirar un pensamiento de cerca',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto cuando un mensaje no tiene respuesta y el cuaderno ya inventó la historia',
        messages: [
          {
            role: 'user',
            text: 'Lleva tres horas sin contestar. En el cuaderno me salió: «ya no le importo».',
          },
          {
            role: 'anto',
            text: 'Duele. ¿Eso es un hecho del mensaje, o la historia que estás escribiendo encima?',
          },
          {
            role: 'user',
            text: 'La historia. Pero la siento como verdad.',
          },
          {
            role: 'anto',
            text: 'Escribamos el pensamiento tal cual — y después evidencia a favor y en contra, como si ayudaras a un amigo.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Mirar el pensamiento de cerca', 'Separar hecho de historia'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Esta página es práctica y breve. Si quieres el mapa clínico — niveles, clusters, mantenimiento, experimentos — empieza aquí:',
      links: [
        {
          label: 'Distorsiones cognitivas (mapa completo)',
          description:
            'Niveles cognitivos, clusters, mantenimiento, experimentos conductuales y perfiles en ansiedad o depresión.',
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
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
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
    layout: 'dossier',
    meta: {
      title: 'Distorsiones cognitivas: mapa clínico completo | Anto',
      description:
        'Mapa clínico de distorsiones cognitivas: tres niveles del modelo (automáticos, reglas, creencias nucleares), clusters funcionales, ciclos de mantenimiento, técnicas más allá del etiquetado, diseño de experimentos conductuales, flecha descendente y perfiles en ansiedad vs depresión. Complementa la guía breve; no diagnostica ni sustituye terapia.',
      openGraphTitle: 'Distorsiones cognitivas — mapa clínico',
      openGraphDescription:
        'Más allá de etiquetar el sesgo: niveles cognitivos, mantenimiento, experimentos conductuales y perfiles clínicos.',
      keywords:
        'distorsiones cognitivas, mapa clínico, clusters funcionales, creencias nucleares, experimento conductual, flecha descendente, conductas de seguridad, mantenimiento cognitivo, sesgos de amenaza, reestructuración cognitiva, TCC, Beck, psicoeducación clínica, Anto',
    },
    hero: {
      title: 'Distorsiones cognitivas: mapa completo',
      subtitle:
        'Lo que la guía breve no cubre: niveles del modelo cognitivo, por qué el sesgo se sostiene, técnicas más allá de etiquetar y cómo se ve el patrón en ansiedad o depresión.',
      companionLink: {
        href: '/recursos/distorsiones-cognitivas',
        support: '¿Aún no nominaste un pensamiento?',
        label: 'Empieza por la guía práctica →',
      },
    },
    pullQuote:
      'Etiquetar el sesgo es el primer paso. El trabajo clínico empieza cuando preguntas qué lo sostiene — y qué evidencia nueva podrías crear.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-desk-rain.webp',
      alt: 'Escritorio de noche con lluvia en la ventana, lámpara encendida y cuaderno abierto con bolígrafo — el espacio para registrar una predicción y una prueba',
      caption:
        'Lluvia afuera, predicción en el cuaderno. El mapa clínico se escribe: hipótesis, prueba, dato — no solo se discute.',
      width: 1536,
      height: 1024,
      objectPosition: '38% 58%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Tres niveles del modelo cognitivo',
        paragraphs: [
          'La guía práctica se centra en el pensamiento situacional. Aquí el foco es la arquitectura: en el modelo de Beck, el malestar no se explica solo por un pensamiento aislado, sino por capas que se activan juntas (Beck, 1976; Beck, 2020).',
          'En la superficie aparecen los pensamientos automáticos. Debajo, reglas y “deberías” (creencias intermedias). Más abajo, esquemas sobre sí, el mundo o el futuro (creencias nucleares). La distorsión describe la forma del error en la superficie; el esquema explica por qué ese error se repite en muchas situaciones.',
          'Esta guía es psicoeducación. No diagnostica. Sirve para leer el patrón con más profundidad cuando ya sabes nombrar un pensamiento — no para empezar desde cero.',
        ],
        bullets: [
          'Automático: telegráfico, situacional (“no va a contestar”).',
          'Intermedio: regla o estándar (“si alguien duda, es que fallé”).',
          'Nuclear: esquema estable (“no soy digno de confianza” / “el mundo es peligroso”).',
        ],
      },
      {
        heading: 'Clusters funcionales (no una lista para memorizar)',
        paragraphs: [
          'Memorizar diez nombres aporta poco. En clínica suele agruparse por función: qué sesgo protege o qué amenaza percibida sostiene. Así eliges la intervención, no solo la etiqueta.',
        ],
        bullets: [
          'Amenaza / anticipación: sobrestimar probabilidad o gravedad, tratar predicciones como hechos, exigir certeza imposible.',
          'Autoevaluación: dicotomías de valía, etiquetas globales, imperativos rígidos, filtro que borra matices de competencia.',
          'Interpersonal: atribuir intenciones sin datos, personalizar eventos compartidos, leer silencio como veredicto.',
          'Un mismo episodio puede mezclar clusters (p. ej. amenaza + interpersonal). Importa el dominante para elegir la prueba.',
        ],
      },
      {
        heading: 'Ciclos que mantienen el sesgo',
        paragraphs: [
          'El sesgo no se mantiene solo por “pensar mal”. Se refuerza cuando la conducta baja la ansiedad al instante y bloquea aprendizaje correctivo: evitar, revisar, pedir certeza, rumiar sin actualizar la probabilidad.',
          'La fusión cognitiva — vivir el pensamiento como hecho — sube con hiperactivación. Por eso, en picos altos, primero se regula el arousal; después se diseña una prueba. Si solo “razonas” en 9/10, sueles reforzar la rumia.',
        ],
        bullets: [
          'Confirmación selectiva: buscas o recuerdas solo lo que encaja.',
          'Conductas de seguridad: alivio corto, amenaza intacta a medio plazo.',
          'Rumia: repetición verbal sin experimento ni decisión.',
          'Evitar la desconfirmación: no te expones a datos que podrían matizar el esquema.',
        ],
      },
      {
        heading: 'Técnicas más allá del etiquetado',
        paragraphs: [
          'Nombrar la distorsión (lo que practicas en la guía breve) abre distancia. El siguiente nivel clínico combina evaluación cognitiva con evidencia nueva en la vida real (Beck, 2020). No es discutir contigo hasta rendirte.',
        ],
        bullets: [
          'Descatastrofización estructurada: probabilidad × gravedad × afrontamiento (“si ocurriera, ¿qué harías?”).',
          'Continuum / gradientes: sustituir “perfecto o fracaso” por una escala 0–100 de desempeño o amenaza.',
          'Tarta de responsabilidad: repartir causalidad entre factores (tú, contexto, azar, otros) cuando hay personalización.',
          'Explicaciones alternativas: generar ≥3 lecturas del mismo hecho antes de cerrar la hipótesis.',
          'Experimento conductual: diseñar una prueba pequeña que pueda desconfirmar la predicción.',
          'Trabajo de reglas: pasar de “debería” absoluto a preferencia o estándar flexible.',
        ],
      },
      {
        heading: 'Ejercicio: diseñar un experimento conductual',
        paragraphs: [
          'Distinto del registro de evidencia de la guía breve. Aquí no solo reescribes el pensamiento: creas una situación que pueda aportar datos nuevos. Hazlo fuera del pico (≥8/10 → regula primero).',
          'Ejemplo: predicción «si no reviso el mensaje en dos horas, no podré aguantar la ansiedad y perderé el plan». Experimento: no revisar 90 minutos; anotar ansiedad al minuto 0, 30 y 90; observar si el plan se pierde. Resultado típico: la ansiedad sube y luego baja; el plan no depende de revisar cada cinco minutos.',
        ],
        ordered: true,
        bullets: [
          'Escribe la predicción concreta (qué temes que ocurra si no haces la conducta de seguridad).',
          'Define la conducta de seguridad que vas a suspender o reducir (dosis pequeña).',
          'Elige ventana temporal y medida (ansiedad 0–10, o un hecho observable).',
          'Ejecuta la prueba y registra qué ocurrió vs. qué predijiste.',
          'Extrae una conclusión provisional — no una certeza nueva absoluta.',
          'Si aplica: un siguiente experimento un poco más amplio la semana siguiente.',
        ],
      },
      {
        heading: 'Flecha descendente hacia creencias',
        paragraphs: [
          'Cuando el mismo sesgo reaparece en varios dominios, conviene bajar un nivel: preguntar “si eso fuera cierto, ¿qué diría de mí / del mundo / del futuro?”. Es la flecha descendente hacia reglas o creencias nucleares (Beck, 2020).',
          'No es excavación forzada en una sola sesión. Es un mapa: a veces basta notar la regla (“si no controlo, algo malo pasa”) para elegir experimentos que la pongan a prueba, en lugar de pelear solo con el pensamiento automático del día.',
        ],
        bullets: [
          'Útil cuando el etiquetado ya no cambia la intensidad.',
          'Cuidado: no forzar si hay trauma reciente o desesperanza intensa — prioriza estabilización y evaluación.',
          'La creencia se trata como hipótesis, no como veredicto de identidad.',
        ],
      },
      {
        heading: 'Perfiles en ansiedad y depresión',
        paragraphs: [
          'En ansiedad suelen dominar clusters de amenaza: anticipación, certeza imposible, lectura de mente social, conductas de seguridad. El mantenimiento se entrelaza con evitación.',
          'En depresión suelen dominar autoevaluación negativa estable: filtro, sobregeneralización, etiquetado, personalización interna (“es por cómo soy”). Sin activación conductual, el material cognitivo se queda sin datos nuevos.',
          'Son patrones descriptivos frecuentes, no una regla diagnóstica. El mismo episodio puede mezclar ambos. Si el ánimo está muy bajo, a menudo conviene activar conducta antes de intensificar el debate cognitivo.',
        ],
      },
      {
        heading: 'Criterios clínicos y límites de uso',
        paragraphs: [
          'Conviene evaluación profesional si el patrón es persistente, hay deterioro funcional, anhedonia o desesperanza intensas, sustancias para modular el malestar, o si los experimentos y la reestructuración aumentan la rumia sin alivio.',
          'Ante ideación suicida, riesgo inmediato o incapacidad de cuidarte: emergencias o línea de crisis de tu país. Anto puede detectar señales y ofrecer recursos; no sustituye esos servicios ni el tratamiento clínico.',
        ],
        bullets: [
          'Esta página asume que ya practicaste reconocer un pensamiento (guía breve).',
          'No sustituye formulación clínica individual ni TCC con terapeuta.',
          'Si el trabajo cognitivo desestabiliza, pausa y pide evaluación.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando ya anotaste la predicción, el siguiente paso no es solo razonar: diseñar una prueba pequeña y registrar qué ocurrió de verdad.',
      afterHeading: 'Técnicas más allá del etiquetado',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto al diseñar un experimento conductual con registro escrito',
        messages: [
          {
            role: 'user',
            text: 'Anoté: «si no reviso el chat en una hora, se me va de las manos y pierdo el plan». Ansiedad 7.',
          },
          {
            role: 'anto',
            text: 'Buena predicción escrita. ¿Qué conducta de seguridad vas a pausar en la prueba?',
          },
          {
            role: 'user',
            text: 'No abrir el chat. Sesenta minutos.',
          },
          {
            role: 'anto',
            text: 'Anota ansiedad al minuto 0 y al 60, y si el plan se perdió. Después comparamos predicción vs. dato — sin buscar certeza total.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Diseñar un experimento', 'Registrar predicción vs. dato'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Este texto es el mapa clínico. Para reconocer un pensamiento en el día a día, registrar ABC o leer ansiedad/depresión, sigue aquí:',
      links: [
        {
          label: 'Distorsiones cognitivas (guía breve)',
          description:
            'Entrada práctica: ejemplos cotidianos y ejercicio corto para mirar un pensamiento de cerca.',
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
            'Cuando el cluster de amenaza viene con hiperactivación y evitación.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Depresión: guía breve',
          description:
            'Filtro mental, ánimo bajo y por qué suele hacer falta activación conductual.',
          href: '/recursos/depresion-guia-breve',
        },
        {
          label: 'Activación conductual',
          description:
            'Pasos conductuales cuando el debate cognitivo se queda sin datos nuevos.',
          href: '/recursos/activacion-conductual',
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
        'Fuentes clínicas que sustentan niveles cognitivos, mantenimiento e intervenciones mencionadas arriba. No sustituyen evaluación clínica individual.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Arquitectura cognitiva: interpretaciones, esquemas y malestar emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Automáticos, creencias, flecha descendente, experimentos conductuales y reestructuración.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
          note: 'Taxonomías accesibles de distorsiones (referencia; aquí se usan como clusters, no como lista a memorizar).',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Revisión de metaanálisis sobre la eficacia de la TCC en distintos problemas clínicos.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.behavioralActivation],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación o tratamiento clínico. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si quieres compañía para diseñar una prueba pequeña sobre una predicción — sin presión — puedes seguir en el teléfono.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Diseñar un experimento conductual',
      description:
        'Protocolo breve para convertir una predicción sesgada en una prueba pequeña, medir el resultado y actualizar la hipótesis.',
      totalTime: 'PT20M',
      steps: [
        'Escribe la predicción concreta.',
        'Define la conducta de seguridad a reducir o suspender.',
        'Elige ventana temporal y cómo medirás ansiedad o resultado.',
        'Ejecuta la prueba y registra predicción vs. dato.',
        'Extrae una conclusión provisional.',
        'Si aplica, define un siguiente experimento un poco más amplio.',
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
            'Niveles cognitivos, clusters, mantenimiento, experimentos conductuales y perfiles en ansiedad o depresión.',
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
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'Cuando no puedes dormir | Guía breve Anto',
      description:
        'Guía breve sobre sueño y emociones: por qué la noche amplifica la rumia, hábitos concretos de descanso, un ritual si la mente no para y cuándo pedir ayuda. Psicoeducación; no sustituye atención profesional ni terapia del sueño.',
      openGraphTitle: 'Cuando no puedes dormir — guía breve',
      openGraphDescription:
        'La cama encendida a las 3am: vínculo sueño–ánimo, hábitos útiles y un ritual corto cuando la mente no suelta.',
      keywords:
        'sueño, no puedo dormir, rumiación nocturna, higiene del sueño, insomnio, ansiedad nocturna, hábitos de descanso, 3am, psicoeducación, Anto',
    },
    hero: {
      title: 'Cuando no puedes dormir',
      subtitle:
        'Dormir mejor no cura todo. Pero un sueño pobre amplifica ansiedad, irritabilidad y esa voz que repasa el día cuando el cuerpo ya está en la cama.',
    },
    pullQuote:
      'A las 3am la mente no inventa problemas nuevos. Solo les pone el volumen más alto.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Persona sentada de espaldas en la cama de noche, sábanas revueltas, teléfono aparte en la mesita — la hora en que el sueño no llega',
      caption:
        'La cama hecha un lío. El teléfono aparte. A veces el primer paso es no pelearte con la noche.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '2.4 / 1',
    },
    sections: [
      {
        heading: 'Sueño y emociones',
        paragraphs: [
          'Cuando duermes poco, el sistema nervioso baja la tolerancia al estrés: lo que de día era un roce, de noche se siente como amenaza. Muchas personas notan más rumiación, irritabilidad o despertares a las 3am con preocupaciones en bucle.',
          'No es falta de voluntad. El sueño y el ánimo se empujan mutuamente: mal dormir agrava la ansiedad; la ansiedad dificulta dormir. Esta página es una guía breve — reconocimiento y hábitos útiles — no un protocolo clínico completo de insomnio.',
        ],
      },
      {
        heading: 'Hábitos que suelen ayudar',
        paragraphs: [
          'No hace falta cambiarlo todo esta noche. Si solo eliges uno, empieza por el horario de levantarte. Los hábitos de descanso (a menudo llamados «higiene del sueño») no sustituyen una evaluación si el insomnio ya es persistente, pero sí suelen mejorar la línea base.',
        ],
        bullets: [
          'Horario regular de levantarte (también el fin de semana) — ancla el reloj biológico aunque la noche haya sido irregular.',
          'Rutina de 30–60 minutos sin pantallas antes de dormir: luz tenue, algo quieto, sin scroll.',
          'Cama para dormir y descanso — no trabajo, no reuniones, no «solo un rato» de móvil.',
        ],
      },
      {
        heading: 'Si la mente no para',
        paragraphs: [
          'Cuando el cuerpo está quieto y la cabeza no, pelearte con el pensamiento suele empeorarlo. Prueba un ritual corto en papel (no en el teléfono):',
        ],
        ordered: true,
        bullets: [
          'Escribe tres preocupaciones tal cual aparecen — sin editarlas.',
          'Anota una acción mínima para mañana (aunque sea «revisar el correo a las 10»).',
          'Cierra el papel. Prueba respiración lenta (p. ej. 4-7-8) o un audio breve de relajación.',
          'Si la intensidad sigue alta, sal de la cama a luz tenue un rato; vuelve sin forzarte a «ya deberías dormir».',
        ],
      },
      {
        heading: 'Qué no es esto',
        paragraphs: [
          'Estos hábitos no son terapia cognitivo-conductual para el insomnio (TCC-I), ni un diagnóstico, ni una promesa de «ocho horas perfectas». Tampoco sustituyen revisar causas médicas (dolor, apnea, medicación, turnos).',
          'Si llevas semanas sin dormir bien y el día se te viene abajo, esta guía breve no alcanza: conviene evaluación profesional. Aquí solo damos un primer marco práctico.',
        ],
      },
      {
        heading: 'Cuándo pedir ayuda',
        paragraphs: [
          'Habla con un profesional si el insomnio persiste varias semanas, empeora, o si usas alcohol u otras sustancias para «apagar» la noche. También si el cansancio afecta el trabajo, el ánimo o la seguridad (conducir, cuidar a alguien).',
          'Si hay ideas de hacerte daño, riesgo inmediato o no puedes cuidarte: contacta emergencias o una línea de crisis de tu país. Anto puede ofrecer recursos; no sustituye esos servicios.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando la noche no suelta, puedes decirlo tal cual y recibir un paso concreto — ritual breve o regulación — sin presión de «arreglar el sueño entero».',
      afterHeading: 'Si la mente no para',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto cuando no puedes dormir y la mente no para',
        messages: [
          {
            role: 'user',
            text: 'Son las 3:10. El cuerpo está cansado y la cabeza repasa todo el día.',
          },
          {
            role: 'anto',
            text: 'Agota. ¿Es un pico de ahora, o llevas varias noches así?',
          },
          {
            role: 'user',
            text: 'Varias. Y mirar el móvil solo empeora.',
          },
          {
            role: 'anto',
            text: 'Aparquemos el teléfono. Escribe tres preocupaciones en papel y una acción mínima para mañana — después respiramos un poco, sin pelearte con la cama.',
          },
        ],
      },
      suggestionsLabel: 'Ejemplos en la app',
      suggestions: ['Ritual si la mente no para', 'Bajar la activación'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Esta página es práctica y breve. Si quieres el mapa — tipos, ciclos de mantenimiento, componentes tipo TCC-I y cuándo evaluar — empieza aquí:',
      links: [
        {
          label: 'Sueño e insomnio (mapa completo)',
          description:
            'Presentaciones, ciclo que mantiene el problema, límites de la higiene, componentes tipo TCC-I y criterios de evaluación.',
          href: '/recursos/mapa-sueno-e-insomnio',
        },
        {
          label: 'Ansiedad y preocupación',
          description:
            'Cuando la noche no suelta porque el sistema de amenaza sigue encendido: mapa e intervenciones.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Cuando la ansiedad sube (grounding)',
          description:
            'Anclas sensoriales si el cuerpo está en 8/10 y aún no puedes escribir ni dormir.',
          href: '/recursos/grounding-ansiedad-crisis',
        },
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support:
        'Revisiones que sustentan el vínculo sueño–ánimo y el papel de los hábitos de descanso. No sustituyen evaluación clínica individual.',
      items: [
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Revisa evidencia de hábitos de descanso (horario, pantallas, asociación cama–sueño) en población general.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'Metaanálisis longitudinal: el insomnio predice mayor riesgo de depresión — el vínculo sueño–ánimo no es solo subjetivo.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación médica o terapia del sueño. El insomnio persistente puede requerir atención profesional. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si esta noche solo necesitas que alguien baje el volumen contigo — sin presión — puedes seguir en el teléfono.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Ritual si la mente no para',
      description:
        'Ejercicio breve en papel para aparcar preocupaciones nocturnas y bajar la pelea con la cama.',
      totalTime: 'PT10M',
      steps: [
        'Escribe tres preocupaciones tal cual aparecen.',
        'Anota una acción mínima para mañana.',
        'Cierra el papel y prueba respiración lenta o un audio breve de relajación.',
        'Si sigue alta la activación, sal a luz tenue un rato y vuelve sin forzarte.',
      ],
    },
  },
  [SLUGS.sleepMap]: {
    slug: SLUGS.sleepMap,
    readingMinutes: 12,
    layout: 'dossier',
    meta: {
      title: 'Sueño e insomnio: mapa completo | Anto',
      description:
        'Mapa de sueño e insomnio: presentaciones frecuentes, ciclo de mantenimiento, límites de la higiene del sueño, componentes tipo TCC-I (control de estímulos, ventana de sueño, cognición), vínculo con ansiedad/ánimo y cuándo pedir evaluación. Complementa la guía breve; no diagnostica ni sustituye terapia del sueño.',
      openGraphTitle: 'Sueño e insomnio — mapa completo',
      openGraphDescription:
        'Más allá de una mala noche: qué sostiene el insomnio, qué aporta la higiene y qué suele hacer la TCC-I.',
      keywords:
        'insomnio, sueño, mapa sueño, TCC-I, higiene del sueño, control de estímulos, restricción de sueño, ventana de sueño, rumiación nocturna, ansiedad nocturna, psicoeducación, Anto',
    },
    hero: {
      title: 'Sueño e insomnio: mapa completo',
      subtitle:
        'Lo que la guía breve no cubre: presentaciones, el ciclo que mantiene el problema, límites de la higiene y componentes tipo TCC-I — sin pretender sustituir una terapia del sueño.',
      companionLink: {
        href: '/recursos/higiene-sueno-salud-mental',
        support: '¿Aún no tienes un ritual para esta noche?',
        label: 'Empieza por la guía práctica →',
      },
    },
    pullQuote:
      'La higiene del sueño prepara el terreno. El trabajo clínico empieza cuando miras qué hace la cama, el reloj y la mente a las 3am.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Persona sentada de espaldas en la cama de noche, sábanas revueltas, teléfono aparte — el momento en que el mapa del sueño se vuelve necesario',
      caption:
        'No es solo «acostarse más temprano». Es entender qué sostiene la pelea con la noche.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Más allá de una mala noche',
        paragraphs: [
          'Todo el mundo tiene noches malas. El insomnio, en sentido clínico amplio, habla de dificultad recurrente para conciliar, mantener el sueño o despertar demasiado temprano — con cansancio diurno, irritabilidad o deterioro funcional. No basta “estar cansado”: importa la frecuencia, la duración y el impacto en el día.',
          'La guía breve da hábitos y un ritual nocturno. Este mapa añade arquitectura: qué presentaciones se ven, qué conductas mantienen el problema, hasta dónde llega la higiene y qué componentes usa la terapia cognitivo-conductual para el insomnio (TCC-I) — psicoeducación, no protocolo autodirigido completo (Trauer et al., 2015).',
          'Esta página no diagnostica. Sirve cuando ya reconoces el patrón nocturno y quieres leerlo con más profundidad.',
        ],
      },
      {
        heading: 'Presentaciones frecuentes (no diagnóstico)',
        paragraphs: [
          'En la práctica se describen patrones — no etiquetas que puedas autoasignarte. Pueden coexistir o cambiar con el tiempo:',
        ],
        bullets: [
          'Inicio: tardas mucho en quedarte dormido; la cama se asocia a “ahora empieza la pelea”.',
          'Mantenimiento: te despiertas y cuesta volver; mirar el reloj suele empeorar la activación.',
          'Despertar precoz: el día empieza antes de que el cuerpo esté listo; a veces con rumia o ánimo bajo.',
          'Agudo vs. persistente: días/semanas tras un estrés vs. patrón de ≥1 mes con impacto diurno.',
          'Comórbido: el sueño se entrelaza con ansiedad, depresión, dolor, turnos o estimulantes — no “solo higiene”.',
        ],
      },
      {
        heading: 'El ciclo que mantiene el insomnio',
        paragraphs: [
          'Un modelo clásico distingue predisposición, precipitante y perpetuación (Spielman et al., 1987): puede haber vulnerabilidad (ansiedad, ritmo irregular), un gatillo (estrés, viaje, enfermedad) y luego conductas que mantienen el problema aunque el gatillo ya pasó.',
          'El mantenimiento suele ser conductual y cognitivo: más tiempo en cama “por si acaso”, siestas de compensación, cafeína para sobrevivir el día, reloj en la mesita, pelearte con el pensamiento, usar el móvil “solo un minuto”. El alivio corto refuerza el miedo a no dormir.',
        ],
        bullets: [
          'Cama = amenaza: el cuerpo se activa al acostarse porque anticipa otra noche mala.',
          'Reloj y checking: cada mirada confirma “ya son las 3:40” y sube la arousal.',
          'Extensión de tiempo en cama: más horas acostado no igual a más sueño; baja la eficiencia.',
          'Compensaciones diurnas: siesta larga, cafeína tarde, cancelar planes — sostienen el ciclo.',
        ],
      },
      {
        heading: 'Límites de la higiene del sueño',
        paragraphs: [
          'Los hábitos de descanso (horario, cafeína, pantallas, ambiente) se asocian con mejor sueño en población general, pero la evidencia de paquetes “higiene sola” como tratamiento del insomnio clínico es limitada (Irish et al., 2015). Sirven como línea base; rara vez bastan cuando el ciclo de mantenimiento ya está instalado.',
          'Úsalas sin convertirlas en otra exigencia nocturna. Si la lista de reglas se vuelve rumia (“fallé el protocolo”), estás reforzando el problema que querías resolver.',
        ],
        bullets: [
          'Útil: reducir cafeína tarde, luz tenue, cama no-oficina, horario de levantarte estable.',
          'Insuficiente sola: semanas de insomnio con deterioro, miedo intenso a no dormir, apnea sospechada.',
          'La higiene prepara; no sustituye control de estímulos, ventana de sueño ni trabajo cognitivo cuando hacen falta.',
        ],
      },
      {
        heading: 'Componentes tipo TCC-I',
        paragraphs: [
          'La TCC-I combina varios módulos; los metaanálisis la sitúan como intervención eficaz para insomnio crónico en adultos (Trauer et al., 2015). Aquí se describen para orientarte — no para autodosificar restricción de sueño sin acompañamiento.',
        ],
        bullets: [
          'Control de estímulos: cama y habitación asociadas a sueño/sexo; si no hay sueño, salir a luz tenue y volver sin forzar.',
          'Ventana / restricción de sueño: acotar el tiempo en cama para subir eficiencia — potencia alta; mejor con guía clínica si hay somnolencia diurna peligrosa.',
          'Trabajo cognitivo: bajar catastrofismo nocturno (“si no duermo, mañana será un desastre”) y fusión con el pensamiento.',
          'Relajación / regulación: bajar arousal antes o durante la noche (respiración, relajación muscular) sin pelearte con “tengo que dormirme ya”.',
          'Higiene como apoyo: no como módulo único cuando el mantenimiento ya es conductual.',
        ],
      },
      {
        heading: 'Ejercicio: control de estímulos (noche)',
        paragraphs: [
          'Versión psicoeducativa del control de estímulos. Si hay somnolencia extrema al volante, apnea sospechada o depresión grave, prioriza evaluación antes de experimentos con el sueño.',
        ],
        ordered: true,
        bullets: [
          'Acuéstate solo cuando tengas sueño — no “porque ya toca” con el cuerpo en 8/10 de activación.',
          'Cama para dormir (y sexo): no trabajo, no scroll, no discusiones largas.',
          'Si no concilias ~20 minutos, sal a otra estancia con luz tenue; haz algo quieto sin pantallas brillantes.',
          'Vuelve a la cama cuando baje un poco la activación; repite sin castigarte.',
          'Levántate a la misma hora todos los días — ancla el reloj aunque la noche haya sido irregular.',
          'Anota tres noches: ¿cuánto tiempo en cama vs. sueño aproximado? Solo observación, no juicio.',
        ],
      },
      {
        heading: 'Sueño, ansiedad y ánimo',
        paragraphs: [
          'El vínculo es bidireccional: el insomnio predice mayor riesgo de depresión en estudios longitudinales (Baglioni et al., 2011); la ansiedad mantiene la hiperactivación que dificulta dormir. Tratar solo “el pensamiento” o solo “el colchón” suele quedarse corto.',
          'Si de noche domina la amenaza anticipatoria, el mapa de ansiedad y el grounding ayudan en el pico. Si de día pesa el ánimo bajo y la inercia, activación conductual y evaluación del ánimo pueden ser el siguiente paso — en paralelo a hábitos de sueño, no en vez.',
        ],
      },
      {
        heading: 'Cuándo pedir evaluación',
        paragraphs: [
          'Conviene evaluación profesional si el patrón dura semanas, empeora, hay deterioro laboral o de seguridad (conducir, cuidar), uso de alcohol/sedantes para “apagar”, o signos de otro trastorno del sueño (ronquidos intensos, pausas respiratorias, piernas inquietas).',
          'Ante ideación suicida, riesgo inmediato o incapacidad de cuidarte: emergencias o línea de crisis de tu país. Anto puede ofrecer recursos; no sustituye esos servicios ni TCC-I con un clínico del sueño.',
        ],
        bullets: [
          'Esta página asume que ya tienes un ritual breve (guía práctica).',
          'No sustituye polisomnografía, ajuste de medicación ni formulación individual.',
          'Si la restricción de sueño o los experimentos aumentan el malestar, pausa y pide evaluación.',
        ],
      },
    ],
    productMoment: {
      title: 'Así se ve en Anto',
      body: 'Cuando ya ves el ciclo — cama, reloj, rumia — puedes describirlo y recibir un paso concreto: salir de la cama, ritual en papel o bajar activación — sin pretender “arreglar el sueño entero” en una noche.',
      afterHeading: 'Componentes tipo TCC-I',
      chat: {
        ariaLabel: 'Ejemplo de conversación en Anto sobre el ciclo que mantiene el insomnio',
        messages: [
          {
            role: 'user',
            text: 'Llevo semanas. Me acuesto temprano “por si acaso”, miro el reloj y a las 3am ya estoy derrotado.',
          },
          {
            role: 'anto',
            text: 'Eso suena a ciclo de mantenimiento: más tiempo en cama + checking. ¿Esta noche podemos probar salir a luz tenue si no hay sueño en ~20 minutos?',
          },
          {
            role: 'user',
            text: 'Sí. Miedo a no dormir mañana, pero el móvil solo empeora.',
          },
          {
            role: 'anto',
            text: 'Aparquemos el teléfono. Si no hay sueño, sal un rato quieto — y mantén la hora de levantarte. Después vemos qué pasó vs. lo que temías.',
          },
        ],
      },
      suggestionsLabel: 'Sugerencias',
      suggestions: ['Control de estímulos', 'Ritual si la mente no para'],
    },
    furtherReading: {
      title: 'Ir más a fondo',
      support:
        'Este texto es el mapa. Para el ritual de esta noche, ansiedad en pico o evidencia Anto, sigue aquí:',
      links: [
        {
          label: 'Cuando no puedes dormir (guía breve)',
          description:
            'Entrada práctica: hábitos, ritual si la mente no para y cuándo pedir ayuda.',
          href: '/recursos/higiene-sueno-salud-mental',
        },
        {
          label: 'Ansiedad y preocupación',
          description:
            'Cuando el mantenimiento nocturno viene con hiperactivación y evitación diurna.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Cuando la ansiedad sube (grounding)',
          description:
            'Anclas sensoriales si el cuerpo está en 8/10 antes de cualquier experimento de sueño.',
          href: '/recursos/grounding-ansiedad-crisis',
        },
        {
          label: 'Depresión: guía breve',
          description:
            'Cuando el despertar precoz o el cansancio se entrelazan con ánimo bajo.',
          href: '/recursos/depresion-guia-breve',
        },
        {
          label: 'Evidencia que informa Anto',
          description:
            'Cómo leemos TCC, sueño y salud mental digital — y qué no afirmamos.',
          href: '/investigacion',
        },
        {
          label: 'MedlinePlus — Insomnio (español)',
          description:
            'Material público de los NIH (EE. UU.) sobre causas, síntomas y cuándo buscar atención.',
          href: 'https://medlineplus.gov/spanish/insomnia.html',
          external: true,
        },
      ],
    },
    references: {
      title: 'Referencias (APA)',
      support:
        'Fuentes que sustentan mantenimiento, higiene y eficacia de la TCC-I. No sustituyen evaluación clínica individual.',
      items: [
        {
          apa: 'Spielman, A. J., Caruso, L. S., & Glovinsky, P. B. (1987). A behavioral perspective on insomnia treatment. Psychiatric Clinics of North America, 10(4), 541–553.',
          href: 'https://pubmed.ncbi.nlm.nih.gov/3332317/',
          note: 'Modelo 3P (predisposición, precipitante, perpetuación) del mantenimiento del insomnio.',
        },
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Límites y utilidad de la higiene del sueño en población general vs. tratamiento clínico.',
        },
        {
          apa: 'Trauer, J. M., Qian, M. Y., Doyle, J. S., Rajaratnam, S. M. W., & Cunnington, D. (2015). Cognitive behavioral therapy for chronic insomnia: A systematic review and meta-analysis. Annals of Internal Medicine, 163(3), 191–204. https://doi.org/10.7326/M14-2841',
          href: 'https://doi.org/10.7326/M14-2841',
          note: 'Metaanálisis: la TCC-I mejora latencia, despertares y eficiencia del sueño en insomnio crónico.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'El insomnio predice mayor riesgo de depresión — el vínculo sueño–ánimo no es solo subjetivo.',
        },
      ],
    },
    relatedSlugs: [SLUGS.sleep, SLUGS.anxiety, SLUGS.grounding],
    disclaimer:
      'Psicoeducación. No diagnostica ni sustituye evaluación médica, polisomnografía ni TCC-I con un profesional. Ante riesgo suicida o violencia, busca ayuda de emergencia local de inmediato.',
    ctaBridge:
      'Si quieres compañía para mirar el ciclo de esta noche — sin presión de “arreglarlo todo” — puedes seguir en el teléfono.',
    cta: { label: 'Apoyo en Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Control de estímulos (noche)',
      description:
        'Protocolo breve para reasociar la cama al sueño: salir si no hay conciliación, luz tenue y hora de levantarte estable.',
      totalTime: 'PT30M',
      steps: [
        'Acuéstate cuando tengas sueño, no solo por horario.',
        'Reserva la cama para dormir (y sexo); sin pantallas ni trabajo.',
        'Si no hay sueño en ~20 minutos, sal a luz tenue y vuelve sin forzar.',
        'Mantén la misma hora de levantarte al día siguiente.',
        'Observa tres noches tiempo en cama vs. sueño aproximado.',
      ],
    },
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
      src: '/assets/images/editorial/anto-editorial-hero-evening.webp',
      alt: 'Persona sentada de espaldas en la cama al anochecer, mirando la ciudad por la ventana — el momento quieto cuando la ansiedad sube',
      caption:
        'La ola llega de noche. El grounding empieza por lo que ya está aquí: luz, cuerpo, ventana.',
      width: 1536,
      height: 1024,
      objectPosition: '50% 40%',
      desktopAspectRatio: '3 / 2',
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
