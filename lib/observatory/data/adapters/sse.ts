import type { ObservatoryDataSource } from '@/lib/observatory/data/types';

/**
 * Eventos en tiempo real (SSE o WebSocket).
 * Contrato esperado: proyección de TraceEnvelope y ComponentStatus.
 * No enviar contenido de conversación. IDs, hashes, clases y spans bastan.
 */
export const sseSourceStub: ObservatoryDataSource = {
  kind: 'sse',
  getSnapshot() {
    throw new Error('Adaptador SSE/WebSocket no conectado. Usar simulación.');
  },
  listScenarios() {
    throw new Error('Adaptador SSE/WebSocket no conectado.');
  },
  getScenario() {
    throw new Error('Adaptador SSE/WebSocket no conectado.');
  },
};
