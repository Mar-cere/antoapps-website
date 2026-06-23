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
  [SLUGS.depression]: {
    slug: SLUGS.depression,
    readingMinutes: 7,
    meta: {
      title: 'Depression: signs and what you can do | Anto Guide',
      description:
        'What depression is, common signs, how it differs from normal sadness, and evidence-based strategies such as behavioural activation. Psychoeducation, not diagnosis.',
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
          'Anto includes a CBT-based depression protocol, PHQ-9 scale for trend tracking, and unified tasks/habits to structure micro-steps. It does not diagnose or prescribe medication.',
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
        'What behavioural activation is, why it works for depression, and how to plan small activities even when motivation is low.',
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
          'Use unified tasks and habits to schedule micro-steps, reminders, and Pomodoro. The depression protocol and chat can suggest activities aligned with your context.',
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
        'What obsessive-compulsive disorder is, how obsessions and compulsions work, and why ERP is the most evidence-based treatment.',
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
          'Anto includes an OCD (ERP) protocol among its 8 structured paths. Chat can help identify patterns, but moderate or severe OCD treatment requires specialised clinical support.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.tcc, SLUGS.abc],
    disclaimer:
      'Psychoeducation. Not an OCD diagnosis and not a substitute for professional treatment. Unsupervised ERP can worsen symptoms in severe cases. Consult a specialist.',
    cta: { label: 'Explore Anto protocols →', path: '/app' },
  },
  [SLUGS.trauma]: {
    slug: SLUGS.trauma,
    readingMinutes: 8,
    meta: {
      title: 'Trauma and PTSD: normal body responses | Anto',
      description:
        'What psychological trauma is, common PTSD symptoms, why flashbacks appear, and when to seek specialised help.',
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
          'Anto includes a trauma and PTSD protocol among its structured paths. It can support you between sessions, but complex trauma requires a trauma-trained therapist — it does not replace that work.',
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
        'What triggers anger, early body signals, and CBT-based regulation techniques to respond with more control.',
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
          'The anger management protocol guides structured steps in chat. You can also use ABC and grounding techniques from the hub when intensity rises.',
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
    readingMinutes: 5,
    meta: {
      title: 'Grounding techniques for anxiety and crisis | Anto',
      description:
        'Grounding exercises (5 senses, present-moment contact) to lower emotional intensity and when to activate crisis resources.',
      openGraphTitle: 'Grounding — practical guide',
      openGraphDescription: 'Return to the present when anxiety or an overwhelming memory floods you.',
    },
    hero: {
      title: 'Grounding: techniques for anxiety and crisis moments',
      subtitle: 'Anchor yourself in the here and now when your body reacts as if danger were immediate.',
    },
    sections: [
      {
        heading: 'What grounding is',
        paragraphs: [
          'Grounding techniques direct attention to present sensory experience to reduce intense anxiety, mild dissociation, or thought spirals. They do not remove the underlying problem, but lower activation so you can think more clearly.',
        ],
      },
      {
        heading: '5-4-3-2-1 exercise',
        bullets: [
          '5 things you can see',
          '4 you can touch (texture, temperature)',
          '3 you can hear',
          '2 you can smell',
          '1 you can taste',
        ],
      },
      {
        heading: 'Other quick options',
        paragraphs: [
          'Hold an ice cube, describe aloud where you are, press feet into the floor, name colours around you. The key is engaging senses, not analysing the problem in that moment.',
        ],
      },
      {
        heading: 'When it is a crisis',
        paragraphs: [
          'If you have thoughts of harming yourself, immediate risk, or cannot care for yourself, contact emergency services or a crisis line in your country. Anto detects risk signals and can offer support resources, but does not replace emergency services.',
        ],
      },
    ],
    relatedSlugs: [SLUGS.anxiety, SLUGS.mindfulness, SLUGS.trauma],
    disclaimer:
      'Psychoeducation. In case of suicidal risk or violence, seek local emergency help immediately.',
    cta: { label: '24/7 support in Anto →', path: '/bienvenida' },
  },
  [SLUGS.stress]: {
    slug: SLUGS.stress,
    readingMinutes: 6,
    meta: {
      title: 'Stress: how your body responds and what to do | Anto',
      description:
        'What stress is, physical and emotional signs, acute vs. chronic stress, and ways to care for yourself before burnout.',
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
        'Skills to recognise, name, and modulate intense emotions without suppressing them or reacting on autopilot.',
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
        'How grief often unfolds, common myths, and ways to support yourself without forcing premature “closure.”',
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
        'Signs of sustained overload, difference from normal tiredness, and initial recovery steps.',
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
