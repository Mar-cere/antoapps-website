/**
 * Contrato: GET {OBSERVATORY_HTTP_BASE_URL}/v1/observatory/snapshot
 * JSON parcial de ObservatorySnapshot. Content mode off. Timeout 4s.
 */
import type { ObservatorySnapshot } from '@/lib/observatory/data/types';

const SNAPSHOT_PATH = '/v1/observatory/snapshot';
const TIMEOUT_MS = 4000;

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

export async function fetchHttpSnapshot(): Promise<UpstreamSnapshotResult> {
  const endpoint = observatoryHttpEndpoint();
  if (!endpoint) {
    return { ok: false, error: 'OBSERVATORY_HTTP_BASE_URL no está definido.' };
  }

  const headers: HeadersInit = { Accept: 'application/json' };
  const token = process.env.OBSERVATORY_UPSTREAM_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
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
