import { storyFromTrace } from '@/lib/observatory/data/turnDecision';
import type { TraceEnvelope } from '@/lib/observatory/data/types';

export type TurnFilterState = {
  surface: 'all' | 'registered' | 'guest';
  extrasMode: 'all' | 'shadow' | 'applied' | 'missing';
  muteSoftLanding: boolean;
  familyDomain: boolean;
  domainCarried: boolean;
};

export const DEFAULT_TURN_FILTERS: TurnFilterState = {
  surface: 'all',
  extrasMode: 'all',
  muteSoftLanding: false,
  familyDomain: false,
  domainCarried: false,
};

export function matchesTurnFilters(trace: TraceEnvelope, filters: TurnFilterState): boolean {
  const story = storyFromTrace(trace);
  if (filters.surface !== 'all' && story.surface !== filters.surface) return false;
  if (filters.extrasMode === 'missing' && story.extrasMode) return false;
  if (filters.extrasMode === 'shadow' && story.extrasMode !== 'shadow') return false;
  if (filters.extrasMode === 'applied' && story.extrasMode !== 'applied') return false;
  if (filters.muteSoftLanding && !story.muteFlags.includes('soft_landing')) return false;
  if (filters.familyDomain && story.extrasActiveDomain !== 'family') return false;
  if (filters.domainCarried && story.extrasDomainSource !== 'carried') return false;
  return true;
}

export function filterTraces(traces: TraceEnvelope[], filters: TurnFilterState): TraceEnvelope[] {
  return traces.filter((trace) => matchesTurnFilters(trace, filters));
}
