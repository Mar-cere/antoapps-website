import type { DataProvenance } from '@/lib/observatory/data/types';
import { PROVENANCE_LABELS } from '@/lib/observatory/copy/labels';

export function Provenance({ kind }: { kind: DataProvenance }) {
  return (
    <span className="pill" data-kind={kind}>
      {PROVENANCE_LABELS[kind]}
    </span>
  );
}
