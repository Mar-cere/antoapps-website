import type { ObservatoryDataSource } from '@/lib/data/types';
import { simulatedSource } from '@/lib/data/adapters/simulated';
import { httpSourceStub } from '@/lib/data/adapters/http';
import { sseSourceStub } from '@/lib/data/adapters/sse';
import { mongoSourceStub } from '@/lib/data/adapters/mongodb';

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
