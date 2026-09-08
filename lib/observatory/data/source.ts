import type { ObservatoryDataSource } from '@/lib/observatory/data/types';
import { simulatedSource } from '@/lib/observatory/data/adapters/simulated';
import { httpSourceStub } from '@/lib/observatory/data/adapters/http';
import { sseSourceStub } from '@/lib/observatory/data/adapters/sse';
import { mongoSourceStub } from '@/lib/observatory/data/adapters/mongodb';

export type SourceKind = ObservatoryDataSource['kind'];

export function getDataSource(kind: SourceKind = 'simulated'): ObservatoryDataSource {
  switch (kind) {
    case 'simulated':
      return simulatedSource;
    case 'http':
      return httpSourceStub;
    case 'sse':
      return sseSourceStub;
    case 'mongodb':
      return mongoSourceStub;
    default:
      return simulatedSource;
  }
}

export const defaultSource = simulatedSource;
