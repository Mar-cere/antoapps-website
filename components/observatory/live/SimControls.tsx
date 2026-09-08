'use client';

import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import type { ScenarioId } from '@/lib/observatory/data/types';
import { SCENARIO_LABELS } from '@/lib/observatory/copy/labels';
import { isFinished, totalDuration } from '@/lib/observatory/simulation/engine';

export function SimControls() {
  const { scenarios, scenarioId, setScenarioId, play, pause, resume, reset, playing, speed, setSpeed, elapsedMs, scenario } =
    useObservatory();
  const finished = isFinished(scenario, elapsedMs);
  const started = elapsedMs > 0;

  return (
    <div className="controls" role="group" aria-label="Controles de simulación">
      <label>
        <span className="sr-only">Escenario</span>
        <select
          value={scenarioId}
          onChange={(e) => setScenarioId(e.target.value as ScenarioId)}
        >
          {scenarios.map((s) => (
            <option key={s.id} value={s.id}>
              {SCENARIO_LABELS[s.id]}
            </option>
          ))}
        </select>
      </label>
      <button className="primary" type="button" onClick={play}>
        Iniciar
      </button>
      <button type="button" onClick={pause} disabled={!playing}>
        Pausar
      </button>
      <button type="button" onClick={resume} disabled={playing || !started || finished}>
        Reanudar
      </button>
      <button type="button" onClick={reset}>
        Reiniciar
      </button>
      <label>
        Velocidad
        <select value={String(speed)} onChange={(e) => setSpeed(Number(e.target.value) as 0.5 | 1 | 2 | 4)}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
        </select>
      </label>
      <span className="s">
        {Math.round(elapsedMs)} ms / {totalDuration(scenario)} ms
      </span>
    </div>
  );
}
