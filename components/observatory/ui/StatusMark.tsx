import type { SpanStatus, SystemLifecycle } from '@/lib/observatory/data/types';
import { SPAN_STATUS_LABELS } from '@/lib/observatory/copy/labels';

const LABELS: Record<SystemLifecycle, string> = {
  idle: 'En espera',
  active: 'Activo',
  completed: 'Completado',
  failed: 'Fallido',
  warning: 'Advertencia',
};

export function StatusMark({
  status,
  hideLabel = false,
}: {
  status: SpanStatus | SystemLifecycle;
  hideLabel?: boolean;
}) {
  const label = status in SPAN_STATUS_LABELS ? SPAN_STATUS_LABELS[status as SpanStatus] : LABELS[status as SystemLifecycle];
  return (
    <span className="status">
      <span className={`dot ${status}`} />
      {hideLabel ? <span className="sr-only">{label}</span> : label}
    </span>
  );
}
