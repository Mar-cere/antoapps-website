import type { ObservatoryDataSource } from '@/lib/data/types';

/**
 * Adaptador HTTP futuro.
 * El dashboard debe leer vistas derivadas (snapshots), nunca el warehouse de Cortex
 * ni queries analíticas pesadas.
 *
 * GET /v1/observatory/snapshot
 * GET /v1/observatory/traces/:id
 * GET /v1/observatory/decisions/:id
 */
export const httpSourceStub: ObservatoryDataSource = {
  kind: 'http',
  getSnapshot() {
    throw new Error('Adaptador HTTP no conectado. Usar OBSERVATORY_DATA_SOURCE=simulated.');
  },
  listScenarios() {
    throw new Error('Adaptador HTTP no conectado.');
  },
  getScenario() {
    throw new Error('Adaptador HTTP no conectado.');
  },
};
