/**
 * Nota de la ventana visible. Misma regla que backend/utils/nexusWeekReading.js:
 * supresión planned o applied fuera de couple_and_vent. La crisis no es el caso.
 * No aprueba ni abre un parche.
 */

export type WeekStory = {
  conversionSuppression: string | null;
  slice: string | null;
  safetyRoute: string | null;
};

export type WindowReading = {
  note: 'vigilar' | 'no_es_bug';
  plans: number;
  drifted: number;
  crisis: number;
  line: string;
};

function isCrisis(story: WeekStory): boolean {
  return Boolean(story.safetyRoute && story.safetyRoute !== 'none');
}

export function isSuppressionWatch(story: WeekStory): boolean {
  if (isCrisis(story)) return false;
  if (story.conversionSuppression === 'applied') return true;
  return story.conversionSuppression === 'planned' && story.slice !== 'couple_and_vent';
}

function lineFor(reading: Pick<WindowReading, 'plans' | 'drifted' | 'crisis'>): string {
  const parts: string[] = [];
  if (reading.drifted > 0) {
    parts.push(
      `En estos turnos: vigilar. Supresión fuera de pareja y desahogo: ${reading.drifted} de ${reading.plans} planes.`,
    );
    parts.push('Abrir solo las filas marcadas.');
  } else {
    parts.push('En estos turnos: no es bug. Sin supresión fuera de pareja y desahogo.');
  }
  if (reading.crisis > 0) parts.push('Crisis: cubo, sin parche.');
  return parts.join(' ');
}

export function windowReading(stories: WeekStory[]): WindowReading {
  let plans = 0;
  let drifted = 0;
  let crisis = 0;
  for (const story of stories) {
    if (isCrisis(story)) {
      crisis += 1;
      continue;
    }
    if (!story.conversionSuppression) continue;
    plans += 1;
    if (isSuppressionWatch(story)) drifted += 1;
  }
  const note = drifted > 0 ? 'vigilar' : 'no_es_bug';
  const reading = { note, plans, drifted, crisis, line: '' };
  reading.line = lineFor(reading);
  return reading;
}
