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
};

const guides: Record<PsychoeducationSlug, PsychoeducationGuide> = {
  [SLUGS.tcc]: {
    slug: SLUGS.tcc,
    readingMinutes: 7,
    meta: {
      title: 'What is cognitive behavioural therapy (CBT)? | Anto Guide',
      description:
        'What CBT is, how it works, and why it is one of the most evidence-based approaches for anxiety and depression. Science-informed psychoeducation.',
      openGraphTitle: 'What is CBT? Psychoeducation guide',
      openGraphDescription:
        'Learn the principles of cognitive behavioural therapy and how to apply them in daily life.',
    },
    hero: {
      title: 'What is cognitive behavioural therapy (CBT)?',
      subtitle:
        'A brief guide to how thoughts, emotions, and behaviours influence each other — and what you can do about it.',
    },
    sections: [
      {
        heading: 'The core idea',
        paragraphs: [
          'Cognitive behavioural therapy (CBT) starts from a simple premise: we do not always react to facts themselves, but to how we interpret them. The same event can trigger very different emotions depending on the meaning we assign.',
          'CBT works on three connected levels: thoughts (cognitions), emotions, and behaviours. The goal is not “positive thinking”, but spotting unhelpful patterns and testing more realistic, actionable alternatives.',
        ],
      },
      {
        heading: 'What is it used for?',
        paragraphs: [
          'CBT is among the most scientifically supported psychological approaches for depression, generalised anxiety, phobias, insomnia, and prolonged stress. It does not replace an in-person clinical assessment, but it offers concrete tools for everyday life.',
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
          'Imagine a friend’s message goes unanswered. An automatic thought might be: “I did something wrong and they no longer want to talk to me.” That can trigger sadness or anxiety and lead you to avoid reaching out.',
          'In CBT, the next step is to review evidence for and against, consider alternative explanations (they are busy, they did not see the message), and choose a small action: send a brief message or wait a reasonable time before concluding.',
        ],
      },
      {
        heading: 'How Anto fits in',
        paragraphs: [
          'Anto integrates CBT-aligned approaches in chat, structured protocols, and the techniques hub (including the ABC technique). The app can suggest micro-steps and help you track patterns, but it does not replace therapy with a professional.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.distortions, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'This guide is psychoeducation material and is not diagnosis or treatment. If your symptoms are intense or persistent, consult a mental health professional.',
    cta: { label: 'Practice techniques in Anto →', path: '/bienvenida' },
  },
  [SLUGS.distortions]: {
    slug: SLUGS.distortions,
    readingMinutes: 8,
    meta: {
      title: 'Cognitive distortions: guide with examples | Anto',
      description:
        'What cognitive distortions are, common examples (catastrophising, all-or-nothing, mind reading), and how to start questioning them.',
      openGraphTitle: 'Cognitive distortions — brief guide',
      openGraphDescription: 'Learn to recognise unhelpful thinking patterns and what to do when they appear.',
    },
    hero: {
      title: 'Cognitive distortions: what they are and how to spot them',
      subtitle:
        'Thinking habits that amplify distress. Naming them is the first step to questioning them calmly.',
    },
    sections: [
      {
        heading: 'Definition',
        paragraphs: [
          'Cognitive distortions are habitual mental shortcuts that skew reality in pessimistic or rigid ways. They do not mean you “think badly” as a person: they are learned responses under stress, fatigue, or difficult experiences.',
          'In CBT, naming a distortion creates distance: “this sounds like catastrophising” instead of assuming the thought is a fact.',
        ],
      },
      {
        heading: 'Common examples',
        bullets: [
          'All-or-nothing: “if it is not perfect, it is a total failure”',
          'Catastrophising: “if I mess up the meeting, I will ruin my career”',
          'Mind reading: “they surely think I am boring”',
          'Mental filter: only remembering the negative parts of a mixed day',
          'Personalisation: blaming yourself for events outside your control',
          'Should statements: “I should handle everything without help”',
        ],
      },
      {
        heading: 'What to do when they show up',
        paragraphs: [
          'First, lower intensity: breathe, write the thought as it appears, and rate the emotion 0–10. Then ask: what evidence do I have for and against? What would I tell a friend in the same situation?',
          'The goal is not forced optimism, but a more balanced wording and a small action if needed.',
        ],
      },
      {
        heading: 'In the Anto app',
        paragraphs: [
          'Anto can detect cognitive distortions during chat and suggest reframes or related techniques. You can also explore them in the techniques hub and connect them to your insights graph to see recurring patterns.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.tcc, SLUGS.abc, SLUGS.anxiety],
    disclaimer:
      'Educational material. Does not replace professional assessment or treatment. Seek specialised help if distress interferes with daily life.',
    cta: { label: 'Explore the techniques hub →', path: '/app' },
  },
  [SLUGS.abc]: {
    slug: SLUGS.abc,
    readingMinutes: 6,
    meta: {
      title: 'ABC technique step by step | Anto psychoeducation',
      description:
        'Learn the ABC technique (Activating event, Belief, Consequence) to analyse difficult situations and shift emotional responses.',
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
    relatedSlugs: [SLUGS.tcc, SLUGS.distortions, SLUGS.anxiety],
    disclaimer:
      'Psychoeducation guide. Does not replace individual therapy. If you are in crisis, contact emergency services in your country.',
    cta: { label: 'Try Anto free for 1 day →', path: '/bienvenida' },
  },
  [SLUGS.anxiety]: {
    slug: SLUGS.anxiety,
    readingMinutes: 7,
    meta: {
      title: 'Anxiety and worry: when is it normal? | Anto',
      description:
        'Differences between everyday worry and problematic anxiety, warning signs, and evidence-based strategies for daily life.',
      openGraphTitle: 'Anxiety and worry — brief guide',
      openGraphDescription: 'Understand anxiety and tools that can help between sessions with a professional.',
    },
    hero: {
      title: 'Anxiety and worry: brief guide',
      subtitle: 'When it is an adaptive response and when more support may help.',
    },
    sections: [
      {
        heading: 'Worry vs. anxiety',
        paragraphs: [
          'Worrying before an exam or interview is common: the body activates to face a challenge. Anxiety becomes more problematic when it is intense, persistent, appears without a clear trigger, or limits work, sleep, or relationships.',
        ],
      },
      {
        heading: 'Common signs',
        bullets: [
          'Muscle tension, palpitations, or rapid breathing',
          'Repetitive thoughts that are hard to let go',
          'Avoidance of situations (social, work, medical)',
          'Fragmented sleep or irritability',
        ],
      },
      {
        heading: 'Useful strategies',
        paragraphs: [
          'Slow breathing techniques, grounding (five senses), gradual exposure to what you avoid with support, and thought records (ABC or brief journal). Moderate physical activity and sleep hygiene also matter.',
          'The GAD-7 scale is a screening tool Anto can integrate into your tracking; it is not a diagnosis, but it helps you see trends.',
        ],
      },
      {
        heading: 'When to seek professional help',
        paragraphs: [
          'If symptoms last weeks, worsen, or include thoughts of self-harm, contact a professional or crisis line. Anto can support you between sessions; it does not replace clinical care.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.scales, SLUGS.mindfulness, SLUGS.tcc],
    disclaimer:
      'Not medical advice. In crisis or risk, seek local emergency help immediately.',
    cta: { label: 'AI support with Anto →', path: '/bienvenida' },
  },
  [SLUGS.scales]: {
    slug: SLUGS.scales,
    readingMinutes: 6,
    meta: {
      title: 'PHQ-9 and GAD-7: what they measure | Anto',
      description:
        'Guide to PHQ-9 (depression) and GAD-7 (anxiety) clinical scales: what they are for, how they are scored, and what they cannot tell you.',
      openGraphTitle: 'PHQ-9 and GAD-7 explained',
      openGraphDescription: 'Understand the scales Anto uses to track depressive and anxiety symptoms.',
    },
    hero: {
      title: 'PHQ-9 and GAD-7: interpretation guide',
      subtitle: 'Validated screening scales — useful for trends, not for self-diagnosis.',
    },
    sections: [
      {
        heading: 'What are they?',
        paragraphs: [
          'PHQ-9 (Patient Health Questionnaire-9) assesses depressive symptoms over the last two weeks. GAD-7 (Generalized Anxiety Disorder-7) measures generalised anxiety symptoms over the same period. Both are widely used in primary care and mental health.',
        ],
      },
      {
        heading: 'How Anto uses them',
        paragraphs: [
          'Anto can complete these scales from conversation analysis and show history with trends. This helps you see whether symptoms rise or fall over time, especially alongside a professional or as informed self-care.',
        ],
      },
      {
        heading: 'Important limits',
        bullets: [
          'They are screening tools, not clinical diagnosis',
          'A bad day can temporarily raise the score',
          'Physical factors, grief, or acute stress affect responses',
          'Only a professional can diagnose and plan treatment',
        ],
      },
      {
        heading: 'What to do with results',
        paragraphs: [
          'If scores stay high, share reports with your doctor or psychologist. If moderate, combine tracking with sleep habits, activity, regulation techniques, and social support.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.sleep],
    disclaimer:
      'Scales do not replace in-person assessment. Anto does not diagnose mental health conditions.',
    cta: { label: 'See how Anto works →', path: '/app' },
  },
  [SLUGS.selfCompassion]: {
    slug: SLUGS.selfCompassion,
    readingMinutes: 6,
    meta: {
      title: 'Self-compassion: what it is and brief exercises | Anto',
      description:
        'What self-compassion means in evidence-based psychology, why it is not indulgence, and how to practice it in hard moments.',
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
          'Anto includes a self-compassion protocol among its 8 structured paths, accessible from chat and the techniques hub when context warrants it.',
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
    readingMinutes: 7,
    meta: {
      title: 'Sleep hygiene and mental health | Anto Guide',
      description:
        'How sleep affects mood and anxiety, evidence-based sleep hygiene habits, and when to see a specialist.',
      openGraphTitle: 'Sleep hygiene and emotional wellbeing',
      openGraphDescription: 'Improve rest with concrete habits and understand its link to mental health.',
    },
    hero: {
      title: 'Sleep hygiene and mental health',
      subtitle: 'Better sleep does not fix everything, but poor sleep amplifies anxiety, irritability, and negative thoughts.',
    },
    sections: [
      {
        heading: 'Sleep and emotions',
        paragraphs: [
          'Sleep deprivation reduces stress tolerance and makes emotion regulation harder. Many people notice more rumination at night or 3am wake-ups with worry loops.',
        ],
      },
      {
        heading: 'Recommended habits',
        bullets: [
          'Regular bedtime and wake time (including weekends)',
          '30–60 minute wind-down without screens before bed',
          'Avoid late caffeine and alcohol as a “sleep aid”',
          'Bed only for sleep and rest (not work or endless scrolling)',
          'If you cannot sleep in ~20 minutes, get up to another room with dim light',
        ],
      },
      {
        heading: 'When the mind will not stop',
        paragraphs: [
          'Write three worries and one minimal action for tomorrow on paper. Try 4-7-8 breathing or a short relaxation audio. Avoid checking your phone “for just a minute.”',
        ],
      },
      {
        heading: 'Protocol in Anto',
        paragraphs: [
          'Anto offers a sleep hygiene protocol among its structured paths, plus relaxation techniques in the techniques hub.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.mindfulness, SLUGS.scales],
    disclaimer:
      'Persistent insomnia may require medical evaluation. This guide does not replace consultation with a sleep specialist.',
    cta: { label: 'Wellbeing tools in Anto →', path: '/app' },
  },
  [SLUGS.mindfulness]: {
    slug: SLUGS.mindfulness,
    readingMinutes: 6,
    meta: {
      title: 'Mindfulness: brief guide to get started | Anto',
      description:
        'What mindfulness is, common myths, 3–5 minute exercises, and how to combine it with therapy or digital support.',
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
};

export function getPsychoeducationGuidesEn(): Record<PsychoeducationSlug, PsychoeducationGuide> {
  return guides;
}

export function getPsychoeducationGuideEn(slug: string): PsychoeducationGuide | undefined {
  return guides[slug as PsychoeducationSlug];
}
