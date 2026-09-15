import { choiceLabel, factLabel, MUTE_FLAG_LABELS } from '@/lib/observatory/copy/labels';

export type TurnReading = {
  engineChoice: string | null;
  shadowChoice: string | null;
  extrasMode: string | null;
  extrasDecision: string | null;
  extrasApplied: boolean | null;
  extrasActiveDomain: string | null;
  extrasDomainSource: string | null;
  muteFlags: string[];
  familyCarried: boolean;
  cue: string | null;
  safetyRoute: string | null;
};

export type TurnSignal = {
  id: 'engine' | 'extras' | 'experience' | 'mute';
  label: string;
  value: string;
  hint?: string;
  tone?: 'ok' | 'watch';
};

export function muteFlagLabel(flag: string): string {
  return MUTE_FLAG_LABELS[flag] ?? flag;
}

export function muteSummary(flags: string[]): string {
  if (flags.length === 0) return 'Nada silenciado';
  return flags.map(muteFlagLabel).join(' · ');
}

export function extrasOutcomeLabel(story: Pick<TurnReading, 'extrasMode' | 'extrasDecision' | 'extrasApplied'>): string {
  if (!story.extrasMode) return 'Sin extras';
  if (story.extrasMode === 'shadow') {
    return story.extrasDecision === 'suppress' ? 'Observó; habría silenciado' : 'No llegó al chat';
  }
  if (story.extrasMode === 'applied') {
    if (story.extrasApplied === true) {
      return story.extrasDecision === 'suppress' ? 'Llegó al chat y se silenció' : 'Llegó al chat';
    }
    return story.extrasDecision === 'suppress' ? 'No insertó; habría silenciado' : 'No insertó extra';
  }
  return story.extrasMode;
}

const SKIP_DOMAIN = new Set(['Sin dato', 'Sin estimar', 'Ninguna', 'Ninguno']);

export function domainLine(story: Pick<TurnReading, 'extrasActiveDomain' | 'extrasDomainSource' | 'familyCarried'>): string | null {
  if (story.familyCarried) return 'Familiar, de turnos anteriores';
  if (!story.extrasActiveDomain && !story.extrasDomainSource) return null;
  const parts = [factLabel(story.extrasActiveDomain), factLabel(story.extrasDomainSource)].filter(
    (part) => !SKIP_DOMAIN.has(part)
  );
  return parts.length ? parts.join(', ') : null;
}

export function extrasHint(story: Pick<TurnReading, 'extrasMode' | 'extrasDecision' | 'extrasApplied' | 'extrasActiveDomain' | 'extrasDomainSource' | 'familyCarried'>): string | null {
  return domainLine(story);
}

export function engineHeadline(story: Pick<TurnReading, 'engineChoice' | 'shadowChoice'>): string {
  if (!story.engineChoice && !story.shadowChoice) return 'Este turno no deliberó.';
  if (story.engineChoice === 'abstain' && story.shadowChoice === 'implicit_llm') {
    return 'Nexus se abstuvo; el texto igual se generó.';
  }
  if (story.engineChoice && story.shadowChoice && story.engineChoice !== story.shadowChoice) {
    return `Nexus eligió ${choiceLabel(story.engineChoice).toLowerCase()}. La sombra registró ${choiceLabel(story.shadowChoice).toLowerCase()}.`;
  }
  if (story.engineChoice) {
    return `Nexus eligió ${choiceLabel(story.engineChoice).toLowerCase()}.`;
  }
  return `La sombra registró ${choiceLabel(story.shadowChoice).toLowerCase()}.`;
}

export function extrasHeadline(
  story: Pick<TurnReading, 'extrasMode' | 'extrasDecision' | 'extrasApplied' | 'extrasActiveDomain' | 'extrasDomainSource' | 'familyCarried'>
): string {
  if (!story.extrasMode) return 'No hubo extras.';
  const domain = domainLine(story);
  const outcome = extrasOutcomeLabel(story);
  if (domain) return `${outcome}. ${domain.charAt(0).toUpperCase()}${domain.slice(1)}.`;
  return `${outcome}.`;
}

export function muteHeadline(flags: string[]): string {
  if (flags.includes('soft_landing')) return 'Hay aterrizaje suave.';
  if (flags.length === 0) return '';
  return `Silenció ${flags.map(muteFlagLabel).join(', ')}.`;
}

export function turnHeadline(story: TurnReading): string {
  return [engineHeadline(story), extrasHeadline(story), muteHeadline(story.muteFlags)].filter(Boolean).join(' ');
}

export function extrasTone(story: Pick<TurnReading, 'extrasMode' | 'extrasApplied'>): 'ok' | 'watch' | undefined {
  if (story.extrasMode === 'applied' && story.extrasApplied !== true) return 'watch';
  return undefined;
}

export function muteTone(flags: string[]): 'ok' | 'watch' | undefined {
  return flags.length > 0 ? 'watch' : undefined;
}

export function turnSignals(story: TurnReading): TurnSignal[] {
  const extrasHintText = extrasHint(story);
  const mute = muteSummary(story.muteFlags);
  const safety = story.safetyRoute && story.safetyRoute !== 'none' ? factLabel(story.safetyRoute) : null;
  return [
    {
      id: 'engine',
      label: 'Engine',
      value: choiceLabel(story.engineChoice),
      hint: story.shadowChoice && story.shadowChoice !== story.engineChoice
        ? `Sombra: ${choiceLabel(story.shadowChoice)}`
        : undefined,
    },
    {
      id: 'extras',
      label: 'Extras',
      value: extrasOutcomeLabel(story),
      hint: extrasHintText ?? undefined,
      tone: extrasTone(story),
    },
    {
      id: 'experience',
      label: 'Forma',
      value: choiceLabel(story.cue),
    },
    {
      id: 'mute',
      label: 'Mute',
      value: story.muteFlags.length > 0 ? mute : safety ?? 'Nada silenciado',
      tone: muteTone(story.muteFlags),
    },
  ];
}

export function pickerExtrasLine(story: Pick<TurnReading, 'extrasMode' | 'extrasDecision' | 'extrasApplied'>): string {
  return extrasOutcomeLabel(story);
}
