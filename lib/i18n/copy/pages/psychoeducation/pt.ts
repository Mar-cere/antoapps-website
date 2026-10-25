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
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'Pensamentos, emoções e comportamento (TCC) | Guia breve Anto',
      description:
        'Guia breve de terapia cognitivo-comportamental (TCC): como pensamento, emoção e comportamento se ligam, um exemplo do dia a dia e um passo pequeno para olhar a interpretação. Porta de entrada para distorções e ABC. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Pensamentos, emoções e o que você faz depois',
      openGraphDescription:
        'TCC em versão breve: não é pensar positivo — é olhar a interpretação e testar um passo pequeno.',
      keywords:
        'TCC, terapia cognitivo-comportamental, pensamentos emoções comportamento, pensamentos automáticos, interpretação, evidência a favor e contra, técnica ABC, distorções cognitivas, ansiedade, depressão, guia breve, psicoeducação, Anto',
    },
    hero: {
      title: 'Pensamentos, emoções e o que você faz depois',
      subtitle:
        'A terapia cognitivo-comportamental (TCC) em versão breve: não é pensar positivo — é olhar a interpretação e testar um passo pequeno.',
      scanLink: {
        label: 'Ir ao exemplo →',
        sectionHeading: 'Exemplo do dia a dia',
      },
    },
    pullQuote:
      'O fato não mudou. Mudou a história que você contou por cima — e, com ela, o que você fez depois.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Mãos com o celular aberto num chat sem resposta e, ao lado, um caderno com perguntas escritas à mão',
      caption:
        'O chat não responde. A mente já escreveu o veredito. É aí que o trabalho da TCC começa.',
      width: 1536,
      height: 1024,
      objectPosition: '42% 52%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'A ideia central',
        paragraphs: [
          'Nem sempre reagimos aos fatos em si, e sim ao jeito como os interpretamos. A mesma mensagem sem resposta pode ser «está ocupado» ou «eu já não importo» — e o corpo responde a essa história.',
          'A TCC trabalha em três níveis ligados: pensamentos, emoções e comportamentos. O objetivo não é «pensar positivo». É perceber padrões que não ajudam e testar alternativas mais realistas, com um passo que dá para fazer.',
        ],
      },
      {
        heading: 'Para que costuma ser usada?',
        paragraphs: [
          'É uma das intervenções psicológicas com mais respaldo para ansiedade, depressão, fobias, insônia e estresse prolongado (Hofmann et al., 2012). Não substitui uma avaliação clínica, mas oferece ferramentas concretas para o dia a dia.',
        ],
        bullets: [
          'Identificar pensamentos automáticos diante de situações difíceis',
          'Questionar interpretações extremas ou pouco realistas',
          'Testar comportamentos pequenos que interrompam o ciclo de evitação',
          'Registrar emoções e padrões para ver se algo se move',
        ],
      },
      {
        heading: 'Exemplo do dia a dia',
        paragraphs: [
          'Uma mensagem para um amigo fica sem resposta. Pensamento automático: «fiz algo errado e essa pessoa já não quer falar comigo». Isso pode acender tristeza ou ansiedade e levar você a evitar escrever de novo.',
          'O passo seguinte: evidência a favor e contra, outras explicações (está ocupado, não viu a mensagem) e uma ação pequena — uma mensagem curta, ou esperar um pouco antes de fechar a conclusão.',
        ],
      },
      {
        heading: 'O que isto não é',
        paragraphs: [
          'Esta página é o enquadramento breve. Não é um protocolo clínico completo nem um mapa de técnicas de TCC — isso fica para uma guia mais profunda. Também não é terapia com um profissional.',
          'Olhar uma interpretação não apaga o que você sente. Às vezes o pensamento aponta para algo real; o que entorta é a certeza absoluta.',
        ],
      },
      {
        heading: 'Quando pedir ajuda',
        paragraphs: [
          'Fale com um profissional se esses ciclos não cedem, se tiram o sono, o trabalho ou a vontade de estar com gente, ou se a ruminação não deixa margem para agir.',
          'Se houver ideias de se machucar, risco imediato ou você não consegue cuidar de si: fale com a emergência ou uma linha de crise do seu país. A Anto pode oferecer recursos; não substitui esses serviços.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Quando o silêncio do chat já tem uma história por cima, você pode trazer essa frase como ela veio e olhar a evidência — sem a pressão de «resolver tudo».',
      afterHeading: 'Exemplo do dia a dia',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto quando uma mensagem fica sem resposta',
        messages: [
          {
            role: 'user',
            text: 'Faz horas que não responde. Já inventei que estou em apuros.',
          },
          {
            role: 'anto',
            text: 'Dói. Isso é um fato da mensagem, ou a história que você está escrevendo por cima?',
          },
          {
            role: 'user',
            text: 'A história. Mas eu sinto como se fosse verdade.',
          },
          {
            role: 'anto',
            text: 'Vamos anotar o pensamento como ele veio — e depois a evidência a favor e contra. Em seguida, uma ação pequena, sem forçar.',
          },
        ],
      },
      suggestionsLabel: 'Sugestões',
      suggestions: ['Separar fato de história', 'Evidência a favor e contra'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Esta página é o enquadramento breve. Para padrões concretos ou um registro da situação:',
      links: [
        {
          label: 'Distorções cognitivas (guia breve)',
          description:
            'Exemplos do dia a dia e um exercício curto para olhar um pensamento de perto.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'Técnica ABC',
          description:
            'Registro da situação: o que aconteceu → o que você disse a si → o que sentiu e fez.',
          href: '/recursos/tecnica-abc',
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes que sustentam o enquadramento da TCC e a evidência. Não substituem uma avaliação pessoal.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Enquadramento fundador: o papel das interpretações no sofrimento emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Manual clínico de TCC: pensamentos automáticos e reestruturação cognitiva.',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Revisão de metanálises: eficácia da TCC em vários transtornos.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortionsMap, SLUGS.anxiety],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação ou tratamento clínico. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser companhia para olhar uma interpretação de perto — sem pressão — pode continuar no celular.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Olhar uma interpretação (passo curto)',
      description:
        'Exercício breve no estilo da TCC: anotar o pensamento, revisar a evidência e escolher uma ação pequena.',
      totalTime: 'PT8M',
      steps: [
        'Escreva o pensamento automático como ele aparece.',
        'Liste evidência a favor e contra, como se estivesse ajudando um amigo.',
        'Anote uma ou duas explicações alternativas.',
        'Escolha uma ação pequena (mensagem curta, esperar, ou pedir ajuda).',
      ],
    },
  },
  [SLUGS.distortions]: {
    slug: SLUGS.distortions,
    readingMinutes: 8,
    meta: {
      title: 'Distorções cognitivas: reconhecer e questionar | Anto',
      description:
        'Guia breve de distorções cognitivas: exemplos do dia a dia (catastrofização, tudo ou nada, leitura mental), separar fato de história e um exercício curto para olhar um pensamento de perto. Link para o mapa clínico (níveis, experimentos). Não substitui atendimento profissional.',
      openGraphTitle: 'Distorções cognitivas — reconhecer e questionar',
      openGraphDescription:
        'Quando um silêncio vira veredito: exemplos do dia a dia, fato versus história e o caminho até o mapa clínico.',
      keywords:
        'distorções cognitivas, pensamentos em loop, mensagem sem resposta, leitura mental, fato versus história, pensamentos automáticos, catastrofização, tudo ou nada, reformulação, guia breve, TCC, técnica ABC, psicoeducação, Anto',
    },
    hero: {
      title: 'Distorções cognitivas',
      subtitle:
        'Atalhos mentais que fazem um silêncio parecer um veredito. Nomeá-los ajuda a não acreditar na hora — sem a obrigação de “pensar positivo”.',
      companionLink: {
        href: '/recursos/mapa-distorsiones-cognitivas',
        support: 'Quer o mapa clínico?',
        label: 'Ir para a guia completa →',
      },
    },
    pullQuote:
      'Às vezes a mente não mente de todo. Só exagera. E nesse exagero o resto do dia some.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Mãos com o celular aberto num chat sem resposta e, ao lado, um caderno com perguntas de leitura mental escritas à mão',
      caption:
        'O chat não responde. O caderno já inventou a história. Separar as duas coisas é o primeiro passo.',
      width: 1536,
      height: 1024,
      /*
       * Cena densa: o caderno (leitura mental escrita) fica embaixo.
       * Manter 3/2 no desktop evita o panorâmico que come a história.
       */
      objectPosition: '42% 52%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'O que são',
        paragraphs: [
          'Distorções cognitivas são atalhos que a mente toma sob estresse, cansaço ou medo. Não significam que você “pensa errado”: são hábitos. Úteis para atravessar um momento intenso; pouco confiáveis como mapa do dia.',
          'Na prática, nomear uma já muda alguma coisa: “isso soa a catastrofização” em vez de “as coisas são assim”. Não é calar a mente. É ganhar um pouco de ar antes de decidir o que fazer.',
          'Antes do nome, costuma haver um sinal: o corpo tensiona, a emoção sobe rápido e o pensamento chega fechado, como se já fosse verdade.',
        ],
        bullets: [
          'Vontade de acreditar na hora (“pronto, é assim”).',
          'Palavras absolutas: sempre, nunca, todo mundo, impossível.',
          'Ansiedade, vergonha ou raiva que chegam antes de olhar os fatos.',
        ],
      },
      {
        heading: 'Exemplos do dia a dia',
        paragraphs: [
          'Não precisa decorar uma lista. Vale reconhecer as que mais se repetem em você:',
        ],
        bullets: [
          'Tudo ou nada: «se não sair perfeito, é um fracasso total».',
          'Catastrofização: «se eu errar na reunião, acabou a minha carreira».',
          'Leitura mental: «com certeza acha que eu sou um chato».',
          'Supergeneralização: um tropeço vira «sempre acontece comigo».',
        ],
      },
      {
        heading: 'Exercício: olhar um pensamento de perto',
        paragraphs: [
          'Faça quando não estiver no pico. Se estiver em 8 ou 9, primeiro baixe um pouco (respirar, pés no chão, um pouco de grounding) e só então escreva.',
        ],
        ordered: true,
        bullets: [
          'Escreva o pensamento como ele aparece — sem editar nem “consertar”.',
          'Dê um nome provisório (catastrofização, tudo ou nada, leitura mental…).',
          'Dê uma nota de 0 a 10 para como você se sente.',
          'Anote que evidência há a favor e contra, como se estivesse ajudando um amigo.',
          'Escreva uma versão mais equilibrada e, se couber, uma ação pequena.',
        ],
      },
      {
        heading: 'O que isto não é',
        paragraphs: [
          'Olhar uma distorção não é “pensar positivo” nem tirar o peso do que você sente. Às vezes o pensamento aponta para algo real; o que entorta é o absoluto ou a certeza impossível.',
          'Também não é um diagnóstico. Ver um padrão não diz quem você é: diz que hábito se acendeu. E hábitos dá para treinar — sozinho ou com ajuda.',
        ],
      },
      {
        heading: 'Quando pedir ajuda',
        paragraphs: [
          'Vale falar com um profissional se esses ciclos não cedem, se tiram o sono, o trabalho ou a vontade de estar com gente, ou se a ruminação não deixa margem para agir.',
          'Se houver ideias de se machucar, risco imediato ou você não consegue cuidar de si: procure a emergência ou uma linha de crise do seu país. A Anto pode oferecer recursos; não substitui esses serviços.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Quando o silêncio do chat já tem uma história no caderno, você pode trazer essa frase como ela veio e olhar de perto — sem a pressão de “resolver tudo”.',
      afterHeading: 'Exercício: olhar um pensamento de perto',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto quando uma mensagem fica sem resposta e o caderno já inventou a história',
        messages: [
          {
            role: 'user',
            text: 'Faz três horas que não responde. No caderno saiu: «eu já não importo».',
          },
          {
            role: 'anto',
            text: 'Dói. Isso é um fato da mensagem, ou a história que você está escrevendo por cima?',
          },
          {
            role: 'user',
            text: 'A história. Mas eu sinto como se fosse verdade.',
          },
          {
            role: 'anto',
            text: 'Vamos escrever o pensamento como ele veio — e depois a evidência a favor e contra, como se você estivesse ajudando um amigo.',
          },
        ],
      },
      suggestionsLabel: 'Sugestões',
      suggestions: ['Olhar o pensamento de perto', 'Separar fato de história'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Esta página é prática e breve. Se você quiser o mapa clínico — níveis, agrupamentos, manutenção, experimentos — comece aqui:',
      links: [
        {
          label: 'Distorções cognitivas (mapa completo)',
          description:
            'Níveis cognitivos, agrupamentos, manutenção, experimentos comportamentais e perfis na ansiedade ou na depressão.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'Pensamentos, emoções e comportamento (TCC)',
          description:
            'Enquadramento breve: como interpretação, emoção e o que você faz depois se ligam — antes do mapa de distorções.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Técnica ABC',
          description:
            'Um registro simples: o que aconteceu → o que você disse a si → o que sentiu e fez.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Ansiedade e preocupação',
          description:
            'Quando o pensamento catastrófico chega com o corpo acelerado: mapa e intervenções.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes clássicas de TCC sobre pensamentos automáticos e distorções. Não substituem uma avaliação pessoal.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Enquadramento fundador da terapia cognitiva e o papel das interpretações no sofrimento emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Manual clínico de TCC: identificação de pensamentos automáticos e reestruturação cognitiva.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
          note: 'Catálogo acessível de distorções cognitivas e exercícios de questionamento para o leitor geral.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação ou tratamento clínico. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser companhia para olhar um pensamento de perto — sem pressão — pode continuar no celular.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Olhar um pensamento de perto',
      description:
        'Exercício breve para nomear um pensamento automático, revisar a evidência e escrever uma versão mais equilibrada.',
      totalTime: 'PT10M',
      steps: [
        'Escreva o pensamento automático como ele aparece.',
        'Dê um nome provisório (catastrofização, tudo ou nada, etc.).',
        'Dê uma nota de 0 a 10 para como você se sente.',
        'Liste evidência a favor e contra.',
        'Escreva uma versão mais equilibrada e uma ação pequena, se fizer falta.',
      ],
    },
  },
  [SLUGS.distortionsMap]: {
    slug: SLUGS.distortionsMap,
    readingMinutes: 12,
    layout: 'dossier',
    meta: {
      title: 'Distorções cognitivas: mapa clínico completo | Anto',
      description:
        'Mapa clínico de distorções cognitivas: três níveis do modelo (automáticos, regras, crenças nucleares), agrupamentos funcionais, ciclos de manutenção, técnicas além do rótulo, desenho de experimentos comportamentais, seta descendente e perfis na ansiedade versus depressão. Complementa a guia breve; não diagnostica nem substitui terapia.',
      openGraphTitle: 'Distorções cognitivas — mapa clínico',
      openGraphDescription:
        'Além de rotular o viés: níveis cognitivos, manutenção, experimentos comportamentais e perfis clínicos.',
      keywords:
        'distorções cognitivas, mapa clínico, agrupamentos funcionais, crenças nucleares, experimento comportamental, seta descendente, comportamentos de segurança, manutenção cognitiva, vieses de ameaça, reestruturação cognitiva, TCC, Beck, psicoeducação clínica, Anto',
    },
    hero: {
      title: 'Distorções cognitivas: mapa completo',
      subtitle:
        'O que a guia breve não cobre: níveis do modelo cognitivo, por que o viés se sustenta, técnicas além do rótulo e como o padrão aparece na ansiedade ou na depressão.',
      companionLink: {
        href: '/recursos/distorsiones-cognitivas',
        support: 'Ainda não nomeou um pensamento?',
        label: 'Comece pela guia prática →',
      },
    },
    pullQuote:
      'Rotular o viés é o primeiro passo. O trabalho clínico começa quando você pergunta o que o sustenta — e que evidência nova daria para criar.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-desk-rain.webp',
      alt: 'Escrivaninha à noite com chuva na janela, abajur aceso e caderno aberto com caneta — o espaço para registrar uma previsão e um teste',
      caption:
        'Chuva lá fora, previsão no caderno. O mapa clínico se escreve: hipótese, teste, dado — não só se discute.',
      width: 1536,
      height: 1024,
      objectPosition: '38% 58%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Três níveis do modelo cognitivo',
        paragraphs: [
          'A guia prática fica no pensamento da situação. Aqui o foco é a arquitetura: no modelo de Beck, o sofrimento não se explica só por um pensamento isolado, e sim por camadas que se acendem juntas (Beck, 1976; Beck, 2020).',
          'Na superfície aparecem os pensamentos automáticos. Embaixo, regras e “eu deveria” (crenças intermediárias). Mais embaixo, esquemas sobre si, o mundo ou o futuro (crenças nucleares). A distorção descreve a forma do erro na superfície; o esquema explica por que esse erro se repete em muitas situações.',
          'Esta guia é psicoeducação. Não diagnostica. Serve para ler o padrão com mais profundidade quando você já sabe nomear um pensamento — não para começar do zero.',
        ],
        bullets: [
          'Automático: telegráfico, da situação (“não vai responder”).',
          'Intermediário: regra ou padrão (“se alguém hesita, é porque eu falhei”).',
          'Nuclear: esquema estável (“não mereço confiança” / “o mundo é perigoso”).',
        ],
      },
      {
        heading: 'Agrupamentos funcionais (não uma lista para decorar)',
        paragraphs: [
          'Decorar dez nomes acrescenta pouco. Na clínica, costuma-se agrupar por função: que viés protege, ou que ameaça percebida sustenta. Assim você escolhe a intervenção, não só o rótulo.',
        ],
        bullets: [
          'Ameaça / antecipação: superestimar probabilidade ou gravidade, tratar previsões como fatos, exigir uma certeza impossível.',
          'Autoavaliação: dicotomias de valor, rótulos globais, imperativos rígidos, filtro que apaga nuances de competência.',
          'Interpessoal: atribuir intenções sem dados, personalizar eventos compartilhados, ler o silêncio como veredito.',
          'O mesmo episódio pode misturar agrupamentos (p. ex. ameaça + interpessoal). O que importa é o dominante, para escolher o teste.',
        ],
      },
      {
        heading: 'Ciclos que mantêm o viés',
        paragraphs: [
          'O viés não se mantém só por “pensar errado”. Ele se reforça quando o comportamento baixa a ansiedade na hora e bloqueia a aprendizagem corretiva: evitar, checar, pedir certeza, ruminar sem atualizar a probabilidade.',
          'A fusão cognitiva — viver o pensamento como fato — sobe com a hiperativação. Por isso, em picos altos, primeiro se regula a ativação; depois se desenha um teste. Se você só “raciocina” em 9/10, costuma reforçar a ruminação.',
        ],
        bullets: [
          'Confirmação seletiva: você busca ou lembra só o que encaixa.',
          'Comportamentos de segurança: alívio curto, ameaça intacta no médio prazo.',
          'Ruminação: repetição verbal sem experimento nem decisão.',
          'Evitar a desconfirmação: você não se expõe a dados que poderiam matizar o esquema.',
        ],
      },
      {
        heading: 'Técnicas além do rótulo',
        paragraphs: [
          'Nomear a distorção (o que você pratica na guia breve) abre distância. O nível clínico seguinte combina avaliação cognitiva com evidência nova na vida real (Beck, 2020). Não é discutir com você até se render.',
        ],
        bullets: [
          'Descatastrofização estruturada: probabilidade × gravidade × enfrentamento (“se acontecesse, o que você faria?”).',
          'Contínuo / gradientes: trocar “perfeito ou fracasso” por uma escala 0–100 de desempenho ou ameaça.',
          'Torta da responsabilidade: repartir a causalidade entre fatores (você, contexto, acaso, outros) quando há personalização.',
          'Explicações alternativas: gerar ≥3 leituras do mesmo fato antes de fechar a hipótese.',
          'Experimento comportamental: desenhar um teste pequeno que possa desconfirmar a previsão.',
          'Trabalho de regras: passar de um “eu deveria” absoluto para uma preferência ou um padrão flexível.',
        ],
      },
      {
        heading: 'Exercício: desenhar um experimento comportamental',
        paragraphs: [
          'Diferente do registro de evidência da guia breve. Aqui você não só reescreve o pensamento: cria uma situação que possa trazer dados novos. Faça fora do pico (≥8/10 → regule primeiro).',
          'Exemplo: previsão «se eu não checar a mensagem em duas horas, não vou aguentar a ansiedade e vou perder o plano». Experimento: não checar por 90 minutos; anotar a ansiedade no minuto 0, 30 e 90; observar se o plano se perde. Resultado típico: a ansiedade sobe e depois desce; o plano não depende de checar a cada cinco minutos.',
        ],
        ordered: true,
        bullets: [
          'Escreva a previsão concreta (o que você teme que aconteça se não fizer o comportamento de segurança).',
          'Defina o comportamento de segurança que vai suspender ou reduzir (dose pequena).',
          'Escolha a janela de tempo e a medida (ansiedade 0–10, ou um fato observável).',
          'Execute o teste e registre o que aconteceu versus o que você previu.',
          'Extraia uma conclusão provisória — não uma certeza nova e absoluta.',
          'Se couber: um próximo experimento um pouco mais amplo na semana seguinte.',
        ],
      },
      {
        heading: 'Seta descendente até as crenças',
        paragraphs: [
          'Quando o mesmo viés reaparece em vários domínios, vale descer um nível: perguntar “se isso fosse verdade, o que diria sobre mim / o mundo / o futuro?”. É a seta descendente até regras ou crenças nucleares (Beck, 2020).',
          'Não é uma escavação forçada numa única sessão. É um mapa: às vezes basta notar a regra (“se eu não controlo, algo ruim acontece”) para escolher experimentos que a ponham à prova, em vez de brigar só com o pensamento automático do dia.',
        ],
        bullets: [
          'Útil quando o rótulo já não muda a intensidade.',
          'Cuidado: não force se houver trauma recente ou desesperança intensa — priorize estabilização e avaliação.',
          'A crença se trata como hipótese, não como veredito de identidade.',
        ],
      },
      {
        heading: 'Perfis na ansiedade e na depressão',
        paragraphs: [
          'Na ansiedade costumam dominar agrupamentos de ameaça: antecipação, certeza impossível, leitura mental social, comportamentos de segurança. A manutenção se entrelaça com a evitação.',
          'Na depressão costuma dominar uma autoavaliação negativa estável: filtro, supergeneralização, rotulação, personalização interna (“é por causa de como eu sou”). Sem ativação comportamental, o material cognitivo fica sem dados novos.',
          'São padrões descritivos frequentes, não uma regra diagnóstica. O mesmo episódio pode misturar os dois. Se o humor estiver muito baixo, muitas vezes vale ativar o comportamento antes de intensificar o debate cognitivo.',
        ],
      },
      {
        heading: 'Critérios clínicos e limites de uso',
        paragraphs: [
          'Vale uma avaliação profissional se o padrão persiste, há prejuízo funcional, anedonia ou desesperança intensas, substâncias para modular o sofrimento, ou se os experimentos e a reestruturação aumentam a ruminação sem alívio.',
          'Diante de ideação suicida, risco imediato ou incapacidade de cuidar de si: emergência ou linha de crise do seu país. A Anto pode detectar sinais e oferecer recursos; não substitui esses serviços nem o tratamento clínico.',
        ],
        bullets: [
          'Esta página assume que você já praticou reconhecer um pensamento (guia breve).',
          'Não substitui formulação clínica individual nem TCC com terapeuta.',
          'Se o trabalho cognitivo desestabilizar, pause e peça avaliação.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Quando a previsão já está anotada, o passo seguinte não é só raciocinar: desenhar um teste pequeno e registrar o que de fato aconteceu.',
      afterHeading: 'Técnicas além do rótulo',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto ao desenhar um experimento comportamental com registro escrito',
        messages: [
          {
            role: 'user',
            text: 'Anotei: «se eu não checar o chat em uma hora, sai do controle e eu perco o plano». Ansiedade 7.',
          },
          {
            role: 'anto',
            text: 'Boa previsão escrita. Que comportamento de segurança você vai pausar no teste?',
          },
          {
            role: 'user',
            text: 'Não abrir o chat. Sessenta minutos.',
          },
          {
            role: 'anto',
            text: 'Anote a ansiedade no minuto 0 e no 60, e se o plano se perdeu. Depois comparamos previsão versus dado — sem buscar certeza total.',
          },
        ],
      },
      suggestionsLabel: 'Sugestões',
      suggestions: ['Desenhar um experimento', 'Registrar previsão versus dado'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Este texto é o mapa clínico. Para reconhecer um pensamento no dia a dia, registrar o ABC ou ler ansiedade e depressão, siga aqui:',
      links: [
        {
          label: 'Distorções cognitivas (guia breve)',
          description:
            'Entrada prática: exemplos do dia a dia e um exercício curto para olhar um pensamento de perto.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'Técnica ABC',
          description:
            'Registro da situação: Activating event → Belief → Consequence.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Ansiedade e preocupação',
          description:
            'Quando o agrupamento de ameaça chega com hiperativação e evitação.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Depressão: guia breve',
          description:
            'Filtro mental, humor baixo e por que a ativação comportamental costuma fazer falta.',
          href: '/recursos/depresion-guia-breve',
        },
        {
          label: 'Ativação comportamental',
          description:
            'Passos de comportamento quando o debate cognitivo fica sem dados novos.',
          href: '/recursos/activacion-conductual',
        },
        {
          label: 'Evidência que informa a Anto',
          description:
            'Como lemos TCC, escalas e saúde mental digital — e o que não afirmamos. Citações APA com DOI.',
          href: '/investigacion',
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes clínicas que sustentam níveis cognitivos, manutenção e as intervenções citadas acima. Não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Arquitetura cognitiva: interpretações, esquemas e sofrimento emocional.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Automáticos, crenças, seta descendente, experimentos comportamentais e reestruturação.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
          note: 'Taxonomias acessíveis de distorções (referência; aqui entram como agrupamentos, não como lista para decorar).',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Revisão de metanálises sobre a eficácia da TCC em diferentes problemas clínicos.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.behavioralActivation],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação ou tratamento clínico. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser companhia para desenhar um teste pequeno sobre uma previsão — sem pressão — pode continuar no celular.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Desenhar um experimento comportamental',
      description:
        'Protocolo breve para transformar uma previsão enviesada num teste pequeno, medir o resultado e atualizar a hipótese.',
      totalTime: 'PT20M',
      steps: [
        'Escreva a previsão concreta.',
        'Defina o comportamento de segurança a reduzir ou suspender.',
        'Escolha a janela de tempo e como vai medir ansiedade ou resultado.',
        'Execute o teste e registre previsão versus dado.',
        'Extraia uma conclusão provisória.',
        'Se couber, defina um próximo experimento um pouco mais amplo.',
      ],
    },
  },
  [SLUGS.abc]: {
    slug: SLUGS.abc,
    readingMinutes: 6,
    meta: {
      title: 'Técnica ABC passo a passo | Psicoeducação Anto',
      description:
        'A técnica ABC (Ativador, Crença, Consequência) para olhar situações difíceis e o que a emoção faz em seguida. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Técnica ABC — guia passo a passo',
      openGraphDescription: 'Registre situações, pensamentos e emoções com o modelo ABC da TCC.',
    },
    hero: {
      title: 'Técnica ABC: passo a passo',
      subtitle: 'Uma ferramenta clássica da TCC para desmontar reações automáticas diante de situações estressantes.',
    },
    sections: [
      {
        heading: 'As três colunas',
        bullets: [
          'A — Ativador: o que aconteceu (fato observável, sem interpretar)',
          'B — Crença ou pensamento: o que você disse a si naquele momento',
          'C — Consequência: emoção e comportamento que vieram depois',
        ],
      },
      {
        heading: 'Exemplo rápido',
        paragraphs: [
          'A: Seu chefe não cumprimentou ao entrar no escritório. B: «Está bravo comigo». C: Ansiedade 7/10 e você evita pedir feedback.',
          'Revisão: há outras explicações? O que você faria se um colega estivesse distraído? Novo B: «pode estar concentrado; não tenho evidência de um problema». Novo C: ansiedade 4/10 e você decide cumprimentar com naturalidade.',
        ],
      },
      {
        heading: 'Na prática',
        paragraphs: [
          'Escreva no presente ou no passado recente, com frases curtas. Separe fatos de interpretações na coluna A. Se a emoção estiver muito alta, primeiro regule (respiração, grounding) e só então complete o ABC.',
        ],
      },
      {
        heading: 'Praticar na Anto',
        paragraphs: [
          'Desde a versão 1.5, a Anto inclui um quadro ABC interativo na área de técnicas, ligado ao grafo de insights para ver que situações e crenças se repetem ao longo do tempo.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.tcc, SLUGS.distortionsMap, SLUGS.anxiety],
    disclaimer:
      'Guia de psicoeducação. Não substitui terapia individual. Se você está em crise, fale com os serviços de emergência do seu país.',
    cta: { label: 'Experimentar a Anto grátis por 1 dia →', path: '/bienvenida' },
  },
  [SLUGS.anxiety]: {
    slug: SLUGS.anxiety,
    readingMinutes: 12,
    meta: {
      title: 'Ansiedade e preocupação: um mapa para entender | Anto',
      description:
        'Psicoeducação sobre ansiedade e preocupação: ativação do sistema nervoso, preocupação e ansiedade, sintomas, comportamentos de segurança, apresentações frequentes, intervenções (regulação, grounding, exposição, adiamento da preocupação), rastreamento GAD-7 e critérios para buscar ajuda. Não diagnostica nem substitui terapia.',
      openGraphTitle: 'Ansiedade e preocupação — guia completa',
      openGraphDescription:
        'Da ativação antecipatória ao mapa: sintomas, evitação, intervenções com base em TCC e quando pedir avaliação.',
      keywords:
        'ansiedade, preocupação, TAG, transtorno de ansiedade generalizada, ataque de pânico, comportamentos de segurança, evitação, GAD-7, exposição gradual, grounding, psicoeducação, TCC, Anto',
    },
    hero: {
      title: 'Ansiedade e preocupação',
      subtitle:
        'Um mapa para ler a ativação antecipatória: sintomas, ciclos de evitação, intervenções com evidência e quando vale uma avaliação clínica.',
    },
    pullQuote:
      'A ansiedade nem sempre mente. Às vezes avisa. O problema é quando o aviso fica ligado mesmo depois que o perigo já foi.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-morning-pause.webp',
      alt: 'Manhã em pausa junto a uma janela com luz suave — espaço quieto quando a preocupação não solta',
      caption:
        'Às vezes o dia começa antes de o corpo estar pronto. Nomear a ativação já é um primeiro dado clínico.',
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: 'O que é a ansiedade',
        paragraphs: [
          'A ansiedade é uma resposta de ameaça do sistema nervoso autônomo — sobretudo o ramo simpático — diante de um perigo real, antecipado ou interpretado. Sobe a ativação: taquicardia, tensão muscular, respiração mais superficial, atenção enviesada para o que pode dar errado. Em dose adaptativa, prepara a ação. Quando se cronifica, o futuro ocupa o presente.',
          'Na clínica, descreve-se como um padrão de três canais: somático (corpo), cognitivo (antecipação, catastrofização) e comportamental (evitação e comportamentos de segurança). Não é o mesmo que “ser nervoso”: implica intensidade, persistência ou prejuízo funcional.',
          'Esta guia é psicoeducação. Não diagnostica um transtorno. Serve para reconhecer o padrão, ensaiar intervenções de baixo risco e decidir quando pedir avaliação profissional.',
        ],
      },
      {
        heading: 'Preocupação e ansiedade',
        paragraphs: [
          'Na literatura clínica costuma-se distinguir a preocupação (worry) — processo cognitivo verbal, ensaiar cenários em linguagem — da ansiedade como estado afetivo-somático (Borkovec et al., 1983a). Preocupar-se com uma prova ou uma conta pode ser adaptativo: há um estímulo concreto e uma margem de controle.',
          'A preocupação fica disfuncional quando é excessiva, difícil de controlar, invade vários domínios e deixa de apontar para uma solução. A ansiedade clinicamente relevante costuma vir com hiperativação sustentada, evitação e prejuízo no sono, no trabalho ou nas relações — muitas vezes por semanas.',
        ],
        bullets: [
          'Preocupação adaptativa: delimitada, ligada a um problema real, ajuda a decidir ou planejar.',
          'Preocupação patológica: catastrofiza, exige certeza impossível, reaparece depois das checagens.',
          'Ansiedade com impacto: a ativação não cede mesmo quando a avaliação cognitiva diz “não há perigo objetivo”.',
        ],
      },
      {
        heading: 'Sintomas somáticos e cognitivos',
        paragraphs: [
          'Antes de intervir no pensamento, vale mapear o sinal. Na ansiedade, o canal somático costuma acender primeiro ou em paralelo ao cognitivo.',
        ],
        bullets: [
          'Somáticos: tensão (mandíbula, pescoço, ombros), sudorese ou mãos frias, palpitações, falta de ar subjetiva, desconforto gastrointestinal.',
          'Cognitivos: viés de atenção para o perigo, pensamentos intrusivos, dificuldade de concentração, irritabilidade.',
          'Sono: fragmentação, despertar precoce, fadiga diurna desproporcional ao esforço.',
          'Urgência subjetiva (“preciso resolver isso agora”) sem uma tarefa clara — típica da hiperativação.',
        ],
      },
      {
        heading: 'Evitação e comportamentos de segurança',
        paragraphs: [
          'Um mecanismo central é o reforço negativo: aparece incerteza ou medo → você faz algo que baixa a ansiedade na hora (checar, perguntar, evitar) → o alívio ensina ao sistema que “só assim existe proteção” → a ameaça percebida se consolida. Os comportamentos de segurança (safety-seeking behaviours) podem impedir a desconfirmação da ameaça (Salkovskis, 1991).',
          'A evitação e os comportamentos de segurança fazem sentido. Também mantêm o problema no médio prazo: impedem habituação e aprendizagem corretiva (“o dano não aconteceu mesmo sem eu evitar”). A alternativa clínica não é “coragem total”, e sim exposição gradual — doses toleráveis, muitas vezes com companhia (Craske et al., 2014).',
        ],
        bullets: [
          'Checagem: revisar sintomas, mensagens, notícias ou o corpo de forma repetida.',
          'Busca de reasseguramento: pedir certeza de novo a outras pessoas ou a buscas online.',
          'Evitação situacional: cancelar, adiar ou não decidir “por via das dúvidas”.',
          'Evitação cognitiva: distração total que não processa o estímulo temido e o deixa intacto.',
        ],
      },
      {
        heading: 'Apresentações frequentes (não é diagnóstico)',
        paragraphs: [
          'Os quadros de ansiedade se agrupam em categorias clínicas (p. ex. em manuais diagnósticos), mas aqui entram como apresentações descritivas — não como rótulo para você se atribuir:',
        ],
        bullets: [
          'Tipo TAG / preocupação generalizada: preocupação excessiva e difícil de controlar sobre vários domínios (saúde, dinheiro, trabalho, família).',
          'Ansiedade social: medo intenso de avaliação negativa, inibição ou evitação de situações interpessoais.',
          'Ataques de pânico: ondas intensas de medo com sintomas autonômicos marcados; costumam atingir o pico em minutos (nem sempre equivalem a transtorno de pânico).',
          'Ansiedade com a saúde: hipervigilância interoceptiva e busca de tranquilização diante de sensações do corpo.',
          'Ansiedade situacional ou reativa: ligada a um estressor identificável (mudança, luto, troca de trabalho) que não cede quando o pico agudo passa.',
        ],
      },
      {
        heading: 'Intervenções que costumam ajudar',
        paragraphs: [
          'Metanálises de ensaios controlados com placebo indicam que a TCC é eficaz para transtornos de ansiedade em adultos (Hofmann & Smits, 2008). Na prática se combina: (1) regulação da ativação, (2) trabalho cognitivo sobre interpretações ameaçadoras e (3) exposição ou redução de comportamentos de segurança. Se a intensidade estiver alta, priorize estabilização e apoio profissional.',
        ],
        bullets: [
          'Regulação autonômica: respiração lenta com expiração prolongada; grounding sensorial 5-4-3-2-1; contato com o chão.',
          'Nomear o afeto: dizer “isto é ansiedade” pode reduzir a fusão cognitiva com o pensamento catastrófico.',
          'Adiamento da preocupação (stimulus control): uma janela de horário para a preocupação; fora dela, anotar e deixar para depois.',
          'Exposição gradual: aproximação em hierarquia do que é evitado, sem exigir certeza absoluta.',
          'Higiene da ativação de base: sono, atividade física moderada e cafeína — modulam a linha de base simpática.',
          'Registro ABC ou diário de pensamentos: situação → pensamento → emoção/intensidade → comportamento — para perceber vieses.',
        ],
      },
      {
        heading: 'Exercício: adiar a preocupação',
        paragraphs: [
          'Técnica de controle de estímulos descrita para preocupação crônica (Borkovec et al., 1983b): não elimina a preocupação; concentra-a num intervalo para recuperar o resto do dia e reduzir o reforço contínuo da ruminação.',
        ],
        ordered: true,
        bullets: [
          'Defina 15–20 minutos por dia (horário estável, se der) e um lugar fixo para a “janela de preocupação”.',
          'Nessa janela, escreva as preocupações com detalhe — sem tentar resolver todas.',
          'Fora da janela: se aparecer uma, registre numa lista (“para as 18:00”) e volte à tarefa em curso.',
          'Ao abrir a janela, revise a lista. Distinga: há uma ação pequena de comportamento para hoje? Se não, feche até amanhã.',
          'Se a intensidade subjetiva for ≥8/10, primeiro baixe a ativação (respiração ou grounding) e só então escreva.',
        ],
      },
      {
        heading: 'Rastreamento e acompanhamento (GAD-7)',
        paragraphs: [
          'O GAD-7 (Generalized Anxiety Disorder-7) é uma escala breve de rastreamento de sintomas de ansiedade nas últimas duas semanas (Spitzer et al., 2006). Não diagnostica sozinha. No estudo de validação, um ponto de corte ≥10 otimizou sensibilidade e especificidade para TAG provável; as faixas 5–9 são usadas com frequência como sintomatologia leve a observar.',
          'A Anto pode integrar esse tipo de acompanhamento no histórico. Um dia atípico não define a tendência: importam as séries no tempo e o contexto (luto, doença física, estimulantes).',
        ],
      },
      {
        heading: 'Quando pedir avaliação',
        paragraphs: [
          'Vale uma avaliação profissional se os sintomas persistem por várias semanas, pioram, geram prejuízo funcional claro, ou se há uso de álcool ou outras substâncias para modular a ansiedade. Também se a evitação reduz, aos poucos, o raio da vida.',
          'Diante de ideação suicida, risco imediato ou incapacidade de cuidar de si: fale com a emergência ou uma linha de crise do seu país. A Anto pode detectar sinais de risco e oferecer recursos; não substitui serviços de emergência nem tratamento clínico.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Quando a preocupação fica sustentada, você pode descrevê-la e receber um passo concreto — regulação ou adiamento — sem a pretensão de resolver tudo de uma vez.',
      afterHeading: 'Intervenções que costumam ajudar',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto sobre preocupação sustentada',
        messages: [
          {
            role: 'user',
            text: 'Faz dias que eu fico ensaiando o pior. Não é um ataque de pânico, mas o corpo não desce.',
          },
          {
            role: 'anto',
            text: 'Isso esgota. É um pico agudo de agora, ou preocupação difícil de controlar há dias?',
          },
          {
            role: 'user',
            text: 'Difícil de controlar. Trabalho, saúde, várias áreas ao mesmo tempo.',
          },
          {
            role: 'anto',
            text: 'Primeiro regulamos um pouco a ativação. Depois podemos testar adiar a preocupação para uma janela, para não reforçar a ruminação o dia inteiro.',
          },
        ],
      },
      suggestionsLabel: 'Sugestões',
      suggestions: ['Adiar a preocupação', 'Regular a ativação'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Este texto é o mapa amplo. Para uma técnica pontual, uma escala ou o enquadramento da TCC, siga aqui:',
      links: [
        {
          label: 'Quando a ansiedade sobe (grounding)',
          description:
            'Âncoras sensoriais e 5-4-3-2-1 para picos de ativação autonômica.',
          href: '/recursos/grounding-ansiedad-crisis',
        },
        {
          label: 'Distorções cognitivas (mapa completo)',
          description:
            'Níveis cognitivos, agrupamentos, manutenção, experimentos comportamentais e perfis na ansiedade ou na depressão.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'PHQ-9 e GAD-7',
          description:
            'Escalas de rastreamento: o que medem, faixas orientativas e limites diante do diagnóstico.',
          href: '/recursos/escalas-phq9-gad7',
        },
        {
          label: 'Pensamentos, emoções e comportamento (TCC)',
          description:
            'Enquadramento breve: interpretação, emoção e o que você faz depois.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Evidência que informa a Anto',
          description:
            'Como lemos TCC, escalas e saúde mental digital — e o que não afirmamos. Citações APA com DOI.',
          href: '/investigacion',
        },
        {
          label: 'NIMH — Transtornos de ansiedade (em espanhol)',
          description:
            'Material clínico público do National Institute of Mental Health (EUA).',
          href: 'https://www.nimh.nih.gov/health/publications/espanol/trastorno-de-ansiedad-generalizada-cuando-no-se-pueden-controlar-las-preocupaciones-new',
          external: true,
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes revisadas por pares que sustentam distinções, mecanismos e as intervenções citadas acima. Não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Borkovec, T. D., Robinson, E., Pruzinsky, T., & DePree, J. A. (1983a). Preliminary exploration of worry: Some characteristics and processes. Behaviour Research and Therapy, 21(1), 9–16. https://doi.org/10.1016/0005-7967(83)90121-3',
          href: 'https://doi.org/10.1016/0005-7967(83)90121-3',
          note: 'Caracteriza a preocupação como processo cognitivo e a relação dela com a ansiedade.',
        },
        {
          apa: 'Borkovec, T. D., Wilkinson, L., Folensbee, R., & Lerman, C. (1983b). Stimulus control applications to the treatment of worry. Behaviour Research and Therapy, 21(3), 247–251. https://doi.org/10.1016/0005-7967(83)90206-1',
          href: 'https://doi.org/10.1016/0005-7967(83)90206-1',
          note: 'Base experimental do adiamento / janela de preocupação (controle de estímulos).',
        },
        {
          apa: 'Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T., & Vervliet, B. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy, 58, 10–23. https://doi.org/10.1016/j.brat.2014.04.006',
          href: 'https://doi.org/10.1016/j.brat.2014.04.006',
          note: 'Enquadramento de exposição baseado em aprendizagem inibitória (além da habituação).',
        },
        {
          apa: 'Hofmann, S. G., & Smits, J. A. J. (2008). Cognitive-behavioral therapy for adult anxiety disorders: A meta-analysis of randomized placebo-controlled trials. The Journal of Clinical Psychiatry, 69(4), 621–632. https://doi.org/10.4088/jcp.v69n0415',
          href: 'https://doi.org/10.4088/jcp.v69n0415',
          note: 'Metanálise: eficácia da TCC diante de placebo em transtornos de ansiedade do adulto.',
        },
        {
          apa: 'Salkovskis, P. M. (1991). The importance of behaviour in the maintenance of anxiety and panic: A cognitive account. Behavioural Psychotherapy, 19(1), 6–19. https://doi.org/10.1017/S0141347300011472',
          href: 'https://doi.org/10.1017/S0141347300011472',
          note: 'Modelo cognitivo de comportamentos de segurança e manutenção da ansiedade.',
        },
        {
          apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
          href: 'https://doi.org/10.1001/archinte.166.10.1092',
          note: 'Validação do GAD-7 como escala de rastreamento e gravidade na atenção primária.',
        },
      ],
    },
    relatedSlugs: [SLUGS.grounding, SLUGS.distortionsMap, SLUGS.tcc],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação ou tratamento clínico. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser companhia entre sessões — ou enquanto decide pedir avaliação — pode continuar no celular, no seu ritmo.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Adiar a preocupação (janela de preocupação)',
      description:
        'Técnica de controle de estímulos para concentrar a preocupação crônica num intervalo diário e reduzir o reforço contínuo da ruminação.',
      totalTime: 'PT20M',
      steps: [
        'Defina 15–20 minutos fixos e um lugar para a janela de preocupação.',
        'Nessa janela, anote preocupações com detalhe sem resolver todas.',
        'Fora da janela, se aparecer uma, registre para esse horário e volte à atividade.',
        'Ao abrir a janela, revise a lista e escolha só uma ação pequena de comportamento, se existir.',
        'Se a intensidade estiver muito alta, regule a ativação primeiro (respiração ou grounding) e depois escreva.',
      ],
    },
  },
  [SLUGS.scales]: {
    slug: SLUGS.scales,
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'PHQ-9 e GAD-7: faixas e como ler | Anto',
      description:
        'O que medem o PHQ-9 (humor) e o GAD-7 (ansiedade), faixas orientativas e instrumentos oficiais. Rastreamento de duas semanas, não diagnóstico. Na Anto, as leituras vão para o histórico.',
      openGraphTitle: 'PHQ-9 e GAD-7: o que medem e como ler',
      openGraphDescription:
        'Rastreamento de humor e ansiedade: faixas, tendência e por que um número não é um diagnóstico.',
      keywords:
        'PHQ-9, GAD-7, PHQ-9 GAD-7, faixas, rastreamento depressão, rastreamento ansiedade, histórico, psicoeducação, Anto',
    },
    hero: {
      title: 'PHQ-9 e GAD-7: o que medem e como ler',
      subtitle:
        'Duas escalas de rastreamento sobre as últimas duas semanas. Servem para ver se sobe, desce ou fica — não para colar um diagnóstico.',
      scanLink: {
        label: 'Ir para as faixas →',
        sectionHeading: 'Faixas orientativas',
      },
    },
    pullQuote:
      'A pontuação nomeia uma tendência. Não põe um nome em você.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-morning-pause.webp',
      alt: 'Pessoa de costas caminha em direção a uma janela com luz suave, celular na mão',
      caption:
        'A manhã já começou. Se há um número, ele fala das duas semanas que ficaram para trás — não deste instante.',
      width: 1536,
      height: 1024,
      objectPosition: '48% 42%',
      desktopAspectRatio: '3 / 2',
      placeAfterHeading: 'Faixas orientativas',
    },
    sections: [
      {
        heading: 'O que são?',
        paragraphs: [
          'O PHQ-9 olha sintomas depressivos; o GAD-7, ansiedade generalizada. As duas perguntam pelas últimas duas semanas e se usam como rastreamento: uma primeira leitura, não um veredito.',
          'Os itens validados — e as traduções revisadas — estão no PHQ Screeners. Aqui não copiamos o questionário.',
        ],
        link: {
          label: 'PHQ Screeners — instrumentos oficiais →',
          href: 'https://www.phqscreeners.com/',
          external: true,
        },
      },
      {
        heading: 'Faixas orientativas',
        paragraphs: [
          'Um número nomeia duas semanas. A série — se sobe, desce ou fica — pesa mais do que um ponto.',
        ],
        bands: [
          {
            label: 'PHQ-9 · 0–27',
            items: [
              { range: '0–4', label: 'mínima' },
              { range: '5–9', label: 'leve' },
              { range: '10–14', label: 'moderada' },
              { range: '15–19', label: 'moderadamente grave' },
              { range: '20–27', label: 'grave' },
            ],
          },
          {
            label: 'GAD-7 · 0–21',
            items: [
              { range: '0–4', label: 'mínima' },
              { range: '5–9', label: 'leve' },
              { range: '10–14', label: 'moderada' },
              { range: '15–21', label: 'grave' },
            ],
            note: 'Corte ≥10 para TAG provável.',
          },
        ],
      },
      {
        heading: 'O que fazer com o resultado',
        paragraphs: [
          'Se a pontuação continuar alta, leve a um médico ou psicólogo. Um dia ruim, o luto ou o corpo doente podem subir o número sem mudar o quadro. Só um profissional diagnostica.',
          'Se houver ideias de se machucar, risco imediato ou você não consegue cuidar de si: emergência ou uma linha de crise do seu país. A Anto pode oferecer recursos; não substitui esses serviços.',
        ],
      },
    ],
    productMoment: {
      title: 'Onde o número fica na Anto',
      body: 'Não é uma técnica que você escolhe. As leituras se montam a partir do que você conta e aparecem no histórico, com tendência. Continuam sendo rastreamento.',
      afterHeading: 'Faixas orientativas',
      chat: {
        ariaLabel: 'Exemplo de como a Anto situa uma leitura de escala no histórico, não como técnica',
        messages: [
          {
            role: 'user',
            text: 'Deu mais alto do que da última vez. Isso já é um diagnóstico?',
          },
          {
            role: 'anto',
            text: 'Não. É rastreamento: uma leitura de duas semanas. Na Anto fica no histórico; não põe um nome em você.',
          },
          {
            role: 'user',
            text: 'Já são duas vezes seguidas. O número me assusta.',
          },
          {
            role: 'anto',
            text: 'Faz sentido assustar. O que pesa é se isso se sustenta. Se continuar assim, leve a um profissional.',
          },
        ],
      },
      suggestionsLabel: 'No aplicativo',
      suggestions: ['Histórico de leituras', 'Relatórios de tendência'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Se o número aponta para o humor ou para a ansiedade, siga na guia que corresponde:',
      links: [
        {
          label: 'Depressão: guia breve',
          description:
            'Quando a queda dura, o que costuma ajudar e como se distingue de uma tristeza pontual.',
          href: '/recursos/depresion-guia-breve',
        },
        {
          label: 'Ansiedade e preocupação',
          description:
            'O mapa da ativação, da evitação e de quando pedir avaliação.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Validações originais das escalas. As faixas desta página saem desses estudos; não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613. https://doi.org/10.1046/j.1525-1497.2001.016009606.x',
          href: 'https://doi.org/10.1046/j.1525-1497.2001.016009606.x',
          note: 'Validação do PHQ-9 e faixas de gravidade (0–27) usadas como orientação de rastreamento.',
        },
        {
          apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
          href: 'https://doi.org/10.1001/archinte.166.10.1092',
          note: 'Validação do GAD-7; ponto de corte ≥10 para TAG provável e faixas de gravidade (0–21).',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psicoeducação. As escalas não diagnosticam nem substituem avaliação ou tratamento clínico. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser essas leituras no celular — histórico e tendência, não um nome clínico — pode baixar a Anto.',
    cta: { label: 'Baixar a Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Como ler uma pontuação de PHQ-9 ou GAD-7',
      description:
        'Passos para interpretar um resultado de rastreamento: período, faixa publicada, tendência e quando levar a um profissional. Não diagnostica.',
      totalTime: 'PT5M',
      steps: [
        'Confirme o período: as escalas perguntam pelas últimas duas semanas, não pelo dia de hoje.',
        'Situe o número na faixa publicada (orientação, não rótulo).',
        'Se houver leituras anteriores, compare: a tendência pesa mais do que um ponto isolado.',
        'Se continuar alta, leve a um profissional; não feche um diagnóstico só com o número.',
        'Se houver risco ou você não consegue cuidar de si, priorize ajuda de emergência.',
      ],
    },
  },
  [SLUGS.selfCompassion]: {
    slug: SLUGS.selfCompassion,
    readingMinutes: 6,
    meta: {
      title: 'Autocompaixão: o que é e exercícios breves | Anto',
      description:
        'O que a autocompaixão significa na psicologia com base em evidência, por que não é indulgência e como praticá-la em momentos difíceis. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Guia de autocompaixão',
      openGraphDescription: 'Tratar a si com o mesmo cuidado que você ofereceria a alguém que importa.',
    },
    hero: {
      title: 'Autocompaixão: guia breve',
      subtitle: 'Tratar a si com firmeza gentil quando você erra, sofre ou se compara.',
    },
    sections: [
      {
        heading: 'Três componentes',
        bullets: [
          'Gentileza consigo diante do sofrimento',
          'Humanidade compartilhada: o mal-estar faz parte da experiência humana',
          'Mindfulness: notar a dor sem exagerá-la nem reprimi-la',
        ],
      },
      {
        heading: 'Não é «autoindulgência»',
        paragraphs: [
          'Autocompaixão não significa justificar tudo nem fugir de responsabilidades. Na prática, costuma facilitar aprender com o erro porque reduz a vergonha que paralisa. É o tom interno com que você fala consigo quando as coisas vão mal.',
        ],
      },
      {
        heading: 'Exercício breve',
        paragraphs: [
          'Quando notar autocrítica dura, pare um instante. Ponha a mão no peito, se ajudar. Diga baixo: «este é um momento difícil; muita gente sente isso; o que eu preciso agora que seja pequeno e possível?»',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.tcc, SLUGS.distortions],
    disclaimer:
      'Psicoeducação geral. Não substitui atendimento profissional. Se a autocrítica estiver ligada a trauma ou ideação suicida, procure ajuda especializada.',
    cta: { label: 'Começar na Anto →', path: '/bienvenida' },
  },
  [SLUGS.sleep]: {
    slug: SLUGS.sleep,
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'Quando você não consegue dormir | Guia breve Anto',
      description:
        'Guia breve sobre sono e emoções: por que a noite amplifica a ruminação, hábitos concretos de descanso, um ritual quando a mente não para e quando pedir ajuda. Complementa o mapa de sono e insônia. Psicoeducação; não substitui atendimento profissional nem terapia do sono.',
      openGraphTitle: 'Quando você não consegue dormir — guia breve',
      openGraphDescription:
        'A cama acesa às 3h: vínculo sono–humor, hábitos úteis e um ritual curto quando a mente não solta.',
      keywords:
        'sono, não consigo dormir, ruminação noturna, higiene do sono, insônia, ansiedade noturna, hábitos de descanso, 3h, TCC-I, mapa sono, psicoeducação, Anto',
    },
    hero: {
      title: 'Quando você não consegue dormir',
      subtitle:
        'Dormir melhor não cura tudo. Mas um sono ruim amplifica ansiedade, irritabilidade e essa voz que repassa o dia quando o corpo já está na cama.',
      companionLink: {
        href: '/recursos/mapa-sueno-e-insomnio',
        support: 'Quer o mapa clínico?',
        label: 'Ir para a guia completa →',
      },
    },
    pullQuote:
      'Às 3h a mente não inventa problemas novos. Só aumenta o volume dos que já estavam ali.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Pessoa sentada de costas na cama à noite, lençóis revirados, celular de lado no criado-mudo — a hora em que o sono não chega',
      caption:
        'A cama desfeita. O celular de lado. Às vezes o primeiro passo é não brigar com a noite.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '2.4 / 1',
    },
    sections: [
      {
        heading: 'Sono e emoções',
        paragraphs: [
          'Quando você dorme pouco, o sistema nervoso baixa a tolerância ao estresse: o que de dia era um atrito, de noite parece ameaça. Muita gente nota mais ruminação, irritabilidade ou despertares às 3h com preocupações em loop.',
          'Não é falta de vontade. Sono e humor se empurram: dormir mal agrava a ansiedade; a ansiedade dificulta dormir. Esta página é uma guia breve — reconhecimento e hábitos úteis — não um protocolo clínico completo de insônia.',
        ],
      },
      {
        heading: 'Hábitos que costumam ajudar',
        paragraphs: [
          'Não precisa mudar tudo esta noite. Se for escolher um, comece pelo horário de levantar. Os hábitos de descanso (muitas vezes chamados «higiene do sono») não substituem uma avaliação se a insônia já é persistente, mas costumam melhorar a linha de base.',
        ],
        bullets: [
          'Horário regular de levantar (também no fim de semana) — ancora o relógio biológico mesmo se a noite foi irregular.',
          'Rotina de 30–60 minutos sem telas antes de dormir: luz baixa, algo quieto, sem rolar o feed.',
          'Cama para dormir e descansar — não trabalho, não reuniões, não «só um pouco» de celular.',
        ],
      },
      {
        heading: 'Quando a mente não para',
        paragraphs: [
          'Quando o corpo está quieto e a cabeça não, brigar com o pensamento costuma piorar. Teste um ritual curto no papel (não no celular):',
        ],
        ordered: true,
        bullets: [
          'Escreva três preocupações como elas aparecem — sem editar.',
          'Anote uma ação mínima para amanhã (mesmo que seja «ver o e-mail às 10»).',
          'Feche o papel. Teste respiração lenta (p. ex. 4-7-8) ou um áudio breve de relaxamento.',
          'Se a intensidade continuar alta, saia da cama para uma luz baixa por um tempo; volte sem se forçar a «você já deveria estar dormindo».',
        ],
      },
      {
        heading: 'O que isto não é',
        paragraphs: [
          'Esses hábitos não são terapia cognitivo-comportamental para insônia (TCC-I), nem um diagnóstico, nem uma promessa de «oito horas perfeitas». Também não substituem revisar causas médicas (dor, apneia, medicação, turnos).',
          'Se faz semanas que você não dorme bem e o dia desaba, esta guia breve não basta: vale uma avaliação profissional. Aqui só damos um primeiro enquadramento prático.',
        ],
      },
      {
        heading: 'Quando pedir ajuda',
        paragraphs: [
          'Fale com um profissional se a insônia persiste por várias semanas, piora, ou se você usa álcool ou outras substâncias para «apagar» a noite. Também se o cansaço afeta o trabalho, o humor ou a segurança (dirigir, cuidar de alguém).',
          'Se houver ideias de se machucar, risco imediato ou você não consegue cuidar de si: fale com a emergência ou uma linha de crise do seu país. A Anto pode oferecer recursos; não substitui esses serviços.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Quando a noite não solta, você pode dizer como está e receber um passo concreto — ritual breve ou regulação — sem a pressão de «consertar o sono inteiro».',
      afterHeading: 'Quando a mente não para',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto quando você não consegue dormir e a mente não para',
        messages: [
          {
            role: 'user',
            text: 'São 3:10. O corpo está cansado e a cabeça repassa o dia inteiro.',
          },
          {
            role: 'anto',
            text: 'Esgota. É um pico de agora, ou já são várias noites assim?',
          },
          {
            role: 'user',
            text: 'Várias. E olhar o celular só piora.',
          },
          {
            role: 'anto',
            text: 'Vamos deixar o celular de lado. Escreva três preocupações no papel e uma ação mínima para amanhã — depois respiramos um pouco, sem brigar com a cama.',
          },
        ],
      },
      suggestionsLabel: 'Exemplos no aplicativo',
      suggestions: ['Ritual quando a mente não para', 'Abaixar a ativação'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Se esta noite não basta e você quer o mapa — apresentações, ciclos e quando avaliar — siga aqui:',
      links: [
        {
          label: 'Sono e insônia (mapa completo)',
          description:
            'Apresentações, ciclo que mantém o problema, limites da higiene, componentes no estilo da TCC-I e critérios de avaliação.',
          href: '/recursos/mapa-sueno-e-insomnio',
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Revisões que sustentam o vínculo sono–humor e o papel dos hábitos de descanso. Não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Revisa evidência de hábitos de descanso (horário, telas, associação cama–sono) na população geral.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'Metanálise longitudinal: a insônia prediz maior risco de depressão — o vínculo sono–humor não é só subjetivo.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação médica ou terapia do sono. A insônia persistente pode pedir atendimento profissional. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se esta noite você só precisa que alguém baixe o volume com você — sem pressão — pode continuar no celular.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Ritual quando a mente não para',
      description:
        'Exercício breve no papel para estacionar preocupações noturnas e baixar a briga com a cama.',
      totalTime: 'PT10M',
      steps: [
        'Escreva três preocupações como elas aparecem.',
        'Anote uma ação mínima para amanhã.',
        'Feche o papel e teste respiração lenta ou um áudio breve de relaxamento.',
        'Se a ativação continuar alta, saia para uma luz baixa por um tempo e volte sem se forçar.',
      ],
    },
  },
  [SLUGS.sleepMap]: {
    slug: SLUGS.sleepMap,
    readingMinutes: 12,
    layout: 'dossier',
    meta: {
      title: 'Sono e insônia: mapa clínico completo | Anto',
      description:
        'Mapa clínico de sono e insônia: apresentações, ciclo de manutenção, limites da higiene do sono, componentes no estilo da TCC-I (controle de estímulos, janela de sono), vínculo com ansiedade e humor, e quando pedir avaliação. Complementa a guia breve; não diagnostica nem substitui terapia do sono.',
      openGraphTitle: 'Sono e insônia — mapa clínico',
      openGraphDescription:
        'Além de uma noite ruim: o que sustenta a insônia, até onde a higiene chega e o que a TCC-I costuma incluir.',
      keywords:
        'insônia, sono, mapa clínico, mapa sono, TCC-I, terapia cognitivo-comportamental para insônia, higiene do sono, controle de estímulos, restrição de sono, janela de sono, eficiência do sono, ciclo de manutenção, ruminação noturna, ansiedade noturna, insônia crônica, psicoeducação, Anto',
    },
    hero: {
      title: 'Sono e insônia: mapa completo',
      subtitle:
        'O que a guia breve não cobre: apresentações, ciclo de manutenção, limites da higiene, componentes no estilo da TCC-I e quando pedir avaliação.',
      companionLink: {
        href: '/recursos/higiene-sueno-salud-mental',
        support: 'Se esta noite você só precisa de um ritual curto:',
        label: 'Guia breve de sono →',
        placement: 'afterFigure',
      },
    },
    pullQuote:
      'A higiene do sono prepara o terreno. O trabalho clínico começa quando você olha o que a cama, o relógio e a mente fazem às 3h.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Pessoa sentada de costas na cama à noite, lençóis revirados, celular de lado — o momento em que o mapa do sono se torna necessário',
      caption:
        'Não é só «deitar mais cedo». É entender o que sustenta a briga com a noite.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Além de uma noite ruim',
        paragraphs: [
          'Todo mundo tem noites ruins. A insônia, em sentido clínico amplo, fala de dificuldade recorrente para pegar no sono, mantê-lo ou acordar cedo demais — com cansaço diurno, irritabilidade ou prejuízo funcional. Importam a frequência, a duração e o impacto no dia, não só “estar cansado”.',
          'Esta página orienta quando você já reconhece o padrão e quer lê-lo com mais profundidade. Não diagnostica nem é um protocolo completo para fazer sozinho.',
        ],
      },
      {
        heading: 'Apresentações frequentes (não é diagnóstico)',
        paragraphs: [
          'Na prática descrevem-se padrões — não rótulos para você se atribuir. Podem coexistir ou mudar com o tempo:',
        ],
        bullets: [
          'Início: você demora muito para pegar no sono; a cama se associa a “agora começa a briga”.',
          'Manutenção: você acorda e custa voltar; olhar o relógio costuma subir a ativação.',
          'Despertar precoce: o dia começa antes de o corpo estar pronto; às vezes com ruminação ou humor baixo.',
          'Aguda versus persistente: dias ou semanas depois de um estresse, diante de um padrão de um mês ou mais com impacto diurno.',
          'Comórbida: o sono se entrelaça com ansiedade, depressão, dor, turnos ou estimulantes — não “só higiene”.',
        ],
      },
      {
        heading: 'O ciclo que mantém a insônia',
        paragraphs: [
          'Um modelo clássico distingue predisposição, precipitante e perpetuação (Spielman et al., 1987): pode haver vulnerabilidade (ansiedade, ritmo irregular), um gatilho (estresse, viagem, doença) e depois comportamentos que mantêm o problema mesmo quando o gatilho já passou.',
          'Essa manutenção costuma ser comportamental e cognitiva. O alívio curto — mais tempo na cama “por via das dúvidas”, cafeína para atravessar o dia, celular “só um minuto” — reforça o medo de não dormir.',
        ],
        bullets: [
          'Cama = ameaça: o corpo ativa ao deitar porque antecipa outra noite ruim.',
          'Relógio e checagens: cada olhada confirma a hora e sobe a ativação.',
          'Mais horas deitado não é igual a mais sono: a eficiência cai.',
          'Compensações diurnas — cochilo longo, cafeína tarde, cancelar planos — sustentam o ciclo.',
        ],
      },
      {
        heading: 'Limites da higiene do sono',
        paragraphs: [
          'Os hábitos de descanso (horário, cafeína, telas, ambiente) se associam a sono melhor na população geral, mas a evidência de pacotes de “só higiene” como tratamento da insônia clínica é limitada (Irish et al., 2015). Servem como linha de base; raramente bastam quando o ciclo de manutenção já está instalado.',
          'Use-os sem transformar a lista numa nova exigência noturna. Se as regras viram ruminação (“falhei no protocolo”), você está reforçando o problema que queria resolver.',
        ],
        bullets: [
          'Útil: reduzir cafeína tarde, luz baixa, cama que não é escritório, horário de levantar estável.',
          'Insuficiente sozinha: semanas de insônia com prejuízo, medo intenso de não dormir ou apneia suspeita.',
          'Quando a manutenção já é comportamental, outros módulos fazem falta (p. ex. controle de estímulos ou janela de sono), não só mais regras.',
        ],
      },
      {
        heading: 'Componentes no estilo da TCC-I',
        paragraphs: [
          'A terapia cognitivo-comportamental para insônia (TCC-I) combina vários módulos; as metanálises a situam como intervenção eficaz para insônia crônica em adultos (Trauer et al., 2015). Aqui eles aparecem para orientar — não para autodosear restrição de sono sem companhia clínica.',
        ],
        bullets: [
          'Controle de estímulos: cama e quarto associados a sono/sexo; se não houver sono, sair para uma luz baixa e voltar sem forçar.',
          'Janela / restrição de sono: limitar o tempo na cama para subir a eficiência — potência alta; melhor com orientação clínica se houver sonolência diurna perigosa.',
          'Trabalho cognitivo: baixar a catastrofização noturna (“se eu não dormir, amanhã vai ser um desastre”) e a fusão com o pensamento.',
          'Relaxamento / regulação: abaixar a ativação antes ou durante a noite sem brigar com “preciso dormir agora”.',
          'Higiene como apoio: não como módulo único quando a manutenção já é comportamental.',
        ],
      },
      {
        heading: 'Exercício: controle de estímulos (noite)',
        paragraphs: [
          'Uma versão breve para praticar o módulo. Se houver sonolência extrema ao volante, apneia suspeita ou depressão grave, priorize avaliação antes de experimentar com o sono.',
        ],
        ordered: true,
        bullets: [
          'Deite só quando tiver sono — não “porque já é hora” com o corpo muito ativado.',
          'Cama para dormir (e sexo): sem trabalho, sem rolar a tela, sem discussões longas.',
          'Se não pegar no sono em uns 20 minutos, saia para outro cômodo com luz baixa; faça algo quieto, sem telas brilhantes.',
          'Volte para a cama quando a ativação baixar um pouco; repita sem se punir.',
          'Levante no mesmo horário todos os dias — ancora o relógio mesmo se a noite foi irregular.',
          'Anote três noites: tempo na cama diante do sono aproximado. Só observação, sem julgamento.',
        ],
      },
      {
        heading: 'Sono, ansiedade e humor',
        paragraphs: [
          'O vínculo é de mão dupla: a insônia prediz maior risco de depressão em estudos longitudinais (Baglioni et al., 2011); a ansiedade mantém a hiperativação que dificulta dormir. Tratar só “o pensamento” ou só “o colchão” costuma ficar curto.',
          'Se de noite domina a ameaça antecipatória, o mapa de ansiedade e o grounding ajudam no pico. Se de dia pesam o humor baixo e a inércia, a ativação comportamental e uma avaliação do humor podem ser o passo seguinte — em paralelo aos hábitos de sono, não no lugar deles.',
        ],
      },
      {
        heading: 'Quando pedir avaliação',
        paragraphs: [
          'Vale uma avaliação profissional se o padrão dura semanas, piora, há prejuízo no trabalho ou na segurança (dirigir, cuidar), uso de álcool ou sedativos para “apagar”, ou sinais de outro transtorno do sono (ronco intenso, pausas respiratórias, pernas inquietas).',
          'Diante de ideação suicida, risco imediato ou incapacidade de cuidar de si: emergência ou uma linha de crise do seu país. A Anto pode oferecer recursos; não substitui esses serviços nem uma TCC-I com um clínico do sono.',
        ],
        bullets: [
          'Não substitui polissonografia, ajuste de medicação nem formulação individual.',
          'Se a restrição de sono ou os experimentos aumentarem o sofrimento, pause e peça avaliação.',
        ],
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Você pode descrever o padrão como ele é e receber um passo concreto — sair da cama, ritual no papel ou abaixar a ativação — sem a pretensão de resolver o sono inteiro numa noite.',
      afterHeading: 'Quando pedir avaliação',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto sobre o ciclo que mantém a insônia',
        messages: [
          {
            role: 'user',
            text: 'Faz semanas. Deito cedo “por via das dúvidas”, olho o relógio e às 3h já estou derrotado.',
          },
          {
            role: 'anto',
            text: 'Isso soa a ciclo de manutenção: mais tempo na cama e checagens. Esta noite podemos testar sair para uma luz baixa se não houver sono em uns 20 minutos?',
          },
          {
            role: 'user',
            text: 'Sim. Medo de não dormir amanhã, mas o celular só piora.',
          },
          {
            role: 'anto',
            text: 'Vamos deixar o celular de lado. Se não houver sono, saia um tempo quieto — e mantenha o horário de levantar. Depois comparamos o que aconteceu com o que você temia.',
          },
        ],
      },
      suggestionsLabel: 'Exemplos no aplicativo',
      suggestions: ['Controle de estímulos', 'Ritual quando a mente não para'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support: 'Para um ritual curto esta noite, ansiedade em paralelo ou material público de referência:',
      links: [
        {
          label: 'Quando você não consegue dormir (guia breve)',
          description:
            'Hábitos de descanso, ritual quando a mente não para e quando pedir ajuda.',
          href: '/recursos/higiene-sueno-salud-mental',
        },
        {
          label: 'Ansiedade e preocupação',
          description:
            'Quando a manutenção noturna chega com hiperativação e evitação diurna.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'MedlinePlus — Insônia (em espanhol)',
          description:
            'Material público dos NIH (EUA) sobre causas, sintomas e quando buscar atendimento.',
          href: 'https://medlineplus.gov/spanish/insomnia.html',
          external: true,
        },
      ],
    },
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes que sustentam manutenção, higiene e eficácia da TCC-I. Não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Spielman, A. J., Caruso, L. S., & Glovinsky, P. B. (1987). A behavioral perspective on insomnia treatment. Psychiatric Clinics of North America, 10(4), 541–553.',
          href: 'https://pubmed.ncbi.nlm.nih.gov/3332317/',
          note: 'Modelo 3P (predisposição, precipitante, perpetuação) da manutenção da insônia.',
        },
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Limites e utilidade da higiene do sono na população geral, diante do tratamento clínico.',
        },
        {
          apa: 'Trauer, J. M., Qian, M. Y., Doyle, J. S., Rajaratnam, S. M. W., & Cunnington, D. (2015). Cognitive behavioral therapy for chronic insomnia: A systematic review and meta-analysis. Annals of Internal Medicine, 163(3), 191–204. https://doi.org/10.7326/M14-2841',
          href: 'https://doi.org/10.7326/M14-2841',
          note: 'Metanálise: a TCC-I melhora latência, despertares e eficiência do sono na insônia crônica.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'A insônia prediz maior risco de depressão: o vínculo sono–humor não é só subjetivo.',
        },
      ],
    },
    relatedSlugs: [SLUGS.depression, SLUGS.grounding],
    disclaimer:
      'Psicoeducação. Não diagnostica nem substitui avaliação médica, polissonografia nem TCC-I com um profissional. Diante de risco de suicídio ou violência, procure ajuda de emergência local imediatamente.',
    ctaBridge:
      'Se você quiser companhia para olhar o ciclo desta noite — sem a pressão de resolver tudo — pode continuar no celular.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Controle de estímulos (noite)',
      description:
        'Protocolo breve para reassociar a cama ao sono: sair se não houver sono, luz baixa e horário de levantar estável.',
      totalTime: 'PT30M',
      steps: [
        'Deite quando tiver sono, não só por horário.',
        'Reserve a cama para dormir (e sexo); sem telas nem trabalho.',
        'Se não houver sono em uns 20 minutos, saia para uma luz baixa e volte sem forçar.',
        'Mantenha o mesmo horário de levantar no dia seguinte.',
        'Observe três noites: tempo na cama diante do sono aproximado.',
      ],
    },
  },
  [SLUGS.mindfulness]: {
    slug: SLUGS.mindfulness,
    readingMinutes: 6,
    meta: {
      title: 'Mindfulness: guia breve para começar | Anto',
      description:
        'O que é mindfulness (atenção plena), mitos frequentes, exercícios de 3–5 minutos e como combinar com terapia ou apoio digital. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Mindfulness — guia para começar',
      openGraphDescription: 'Atenção plena sem misticismo: exercícios curtos para acalmar o sistema nervoso.',
    },
    hero: {
      title: 'Mindfulness: guia breve para começar',
      subtitle: 'Treinar a atenção no presente, sem esvaziar a mente nem precisar de uma hora livre.',
    },
    sections: [
      {
        heading: 'O que é (e o que não é)',
        paragraphs: [
          'Mindfulness, ou atenção plena, é prestar atenção ao momento presente, com atitude aberta e sem julgar. Não é eliminar pensamentos nem alcançar um estado especial: é notar que a mente foi embora e voltar, com gentileza, para a âncora (respiração, sons, sensações).',
        ],
      },
      {
        heading: 'Exercício de 3 minutos',
        bullets: [
          'Sente-se de um jeito confortável. Feche os olhos, se quiser.',
          'Sinta três respirações completas no abdômen.',
          'Quando aparecer um pensamento, nomeie («pensando») e volte à respiração.',
          'Abra os olhos e note um som e uma sensação no corpo.',
        ],
      },
      {
        heading: 'O que a prática costuma mudar',
        paragraphs: [
          'Com prática regular, muita gente relata menos reatividade emocional e mais capacidade de pausar antes de agir. Os estudos mostram benefícios modestos, mas consistentes, em estresse e ansiedade quando se combina com outras intervenções.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Há exercícios de mindfulness e relaxamento na área de técnicas e em protocolos de bem-estar. Dá para usá-los sozinhos ou junto da conversa, quando a intensidade emocional precisa descer.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.selfCompassion, SLUGS.sleep],
    disclaimer:
      'Guia de psicoeducação. Não substitui atendimento profissional. Se o mindfulness acender memórias traumáticas intensas, interrompa e consulte um profissional formado em trauma.',
    cta: { label: 'Experimentar a Anto grátis por 1 dia →', path: '/bienvenida' },
  },
  [SLUGS.depression]: {
    slug: SLUGS.depression,
    readingMinutes: 7,
    meta: {
      title: 'Depressão: sinais e o que você pode fazer | Guia Anto',
      description:
        'O que é a depressão, sinais frequentes, diferença em relação à tristeza comum e estratégias como a ativação comportamental. Psicoeducação; não substitui diagnóstico nem atendimento clínico.',
      openGraphTitle: 'Depressão — guia de psicoeducação',
      openGraphDescription:
        'Sintomas depressivos e ferramentas práticas para começar a retomar rotina e vínculo.',
    },
    hero: {
      title: 'Depressão: guia breve de psicoeducação',
      subtitle:
        'Quando pode ser mais do que uma queda passageira, e que passos pequenos costumam ajudar, segundo a evidência.',
    },
    sections: [
      {
        heading: 'Mais do que tristeza',
        paragraphs: [
          'Depressão não é só «estar triste». Costuma incluir perda de interesse, cansaço persistente, dificuldade de concentração, mudanças no sono ou no apetite, sentimento de culpa e, às vezes, pensamentos de que não vale a pena continuar.',
          'A tristeza diante de uma perda é humana e costuma estar ligada a um evento concreto. A depressão pode persistir por semanas, afetar várias áreas da vida e não aliviar só com descanso.',
        ],
      },
      {
        heading: 'Sinais frequentes',
        bullets: [
          'Anedonia: o que antes agradava já não motiva',
          'Fadiga ou lentidão, mesmo sem esforço físico',
          'Autocrítica intensa ou sensação de inutilidade',
          'Isolamento social e abandono de rotinas',
          'Pensamentos recorrentes de morte (pede ajuda urgente)',
        ],
      },
      {
        heading: 'O que costuma ajudar',
        paragraphs: [
          'A evidência apoia a terapia (sobretudo TCC e ativação comportamental), apoio social, atividade física moderada e, quando um profissional indica, tratamento farmacológico. O primeiro passo prático costuma ser retomar ações pequenas mesmo sem vontade.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional. Não diagnostica nem prescreve medicação.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.behavioralActivation, SLUGS.scales, SLUGS.tcc],
    disclaimer:
      'Material de psicoeducação. Não substitui avaliação nem tratamento profissional. Se você tem ideias de se machucar, procure ajuda de emergência imediatamente.',
    cta: { label: 'Companhia na Anto →', path: '/bienvenida' },
  },
  [SLUGS.behavioralActivation]: {
    slug: SLUGS.behavioralActivation,
    readingMinutes: 6,
    meta: {
      title: 'Ativação comportamental: guia prático | Anto',
      description:
        'O que é a ativação comportamental, por que ajuda na depressão e como planejar atividades pequenas mesmo sem motivação. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Ativação comportamental — guia breve',
      openGraphDescription: 'Retome rotina e humor com passos de comportamento pequenos e sustentáveis.',
    },
    hero: {
      title: 'Ativação comportamental',
      subtitle: 'Fazer primeiro, sentir depois: uma peça-chave da TCC para a depressão.',
    },
    sections: [
      {
        heading: 'A ideia',
        paragraphs: [
          'Na depressão, o ciclo «eu me sinto mal → eu me isolo → eu me sinto pior» é muito comum. A ativação comportamental propõe planejar atividades com valor (social, prazer, realização, saúde) mesmo com a motivação baixa.',
          'Não é fazer tudo de uma vez: começa com passos pequenos e registra como o humor muda antes e depois.',
        ],
      },
      {
        heading: 'Tipos de atividade',
        bullets: [
          'Prazer: algo que você gostava, mesmo que sejam 10 minutos',
          'Realização: uma tarefa mínima (tomar banho, arrumar um canto)',
          'Social: uma mensagem ou uma ligação curta',
          'Saúde: uma caminhada curta, comer algo nutritivo',
        ],
      },
      {
        heading: 'Como começar hoje',
        paragraphs: [
          'Escolha uma única atividade de menos de 15 minutos. Antes, dê uma nota de 0 a 10 para o seu humor. Faça. Depois, dê a nota de novo. Se não subir, não é fracasso: a consistência pesa mais do que um dia.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.depression, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psicoeducação com base em evidência. Não substitui terapia individual. Se você não consegue sair da cama por vários dias, procure um profissional.',
    cta: { label: 'Organizar tarefas na Anto →', path: '/app' },
  },
  [SLUGS.ocdErp]: {
    slug: SLUGS.ocdErp,
    readingMinutes: 8,
    meta: {
      title: 'TOC e exposição com prevenção de resposta (ERP) | Anto',
      description:
        'O que é o transtorno obsessivo-compulsivo, como funcionam obsessões e compulsões, e por que a ERP é a abordagem com mais evidência. Psicoeducação; não substitui tratamento com um profissional.',
      openGraphTitle: 'TOC e ERP — guia de psicoeducação',
      openGraphDescription: 'O ciclo obsessivo-compulsivo e a abordagem terapêutica com mais respaldo.',
    },
    hero: {
      title: 'TOC e exposição com prevenção de resposta (ERP)',
      subtitle: 'Obsessões, compulsões e o tratamento com mais respaldo para o transtorno obsessivo-compulsivo.',
    },
    sections: [
      {
        heading: 'O que é o TOC',
        paragraphs: [
          'O transtorno obsessivo-compulsivo (TOC) envolve obsessões (pensamentos, imagens ou impulsos intrusivos que geram ansiedade) e compulsões (comportamentos ou rituais mentais para reduzir o mal-estar). O ciclo se reforça no curto prazo, mas mantém o problema.',
        ],
      },
      {
        heading: 'Exemplos frequentes',
        bullets: [
          'Medo de contaminação e lavagem excessiva',
          'Dúvida («eu fechei a porta?») e checagem repetida',
          'Pensamentos intrusivos de dano e rituais de neutralização',
          'Necessidade de simetria ou ordem «perfeita»',
        ],
      },
      {
        heading: 'O que é a ERP?',
        paragraphs: [
          'A exposição com prevenção de resposta (ERP) consiste em enfrentar aos poucos os gatilhos (exposição) sem executar a compulsão (prevenção de resposta). Com a repetição, o cérebro aprende que a ansiedade desce sem o ritual.',
          'A ERP precisa ser planejada com um profissional formado em TOC, sobretudo se os sintomas forem graves.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional. O tratamento de TOC moderado ou grave pede acompanhamento clínico especializado.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psicoeducação. Não é diagnóstico de TOC nem substitui tratamento profissional. A ERP sem supervisão pode piorar sintomas em casos graves. Consulte um especialista.',
    cta: { label: 'Conhecer a Anto →', path: '/app' },
  },
  [SLUGS.trauma]: {
    slug: SLUGS.trauma,
    readingMinutes: 8,
    meta: {
      title: 'Trauma e TEPT: respostas normais do corpo | Anto',
      description:
        'O que é o trauma psicológico, sintomas frequentes do TEPT, por que aparecem flashbacks e quando buscar ajuda especializada. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Trauma e TEPT — guia breve',
      openGraphDescription: 'Psicoeducação sobre respostas ao trauma e caminhos de recuperação com base em evidência.',
    },
    hero: {
      title: 'Trauma e TEPT: guia de psicoeducação',
      subtitle: 'Seu corpo e sua mente podem reagir de formas intensas depois de eventos avassaladores — isso não significa que haja algo de errado com você.',
    },
    sections: [
      {
        heading: 'O que é o trauma',
        paragraphs: [
          'O trauma psicológico acontece quando uma experiência ultrapassa a sua capacidade de enfrentamento naquele momento. Pode ser um evento único (acidente, agressão) ou prolongado (maus-tratos, negligência). A reação depende do contexto, não da «força» da pessoa.',
        ],
      },
      {
        heading: 'Sintomas frequentes do TEPT',
        bullets: [
          'Revivescência: memórias intrusivas, pesadelos, flashbacks',
          'Evitação de lugares, pessoas ou sensações que lembram o evento',
          'Hipervigilância: sustos, tensão, dificuldade de relaxar',
          'Mudanças de humor e de pensamento (culpa, desconfiança, entorpecimento)',
        ],
      },
      {
        heading: 'Tratamentos com evidência',
        paragraphs: [
          'Terapias como a TCC focada no trauma, EMDR e exposição prolongada têm respaldo para TEPT. O apoio social seguro e a estabilização (sono, rotina, regulação) também importam. O processo leva tempo e não se apressa.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional. Trauma complexo pede terapeuta formado em trauma.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.grounding, SLUGS.mindfulness, SLUGS.anxiety],
    disclaimer:
      'Material educativo. Não diagnostica TEPT. Não substitui atendimento profissional. Se você tem flashbacks intensos ou risco de dano, procure ajuda especializada.',
    cta: { label: 'Apoio entre sessões →', path: '/bienvenida' },
  },
  [SLUGS.anger]: {
    slug: SLUGS.anger,
    readingMinutes: 6,
    meta: {
      title: 'Manejo da raiva: guia prático | Anto',
      description:
        'O que dispara a raiva, sinais corporais precoces e técnicas de regulação com base em TCC para responder com mais escolha. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Manejo da raiva — guia breve',
      openGraphDescription: 'Identifique gatilhos e baixe a intensidade antes de reagir.',
    },
    hero: {
      title: 'Manejo da raiva',
      subtitle: 'A raiva não é o inimigo: o caminho é entendê-la e escolher respostas que não machuquem você nem as outras pessoas.',
    },
    sections: [
      {
        heading: 'Raiva e agressão',
        paragraphs: [
          'Sentir raiva é comum quando você percebe injustiça, falta de respeito ou ameaça. O problema aparece quando a expressão é impulsiva, desproporcional ou danosa. A raiva costuma ter uma curva: sobe rápido e desce se não for alimentada com ruminação.',
        ],
      },
      {
        heading: 'Sinais precoces',
        bullets: [
          'Tensão na mandíbula, nos punhos ou no peito',
          'Pensamentos de «sempre» ou «nunca»',
          'Calor no rosto, respiração acelerada',
          'Impulso de interromper, gritar ou bater',
        ],
      },
      {
        heading: 'O que cabe na hora',
        paragraphs: [
          'Na escalada: pausa de 90 segundos, respiração lenta, sair fisicamente da situação se for seguro. No longo prazo: identificar gatilhos, questionar interpretações (foi de propósito?), praticar assertividade e resolver problemas concretos.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Na área de técnicas há exercícios (TCC, ABC, mindfulness) para quando falar não basta. Não é tratamento nem substitui um profissional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.abc, SLUGS.distortions, SLUGS.grounding],
    disclaimer:
      'Guia de psicoeducação. Não substitui terapia nem avaliação profissional. Se a raiva leva a violência ou medo no seu entorno, procure ajuda profissional e, se houver risco, serviços de proteção.',
    cta: { label: 'Praticar na Anto →', path: '/bienvenida' },
  },
  [SLUGS.grounding]: {
    slug: SLUGS.grounding,
    readingMinutes: 7,
    meta: {
      title: 'Grounding 5-4-3-2-1: quando a ansiedade sobe | Anto',
      description:
        'Exercício de grounding (ancoragem) 5-4-3-2-1 para ansiedade intensa, pânico ou crise: âncoras sensoriais, sinais no corpo, alternativas rápidas e quando pedir ajuda. Guia breve Anto; complementa o mapa de ansiedade. Não substitui terapia nem emergência.',
      openGraphTitle: 'Quando a ansiedade sobe — grounding 5-4-3-2-1',
      openGraphDescription:
        'Exercício 5-4-3-2-1 e âncoras sensoriais quando a ansiedade sobe. Guia breve de grounding e o caminho até o mapa de ansiedade.',
      keywords:
        'grounding, ancoragem, exercício grounding, técnica 5-4-3-2-1, cinco sentidos, ansiedade, crise, ataque de pânico, ansiedade aguda, âncoras sensoriais, dissociação, psicoeducação, Anto',
    },
    hero: {
      title: 'Quando a ansiedade sobe',
      subtitle:
        'Quando o corpo reage como se o perigo fosse imediato, primeiro o grounding; pensar vem depois.',
      scanLink: {
        label: 'Ir para o exercício 5-4-3-2-1 →',
        sectionHeading: 'Exercício 5-4-3-2-1',
      },
    },
    pullQuote:
      'Não é “pensar positivo”. É voltar para o corpo o tempo suficiente para a onda não levar você por inteiro.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-hero-evening.webp',
      alt: 'Pessoa sentada de costas na cama ao anoitecer, olhando a cidade pela janela — o momento quieto quando a ansiedade sobe',
      caption: 'Comece pelo que já está aqui: luz, corpo, janela.',
      width: 1536,
      height: 1024,
      objectPosition: '50% 40%',
      desktopAspectRatio: '3 / 2',
      placeAfterHeading: 'Exercício 5-4-3-2-1',
    },
    sections: [
      {
        heading: 'O que é o grounding',
        paragraphs: [
          'O grounding (ancoragem no presente) reúne gestos simples que levam a atenção ao que você pode ver, tocar, ouvir, cheirar ou saborear agora. Não resolvem o que dói no fundo: baixam a ativação para você pensar um pouco mais claro, pedir ajuda ou esperar a onda passar.',
          'Usam-se em ansiedade intensa, pânico, dissociação leve ou quando uma memória arranca você do presente. São ferramentas de estabilização, não um tratamento por si.',
        ],
      },
      {
        heading: 'Como isso aparece no corpo',
        paragraphs: [
          'Antes de “fazer alguma coisa”, ajuda reconhecer o sinal: coração acelerado, peito apertado, mãos frias, mente que pula, sensação de não estar de todo aqui.',
        ],
        bullets: [
          'O corpo pode ler ameaça mesmo sem perigo objetivo.',
          'O grounding não nega a emoção: dá a ela um enquadramento sensorial mais amplo.',
        ],
      },
      {
        heading: 'Exercício 5-4-3-2-1',
        paragraphs: [
          'Se a intensidade estiver em 9/10, comece por uma única âncora (pés no chão) antes do 5-4-3-2-1 completo.',
        ],
        ordered: true,
        bullets: [
          '5 coisas que você vê — escolha detalhes concretos (uma borda, uma cor, uma sombra); não invente o cômodo inteiro.',
          '4 coisas que você toca — temperatura, textura, peso. A roupa, o assento, as próprias mãos.',
          '3 coisas que você ouve — perto ou longe: um motor, a sua respiração, um relógio, vozes em outro cômodo.',
          '2 coisas que você cheira — ou, se não houver cheiro claro, lembre um familiar sem forçar a cena.',
          '1 coisa que você saboreia — um gole de água, o gosto na boca, ou simplesmente notar a língua.',
        ],
        closing:
          'Faça devagar. Se um sentido não responder, pule para o seguinte. Não há nota perfeita: trabalhe com o que encontrar.',
      },
      {
        heading: 'Outras opções rápidas',
        paragraphs: [
          'Se o 5-4-3-2-1 parecer longo, troque de âncora: um cubo de gelo na mão, dizer em voz alta onde você está e que dia é, contar para trás de 3 em 3, ou descrever um objeto como se alguém não pudesse vê-lo.',
          'A chave é envolver os sentidos, não analisar o problema nesse momento.',
        ],
      },
      {
        heading: 'Quando é crise',
        emphasis: 'crisis',
        paragraphs: [
          'O grounding ajuda a onda a baixar. Não basta se houver ideias de se machucar, risco imediato para você ou para alguém, ou se você não consegue cuidar do básico.',
          'Nesse caso, fale com a emergência local ou uma linha de crise do seu país. A Anto pode mostrar recursos diante de sinais de risco; não substitui esses serviços.',
        ],
        link: {
          label: 'Buscar uma linha de crise perto de você →',
          href: 'https://findahelpline.com/',
          external: true,
        },
      },
    ],
    productMoment: {
      title: 'Como isso aparece na Anto',
      body: 'Você pode escrever como está e receber um passo concreto, sem a pressão de “resolver tudo”.',
      afterHeading: 'Quando é crise',
      chat: {
        ariaLabel: 'Exemplo de conversa na Anto quando a ansiedade sobe',
        messages: [
          {
            role: 'user',
            text: 'Estou em 8. O peito apertado e a mente não desce.',
          },
          {
            role: 'anto',
            text: 'Está intensa. Antes de analisar, tentamos ancorar você um instante no que há aqui?',
          },
          {
            role: 'user',
            text: 'Sim. Não quero me desligar mais.',
          },
          {
            role: 'anto',
            text: 'Vamos simples: nomeie 5 coisas que você vê, com detalhe concreto. Sem pressa.',
          },
        ],
      },
      suggestionsLabel: 'Exemplos no aplicativo',
      suggestions: ['Exercício 5-4-3-2-1', 'Uma única âncora'],
    },
    furtherReading: {
      title: 'Para aprofundar',
      support:
        'Esta página é prática e breve. Para o mapa amplo — sintomas, ciclos e estratégias — comece aqui:',
      links: [
        {
          label: 'Ansiedade e preocupação (mapa completo)',
          description:
            'Como o ciclo se mantém, comportamentos de segurança, intervenções úteis e quando pedir avaliação.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    relatedSlugs: [SLUGS.mindfulness, SLUGS.emotionRegulation],
    references: {
      title: 'Referências (APA)',
      support:
        'Fontes que enquadram a regulação sensorial e a tolerância ao mal-estar quando a ativação está alta. Não substituem avaliação clínica individual.',
      items: [
        {
          apa: 'Linehan, M. M. (2015). DBT skills training manual (2nd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462516995',
          note: 'Enquadramento clínico de tolerância ao mal-estar e autorregulação sensorial (p. ex. acalmar com os cinco sentidos) quando a ativação é intensa.',
        },
        {
          apa: 'Neacsiu, A. D., Eberle, J. W., Kramer, R., Wiesmann, T., & Linehan, M. M. (2014). Dialectical behavior therapy skills for transdiagnostic emotion dysregulation: A pilot randomized controlled trial. Behaviour Research and Therapy, 59, 40–51. https://doi.org/10.1016/j.brat.2014.05.005',
          href: 'https://doi.org/10.1016/j.brat.2014.05.005',
          note: 'Ensaio piloto: habilidades de DBT (incluindo tolerância ao mal-estar) podem reduzir desregulação emocional para além de um único diagnóstico.',
        },
      ],
    },
    disclaimer:
      'Psicoeducação. Não substitui terapia nem serviços de emergência. Se você está em risco imediato, use a seção «Quando é crise» acima.',
    ctaBridge:
      'Quando a onda baixar um pouco, você pode continuar com companhia no celular — sem pressão.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Exercício de grounding 5-4-3-2-1',
      description:
        'Técnica sensorial de grounding para baixar a ativação em ansiedade intensa ou crise: cinco sentidos, um passo de cada vez.',
      totalTime: 'PT5M',
      steps: [
        'Nomeie 5 coisas que você pode ver, com detalhe concreto.',
        'Note 4 coisas que você pode tocar (textura, temperatura ou peso).',
        'Ouça 3 sons, perto ou longe.',
        'Identifique 2 cheiros, ou lembre um familiar com calma.',
        'Note 1 sabor ou a sensação na boca.',
      ],
    },
  },
  [SLUGS.stress]: {
    slug: SLUGS.stress,
    readingMinutes: 6,
    meta: {
      title: 'Estresse: como o corpo responde e o que fazer | Anto',
      description:
        'O que é o estresse, sinais físicos e emocionais, estresse agudo e crônico, e formas de cuidar de si sem esperar o burnout. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Estresse — guia de psicoeducação',
      openGraphDescription: 'A resposta ao estresse e ferramentas práticas para recuperar equilíbrio.',
    },
    hero: {
      title: 'Estresse',
      subtitle: 'Como o seu corpo responde à pressão, e formas de cuidar de si antes de chegar ao esgotamento.',
    },
    sections: [
      {
        heading: 'Estresse agudo e crônico',
        paragraphs: [
          'O estresse agudo é a ativação breve diante de um desafio (prova, prazo, conflito). Pode ajudar a concentrar. O estresse crônico é a tensão contínua: trabalho exigente, cuidado de outras pessoas, insegurança financeira. Aí o corpo deixa de se recuperar.',
        ],
      },
      {
        heading: 'Sinais frequentes',
        bullets: [
          'Tensão muscular, dor de cabeça ou de estômago',
          'Irritabilidade, impaciência ou choro fácil',
          'Sono leve ou mente acelerada',
          'Mais doenças menores, com o sistema imune sob pressão',
        ],
      },
      {
        heading: 'O que cabe fazer',
        paragraphs: [
          'Priorize sono, pausas reais e limites nas tarefas. Respiração lenta, movimento breve e falar com alguém de confiança reduzem a carga. Se o estresse dura meses e afeta a sua saúde, procure apoio profissional.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'A conversa pode ajudar a ordenar prioridades, praticar micropausas e chegar às técnicas de regulação da área de técnicas.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.burnout, SLUGS.anxiety, SLUGS.mindfulness],
    disclaimer:
      'Material de psicoeducação. Não substitui avaliação médica nem psicológica. Se o estresse inclui sintomas físicos intensos, consulte um profissional.',
    cta: { label: 'Apoio na Anto →', path: '/bienvenida' },
  },
  [SLUGS.emotionRegulation]: {
    slug: SLUGS.emotionRegulation,
    readingMinutes: 6,
    meta: {
      title: 'Regulação emocional: guia prático | Anto',
      description:
        'Habilidades para reconhecer, nomear e modular emoções intensas sem reprimi-las nem reagir no automático. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Regulação emocional — guia breve',
      openGraphDescription: 'Reconhecer emoções e escolher respostas mais úteis.',
    },
    hero: {
      title: 'Regulação emocional',
      subtitle: 'Habilidades para reconhecer e modular emoções — não eliminá-las, e sim se relacionar melhor com elas.',
    },
    sections: [
      {
        heading: 'O que significa regular',
        paragraphs: [
          'Regular não é «não sentir». É notar a emoção, entender que sinal ela traz e escolher uma resposta que caiba nos seus valores. Com a prática, as reações impulsivas diminuem e a clareza volta mais rápido.',
        ],
      },
      {
        heading: 'Passos básicos',
        bullets: [
          'Nomear a emoção com precisão (não só «mal»)',
          'Dar uma nota de 0 a 10 para a intensidade',
          'Pausar antes de agir se estiver acima de 7',
          'Escolher uma ação pequena: respirar, escrever, caminhar, pedir apoio',
        ],
      },
      {
        heading: 'Ferramentas que cabem aqui',
        paragraphs: [
          'Mindfulness breve, grounding 5-4-3-2-1, técnica ABC e autocompaixão cabem aqui. A chave é usá-las quando a onda sobe, não só depois que a crise já passou.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Há exercícios de regulação na área de técnicas e na conversa, que pode sugerir micropassos a partir do que você expressa.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.grounding, SLUGS.abc],
    disclaimer:
      'Psicoeducação geral. Não substitui atendimento profissional. Se as emoções transbordam de forma recorrente ou há risco de dano, procure ajuda profissional.',
    cta: { label: 'Praticar técnicas →', path: '/app' },
  },
  [SLUGS.grief]: {
    slug: SLUGS.grief,
    readingMinutes: 7,
    meta: {
      title: 'Luto e perda: guia de psicoeducação | Anto',
      description:
        'Como o luto costuma se desenrolar, mitos frequentes e formas de se acompanhar sem forçar um «encerramento» cedo demais. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Luto e perda — guia breve',
      openGraphDescription: 'O luto como processo humano, e como cuidar de si com paciência.',
    },
    hero: {
      title: 'Luto e perda',
      subtitle: 'Como o luto costuma se desenrolar, e formas de se acompanhar sem apressar o processo.',
    },
    sections: [
      {
        heading: 'O luto não é linear',
        paragraphs: [
          'Depois de uma perda (morte, ruptura, saúde, projeto de vida) é comum alternar tristeza, raiva, entorpecimento, culpa ou até alívio. Não há uma ordem «certa» nem data de validade para sentir.',
        ],
      },
      {
        heading: 'Mitos frequentes',
        bullets: [
          '«Eu deveria superar isso em X meses» — cada processo é diferente',
          '«Se eu chorar menos, já curei» — o luto não se mede só pelas lágrimas',
          '«Preciso ser forte» — pedir ajuda faz parte do cuidado',
        ],
      },
      {
        heading: 'Como se acompanhar',
        paragraphs: [
          'Mantenha rotinas mínimas (sono, comida, uma saída breve). Fale com pessoas seguras. Reduza exigências maiores, se der. Se o isolamento ou a desesperança persistirem por muito tempo, um profissional pode acompanhar.',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'A Anto pode oferecer espaço para ordenar o que você sente entre sessões com um terapeuta ou uma rede de apoio; não substitui luto terapêutico especializado.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.selfCompassion, SLUGS.emotionRegulation, SLUGS.depression],
    disclaimer:
      'Não substitui terapia de luto nem atendimento em crise. Se você tem ideias de se machucar, procure ajuda de emergência.',
    cta: { label: 'Companhia na Anto →', path: '/bienvenida' },
  },
  [SLUGS.burnout]: {
    slug: SLUGS.burnout,
    readingMinutes: 7,
    meta: {
      title: 'Esgotamento e burnout: sinais e primeiros passos | Anto',
      description:
        'Sinais de sobrecarga contínua, diferença em relação ao cansaço comum e passos iniciais de recuperação. Psicoeducação; não substitui atendimento profissional.',
      openGraphTitle: 'Esgotamento e burnout — guia breve',
      openGraphDescription: 'Reconheça o burnout e comece a recuperar energia com mudanças realistas.',
    },
    hero: {
      title: 'Esgotamento e burnout',
      subtitle: 'Sinais de sobrecarga contínua e primeiros passos de recuperação — sem transformar o cansaço em culpa.',
    },
    sections: [
      {
        heading: 'Mais do que estar cansado',
        paragraphs: [
          'Burnout é esgotamento emocional e físico por estresse prolongado, muitas vezes ligado a trabalho ou cuidado constante. Inclui cinismo, sensação de ineficácia e o fato de um fim de semana de descanso já não bastar.',
        ],
      },
      {
        heading: 'Sinais frequentes',
        bullets: [
          'Vazio ou desconexão do que você faz',
          'Irritabilidade e dificuldade de concentração',
          'Sono que não repara, dores somáticas',
          'Evitar responsabilidades mesmo quando isso gera culpa',
        ],
      },
      {
        heading: 'Primeiros passos de recuperação',
        paragraphs: [
          'Identifique fontes de carga que você consiga modular (limites, delegar, pausas reais). Recupere o básico: sono, alimentação, movimento leve. Mudanças estruturais (menos horas, apoio no trabalho) às vezes são necessárias, não só «mais autocuidado».',
        ],
      },
      {
        heading: 'Na Anto',
        paragraphs: [
          'Use tarefas e hábitos para microdescansos, técnicas de regulação e a conversa para um desabafo com estrutura. O burnout grave merece avaliação profissional e mudanças na fonte do estresse.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.stress, SLUGS.sleep, SLUGS.selfCompassion],
    disclaimer:
      'Psicoeducação. Não substitui avaliação médica ou ocupacional. O burnout pode pedir intervenção médica ou no trabalho. Procure um profissional se os sintomas forem intensos.',
    cta: { label: 'Retomar a rotina com a Anto →', path: '/app' },
  },
};

export function getPsychoeducationGuidesPt(): Record<PsychoeducationSlug, PsychoeducationGuide> {
  return guides;
}

export function getPsychoeducationGuidePt(slug: string): PsychoeducationGuide | undefined {
  return guides[slug as PsychoeducationSlug];
}
