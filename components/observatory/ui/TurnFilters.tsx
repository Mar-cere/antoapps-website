'use client';

import type { TurnFilterState } from '@/lib/observatory/data/turnFilters';

export function TurnFilters({
  value,
  onChange,
  count,
  total,
}: {
  value: TurnFilterState;
  onChange: (next: TurnFilterState) => void;
  count: number;
  total: number;
}) {
  return (
    <form className="turn-filters" onSubmit={(event) => event.preventDefault()} aria-label="Filtros de turno">
      <label>
        Surface
        <select
          value={value.surface}
          onChange={(event) => onChange({ ...value, surface: event.target.value as TurnFilterState['surface'] })}
        >
          <option value="all">Todas</option>
          <option value="registered">registered</option>
          <option value="guest">guest</option>
        </select>
      </label>
      <label>
        extras.mode
        <select
          value={value.extrasMode}
          onChange={(event) => onChange({ ...value, extrasMode: event.target.value as TurnFilterState['extrasMode'] })}
        >
          <option value="all">Todos</option>
          <option value="shadow">shadow</option>
          <option value="applied">applied</option>
          <option value="missing">Sin extras.evaluated</option>
        </select>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.muteSoftLanding}
          onChange={(event) => onChange({ ...value, muteSoftLanding: event.target.checked })}
        />
        muteFlags contiene soft_landing
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.familyDomain}
          onChange={(event) => onChange({ ...value, familyDomain: event.target.checked })}
        />
        activeDomain=family
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.domainCarried}
          onChange={(event) => onChange({ ...value, domainCarried: event.target.checked })}
        />
        domainSource=carried
      </label>
      <p className="s">
        {count} de {total} turnos
      </p>
    </form>
  );
}
