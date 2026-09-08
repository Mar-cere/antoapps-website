import type { DataProvenance } from '@/lib/data/types';
import { PROVENANCE_LABELS } from '@/lib/copy/labels';

export function Provenance({ kind }: { kind: DataProvenance }) {
  return (
    <span className="pill" data-kind={kind}>
      {PROVENANCE_LABELS[kind]}
    </span>
  );
}
