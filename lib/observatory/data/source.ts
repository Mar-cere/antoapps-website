import type { ObservatoryDataSource, ObservatoryFeed } from '@/lib/observatory/data/types';
import { simulatedSource } from '@/lib/observatory/data/adapters/simulated';
import { fetchHttpSnapshot, observatoryHttpEndpoint } from '@/lib/observatory/data/adapters/http';
import { sseSourceStub } from '@/lib/observatory/data/adapters/sse';
import { mongoSourceStub } from '@/lib/observatory/data/adapters/mongodb';
import { applyRemoteSnapshot } from '@/lib/observatory/data/merge';
import { buildStaticSnapshot } from '@/lib/observatory/data/views';
import { SCENARIOS } from '@/lib/observatory/data/fixtures/scenarios';

export type SourceKind = ObservatoryDataSource['kind'];

export function getDataSource(kind: SourceKind = 'simulated'): ObservatoryDataSource {
  switch (kind) {
    case 'simulated':
      return simulatedSource;
    case 'http':
      return simulatedSource;
    case 'sse':
      return sseSourceStub;
    case 'mongodb':
      return mongoSourceStub;
    default:
      return simulatedSource;
  }
}

export const defaultSource = simulatedSource;

export async function loadObservatoryFeed(): Promise<ObservatoryFeed> {
  const endpoint = observatoryHttpEndpoint();
  if (!endpoint) {
    return {
      connection: {
        kind: 'simulated',
        configured: false,
        reachable: false,
        endpoint: null,
        detail: 'Sin OBSERVATORY_HTTP_BASE_URL. El observatorio usa fixtures. El runtime debe publicar GET /v1/observatory/snapshot.',
      },
      snapshot: buildStaticSnapshot(),
      scenarios: SCENARIOS,
    };
  }

  const upstream = await fetchHttpSnapshot();
  if (!upstream.ok) {
    return {
      connection: {
        kind: 'http',
        configured: true,
        reachable: false,
        endpoint,
        detail: upstream.error,
      },
      snapshot: buildStaticSnapshot(),
      scenarios: SCENARIOS,
    };
  }

  return {
    connection: {
      kind: 'http',
      configured: true,
      reachable: true,
      endpoint,
        detail: 'Snapshot derivado de nexus_turn_traces. No es /health. El dashboard no consulta Mongo ni Atlas.',
    },
    snapshot: applyRemoteSnapshot(upstream.snapshot),
    scenarios: SCENARIOS,
  };
}
