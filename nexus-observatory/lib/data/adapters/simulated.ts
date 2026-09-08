import type { ObservatoryDataSource, ScenarioDefinition, ScenarioId } from '@/lib/data/types';
import { SCENARIOS, getScenario } from '@/lib/data/fixtures/scenarios';
import { buildStaticSnapshot } from '@/lib/data/views';

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
