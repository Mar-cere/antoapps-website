/**
 * Lectura de supresión para la ventana visible.
 * Esperada: planned por activación alta, ruta de safety o riesgo. No es bug.
 * A mirar: planned con slice couple, vent o none, sin esa causa.
 * Applied es el estado prohibido. La crisis no abre un parche.
 */

export type WeekStory = {
  conversionSuppression: string | null;
  slice: string | null;
  safetyRoute: string | null;
  activationBand?: string | null;
  riskClass?: string | null;
};

export type SuppressionMark = 'esperada' | 'a_mirar' | 'applied';

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

function expectedSuppressionCause(story: WeekStory): boolean {
  const distressRoute = Boolean(story.safetyRoute && story.safetyRoute !== 'none');
  const highRisk = story.riskClass === 'MEDIUM' || story.riskClass === 'HIGH';
  return distressRoute || highRisk || story.activationBand === 'high';
}

export function suppressionMark(story: WeekStory): SuppressionMark | null {
  if (story.conversionSuppression === 'applied') return 'applied';
  if (story.conversionSuppression !== 'planned') return null;
  if (story.slice === 'couple_and_vent') return null;
  if (expectedSuppressionCause(story)) return 'esperada';
  return 'a_mirar';
}

export function isSuppressionWatch(story: WeekStory): boolean {
  const mark = suppressionMark(story);
  return mark === 'a_mirar' || mark === 'applied';
}

const RUNTIME_EMPTY = 'El runtime no publicó turnos en esta ventana.';

export function weeklyReviewMessage(review: {
  traces_present: boolean;
  rows: readonly unknown[];
  note: string;
} | null): string {
  if (!review) return 'La revisión de 7 días no está disponible.';
  if (review.traces_present && review.rows.length === 0 && review.note.includes('no publicó')) {
    return 'En 7 días hay trazas. Ninguna fila marcada en Cuenta.';
  }
  if (review.note === RUNTIME_EMPTY) {
    return 'En 7 días no hay turnos en la revisión.';
  }
  return review.note;
}

function lineFor(reading: Pick<WindowReading, 'plans' | 'drifted' | 'crisis'> & { expected: number }): string {
  const parts: string[] = [];
  if (reading.drifted > 0) {
    parts.push(
      `En estos turnos: vigilar. Supresión fuera de pareja y desahogo: ${reading.drifted} de ${reading.plans} planes.`,
    );
    parts.push('Abrir solo las filas marcadas.');
  } else if (reading.expected > 0) {
    parts.push(
      'En estos turnos: esperada. La supresión planned viene de activación alta, ruta de safety o riesgo. No es bug.',
    );
  } else {
    parts.push('En estos turnos: no es bug. Sin supresión fuera de pareja y desahogo.');
  }
  if (reading.crisis > 0) parts.push('Crisis: cubo, sin parche.');
  return parts.join(' ');
}

export function windowReading(stories: WeekStory[]): WindowReading {
  let plans = 0;
  let drifted = 0;
  let expected = 0;
  let crisis = 0;
  for (const story of stories) {
    if (isCrisis(story)) {
      crisis += 1;
      continue;
    }
    if (!story.conversionSuppression) continue;
    plans += 1;
    if (suppressionMark(story) === 'esperada') expected += 1;
    if (isSuppressionWatch(story)) drifted += 1;
  }
  const counts = { plans, drifted, crisis, expected };
  return {
    note: drifted > 0 ? 'vigilar' : 'no_es_bug',
    plans,
    drifted,
    crisis,
    line: lineFor(counts),
  };
}
