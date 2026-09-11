'use client';

import { useEffect, useState } from 'react';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { secondsSince } from '@/lib/observatory/data/turnDecision';
import type { SystemLifecycle } from '@/lib/observatory/data/types';

export function ObservatoryClock({
  inFlight,
  lastEventAt,
  packId,
  lifecycle,
}: {
  inFlight: boolean;
  lastEventAt: string | null;
  packId: string | null;
  lifecycle: SystemLifecycle;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const age = secondsSince(lastEventAt, now);
  const status = inFlight ? 'active' : lifecycle === 'warning' || lifecycle === 'failed' ? lifecycle : 'idle';

  return (
    <div className="obs-clock" role="status">
      <StatusMark status={status} hideLabel />
      <span>
        {inFlight ? 'Turno en curso' : 'En espera'}
        {age == null ? null : ` · último evento hace ${age}s`}
        {packId ? ` · ${packId}` : ''}
      </span>
    </div>
  );
}
