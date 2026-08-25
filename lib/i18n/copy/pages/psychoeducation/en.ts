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
      title: 'Thoughts, emotions, and behaviour (CBT) | Anto brief guide',
      description:
        'Brief guide to cognitive behavioural therapy (CBT): how thought, emotion, and behaviour connect, an everyday example, and a small step to look at the interpretation. Gateway to distortions and ABC. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Thoughts, emotions, and what you do next',
      openGraphDescription:
        'CBT in brief: not positive thinking — looking at the interpretation and trying a small step.',
      keywords:
        'CBT, cognitive behavioural therapy, thoughts emotions behaviour, automatic thoughts, interpretation, evidence for and against, ABC technique, cognitive distortions, anxiety, depression, brief guide, psychoeducation, Anto',
    },
    hero: {
      title: 'Thoughts, emotions, and what you do next',
      subtitle:
        'Cognitive behavioural therapy (CBT) in brief: it is not about positive thinking — it is about looking at the interpretation and trying a small step.',
      scanLink: {
        label: 'Go to the example →',
        sectionHeading: 'Everyday example',
      },
    },
    pullQuote:
      'The fact did not change. What changed was the story you told on top of it — and with it, what you did next.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Hands holding a phone open to an unanswered chat, beside a notebook with handwritten questions',
      caption:
        'The chat does not reply. The mind already wrote the verdict. That is where CBT work begins.',
      width: 1536,
      height: 1024,
      objectPosition: '42% 52%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'The core idea',
        paragraphs: [
          'We do not always react to facts themselves, but to how we interpret them. The same unanswered message can mean “they are busy” or “I no longer matter” — and the body answers that story.',
          'CBT works on three connected levels: thoughts, emotions, and behaviours. The goal is not “positive thinking”, but spotting unhelpful patterns and testing more realistic, actionable alternatives.',
        ],
      },
      {
        heading: 'What is it used for?',
        paragraphs: [
          'It is among the most supported psychological approaches for anxiety, depression, phobias, insomnia, and prolonged stress (Hofmann et al., 2012). It does not replace a clinical assessment, but it offers concrete tools for everyday life.',
        ],
        bullets: [
          'Identify automatic thoughts in difficult situations',
          'Question extreme or unrealistic interpretations',
          'Try small behaviours that break avoidance cycles',
          'Track emotions and patterns to see progress',
        ],
      },
      {
        heading: 'Everyday example',
        paragraphs: [
          'A friend’s message goes unanswered. Automatic thought: “I did something wrong and they no longer want to talk to me.” That can trigger sadness or anxiety and lead you to avoid reaching out.',
          'Next step: evidence for and against, other explanations (they are busy, they did not see it), and a small action — a brief message, or waiting a while before concluding.',
        ],
      },
      {
        heading: 'What this is not',
        paragraphs: [
          'This page is the brief frame. It is not a full clinical protocol or a map of CBT techniques — that deeper guide comes later. It is also not therapy with a professional.',
          'Looking at an interpretation does not deny what you feel. Sometimes the thought points to something real; what twists is the absolute certainty.',
        ],
      },
      {
        heading: 'When to seek help',
        paragraphs: [
          'Talk to a professional if these loops do not ease, take your sleep, work, or desire to be with people, or if rumination leaves you no room to act.',
          'If there are thoughts of harming yourself, immediate risk, or you cannot care for yourself: contact emergency services or a crisis line in your country. Anto can offer resources; it does not replace those services.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'When the chat silence already has a story on top, you can bring that sentence as-is and look at evidence — without pressure to “fix everything”.',
      afterHeading: 'Everyday example',
      chat: {
        ariaLabel: 'Example conversation in Anto when a message goes unanswered',
        messages: [
          {
            role: 'user',
            text: 'Hours with no reply. I already invented that I am in trouble.',
          },
          {
            role: 'anto',
            text: 'That hurts. Is that a fact from the message, or the story you are writing on top?',
          },
          {
            role: 'user',
            text: 'The story. But it feels like truth.',
          },
          {
            role: 'anto',
            text: 'Let’s write the thought as-is — then evidence for and against. Then one small action, without forcing.',
          },
        ],
      },
      suggestionsLabel: 'Suggestions',
      suggestions: ['Separate fact from story', 'Evidence for and against'],
    },
    furtherReading: {
      title: 'Go further',
      support:
        'This page is the brief frame. For concrete patterns or a situational record:',
      links: [
        {
          label: 'Cognitive distortions (brief guide)',
          description:
            'Everyday examples and a short exercise to look closely at a thought.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'ABC technique',
          description:
            'Situational record: what happened → what you told yourself → what you felt and did.',
          href: '/recursos/tecnica-abc',
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Sources that support the CBT frame and its evidence. They do not replace a personal evaluation.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Foundational frame: the role of interpretations in emotional distress.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Clinical CBT manual: automatic thoughts and cognitive restructuring.',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Review of meta-analyses: CBT efficacy across disorders.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortionsMap, SLUGS.anxiety],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace clinical evaluation or treatment. If there is suicide risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want company to look closely at an interpretation — without pressure — you can continue on your phone.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Look at an interpretation (short step)',
      description:
        'Brief CBT-style exercise: write the thought, review evidence, and choose a small action.',
      totalTime: 'PT8M',
      steps: [
        'Write the automatic thought exactly as it appears.',
        'List evidence for and against, as if helping a friend.',
        'Note one or two alternative explanations.',
        'Choose a small action (brief message, wait, or ask for help).',
      ],
    },
  },
  [SLUGS.distortions]: {
    slug: SLUGS.distortions,
    readingMinutes: 8,
    meta: {
      title: 'Cognitive distortions: spot them and question them | Anto',
      description:
        'Brief guide to cognitive distortions: everyday examples (catastrophising, all-or-nothing, mind reading), separating fact from story, and a short exercise to look closely at a thought. Links to the clinical map (levels, experiments). Does not replace professional care.',
      openGraphTitle: 'Cognitive distortions — recognise and question',
      openGraphDescription:
        'When a silence becomes a verdict: everyday examples, fact vs. story, and the path to the clinical map.',
      keywords:
        'cognitive distortions, thoughts in a loop, unanswered message, mind reading, fact vs story, automatic thoughts, catastrophising, all-or-nothing, reframing, brief guide, CBT, ABC technique, psychoeducation, Anto',
    },
    hero: {
      title: 'Cognitive distortions',
      subtitle:
        'Those mental shortcuts that turn a silence into a verdict. Naming them helps you not believe them instantly — without forcing yourself to “think positive.”',
      companionLink: {
        href: '/recursos/mapa-distorsiones-cognitivas',
        support: 'Want the clinical map?',
        label: 'Go to the full guide →',
      },
    },
    pullQuote:
      'Sometimes the mind is not entirely wrong. It just exaggerates. And in that exaggeration, the rest of the day slips away.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-thought-loop.webp',
      alt: 'Hands holding a phone open to an unanswered chat, beside a notebook with handwritten mind-reading questions',
      caption:
        'The chat does not reply. The notebook already invented the story. Separating those two is the first step.',
      width: 1536,
      height: 1024,
      /*
       * Dense scene: the notebook (written mind-reading) lives in the lower third.
       * Keep 3/2 on desktop so the panorama crop does not eat the story.
       */
      objectPosition: '42% 52%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'What they are',
        paragraphs: [
          'Cognitive distortions are shortcuts the mind takes under stress, fatigue, or fear. They do not mean you “think badly”: they are habits. Useful for surviving an intense moment; unreliable as a map of the day.',
          'In practice, naming one already changes something: “this sounds like catastrophising” instead of “that’s just how it is.” The point is not to silence the mind. It is to gain a little air before you decide what to do.',
          'Before you put a name on it, there is usually a signal: the body tenses, emotion rises fast, and the thought arrives closed — as if it were already true.',
        ],
        bullets: [
          'The urge to believe it instantly (“that’s it, it’s true”).',
          'Absolute words: always, never, everyone, impossible.',
          'Anxiety, shame, or anger that arrive before you check the facts.',
        ],
      },
      {
        heading: 'Everyday examples',
        paragraphs: [
          'You do not need a long list memorised. It helps to recognise the ones that keep showing up for you:',
        ],
        bullets: [
          'All-or-nothing: “if it is not perfect, it is a total failure.”',
          'Catastrophising: “if I mess up the meeting, my career is over.”',
          'Mind reading: “they surely think I am a drag.”',
          'Overgeneralisation: one stumble becomes “this always happens to me.”',
        ],
      },
      {
        heading: 'Exercise: look closely at a thought',
        paragraphs: [
          'Do this when you are not at the peak. If you are at 8 or 9, first come down a little (breathe, feet on the floor, a bit of grounding) and only then write.',
        ],
        ordered: true,
        bullets: [
          'Write the thought exactly as it appears — without editing or “fixing” it.',
          'Give it a tentative name (catastrophising, all-or-nothing, mind reading…).',
          'Rate how you feel from 0 to 10.',
          'Note what evidence there is for and against, as if helping a friend.',
          'Write a more balanced version and, if it fits, a small action.',
        ],
      },
      {
        heading: 'What this is not',
        paragraphs: [
          'Looking at a distortion is not “positive thinking” and does not downplay what you feel. Sometimes the thought points to something real; what twists it is the absolute or impossible certainty.',
          'It is also not a diagnosis. Seeing a pattern does not say who you are: it says which habit kicked in. And habits can be trained — alone or with help.',
        ],
      },
      {
        heading: 'When to seek help',
        paragraphs: [
          'It is worth talking to a professional if these loops will not loosen, they take sleep, work, or the wish to be with people, or if rumination leaves you with no room to act.',
          'If there are thoughts of harming yourself, immediate risk, or you cannot care for yourself: seek emergency services or a crisis line in your country. Anto can offer resources; it does not replace those services.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'When the chat silence already has a story in the notebook, you can bring that line exactly as it is and look at it closely — without pressure to “fix everything.”',
      afterHeading: 'Exercise: look closely at a thought',
      chat: {
        ariaLabel: 'Sample Anto conversation when a message goes unanswered and the notebook already invented the story',
        messages: [
          {
            role: 'user',
            text: 'Three hours with no reply. In the notebook I wrote: “they don’t care anymore.”',
          },
          {
            role: 'anto',
            text: 'That hurts. Is that a fact from the message, or the story you’re writing on top?',
          },
          {
            role: 'user',
            text: 'The story. But it feels like truth.',
          },
          {
            role: 'anto',
            text: 'Let’s write the thought exactly as it is — then evidence for and against, as if you were helping a friend.',
          },
        ],
      },
      suggestionsLabel: 'Suggestions',
      suggestions: ['Look closely at the thought', 'Separate fact from story'],
    },
    furtherReading: {
      title: 'Go deeper',
      support:
        'This page is practical and brief. If you want the clinical map — levels, clusters, maintenance, experiments — start here:',
      links: [
        {
          label: 'Cognitive distortions (full map)',
          description:
            'Cognitive levels, clusters, maintenance, behavioural experiments, and anxiety/depression profiles.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'Thoughts, emotions, and behaviour (CBT)',
          description:
            'Brief frame: how interpretation, emotion, and what you do next connect — before the distortions map.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'ABC technique',
          description:
            'A simple record: what happened → what you told yourself → what you felt and did.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Anxiety and worry',
          description:
            'When catastrophic thinking comes with a racing body: map and interventions.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Classic CBT sources on automatic thoughts and distortions. They do not replace a personal assessment.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Foundational frame for cognitive therapy and the role of interpretations in emotional distress.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Clinical CBT manual: identifying automatic thoughts and cognitive restructuring.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
          note: 'Accessible catalogue of cognitive distortions and questioning exercises for general readers.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace clinical assessment or treatment. If there is suicidal risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want company looking closely at a thought — without pressure — you can continue on your phone.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Look closely at a thought',
      description:
        'Short exercise to name an automatic thought, review evidence, and write a more balanced version.',
      totalTime: 'PT10M',
      steps: [
        'Write the automatic thought exactly as it appears.',
        'Give it a tentative name (catastrophising, all-or-nothing, etc.).',
        'Rate how you feel from 0 to 10.',
        'List evidence for and against.',
        'Write a more balanced version and a small action if needed.',
      ],
    },
  },
  [SLUGS.distortionsMap]: {
    slug: SLUGS.distortionsMap,
    readingMinutes: 12,
    layout: 'dossier',
    meta: {
      title: 'Cognitive distortions: full clinical map | Anto',
      description:
        'Clinical map of cognitive distortions: three levels of the model (automatic thoughts, rules, core beliefs), functional clusters, maintenance cycles, techniques beyond labelling, designing behavioural experiments, downward arrow, and anxiety vs. depression profiles. Complements the brief guide; does not diagnose or replace therapy.',
      openGraphTitle: 'Cognitive distortions — clinical map',
      openGraphDescription:
        'Beyond labelling the bias: cognitive levels, maintenance, behavioural experiments, and clinical profiles.',
      keywords:
        'cognitive distortions, clinical map, functional clusters, core beliefs, behavioural experiment, downward arrow, safety behaviours, cognitive maintenance, threat biases, cognitive restructuring, CBT, Beck, clinical psychoeducation, Anto',
    },
    hero: {
      title: 'Cognitive distortions: full map',
      subtitle:
        'What the brief guide does not cover: levels of the cognitive model, why the bias persists, techniques beyond labelling, and how the pattern shows up in anxiety or depression.',
      companionLink: {
        href: '/recursos/distorsiones-cognitivas',
        support: 'Haven’t named a thought yet?',
        label: 'Start with the practical guide →',
      },
    },
    pullQuote:
      'Labelling the bias is the first step. Clinical work begins when you ask what sustains it — and what new evidence you could create.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-desk-rain.webp',
      alt: 'Night desk by a rainy window, lamp on, open notebook and pen — space to write a prediction and a test',
      caption:
        'Rain outside, prediction in the notebook. The clinical map is written: hypothesis, test, data — not only argued.',
      width: 1536,
      height: 1024,
      objectPosition: '38% 58%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Three levels of the cognitive model',
        paragraphs: [
          'The practical guide focuses on the situational thought. Here the focus is architecture: in Beck’s model, distress is not explained by an isolated thought alone, but by layers that activate together (Beck, 1976; Beck, 2020).',
          'At the surface appear automatic thoughts. Below sit rules and “shoulds” (intermediate beliefs). Deeper still, schemas about self, world, or future (core beliefs). Distortion describes the shape of the error at the surface; schema explains why that error repeats across many situations.',
          'This guide is psychoeducation. It does not diagnose. It helps you read the pattern with more depth when you already know how to name a thought — not to start from zero.',
        ],
        bullets: [
          'Automatic: telegraphic, situational (“they won’t reply”).',
          'Intermediate: rule or standard (“if someone hesitates, I failed”).',
          'Core: stable schema (“I’m not trustworthy” / “the world is dangerous”).',
        ],
      },
      {
        heading: 'Functional clusters (not a list to memorise)',
        paragraphs: [
          'Memorising ten names adds little. In clinic, grouping by function is more useful: what bias protects, or what perceived threat sustains it. That way you choose the intervention, not just the label.',
        ],
        bullets: [
          'Threat / anticipation: overestimating probability or severity, treating predictions as facts, demanding impossible certainty.',
          'Self-evaluation: worth dichotomies, global labels, rigid imperatives, filters that erase competence nuance.',
          'Interpersonal: attributing intentions without data, personalising shared events, reading silence as verdict.',
          'One episode can mix clusters (e.g. threat + interpersonal). The dominant one matters for choosing the test.',
        ],
      },
      {
        heading: 'Cycles that maintain the bias',
        paragraphs: [
          'The bias does not persist just from “thinking badly”. It is reinforced when behaviour lowers anxiety instantly and blocks corrective learning: avoiding, checking, seeking certainty, ruminating without updating probability.',
          'Cognitive fusion — living the thought as fact — rises with hyperarousal. That is why, at high peaks, arousal is regulated first; then you design a test. If you only “reason” at 9/10, you often reinforce rumination.',
        ],
        bullets: [
          'Selective confirmation: you seek or remember only what fits.',
          'Safety behaviours: short relief, threat intact in the medium term.',
          'Rumination: verbal repetition without experiment or decision.',
          'Avoiding disconfirmation: you do not expose yourself to data that could nuance the schema.',
        ],
      },
      {
        heading: 'Techniques beyond labelling',
        paragraphs: [
          'Naming the distortion (what you practise in the brief guide) creates distance. The next clinical level combines cognitive appraisal with new evidence in real life (Beck, 2020). It is not arguing with yourself until you give in.',
        ],
        bullets: [
          'Structured decatastrophising: probability × severity × coping (“if it happened, what would you do?”).',
          'Continuum / gradients: replace “perfect or failure” with a 0–100 scale of performance or threat.',
          'Pie of responsibility: distribute causality across factors (you, context, chance, others) when there is personalisation.',
          'Alternative explanations: generate ≥3 readings of the same fact before closing the hypothesis.',
          'Behavioural experiment: design a small test that could disconfirm the prediction.',
          'Rules work: move from absolute “should” to preference or flexible standard.',
        ],
      },
      {
        heading: 'Exercise: design a behavioural experiment',
        paragraphs: [
          'Different from the evidence record in the brief guide. Here you do not only rewrite the thought: you create a situation that can yield new data. Do it outside the peak (≥8/10 → regulate first).',
          'Example: prediction “if I don’t check the message within two hours, I won’t be able to stand the anxiety and I’ll lose the plan.” Experiment: do not check for 90 minutes; note anxiety at minute 0, 30, and 90; observe whether the plan is lost. Typical result: anxiety rises then falls; the plan does not depend on checking every five minutes.',
        ],
        ordered: true,
        bullets: [
          'Write the concrete prediction (what you fear will happen if you do not do the safety behaviour).',
          'Define the safety behaviour you will suspend or reduce (small dose).',
          'Choose a time window and measure (anxiety 0–10, or an observable fact).',
          'Run the test and record what happened vs. what you predicted.',
          'Draw a provisional conclusion — not a new absolute certainty.',
          'If relevant: a slightly larger next experiment the following week.',
        ],
      },
      {
        heading: 'Downward arrow toward beliefs',
        paragraphs: [
          'When the same bias reappears across several domains, it helps to go down a level: ask “if that were true, what would it say about me / the world / the future?” That is the downward arrow toward rules or core beliefs (Beck, 2020).',
          'It is not forced excavation in a single session. It is a map: sometimes noticing the rule (“if I don’t control things, something bad happens”) is enough to choose experiments that test it, instead of fighting only the day’s automatic thought.',
        ],
        bullets: [
          'Useful when labelling no longer changes intensity.',
          'Caution: do not force it with recent trauma or intense hopelessness — prioritise stabilisation and assessment.',
          'The belief is treated as hypothesis, not identity verdict.',
        ],
      },
      {
        heading: 'Profiles in anxiety and depression',
        paragraphs: [
          'In anxiety, threat clusters usually dominate: anticipation, impossible certainty, social mind reading, safety behaviours. Maintenance intertwines with avoidance.',
          'In depression, stable negative self-evaluation usually dominates: filter, overgeneralisation, labelling, internal personalisation (“it’s because of how I am”). Without behavioural activation, cognitive material stays without new data.',
          'These are frequent descriptive patterns, not a diagnostic rule. The same episode can mix both. If mood is very low, activating behaviour often comes before intensifying cognitive debate.',
        ],
      },
      {
        heading: 'Clinical criteria and limits of use',
        paragraphs: [
          'Professional assessment is warranted if the pattern is persistent, there is functional impairment, intense anhedonia or hopelessness, substances used to modulate distress, or if experiments and restructuring increase rumination without relief.',
          'If there is suicidal ideation, immediate risk, or inability to care for yourself: emergency services or a crisis line in your country. Anto can detect signals and offer resources; it does not replace those services or clinical treatment.',
        ],
        bullets: [
          'This page assumes you have already practised recognising a thought (brief guide).',
          'It does not replace individual clinical formulation or CBT with a therapist.',
          'If cognitive work destabilises you, pause and seek assessment.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'When you have already written the prediction, the next step is not only to reason: design a small test and record what actually happened.',
      afterHeading: 'Techniques beyond labelling',
      chat: {
        ariaLabel: 'Sample Anto conversation designing a behavioural experiment with a written record',
        messages: [
          {
            role: 'user',
            text: 'I wrote: “if I don’t check the chat for an hour, it’ll spiral and I’ll lose the plan.” Anxiety 7.',
          },
          {
            role: 'anto',
            text: 'Good written prediction. Which safety behaviour will you pause for the test?',
          },
          {
            role: 'user',
            text: 'Not opening the chat. Sixty minutes.',
          },
          {
            role: 'anto',
            text: 'Note anxiety at minute 0 and 60, and whether the plan was lost. Then we compare prediction vs. data — without demanding total certainty.',
          },
        ],
      },
      suggestionsLabel: 'Suggestions',
      suggestions: ['Design a behavioural experiment', 'Record prediction vs. data'],
    },
    furtherReading: {
      title: 'Go deeper',
      support:
        'This text is the clinical map. To recognise a thought in everyday life, keep an ABC record, or read about anxiety/depression, continue here:',
      links: [
        {
          label: 'Cognitive distortions (brief guide)',
          description:
            'Practical entry: everyday examples and a short exercise to look closely at a thought.',
          href: '/recursos/distorsiones-cognitivas',
        },
        {
          label: 'ABC technique',
          description:
            'Situational record: Activating event → Belief → Consequence.',
          href: '/recursos/tecnica-abc',
        },
        {
          label: 'Anxiety and worry',
          description:
            'When the threat cluster comes with hyperarousal and avoidance.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'Depression: brief guide',
          description:
            'Mental filter, low mood, and why behavioural activation is often needed.',
          href: '/recursos/depresion-guia-breve',
        },
        {
          label: 'Behavioural activation',
          description:
            'Behavioural steps when cognitive debate runs out of new data.',
          href: '/recursos/activacion-conductual',
        },
        {
          label: 'Evidence that informs Anto',
          description:
            'How we read CBT, scales, and digital mental health — and what we do not claim. APA citations with DOIs.',
          href: '/investigacion',
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Clinical sources supporting the cognitive levels, maintenance, and interventions mentioned above. They do not replace individual clinical assessment.',
      items: [
        {
          apa: 'Beck, A. T. (1976). Cognitive therapy and the emotional disorders. International Universities Press.',
          href: 'https://openlibrary.org/works/OL457087W/Cognitive_Therapy_and_the_Emotional_Disorders',
          note: 'Cognitive architecture: interpretations, schemas, and emotional distress.',
        },
        {
          apa: 'Beck, J. S. (2020). Cognitive behavior therapy: Basics and beyond (3rd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/Cognitive-Behavior-Therapy/Judith-Beck/9781462544196',
          note: 'Automatic thoughts, beliefs, downward arrow, behavioural experiments, and restructuring.',
        },
        {
          apa: 'Burns, D. D. (1999). The feeling good handbook (Rev. ed.). Plume.',
          href: 'https://www.penguinrandomhouse.com/books/329278/the-feeling-good-handbook-by-david-d-burns/',
          note: 'Accessible distortion taxonomies (reference; here used as clusters, not a list to memorise).',
        },
        {
          apa: 'Hofmann, S. G., Asnaani, A., Vonk, I. J. J., Sawyer, A. T., & Fang, A. (2012). The efficacy of cognitive behavioral therapy: A review of meta-analyses. Cognitive Therapy and Research, 36(5), 427–440. https://doi.org/10.1007/s10608-012-9476-1',
          href: 'https://doi.org/10.1007/s10608-012-9476-1',
          note: 'Review of meta-analyses on CBT efficacy across clinical problems.',
        },
      ],
    },
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.behavioralActivation],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace clinical assessment or treatment. If there is suicidal risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want company designing a small test for a prediction — without pressure — you can continue on your phone.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Design a behavioural experiment',
      description:
        'Short protocol to turn a biased prediction into a small test, measure the outcome, and update the hypothesis.',
      totalTime: 'PT20M',
      steps: [
        'Write the concrete prediction.',
        'Define the safety behaviour to reduce or suspend.',
        'Choose a time window and how you will measure anxiety or outcome.',
        'Run the test and record prediction vs. data.',
        'Draw a provisional conclusion.',
        'If relevant, define a slightly larger next experiment.',
      ],
    },
  },
  [SLUGS.abc]: {
    slug: SLUGS.abc,
    readingMinutes: 6,
    meta: {
      title: 'ABC technique step by step | Anto psychoeducation',
      description:
        'Learn the ABC technique (Activating event, Belief, Consequence) to analyse difficult situations and shift emotional responses. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'ABC technique — step-by-step guide',
      openGraphDescription: 'Record situations, thoughts, and emotions with the CBT ABC model.',
    },
    hero: {
      title: 'ABC technique: step by step',
      subtitle: 'A classic CBT tool to unpack automatic reactions to stressful situations.',
    },
    sections: [
      {
        heading: 'The three columns',
        bullets: [
          'A — Activating event: what happened (observable fact, no interpretation)',
          'B — Belief or thought: what you told yourself in that moment',
          'C — Consequence: emotion and behaviour that followed',
        ],
      },
      {
        heading: 'Quick example',
        paragraphs: [
          'A: Your manager did not greet you when entering the office. B: “They are angry with me.” C: Anxiety 7/10 and you avoid asking for feedback.',
          'Review: are there other explanations? What if a colleague were distracted? New B: “they may be focused; I have no evidence of a problem.” New C: anxiety 4/10 and you decide to greet them normally.',
        ],
      },
      {
        heading: 'Practical tips',
        paragraphs: [
          'Write in present or recent past tense, with short sentences. Separate facts from interpretations in column A. If emotion is very high, regulate first (breathing, grounding) then complete the ABC.',
        ],
      },
      {
        heading: 'Practice in Anto',
        paragraphs: [
          'Since version 1.5, Anto includes an interactive ABC canvas in the techniques hub, connected to the insights graph to see which situations and beliefs repeat over time.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.tcc, SLUGS.distortionsMap, SLUGS.anxiety],
    disclaimer:
      'Psychoeducation guide. Does not replace individual therapy. If you are in crisis, contact emergency services in your country.',
    cta: { label: 'Try Anto free for 1 day →', path: '/bienvenida' },
  },
  [SLUGS.anxiety]: {
    slug: SLUGS.anxiety,
    readingMinutes: 12,
    meta: {
      title: 'Anxiety and worry: a map to understand it | Anto',
      description:
        'Psychoeducation on anxiety and worry: autonomic activation, worry vs. anxiety, symptoms, safety behaviours, common presentations, interventions (regulation, grounding, exposure, worry postponement), GAD-7 screening, and when to seek assessment. Does not diagnose or replace therapy.',
      openGraphTitle: 'Anxiety and worry — complete guide',
      openGraphDescription:
        'From anticipatory arousal to a map: symptoms, avoidance, CBT-informed interventions, and when to seek evaluation.',
      keywords:
        'anxiety, worry, GAD, generalised anxiety disorder, panic attack, safety behaviours, avoidance, GAD-7, graded exposure, grounding, psychoeducation, CBT, Anto',
    },
    hero: {
      title: 'Anxiety and worry',
      subtitle:
        'A map for reading anticipatory activation: symptoms, avoidance cycles, evidence-informed interventions, and when clinical assessment makes sense.',
    },
    pullQuote:
      'Anxiety does not always lie. Sometimes it warns. The problem is when the warning stays on even after the danger is gone.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-morning-pause.webp',
      alt: 'A quiet morning pause by a soft-lit window — space when worry will not let go',
      caption:
        'Sometimes the day starts before the body is ready. Naming the activation is already a first clinical cue.',
      width: 1536,
      height: 1024,
    },
    sections: [
      {
        heading: 'What anxiety is',
        paragraphs: [
          'Anxiety is a threat response of the autonomic nervous system — chiefly the sympathetic branch — to danger that is real, anticipated, or interpreted. It raises arousal: tachycardia, muscle tension, shallower breathing, attention biased toward what might go wrong. In an adaptive dose, it prepares action. When it becomes chronic, the future occupies the present.',
          'Clinically it is described across three channels: somatic (body), cognitive (anticipation, catastrophising), and behavioural (avoidance and safety behaviours). It is not the same as “being nervous”: it implies intensity, persistence, or functional impairment.',
          'This guide is psychoeducation. It does not diagnose a disorder. It helps you recognise the pattern, practise low-risk interventions, and decide when professional assessment is warranted.',
        ],
      },
      {
        heading: 'Worry vs. anxiety',
        paragraphs: [
          'Clinical literature often distinguishes worry — a verbal-cognitive process of rehearsing scenarios in language — from anxiety as an affective–somatic state (Borkovec et al., 1983a). Worrying before an exam or a bill can be adaptive: there is a concrete cue and some room for control.',
          'Worry becomes dysfunctional when it is excessive, hard to control, spans several domains, and no longer orients toward solutions. Clinically relevant anxiety usually includes sustained hyperarousal, avoidance, and impairment in sleep, work, or relationships — often over weeks.',
        ],
        bullets: [
          'Adaptive worry: bounded, tied to a real problem, supports deciding or planning.',
          'Pathological worry: catastrophises, demands impossible certainty, returns after checking.',
          'Anxiety with impact: arousal does not settle even when cognitive appraisal says “no objective danger”.',
        ],
      },
      {
        heading: 'Somatic and cognitive symptoms',
        paragraphs: [
          'Before intervening on thought, it helps to map the signal. In anxiety, the somatic channel often activates first or in parallel with the cognitive one.',
        ],
        bullets: [
          'Somatic: tension (jaw, neck, shoulders), sweating or cold hands, palpitations, subjective dyspnea, gastrointestinal discomfort.',
          'Cognitive: attentional bias to threat, intrusive thoughts, concentration difficulty, irritability.',
          'Sleep: fragmentation, early waking, daytime fatigue out of proportion to effort.',
          'Subjective urgency (“I have to solve this now”) without a clear operational task — typical of hyperarousal.',
        ],
      },
      {
        heading: 'Avoidance and safety behaviours',
        paragraphs: [
          'A central mechanism is negative reinforcement: uncertainty or fear appears → you perform a behaviour that lowers anxiety instantly (check, ask, avoid) → relief teaches the system that “this is the only way to feel safe” → the perceived threat consolidates. Safety-seeking behaviours can block disconfirmation of threat (Salkovskis, 1991).',
          'Avoidance and safety behaviours are understandable. They also maintain the problem over time: they block habituation and corrective learning (“harm did not occur even though I did not avoid”). The clinical alternative is not “total bravery”, but graded exposure — tolerable doses, often with support (Craske et al., 2014).',
        ],
        bullets: [
          'Checking: repeatedly reviewing symptoms, messages, news, or the body.',
          'Reassurance-seeking: asking others — or the internet — for certainty again and again.',
          'Situational avoidance: cancelling, postponing, or not deciding “just in case”.',
          'Cognitive avoidance: total distraction that never processes the feared cue and leaves it intact.',
        ],
      },
      {
        heading: 'Common presentations (not a diagnosis)',
        paragraphs: [
          'Anxiety presentations are grouped into clinical categories (e.g. in diagnostic manuals), but here they are listed as descriptive patterns — not labels you should self-assign:',
        ],
        bullets: [
          'GAD-type / generalised worry: excessive, hard-to-control worry across several domains (health, money, work, family).',
          'Social anxiety: intense fear of negative evaluation, inhibition, or avoidance of interpersonal situations.',
          'Panic attacks: intense waves of fear with marked autonomic symptoms; they often peak within minutes (not always equal to panic disorder).',
          'Health anxiety: interoceptive hypervigilance and reassurance-seeking about bodily sensations.',
          'Situational or reactive anxiety: tied to an identifiable stressor (a move, grief, a job change) that does not settle after the acute peak.',
        ],
      },
      {
        heading: 'Interventions that usually help',
        paragraphs: [
          'Meta-analyses of placebo-controlled trials indicate that CBT is efficacious for adult anxiety disorders (Hofmann & Smits, 2008). In practice this often combines: (1) arousal regulation, (2) cognitive work on threat appraisals, and (3) exposure or reduction of safety behaviours. If intensity is high, prioritise stabilisation and professional support.',
        ],
        bullets: [
          'Autonomic regulation: slow breathing with longer exhale; 5-4-3-2-1 sensory grounding; contact with the floor.',
          'Affect labeling: naming “this is anxiety” can reduce cognitive fusion with catastrophic thought.',
          'Worry postponement (stimulus control): a timed window for worry; outside it, note and defer.',
          'Graded exposure: hierarchical approach to what you avoid, without demanding absolute certainty.',
          'Baseline arousal hygiene: sleep, moderate physical activity, and caffeine — they modulate sympathetic baseline.',
          'ABC or thought records: situation → thought → emotion/intensity → behaviour — to spot biases.',
        ],
      },
      {
        heading: 'Exercise: worry postponement',
        paragraphs: [
          'A stimulus-control technique described for chronic worry (Borkovec et al., 1983b): it does not erase worry; it concentrates it in an interval so the rest of the day is freer and continuous rumination is less reinforced.',
        ],
        ordered: true,
        bullets: [
          'Set 15–20 minutes daily (a stable time if you can) and a fixed place for the “worry window”.',
          'In that window, write worries in detail — without trying to solve them all.',
          'Outside the window: if one appears, log it on a list (“for 6:00 p.m.”) and return to the task at hand.',
          'When you open the window, review the list. Distinguish: is there one small behavioural action today? If not, close it until tomorrow.',
          'If subjective intensity is ≥8/10, lower arousal first (breathing or grounding), then write.',
        ],
      },
      {
        heading: 'Screening and follow-up (GAD-7)',
        paragraphs: [
          'The GAD-7 (Generalized Anxiety Disorder-7) is a brief screening scale for anxiety symptoms over the last two weeks (Spitzer et al., 2006). It does not diagnose on its own. In the validation study, a cut point ≥10 optimised sensitivity and specificity for probable GAD; scores of 5–9 are often treated as mild symptoms to monitor.',
          'Anto can integrate this kind of tracking into your history. One atypical day does not define the trend: time series and context matter (grief, physical illness, stimulants).',
        ],
      },
      {
        heading: 'When to seek assessment',
        paragraphs: [
          'Professional assessment is warranted if symptoms persist for several weeks, worsen, cause clear functional impairment, or if alcohol or other substances are used to modulate anxiety. Also if avoidance progressively shrinks your range of life.',
          'If there is suicidal ideation, immediate risk, or you cannot care for yourself: contact emergency services or a crisis line in your country. Anto can detect risk signals and offer resources; it does not replace emergency care or clinical treatment.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'When worry becomes sustained, you can describe it and get one concrete step — regulation or postponement — without trying to “resolve the whole picture” at once.',
      afterHeading: 'Interventions that usually help',
      chat: {
        ariaLabel: 'Example Anto conversation about sustained worry',
        messages: [
          {
            role: 'user',
            text: 'I have spent days rehearsing the worst. It is not a panic attack, but my body will not settle.',
          },
          {
            role: 'anto',
            text: 'That is exhausting. Is it an acute spike right now, or hard-to-control worry lasting days?',
          },
          {
            role: 'user',
            text: 'Hard to control. Work, health, several areas at once.',
          },
          {
            role: 'anto',
            text: 'First let’s regulate activation a little. Then we can try postponing worry to a window, so rumination is not reinforced all day.',
          },
        ],
      },
      suggestionsLabel: 'Suggestions',
      suggestions: ['Worry postponement', 'Arousal regulation'],
    },
    furtherReading: {
      title: 'Go deeper',
      support:
        'This text is the broad map. For a specific technique, a scale, or the CBT frame, continue here:',
      links: [
        {
          label: 'When anxiety rises (grounding)',
          description:
            'Sensory anchors and 5-4-3-2-1 for peaks of autonomic activation.',
          href: '/recursos/grounding-ansiedad-crisis',
        },
        {
          label: 'Cognitive distortions (full map)',
          description:
            'Cognitive levels, clusters, maintenance, behavioural experiments, and anxiety/depression profiles.',
          href: '/recursos/mapa-distorsiones-cognitivas',
        },
        {
          label: 'PHQ-9 and GAD-7',
          description:
            'Screening scales: what they measure, orienting ranges, and limits versus diagnosis.',
          href: '/recursos/escalas-phq9-gad7',
        },
        {
          label: 'Thoughts, emotions, and behaviour (CBT)',
          description:
            'Brief frame: interpretation, emotion, and what you do next.',
          href: '/recursos/que-es-tcc',
        },
        {
          label: 'Evidence that informs Anto',
          description:
            'How we read CBT, scales, and digital mental health — and what we do not claim. APA citations with DOIs.',
          href: '/investigacion',
        },
        {
          label: 'NIMH — Anxiety disorders (Spanish)',
          description:
            'Public clinical material from the National Institute of Mental Health (USA).',
          href: 'https://www.nimh.nih.gov/health/publications/espanol/trastorno-de-ansiedad-generalizada-cuando-no-se-pueden-controlar-las-preocupaciones-new',
          external: true,
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Peer-reviewed sources that support distinctions, mechanisms, and interventions above. They do not replace individual clinical assessment.',
      items: [
        {
          apa: 'Borkovec, T. D., Robinson, E., Pruzinsky, T., & DePree, J. A. (1983a). Preliminary exploration of worry: Some characteristics and processes. Behaviour Research and Therapy, 21(1), 9–16. https://doi.org/10.1016/0005-7967(83)90121-3',
          href: 'https://doi.org/10.1016/0005-7967(83)90121-3',
          note: 'Characterises worry as a cognitive process and its relation to anxiety.',
        },
        {
          apa: 'Borkovec, T. D., Wilkinson, L., Folensbee, R., & Lerman, C. (1983b). Stimulus control applications to the treatment of worry. Behaviour Research and Therapy, 21(3), 247–251. https://doi.org/10.1016/0005-7967(83)90206-1',
          href: 'https://doi.org/10.1016/0005-7967(83)90206-1',
          note: 'Experimental basis for worry postponement / worry window (stimulus control).',
        },
        {
          apa: 'Craske, M. G., Treanor, M., Conway, C. C., Zbozinek, T., & Vervliet, B. (2014). Maximizing exposure therapy: An inhibitory learning approach. Behaviour Research and Therapy, 58, 10–23. https://doi.org/10.1016/j.brat.2014.04.006',
          href: 'https://doi.org/10.1016/j.brat.2014.04.006',
          note: 'Exposure framework based on inhibitory learning (vs. habituation alone).',
        },
        {
          apa: 'Hofmann, S. G., & Smits, J. A. J. (2008). Cognitive-behavioral therapy for adult anxiety disorders: A meta-analysis of randomized placebo-controlled trials. The Journal of Clinical Psychiatry, 69(4), 621–632. https://doi.org/10.4088/jcp.v69n0415',
          href: 'https://doi.org/10.4088/jcp.v69n0415',
          note: 'Meta-analysis: CBT efficacy versus placebo for adult anxiety disorders.',
        },
        {
          apa: 'Salkovskis, P. M. (1991). The importance of behaviour in the maintenance of anxiety and panic: A cognitive account. Behavioural Psychotherapy, 19(1), 6–19. https://doi.org/10.1017/S0141347300011472',
          href: 'https://doi.org/10.1017/S0141347300011472',
          note: 'Cognitive account of safety-seeking behaviours and anxiety maintenance.',
        },
        {
          apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
          href: 'https://doi.org/10.1001/archinte.166.10.1092',
          note: 'Validation of the GAD-7 as a primary-care screening and severity scale.',
        },
      ],
    },
    relatedSlugs: [SLUGS.grounding, SLUGS.distortionsMap, SLUGS.tcc],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace clinical assessment or treatment. In suicidal risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want company between sessions — or while you decide to seek assessment — you can continue on your phone, at your pace.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Worry postponement (worry window)',
      description:
        'A stimulus-control technique to concentrate chronic worry in a daily interval and reduce continuous reinforcement of rumination.',
      totalTime: 'PT20M',
      steps: [
        'Set a fixed 15–20 minutes and a place for the worry window.',
        'In that window, note worries in detail without solving them all.',
        'Outside the window, if one appears, log it for that time slot and return to the activity.',
        'When you open the window, review the list and pick only one small behavioural action if one exists.',
        'If intensity is very high, regulate arousal first (breathing or grounding), then write.',
      ],
    },
  },
  [SLUGS.scales]: {
    slug: SLUGS.scales,
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'PHQ-9 and GAD-7: score ranges and how to read them | Anto',
      description:
        'What PHQ-9 (mood) and GAD-7 (anxiety) measure, orienting ranges, and official instruments. Two-week screening, not a diagnosis. In Anto the readings land in your history.',
      openGraphTitle: 'PHQ-9 and GAD-7: what they measure and how to read them',
      openGraphDescription:
        'Mood and anxiety screening: ranges, trend, and why a number is not a diagnosis.',
      keywords:
        'PHQ-9, GAD-7, PHQ-9 GAD-7, score ranges, depression screening, anxiety screening, history, psychoeducation, Anto',
    },
    hero: {
      title: 'PHQ-9 and GAD-7: what they measure and how to read them',
      subtitle:
        'Two screening scales about the last two weeks. They help you see whether it rises, falls, or holds — not to give yourself a diagnosis.',
      scanLink: {
        label: 'Go to the ranges →',
        sectionHeading: 'Orienting ranges',
      },
    },
    pullQuote:
      'The score names a trend. It does not name you.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-morning-pause.webp',
      alt: 'A person from behind walks towards a window in soft light, phone in hand',
      caption:
        'The morning has already started. If there is a number, it speaks of the two weeks behind you — not of this instant.',
      width: 1536,
      height: 1024,
      objectPosition: '48% 42%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'What are they?',
        paragraphs: [
          'The PHQ-9 looks at depressive symptoms; the GAD-7, at generalised anxiety. Both ask about the last two weeks and are used as screening: a first reading, not a verdict.',
          'The validated items — and the reviewed translations — live on PHQ Screeners. We do not copy the questionnaire here.',
        ],
        link: {
          label: 'PHQ Screeners — official instruments →',
          href: 'https://www.phqscreeners.com/',
          external: true,
        },
      },
      {
        heading: 'Orienting ranges',
        paragraphs: [
          'A number names two weeks. The series — whether it rises, falls, or holds — weighs more than a single point.',
        ],
        bands: [
          {
            label: 'PHQ-9 · 0–27',
            items: [
              { range: '0–4', label: 'none or minimal' },
              { range: '5–9', label: 'mild' },
              { range: '10–14', label: 'moderate' },
              { range: '15–19', label: 'moderately severe' },
              { range: '20–27', label: 'severe' },
            ],
          },
          {
            label: 'GAD-7 · 0–21',
            items: [
              { range: '0–4', label: 'minimal' },
              { range: '5–9', label: 'mild' },
              { range: '10–14', label: 'moderate' },
              { range: '15–21', label: 'severe' },
            ],
            note: 'Cut point ≥10 for probable GAD.',
          },
        ],
      },
      {
        heading: 'What to do with the result',
        paragraphs: [
          'If it stays high, take it to a doctor or psychologist. A bad day, grief, or a sick body can raise the number without changing the picture. Only a professional diagnoses.',
          'If there are thoughts of harming yourself, immediate risk, or you cannot care for yourself: emergency services or a crisis line in your country. Anto can offer resources; it does not replace those services.',
        ],
      },
    ],
    productMoment: {
      title: 'Where the number lives in Anto',
      body: 'It is not a technique you pick. Readings are built from what you tell Anto and show up in your history, with a trend. They remain screening.',
      afterHeading: 'Orienting ranges',
      chat: {
        ariaLabel: 'Example of how Anto places a scale reading in history, not as a technique',
        messages: [
          {
            role: 'user',
            text: 'It came out higher than last time. Is that already a diagnosis?',
          },
          {
            role: 'anto',
            text: 'No. It is screening: a two-week reading. In Anto it lives in your history; it does not name you.',
          },
          {
            role: 'user',
            text: 'Two times in a row. The number scares me.',
          },
          {
            role: 'anto',
            text: 'It makes sense that it scares you. What weighs is whether it holds. If it holds, take it to a professional.',
          },
        ],
      },
      suggestionsLabel: 'In the app',
      suggestions: ['Reading history', 'Trend reports'],
    },
    furtherReading: {
      title: 'Go deeper',
      support:
        'If mood is what sits behind the number, continue here — signs, duration, and a small step:',
      links: [
        {
          label: 'Depression: brief guide',
          description:
            'When the low mood lasts, what tends to help, and how it differs from a passing sadness.',
          href: '/recursos/depresion-guia-breve',
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Original validations of the scales. The ranges on this page come from those studies; they do not replace individual clinical assessment.',
      items: [
        {
          apa: 'Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613. https://doi.org/10.1046/j.1525-1497.2001.016009606.x',
          href: 'https://doi.org/10.1046/j.1525-1497.2001.016009606.x',
          note: 'Validation of the PHQ-9 and severity ranges (0–27) used as screening orientation.',
        },
        {
          apa: 'Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092',
          href: 'https://doi.org/10.1001/archinte.166.10.1092',
          note: 'Validation of the GAD-7; cut point ≥10 for probable GAD and severity ranges (0–21).',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psychoeducation. The scales do not diagnose or replace clinical assessment or treatment. In suicidal risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want those readings on your phone — history and trend, not a clinical name — you can download Anto.',
    cta: { label: 'Download Anto →', path: '/bienvenida' },
    howTo: {
      name: 'How to read a PHQ-9 or GAD-7 score',
      description:
        'Steps to interpret a screening result: time window, published range, trend, and when to take it to a professional. Does not diagnose.',
      totalTime: 'PT5M',
      steps: [
        'Confirm the window: the scales ask about the last two weeks, not about today.',
        'Place the number in the published range (orientation, not a label).',
        'If there are earlier readings, compare: the trend matters more than a single point.',
        'If it stays high, take it to a professional; do not close a diagnosis on the number alone.',
        'If there is risk or you cannot care for yourself, prioritise emergency help.',
      ],
    },
  },
  [SLUGS.selfCompassion]: {
    slug: SLUGS.selfCompassion,
    readingMinutes: 6,
    meta: {
      title: 'Self-compassion: what it is and brief exercises | Anto',
      description:
        'What self-compassion means in evidence-based psychology, why it is not indulgence, and how to practice it in hard moments. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Self-compassion guide',
      openGraphDescription: 'Learn to treat yourself with the same care you would offer someone you love.',
    },
    hero: {
      title: 'Self-compassion: brief guide',
      subtitle: 'Treating yourself with firm kindness when you fail, suffer, or compare yourself to others.',
    },
    sections: [
      {
        heading: 'Three components',
        bullets: [
          'Self-kindness in the face of suffering',
          'Common humanity: distress is part of human experience',
          'Mindfulness: noticing pain without exaggerating or suppressing it',
        ],
      },
      {
        heading: 'It is not “self-indulgence”',
        paragraphs: [
          'Self-compassion does not mean excusing everything or avoiding responsibility. It often makes learning from mistakes easier by reducing paralysing shame. It is the internal tone you use when things go wrong.',
        ],
      },
      {
        heading: 'Brief exercise',
        paragraphs: [
          'When you notice harsh self-criticism, pause. Place a hand on your chest if it helps. Say quietly: “this is a difficult moment; I am not alone in feeling this; what do I need now that is small and possible?”',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.tcc, SLUGS.distortions],
    disclaimer:
      'General psychoeducation. If self-criticism is linked to trauma or suicidal ideation, seek specialised professional help.',
    cta: { label: 'Get started with Anto →', path: '/bienvenida' },
  },
  [SLUGS.sleep]: {
    slug: SLUGS.sleep,
    readingMinutes: 6,
    layout: 'brief',
    meta: {
      title: 'When you cannot sleep | Anto brief guide',
      description:
        'Brief guide on sleep and emotions: why night amplifies rumination, concrete rest habits, a short ritual when the mind will not stop, and when to seek help. Complements the sleep and insomnia map. Psychoeducation; does not replace professional care or sleep therapy.',
      openGraphTitle: 'When you cannot sleep — brief guide',
      openGraphDescription:
        'The light still on at 3am: sleep–mood link, useful habits, and a short ritual when the mind will not let go.',
      keywords:
        'sleep, cannot sleep, night rumination, sleep hygiene, insomnia, night anxiety, rest habits, 3am, CBT-I, sleep map, psychoeducation, Anto',
    },
    hero: {
      title: 'When you cannot sleep',
      subtitle:
        'Better sleep does not fix everything. But poor sleep amplifies anxiety, irritability, and the voice that replays the day once the body is already in bed.',
      companionLink: {
        href: '/recursos/mapa-sueno-e-insomnio',
        support: 'Want the clinical map?',
        label: 'Go to the full guide →',
      },
    },
    pullQuote:
      'At 3am the mind does not invent new problems. It only turns the volume up.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Person sitting on the bed at night, back to the camera, rumpled sheets, phone set aside on the nightstand — the hour sleep will not come',
      caption:
        'The bed is a mess. The phone is aside. Sometimes the first step is not fighting the night.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '2.4 / 1',
    },
    sections: [
      {
        heading: 'Sleep and emotions',
        paragraphs: [
          'When you sleep little, the nervous system lowers stress tolerance: what felt like a bump by day can feel like a threat at night. Many people notice more rumination, irritability, or 3am wake-ups with worry loops.',
          'This is not a willpower failure. Sleep and mood push each other: poor sleep worsens anxiety; anxiety makes sleep harder. This page is a brief guide — recognition and useful habits — not a full clinical insomnia protocol.',
        ],
      },
      {
        heading: 'Habits that often help',
        paragraphs: [
          'You do not need to change everything tonight. If you only choose one, start with your wake time. Rest habits (often called “sleep hygiene”) do not replace evaluation when insomnia is already persistent, but they often improve the baseline.',
        ],
        bullets: [
          'A regular wake time (including weekends) — anchors the body clock even after an irregular night.',
          'A 30–60 minute wind-down without screens: dim light, something quiet, no scrolling.',
          'Bed for sleep and rest — not work, not meetings, not “just a bit” of phone.',
        ],
      },
      {
        heading: 'When the mind will not stop',
        paragraphs: [
          'When the body is still and the head is not, fighting the thought often makes it worse. Try a short paper ritual (not on the phone):',
        ],
        ordered: true,
        bullets: [
          'Write three worries exactly as they appear — without editing them.',
          'Note one minimal action for tomorrow (even “check email at 10”).',
          'Close the paper. Try slow breathing (e.g. 4-7-8) or a short relaxation audio.',
          'If intensity stays high, leave the bed for dim light a while; return without forcing yourself to “already be asleep”.',
        ],
      },
      {
        heading: 'What this is not',
        paragraphs: [
          'These habits are not cognitive behavioural therapy for insomnia (CBT-I), not a diagnosis, and not a promise of “eight perfect hours”. They also do not replace checking medical causes (pain, apnea, medication, shift work).',
          'If you have spent weeks sleeping poorly and daytime life is collapsing, this brief guide is not enough: professional evaluation is warranted. Here we only offer a first practical frame.',
        ],
      },
      {
        heading: 'When to seek help',
        paragraphs: [
          'Talk to a professional if insomnia persists for several weeks, worsens, or if you use alcohol or other substances to “switch off” the night. Also if fatigue affects work, mood, or safety (driving, caregiving).',
          'If there are thoughts of harming yourself, immediate risk, or you cannot care for yourself: contact emergency services or a crisis line in your country. Anto can offer resources; it does not replace those services.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'When the night will not let go, you can say so plainly and get one concrete step — a short ritual or regulation — without pressure to “fix sleep entirely”.',
      afterHeading: 'When the mind will not stop',
      chat: {
        ariaLabel: 'Example Anto conversation when you cannot sleep and the mind will not stop',
        messages: [
          {
            role: 'user',
            text: 'It is 3:10. My body is tired and my head is replaying the whole day.',
          },
          {
            role: 'anto',
            text: 'That is draining. Is this a spike right now, or have several nights been like this?',
          },
          {
            role: 'user',
            text: 'Several. And checking my phone only makes it worse.',
          },
          {
            role: 'anto',
            text: 'Put the phone aside. Write three worries on paper and one minimal action for tomorrow — then we breathe a little, without fighting the bed.',
          },
        ],
      },
      suggestionsLabel: 'Examples in the app',
      suggestions: ['Ritual when the mind will not stop', 'Lower the activation'],
    },
    furtherReading: {
      title: 'Go further',
      support:
        'If tonight is not enough and you want the map — presentations, cycles, and when to seek evaluation — continue here:',
      links: [
        {
          label: 'Sleep and insomnia (full map)',
          description:
            'Presentations, the cycle that maintains the problem, limits of hygiene, CBT-I-style components, and evaluation criteria.',
          href: '/recursos/mapa-sueno-e-insomnio',
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Reviews that support the sleep–mood link and the role of rest habits. They do not replace individual clinical evaluation.',
      items: [
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Reviews evidence for rest habits (schedule, screens, bed–sleep association) in the general population.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'Longitudinal meta-analysis: insomnia predicts higher depression risk — the sleep–mood link is not only subjective.',
        },
      ],
    },
    relatedSlugs: [],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace medical evaluation or sleep therapy. Persistent insomnia may require professional care. If there is suicide risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If tonight you only need someone to turn the volume down with you — without pressure — you can continue on your phone.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Ritual when the mind will not stop',
      description:
        'Short paper exercise to park night worries and reduce fighting the bed.',
      totalTime: 'PT10M',
      steps: [
        'Write three worries exactly as they appear.',
        'Note one minimal action for tomorrow.',
        'Close the paper and try slow breathing or a short relaxation audio.',
        'If activation stays high, move to dim light for a while and return without forcing sleep.',
      ],
    },
  },
  [SLUGS.sleepMap]: {
    slug: SLUGS.sleepMap,
    readingMinutes: 12,
    layout: 'dossier',
    meta: {
      title: 'Sleep and insomnia: full clinical map | Anto',
      description:
        'Clinical map of sleep and insomnia: presentations, maintenance cycle, limits of sleep hygiene, CBT-I-style components (stimulus control, sleep window), links to anxiety/mood, and when to seek evaluation. Complements the brief guide; does not diagnose or replace sleep therapy.',
      openGraphTitle: 'Sleep and insomnia — clinical map',
      openGraphDescription:
        'Beyond one bad night: what maintains insomnia, how far hygiene goes, and what CBT-I usually includes.',
      keywords:
        'insomnia, sleep, clinical map, sleep map, CBT-I, cognitive behavioural therapy for insomnia, sleep hygiene, stimulus control, sleep restriction, sleep window, sleep efficiency, maintenance cycle, night rumination, night anxiety, chronic insomnia, psychoeducation, Anto',
    },
    hero: {
      title: 'Sleep and insomnia: full map',
      subtitle:
        'What the brief guide does not cover: presentations, the maintenance cycle, limits of hygiene, CBT-I-style components, and when to seek evaluation.',
      companionLink: {
        href: '/recursos/higiene-sueno-salud-mental',
        support: 'If tonight you only need a short ritual:',
        label: 'Brief sleep guide →',
        placement: 'afterFigure',
      },
    },
    pullQuote:
      'Sleep hygiene prepares the ground. The clinical work begins when you look at what the bed, the clock, and the mind do at 3am.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
      alt: 'Person sitting on the bed at night, back to the camera, rumpled sheets, phone set aside — the moment the sleep map becomes necessary',
      caption:
        'It is not only “go to bed earlier”. It is understanding what keeps the fight with the night going.',
      width: 1536,
      height: 1024,
      objectPosition: '52% 45%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'Beyond one bad night',
        paragraphs: [
          'Everyone has bad nights. Insomnia, in a broad clinical sense, means recurrent difficulty falling asleep, staying asleep, or waking too early — with daytime fatigue, irritability, or functional impairment. Frequency, duration, and daytime impact matter, not only “being tired”.',
          'This page helps when you already recognise the pattern and want to read it in more depth. It does not diagnose, and it is not a full self-directed protocol.',
        ],
      },
      {
        heading: 'Common presentations (not a diagnosis)',
        paragraphs: [
          'In practice we describe patterns — not labels you should self-assign. They can coexist or change over time:',
        ],
        bullets: [
          'Onset: it takes a long time to fall asleep; bed becomes “here comes the fight”.',
          'Maintenance: you wake and struggle to return; clock-watching often raises activation.',
          'Early waking: the day starts before the body is ready; sometimes with rumination or low mood.',
          'Acute vs persistent: days or weeks after a stressor versus a pattern lasting a month or more with daytime impact.',
          'Comorbid: sleep intertwines with anxiety, depression, pain, shifts, or stimulants — not “hygiene only”.',
        ],
      },
      {
        heading: 'The cycle that maintains insomnia',
        paragraphs: [
          'A classic model distinguishes predisposition, precipitant, and perpetuation (Spielman et al., 1987): there may be vulnerability (anxiety, irregular rhythm), a trigger (stress, travel, illness), then behaviours that keep the problem going after the trigger has passed.',
          'That maintenance is often behavioural and cognitive. Short relief — more time in bed “just in case”, caffeine to survive the day, the phone “for a minute” — reinforces fear of not sleeping.',
        ],
        bullets: [
          'Bed = threat: the body activates at bedtime because it anticipates another bad night.',
          'Clock and checking: each glance confirms the hour and raises activation.',
          'More hours lying down ≠ more sleep: efficiency drops.',
          'Daytime compensation — long naps, late caffeine, cancelled plans — sustains the cycle.',
        ],
      },
      {
        heading: 'Limits of sleep hygiene',
        paragraphs: [
          'Rest habits (schedule, caffeine, screens, environment) are linked with better sleep in the general population, but evidence for “hygiene alone” as treatment for clinical insomnia is limited (Irish et al., 2015). They are a baseline; they rarely suffice once the maintenance cycle is installed.',
          'Use them without turning them into another night demand. If the rule list becomes rumination (“I failed the protocol”), you are reinforcing the problem you meant to solve.',
        ],
        bullets: [
          'Useful: cut late caffeine, dim light, bed not-an-office, stable wake time.',
          'Not enough alone: weeks of insomnia with impairment, intense fear of not sleeping, or suspected apnea.',
          'When maintenance is already behavioural, other modules are needed (e.g. stimulus control or a sleep window), not only more rules.',
        ],
      },
      {
        heading: 'CBT-I-style components',
        paragraphs: [
          'Cognitive behavioural therapy for insomnia (CBT-I) combines several modules; meta-analyses place it as an effective intervention for chronic insomnia in adults (Trauer et al., 2015). They are described here to orient you — not to self-dose sleep restriction without support.',
        ],
        bullets: [
          'Stimulus control: bed and bedroom linked to sleep/sex; if sleep does not come, leave for dim light and return without forcing.',
          'Sleep window / restriction: shorten time in bed to raise efficiency — high potency; better with clinical guidance if daytime sleepiness is dangerous.',
          'Cognitive work: reduce night catastrophising (“if I do not sleep, tomorrow will be a disaster”) and fusion with the thought.',
          'Relaxation / regulation: lower activation before or during the night without fighting “I must fall asleep now”.',
          'Hygiene as support: not as the only module when maintenance is already behavioural.',
        ],
      },
      {
        heading: 'Exercise: stimulus control (night)',
        paragraphs: [
          'A short version of the module to practise. If there is extreme sleepiness while driving, suspected apnea, or severe depression, prioritise evaluation before experimenting with sleep.',
        ],
        ordered: true,
        bullets: [
          'Go to bed only when sleepy — not “because it is time” with the body highly activated.',
          'Bed for sleep (and sex): no work, no scrolling, no long arguments.',
          'If you do not fall asleep in about 20 minutes, leave for another room with dim light; do something quiet without bright screens.',
          'Return when activation eases a little; repeat without punishing yourself.',
          'Wake at the same time every day — anchor the clock even after an irregular night.',
          'Note three nights: time in bed versus approximate sleep. Observation only, no verdict.',
        ],
      },
      {
        heading: 'Sleep, anxiety, and mood',
        paragraphs: [
          'The link is bidirectional: insomnia predicts higher depression risk in longitudinal studies (Baglioni et al., 2011); anxiety sustains the hyperarousal that makes sleep harder. Treating only “the thought” or only “the mattress” often falls short.',
          'If night is dominated by anticipatory threat, the anxiety map and grounding help in the spike. If daytime is heavy with low mood and inertia, behavioural activation and a mood evaluation may be the next step — alongside sleep habits, not instead of them.',
        ],
      },
      {
        heading: 'When to seek evaluation',
        paragraphs: [
          'Professional evaluation is warranted if the pattern lasts weeks, worsens, impairs work or safety (driving, caregiving), involves alcohol or sedatives to “switch off”, or shows signs of another sleep disorder (loud snoring, breathing pauses, restless legs).',
          'If there is suicidal ideation, immediate risk, or you cannot care for yourself: emergency services or a crisis line in your country. Anto can offer resources; it does not replace those services or CBT-I with a sleep clinician.',
        ],
        bullets: [
          'It does not replace polysomnography, medication adjustment, or individual formulation.',
          'If sleep restriction or experiments increase distress, pause and seek evaluation.',
        ],
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'You can describe the pattern as it is and get one concrete step — leave the bed, a paper ritual, or lower activation — without trying to fix sleep entirely in one night.',
      afterHeading: 'When to seek evaluation',
      chat: {
        ariaLabel: 'Example Anto conversation about the cycle that maintains insomnia',
        messages: [
          {
            role: 'user',
            text: 'It has been weeks. I go to bed early “just in case”, watch the clock, and by 3am I already feel defeated.',
          },
          {
            role: 'anto',
            text: 'That sounds like a maintenance cycle: more time in bed and checking. Tonight, can we try leaving for dim light if sleep does not come in about 20 minutes?',
          },
          {
            role: 'user',
            text: 'Yes. I fear tomorrow without sleep, but the phone only makes it worse.',
          },
          {
            role: 'anto',
            text: 'Put the phone aside. If there is no sleep, step out quietly — and keep your wake time. Afterwards we compare what happened with what you feared.',
          },
        ],
      },
      suggestionsLabel: 'Examples in the app',
      suggestions: ['Stimulus control', 'Ritual when the mind will not stop'],
    },
    furtherReading: {
      title: 'Go further',
      support: 'For a short ritual tonight, parallel anxiety, or public reference material:',
      links: [
        {
          label: 'When you cannot sleep (brief guide)',
          description:
            'Rest habits, a ritual when the mind will not stop, and when to seek help.',
          href: '/recursos/higiene-sueno-salud-mental',
        },
        {
          label: 'Anxiety and worry',
          description:
            'When night maintenance comes with hyperarousal and daytime avoidance.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
        {
          label: 'MedlinePlus — Insomnia',
          description:
            'Public NIH (U.S.) material on causes, symptoms, and when to seek care.',
          href: 'https://medlineplus.gov/insomnia.html',
          external: true,
        },
      ],
    },
    references: {
      title: 'References (APA)',
      support:
        'Sources that support maintenance, hygiene, and CBT-I efficacy. They do not replace individual clinical evaluation.',
      items: [
        {
          apa: 'Spielman, A. J., Caruso, L. S., & Glovinsky, P. B. (1987). A behavioral perspective on insomnia treatment. Psychiatric Clinics of North America, 10(4), 541–553.',
          href: 'https://pubmed.ncbi.nlm.nih.gov/3332317/',
          note: '3P model (predisposition, precipitant, perpetuation) of insomnia maintenance.',
        },
        {
          apa: 'Irish, L. A., Kline, C. E., Gunn, H. E., Buysse, D. J., & Hall, M. H. (2015). The role of sleep hygiene in promoting public health: A review of empirical evidence. Sleep Medicine Reviews, 22, 23–36. https://doi.org/10.1016/j.smrv.2014.10.001',
          href: 'https://doi.org/10.1016/j.smrv.2014.10.001',
          note: 'Limits and utility of sleep hygiene in the general population versus clinical treatment.',
        },
        {
          apa: 'Trauer, J. M., Qian, M. Y., Doyle, J. S., Rajaratnam, S. M. W., & Cunnington, D. (2015). Cognitive behavioral therapy for chronic insomnia: A systematic review and meta-analysis. Annals of Internal Medicine, 163(3), 191–204. https://doi.org/10.7326/M14-2841',
          href: 'https://doi.org/10.7326/M14-2841',
          note: 'Meta-analysis: CBT-I improves latency, awakenings, and sleep efficiency in chronic insomnia.',
        },
        {
          apa: 'Baglioni, C., Battagliese, G., Feige, B., Spiegelhalder, K., Nissen, C., Voderholzer, U., Lombardo, C., & Riemann, D. (2011). Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies. Journal of Affective Disorders, 135(1–3), 10–19. https://doi.org/10.1016/j.jad.2011.01.011',
          href: 'https://doi.org/10.1016/j.jad.2011.01.011',
          note: 'Insomnia predicts higher depression risk: the sleep–mood link is not only subjective.',
        },
      ],
    },
    relatedSlugs: [SLUGS.depression, SLUGS.grounding],
    disclaimer:
      'Psychoeducation. Does not diagnose or replace medical evaluation, polysomnography, or CBT-I with a professional. If there is suicide risk or violence, seek local emergency help immediately.',
    ctaBridge:
      'If you want company to look at tonight’s cycle — without pressure to fix it all — you can continue on your phone.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: 'Stimulus control (night)',
      description:
        'Brief protocol to re-associate bed with sleep: leave if sleep does not come, dim light, and a stable wake time.',
      totalTime: 'PT30M',
      steps: [
        'Go to bed when sleepy, not only by schedule.',
        'Reserve the bed for sleep (and sex); no screens or work.',
        'If there is no sleep in about 20 minutes, leave for dim light and return without forcing.',
        'Keep the same wake time the next day.',
        'Observe three nights: time in bed versus approximate sleep.',
      ],
    },
  },
  [SLUGS.mindfulness]: {
    slug: SLUGS.mindfulness,
    readingMinutes: 6,
    meta: {
      title: 'Mindfulness: brief guide to get started | Anto',
      description:
        'What mindfulness is, common myths, 3–5 minute exercises, and how to combine it with therapy or digital support. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Mindfulness — guide to get started',
      openGraphDescription: 'Present-moment attention without mysticism: short exercises to calm the nervous system.',
    },
    hero: {
      title: 'Mindfulness: brief guide to get started',
      subtitle: 'Training attention to the present without emptying the mind or needing a free hour.',
    },
    sections: [
      {
        heading: 'What it is (and is not)',
        paragraphs: [
          'Mindfulness is paying attention to the present moment with an open, non-judging attitude. It is not eliminating thoughts or reaching a special state: it is noticing the mind wandered and gently returning to the anchor (breath, sounds, sensations).',
        ],
      },
      {
        heading: '3-minute exercise',
        bullets: [
          'Sit comfortably. Close your eyes if you wish.',
          'Feel three full breaths in the belly.',
          'When a thought appears, name it (“thinking”) and return to the breath.',
          'Open your eyes and notice one sound and one body sensation.',
        ],
      },
      {
        heading: 'Expected benefits',
        paragraphs: [
          'With regular practice, many people report less emotional reactivity and better ability to pause before acting. Studies show modest but consistent benefits for stress and anxiety when combined with other interventions.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'You will find mindfulness and relaxation exercises in the techniques hub and wellbeing protocols. Use them alone or alongside chat when you need to lower emotional intensity.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.selfCompassion, SLUGS.sleep],
    disclaimer:
      'Psychoeducation guide. If mindfulness triggers intense traumatic memories, stop and consult a trauma-informed professional.',
    cta: { label: 'Try Anto free for 1 day →', path: '/bienvenida' },
  },
  [SLUGS.depression]: {
    slug: SLUGS.depression,
    readingMinutes: 7,
    meta: {
      title: 'Depression: signs and what you can do | Anto Guide',
      description:
        'What depression is, common signs, how it differs from normal sadness, and strategies such as behavioural activation. Psychoeducation; does not replace diagnosis or clinical care.',
      openGraphTitle: 'Depression — psychoeducation guide',
      openGraphDescription:
        'Understand depressive symptoms and practical tools to start rebuilding routine and connection.',
    },
    hero: {
      title: 'Depression: brief psychoeducation guide',
      subtitle:
        'When it may be more than a passing low mood and which small steps usually help, according to the evidence.',
    },
    sections: [
      {
        heading: 'More than sadness',
        paragraphs: [
          'Depression is not just “being sad.” It often includes loss of interest, persistent fatigue, difficulty concentrating, sleep or appetite changes, feelings of guilt, and sometimes thoughts that life is not worth continuing.',
          'Sadness after a loss is human and usually linked to a specific event. Depression can persist for weeks, affect several areas of life, and does not ease by resting alone.',
        ],
      },
      {
        heading: 'Common signs',
        bullets: [
          'Anhedonia: things you used to enjoy no longer motivate you',
          'Fatigue or slowness, even without physical effort',
          'Intense self-criticism or feeling worthless',
          'Social isolation and abandoning routines',
          'Recurrent thoughts of death (requires urgent help)',
        ],
      },
      {
        heading: 'What usually helps',
        paragraphs: [
          'Evidence supports therapy (especially CBT and behavioural activation), social support, moderate physical activity, and, when a professional indicates it, medication. The first practical step is often resuming small actions even when you do not feel like it.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional. It does not diagnose or prescribe medication.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.behavioralActivation, SLUGS.scales, SLUGS.tcc],
    disclaimer:
      'Psychoeducation material. Does not replace professional evaluation or treatment. If you have thoughts of harming yourself, seek emergency help immediately.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
  },
  [SLUGS.behavioralActivation]: {
    slug: SLUGS.behavioralActivation,
    readingMinutes: 6,
    meta: {
      title: 'Behavioural activation: practical guide | Anto',
      description:
        'What behavioural activation is, why it helps with depression, and how to plan small activities even when motivation is low. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Behavioural activation — brief guide',
      openGraphDescription: 'Rebuild routine and mood with small, sustainable behavioural steps.',
    },
    hero: {
      title: 'Behavioural activation',
      subtitle: 'Act first, feel later: a key CBT component for depression.',
    },
    sections: [
      {
        heading: 'The idea',
        paragraphs: [
          'In depression, the cycle “I feel bad → I isolate → I feel worse” is very common. Behavioural activation proposes planning valued activities (social, pleasure, achievement, health) even when motivation is low.',
          'It is not about doing everything at once: you start with small steps and track how mood changes before and after.',
        ],
      },
      {
        heading: 'Types of activity',
        bullets: [
          'Pleasure: something you used to enjoy, even for 10 minutes',
          'Achievement: a minimal task (shower, tidy one corner)',
          'Social: a brief message or call',
          'Health: short walk, eat something nutritious',
        ],
      },
      {
        heading: 'How to start today',
        paragraphs: [
          'Choose one activity under 15 minutes. Before, rate your mood from 0 to 10. Do it. Rate again afterwards. If it does not rise, that is not failure: consistency matters more than one day.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.depression, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Evidence-based psychoeducation. Does not replace individual therapy. If you cannot get out of bed for several days, consult a professional.',
    cta: { label: 'Organise tasks in Anto →', path: '/app' },
  },
  [SLUGS.ocdErp]: {
    slug: SLUGS.ocdErp,
    readingMinutes: 8,
    meta: {
      title: 'OCD and exposure with response prevention (ERP) | Anto',
      description:
        'What obsessive-compulsive disorder is, how obsessions and compulsions work, and why ERP is the most evidence-based approach. Psychoeducation; does not replace treatment with a professional.',
      openGraphTitle: 'OCD and ERP — psychoeducation guide',
      openGraphDescription: 'Understand the obsessive-compulsive cycle and the recommended therapeutic approach.',
    },
    hero: {
      title: 'OCD and exposure with response prevention (ERP)',
      subtitle: 'Obsessions, compulsions, and the treatment with the strongest support for obsessive-compulsive disorder.',
    },
    sections: [
      {
        heading: 'What OCD is',
        paragraphs: [
          'Obsessive-compulsive disorder (OCD) involves obsessions (intrusive thoughts, images, or impulses that cause anxiety) and compulsions (behaviours or mental rituals to reduce distress). The cycle is reinforced short term but maintains the problem.',
        ],
      },
      {
        heading: 'Common examples',
        bullets: [
          'Fear of contamination and excessive washing',
          'Doubt (“Did I lock the door?”) and repeated checking',
          'Intrusive harm thoughts and neutralising rituals',
          'Need for symmetry or “perfect” order',
        ],
      },
      {
        heading: 'What is ERP?',
        paragraphs: [
          'Exposure with response prevention (ERP) means gradually facing triggers (exposure) without performing the compulsion (response prevention). With repetition, the brain learns anxiety drops without the ritual.',
          'ERP should be planned with a professional trained in OCD, especially if symptoms are severe.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional. Moderate or severe OCD treatment requires specialised clinical support.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psychoeducation. Not an OCD diagnosis and not a substitute for professional treatment. Unsupervised ERP can worsen symptoms in severe cases. Consult a specialist.',
      cta: { label: 'Explore Anto →', path: '/app' },
  },
  [SLUGS.trauma]: {
    slug: SLUGS.trauma,
    readingMinutes: 8,
    meta: {
      title: 'Trauma and PTSD: normal body responses | Anto',
      description:
        'What psychological trauma is, common PTSD symptoms, why flashbacks appear, and when to seek specialised help. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Trauma and PTSD — brief guide',
      openGraphDescription: 'Psychoeducation on trauma responses and evidence-based recovery paths.',
    },
    hero: {
      title: 'Trauma and PTSD: psychoeducation guide',
      subtitle:
        'Your body and mind can react intensely after overwhelming events — that does not mean you are “broken.”',
    },
    sections: [
      {
        heading: 'What trauma is',
        paragraphs: [
          'Psychological trauma occurs when an experience exceeds your coping capacity at that moment. It can be a single event (accident, assault) or prolonged (abuse, neglect). The reaction depends on context, not on personal “strength.”',
        ],
      },
      {
        heading: 'Common PTSD symptoms',
        bullets: [
          'Re-experiencing: intrusive memories, nightmares, flashbacks',
          'Avoidance of places, people, or sensations that recall the event',
          'Hypervigilance: startle, tension, difficulty relaxing',
          'Mood and thought changes (guilt, distrust, numbness)',
        ],
      },
      {
        heading: 'Evidence-based treatments',
        paragraphs: [
          'Therapies such as trauma-focused CBT, EMDR, and prolonged exposure have support for PTSD. Safe social support and stabilisation (sleep, routine, regulation) also matter. Recovery takes time and should not be rushed.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional. Complex trauma requires a trauma-trained therapist.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.grounding, SLUGS.mindfulness, SLUGS.anxiety],
    disclaimer:
      'Educational material. Does not diagnose PTSD. If you have intense flashbacks or risk of harm, seek specialised professional help.',
    cta: { label: 'Between-session support →', path: '/bienvenida' },
  },
  [SLUGS.anger]: {
    slug: SLUGS.anger,
    readingMinutes: 6,
    meta: {
      title: 'Anger management: practical guide | Anto',
      description:
        'What triggers anger, early body signals, and CBT-based regulation techniques to respond with more control. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Anger management — brief guide',
      openGraphDescription: 'Identify triggers and learn to lower intensity before reacting.',
    },
    hero: {
      title: 'Anger management',
      subtitle: 'Anger is not the enemy: the goal is to understand it and choose responses that do not harm you or others.',
    },
    sections: [
      {
        heading: 'Anger vs. aggression',
        paragraphs: [
          'Feeling anger is normal when you perceive injustice, disrespect, or threat. Problems arise when expression is impulsive, disproportionate, or harmful. Anger often follows a curve: it rises quickly and falls if not fed by rumination.',
        ],
      },
      {
        heading: 'Early signals',
        bullets: [
          'Tension in jaw, fists, or chest',
          '“Always” or “never” thoughts',
          'Heat in the face, faster breathing',
          'Urge to interrupt, shout, or hit',
        ],
      },
      {
        heading: 'Useful strategies',
        paragraphs: [
          'For escalation: 90-second pause, slow breathing, physically leave the situation if safe. Long term: identify triggers, question interpretations (Was it on purpose?), practise assertiveness, and solve concrete problems.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'The hub has exercises (CBT, ABC, mindfulness) for when talking is not enough. It is not treatment and does not replace a professional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.abc, SLUGS.distortions, SLUGS.grounding],
    disclaimer:
      'Psychoeducation guide. Does not replace therapy or professional evaluation. If anger leads to violence or fear in your environment, seek professional help and, if there is risk, protection services.',
    cta: { label: 'Practise in Anto →', path: '/bienvenida' },
  },
  [SLUGS.grounding]: {
    slug: SLUGS.grounding,
    readingMinutes: 7,
    meta: {
      title: 'Grounding 5-4-3-2-1: when anxiety rises | Anto',
      description:
        '5-4-3-2-1 grounding exercise for intense anxiety, panic, or crisis: sensory anchors, body signals, quick alternatives, and when to seek help. Anto brief guide; complements the anxiety map. Does not replace therapy or emergency care.',
      openGraphTitle: 'When anxiety rises — grounding 5-4-3-2-1',
      openGraphDescription:
        '5-4-3-2-1 exercise and sensory anchors when anxiety rises. A short grounding guide plus a path to the fuller anxiety map.',
      keywords:
        'grounding, grounding exercise, 5-4-3-2-1 technique, five senses, anxiety, crisis, panic attack, acute anxiety, sensory anchors, dissociation, psychoeducation, Anto',
    },
    hero: {
      title: 'When anxiety rises',
      subtitle:
        'When the body reacts as if danger were immediate, first you need to land; thinking can come after.',
      scanLink: {
        label: 'Go to the 5-4-3-2-1 exercise →',
        sectionHeading: '5-4-3-2-1 exercise',
      },
    },
    pullQuote:
      'This is not about “thinking positive”. It is about returning to the body long enough that the wave does not carry you away whole.',
    figure: {
      src: '/assets/images/editorial/anto-editorial-hero-evening.webp',
      alt: 'Person sitting on a bed at dusk, back to the camera, looking at the city through the window — the quiet moment when anxiety rises',
      caption: 'Start with what is already here: light, body, window.',
      width: 1536,
      height: 1024,
      objectPosition: '50% 40%',
      desktopAspectRatio: '3 / 2',
    },
    sections: [
      {
        heading: 'What grounding is',
        paragraphs: [
          'Grounding gathers simple gestures that bring attention to what you can see, touch, hear, smell, or taste right now. They do not fix what hurts underneath: they lower activation so you can think a little more clearly, ask for help, or wait for the wave to pass.',
          'They are used in intense anxiety, panic, mild dissociation, or when a memory pulls you out of the present. They are stabilisation tools, not a treatment on their own.',
        ],
      },
      {
        heading: 'How it feels in the body',
        paragraphs: [
          'Before “doing something”, it helps to notice the signal: racing heart, tight chest, cold hands, a jumping mind, the sense of not quite being here.',
        ],
        bullets: [
          'The body can read threat even when there is no objective danger.',
          'Grounding does not deny the emotion: it widens the sensory frame around it.',
          'If intensity is 9/10, start with a single anchor (feet on the floor) before the full 5-4-3-2-1.',
        ],
      },
      {
        heading: '5-4-3-2-1 exercise',
        paragraphs: [
          'Go slowly. If one sense does not answer, skip to the next. There is no perfect score — work with what you find.',
        ],
        ordered: true,
        bullets: [
          '5 things you see — pick concrete details (an edge, a colour, a shadow); do not invent the whole room at once.',
          '4 things you touch — temperature, texture, weight. Clothes, the seat, your own hands.',
          '3 things you hear — near or far: an engine, your breath, a clock, voices in another room.',
          '2 things you smell — or, if nothing is clear, calmly recall a familiar scent without forcing a scene.',
          '1 thing you taste — a sip of water, the taste in your mouth, or simply noticing your tongue.',
        ],
      },
      {
        heading: 'Other quick options',
        paragraphs: [
          'If 5-4-3-2-1 feels long, switch anchors: an ice cube in your hand, naming aloud where you are and what day it is, counting backwards by threes, or describing an object as if someone could not see it.',
          'The point is engaging the senses, not analysing the problem in that moment.',
        ],
      },
      {
        heading: 'When it is a crisis',
        emphasis: 'crisis',
        paragraphs: [
          'Grounding helps bring the wave down. It is not enough if you have thoughts of harming yourself, immediate risk to yourself or someone else, or you cannot manage basic self-care.',
          'In that case, contact local emergency services or a crisis line in your country. Anto can surface resources when risk signals appear; it does not replace those services.',
        ],
        link: {
          label: 'Find a crisis line near you →',
          href: 'https://findahelpline.com/',
          external: true,
        },
      },
    ],
    productMoment: {
      title: 'How it looks in Anto',
      body: 'You can write it down as it is and get one concrete next step, without pressure to “fix everything”.',
      afterHeading: 'When it is a crisis',
      chat: {
        ariaLabel: 'Sample Anto conversation when anxiety rises',
        messages: [
          {
            role: 'user',
            text: "I'm at an 8. Tight chest and my mind won't settle.",
          },
          {
            role: 'anto',
            text: "That feels intense. Before analysing it, want to try anchoring to what's here for a moment?",
          },
          {
            role: 'user',
            text: "Yes. I don't want it to spiral further.",
          },
          {
            role: 'anto',
            text: 'Start simple: name 5 things you can see, with concrete detail. No rush.',
          },
        ],
      },
      suggestionsLabel: 'Examples in the app',
      suggestions: ['5-4-3-2-1 exercise', 'Single anchor'],
    },
    furtherReading: {
      title: 'Go deeper',
      support:
        'This page is practical and short. For the wider map — symptoms, cycles, and strategies — start here:',
      links: [
        {
          label: 'Anxiety and worry (complete map)',
          description:
            'How the cycle is maintained, safety behaviours, useful interventions, and when to seek assessment.',
          href: '/recursos/ansiedad-y-preocupacion',
        },
      ],
    },
    relatedSlugs: [SLUGS.mindfulness, SLUGS.emotionRegulation],
    references: {
      title: 'References (APA)',
      support:
        'Sources that frame sensory regulation and distress tolerance when activation is high. They do not replace individual clinical evaluation.',
      items: [
        {
          apa: 'Linehan, M. M. (2015). DBT skills training manual (2nd ed.). Guilford Press.',
          href: 'https://www.guilford.com/books/DBT-Skills-Training-Manual/Marsha-Linehan/9781462516995',
          note: 'Clinical frame for distress tolerance and sensory self-soothing (e.g. calming with the five senses) when arousal is intense.',
        },
        {
          apa: 'Neacsiu, A. D., Eberle, J. W., Kramer, R., Wiesmann, T., & Linehan, M. M. (2014). Dialectical behavior therapy skills for transdiagnostic emotion dysregulation: A pilot randomized controlled trial. Behaviour Research and Therapy, 59, 40–51. https://doi.org/10.1016/j.brat.2014.05.005',
          href: 'https://doi.org/10.1016/j.brat.2014.05.005',
          note: 'Pilot RCT: DBT skills (including distress tolerance) can reduce emotion dysregulation beyond a single diagnosis.',
        },
      ],
    },
    disclaimer:
      'Psychoeducation. Does not replace therapy or emergency services. If you are in immediate risk, use the “When it is a crisis” section above.',
    ctaBridge:
      'When the wave eases a little, you can keep going with company on your phone — no pressure.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
    howTo: {
      name: '5-4-3-2-1 grounding exercise',
      description:
        'A sensory landing technique to lower activation in intense anxiety or crisis: five senses, one step at a time.',
      totalTime: 'PT5M',
      steps: [
        'Name 5 things you can see, with concrete detail.',
        'Notice 4 things you can touch (texture, temperature, or weight).',
        'Listen for 3 sounds, near or far.',
        'Identify 2 smells, or calmly recall a familiar one.',
        'Notice 1 taste or the sensation in your mouth.',
      ],
    },
  },
  [SLUGS.stress]: {
    slug: SLUGS.stress,
    readingMinutes: 6,
    meta: {
      title: 'Stress: how your body responds and what to do | Anto',
      description:
        'What stress is, physical and emotional signs, acute vs. chronic stress, and ways to care for yourself before burnout. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Stress — psychoeducation guide',
      openGraphDescription: 'Understand the stress response and practical tools to regain balance.',
    },
    hero: {
      title: 'Stress',
      subtitle: 'How your body responds to pressure and ways to care for yourself before reaching exhaustion.',
    },
    sections: [
      {
        heading: 'Acute vs. chronic stress',
        paragraphs: [
          'Acute stress is brief activation facing a challenge (exam, deadline, conflict). It can help you focus. Chronic stress is sustained tension: demanding work, caregiving, financial insecurity. Then the body stops recovering.',
        ],
      },
      {
        heading: 'Common signs',
        bullets: [
          'Muscle tension, headache, or stomach upset',
          'Irritability, impatience, or easy tears',
          'Light sleep or racing mind',
          'More minor illnesses as the immune system runs under pressure',
        ],
      },
      {
        heading: 'What you can do',
        paragraphs: [
          'Prioritise sleep, real breaks, and task boundaries. Slow breathing, brief movement, and talking to someone you trust reduce load. If stress lasts months and affects health, seek professional support.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'Chat can help you sort priorities, practise micro-pauses, and connect with regulation techniques from the techniques hub.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.burnout, SLUGS.anxiety, SLUGS.mindfulness],
    disclaimer:
      'Psychoeducation material. Does not replace medical or psychological assessment. If stress includes intense physical symptoms, consult a professional.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
  },
  [SLUGS.emotionRegulation]: {
    slug: SLUGS.emotionRegulation,
    readingMinutes: 6,
    meta: {
      title: 'Emotion regulation: practical guide | Anto',
      description:
        'Skills to recognise, name, and modulate intense emotions without suppressing them or reacting on autopilot. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Emotion regulation — brief guide',
      openGraphDescription: 'Learn to recognise emotions and choose more helpful responses.',
    },
    hero: {
      title: 'Emotion regulation',
      subtitle: 'Skills to recognise and modulate emotions — not erase them, but relate to them more wisely.',
    },
    sections: [
      {
        heading: 'What regulating means',
        paragraphs: [
          'Regulating is not “not feeling.” It is noticing the emotion, understanding its signal, and choosing a response aligned with your values. With practice, you reduce impulsive reactions and regain clarity faster.',
        ],
      },
      {
        heading: 'Basic steps',
        bullets: [
          'Name the emotion precisely (not just “bad”)',
          'Rate intensity from 0 to 10',
          'Pause before acting if you are above 7',
          'Choose a small action: breathe, write, walk, ask for support',
        ],
      },
      {
        heading: 'Useful tools',
        paragraphs: [
          'Brief mindfulness, 5-4-3-2-1 grounding, ABC technique, and self-compassion fit here. The key is using them when the wave rises, not only after the crisis passed.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'Find regulation exercises in the techniques hub and in chat, which can suggest micro-steps based on what you express.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.mindfulness, SLUGS.grounding, SLUGS.abc],
    disclaimer:
      'General psychoeducation. If emotions overwhelm you recurrently or there is risk of harm, seek professional help.',
    cta: { label: 'Practice techniques →', path: '/app' },
  },
  [SLUGS.grief]: {
    slug: SLUGS.grief,
    readingMinutes: 7,
    meta: {
      title: 'Grief and loss: psychoeducation guide | Anto',
      description:
        'How grief often unfolds, common myths, and ways to support yourself without forcing premature “closure.” Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Grief and loss — brief guide',
      openGraphDescription: 'Understand grief as a human process and how to care for yourself patiently.',
    },
    hero: {
      title: 'Grief and loss',
      subtitle: 'How grief often unfolds and ways to support yourself without rushing the process.',
    },
    sections: [
      {
        heading: 'Grief is not linear',
        paragraphs: [
          'After a loss (death, breakup, health, life project) it is normal to alternate sadness, anger, numbness, guilt, or even relief. There is no “correct” order or expiry date for feeling.',
        ],
      },
      {
        heading: 'Common myths',
        bullets: [
          '“I should be over it in X months” — each process is different',
          '“If I cry less, I am healed” — grief is not measured only by tears',
          '“I must stay strong” — asking for help is part of care',
        ],
      },
      {
        heading: 'How to support yourself',
        paragraphs: [
          'Keep minimal routines (sleep, food, a brief outing). Talk with safe people. Reduce major demands if you can. If isolation or hopelessness persist a long time, a professional can accompany you.',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'Anto can offer space to organise what you feel between sessions with a therapist or support network; it does not replace specialised grief therapy.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.selfCompassion, SLUGS.emotionRegulation, SLUGS.depression],
    disclaimer:
      'Does not replace grief therapy or crisis care. If you have thoughts of self-harm, seek emergency help.',
    cta: { label: 'Support in Anto →', path: '/bienvenida' },
  },
  [SLUGS.burnout]: {
    slug: SLUGS.burnout,
    readingMinutes: 7,
    meta: {
      title: 'Exhaustion and burnout: signs and first steps | Anto',
      description:
        'Signs of sustained overload, difference from normal tiredness, and initial recovery steps. Psychoeducation; does not replace professional care.',
      openGraphTitle: 'Exhaustion and burnout — brief guide',
      openGraphDescription: 'Recognise burnout and start recovering energy with realistic changes.',
    },
    hero: {
      title: 'Exhaustion and burnout',
      subtitle: 'Signs of sustained overload and first recovery steps — without blaming yourself for being tired.',
    },
    sections: [
      {
        heading: 'More than tired',
        paragraphs: [
          'Burnout is emotional and physical exhaustion from prolonged stress, often linked to work or constant caregiving. It includes cynicism, feeling ineffective, and rest no longer restoring you.',
        ],
      },
      {
        heading: 'Common signs',
        bullets: [
          'Emptiness or disconnection from what you do',
          'Irritability and difficulty concentrating',
          'Sleep that does not repair, somatic aches',
          'Avoiding responsibilities even when it brings guilt',
        ],
      },
      {
        heading: 'First recovery steps',
        paragraphs: [
          'Identify load sources you can adjust (boundaries, delegating, real pauses). Restore basics: sleep, nutrition, gentle movement. Structural changes (fewer hours, workplace support) are sometimes needed, not just “more self-care.”',
        ],
      },
      {
        heading: 'In Anto',
        paragraphs: [
          'Use tasks/habits for micro-breaks, regulation techniques, and chat for structured venting. Severe burnout deserves professional assessment and changes at the stress source.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.stress, SLUGS.sleep, SLUGS.selfCompassion],
    disclaimer:
      'Psychoeducation. Burnout may require medical or workplace intervention. Consult a professional if symptoms are intense.',
    cta: { label: 'Rebuild routine with Anto →', path: '/app' },
  },
};

export function getPsychoeducationGuidesEn(): Record<PsychoeducationSlug, PsychoeducationGuide> {
  return guides;
}

export function getPsychoeducationGuideEn(slug: string): PsychoeducationGuide | undefined {
  return guides[slug as PsychoeducationSlug];
}
