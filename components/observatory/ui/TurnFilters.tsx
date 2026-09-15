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
        Quién
        <select
          value={value.surface}
          onChange={(event) => onChange({ ...value, surface: event.target.value as TurnFilterState['surface'] })}
        >
          <option value="all">Todos</option>
          <option value="registered">Cuenta</option>
          <option value="guest">Invitado</option>
        </select>
      </label>
      <label>
        Extras
        <select
          value={value.extrasMode}
          onChange={(event) => onChange({ ...value, extrasMode: event.target.value as TurnFilterState['extrasMode'] })}
        >
          <option value="all">Todos</option>
          <option value="applied">Canary aplicado</option>
          <option value="shadow">Solo observó</option>
          <option value="missing">Sin extras</option>
        </select>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.muteSoftLanding}
          onChange={(event) => onChange({ ...value, muteSoftLanding: event.target.checked })}
        />
        Aterrizaje suave
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.familyDomain}
          onChange={(event) => onChange({ ...value, familyDomain: event.target.checked })}
        />
        Dominio familiar
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={value.domainCarried}
          onChange={(event) => onChange({ ...value, domainCarried: event.target.checked })}
        />
        Traído de antes
      </label>
      <p className="s">
        {count} de {total}
      </p>
    </form>
  );
}
