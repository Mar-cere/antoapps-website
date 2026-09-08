import type { ObservatoryDataSource } from '@/lib/observatory/data/types';

/**
 * MongoDB es la fuente canónica operacional. Este observatorio no consulta Mongo
 * en el camino de la UI. Debe leer vistas derivadas (PersonaSnapshot, outbox
 * proyectado, trace store). Graph/vector/warehouse son reconstruibles y nunca
 * una segunda fuente de verdad.
 */
export const mongoSourceStub: ObservatoryDataSource = {
  kind: 'mongodb',
  getSnapshot() {
    throw new Error('Adaptador MongoDB no conectado. El dashboard no debe consultar el warehouse.');
  },
  listScenarios() {
    throw new Error('Adaptador MongoDB no conectado.');
  },
  getScenario() {
    throw new Error('Adaptador MongoDB no conectado.');
  },
};
