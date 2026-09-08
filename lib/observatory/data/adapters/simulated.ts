import type { ObservatoryDataSource, ScenarioDefinition, ScenarioId } from '@/lib/observatory/data/types';
import { SCENARIOS, getScenario } from '@/lib/observatory/data/fixtures/scenarios';
import { buildStaticSnapshot } from '@/lib/observatory/data/views';

export const simulatedSource: ObservatoryDataSource = {
  kind: 'simulated',
  getSnapshot() {
    return buildStaticSnapshot();
  },
  listScenarios() {
    return SCENARIOS;
  },
  getScenario(id: ScenarioId): ScenarioDefinition {
    return getScenario(id);
  },
};
