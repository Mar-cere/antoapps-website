/**
 * Contrato:
 * GET {OBSERVATORY_HTTP_BASE_URL}/v1/observatory/snapshot — ventana live.
 * GET {OBSERVATORY_HTTP_BASE_URL}/v1/observatory/weekly-review — filas marcadas, 7 días.
 * Content mode off.
 */
import type { ObservatorySnapshot, WeeklyReview } from '@/lib/observatory/data/types';

const SNAPSHOT_PATH = '/v1/observatory/snapshot';
const WEEKLY_PATH = '/v1/observatory/weekly-review';
const TIMEOUT_MS = 4000;
const WEEKLY_TIMEOUT_MS = 8000;

export type UpstreamSnapshotResult =
  | { ok: true; snapshot: Partial<ObservatorySnapshot> }
  | { ok: false; error: string };

function observatoryHttpBase(): string | null {
  const raw = process.env.OBSERVATORY_HTTP_BASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, '');
}

export function observatoryHttpEndpoint(): string | null {
  const base = observatoryHttpBase();
  return base ? `${base}${SNAPSHOT_PATH}` : null;
}

export function observatoryWeeklyEndpoint(): string | null {
  const base = observatoryHttpBase();
  return base ? `${base}${WEEKLY_PATH}` : null;
}

function upstreamHeaders(): HeadersInit {
  const headers: HeadersInit = { Accept: 'application/json' };
  const token = process.env.OBSERVATORY_UPSTREAM_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function isWeeklyReview(body: unknown): body is WeeklyReview {
  if (!body || typeof body !== 'object') return false;
  const review = body as WeeklyReview;
  return review.mode === 'weekly' && Array.isArray(review.rows) && typeof review.note === 'string';
}

export async function fetchHttpSnapshot(): Promise<UpstreamSnapshotResult> {
  const endpoint = observatoryHttpEndpoint();
  if (!endpoint) {
    return { ok: false, error: 'OBSERVATORY_HTTP_BASE_URL no está definido.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: upstreamHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `El runtime respondió ${response.status}. El observatorio espera GET ${SNAPSHOT_PATH}.`,
      };
    }

    const body: unknown = await response.json();
    if (!body || typeof body !== 'object') {
      return { ok: false, error: 'El snapshot no es un objeto JSON.' };
    }

    return { ok: true, snapshot: body as Partial<ObservatorySnapshot> };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error de red';
    return { ok: false, error: `No se alcanzó el runtime: ${message}` };
  }
}

export type UpstreamWeeklyResult =
  | { ok: true; review: WeeklyReview }
  | { ok: false; error: string };

export async function fetchWeeklyReview(): Promise<UpstreamWeeklyResult> {
  const endpoint = observatoryWeeklyEndpoint();
  if (!endpoint) {
    return { ok: false, error: 'OBSERVATORY_HTTP_BASE_URL no está definido.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: upstreamHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(WEEKLY_TIMEOUT_MS),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: `El runtime respondió ${response.status}. El observatorio espera GET ${WEEKLY_PATH}.`,
      };
    }

    const body: unknown = await response.json();
    if (!isWeeklyReview(body)) {
      return { ok: false, error: 'La revisión de 7 días no tiene el formato esperado.' };
    }

    return { ok: true, review: body };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error de red';
    return { ok: false, error: `No se alcanzó la revisión de 7 días: ${message}` };
  }
}
