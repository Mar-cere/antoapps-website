import { muteFlagLabel } from '@/lib/observatory/copy/turnReading';

export function MuteChips({ flags }: { flags: string[] }) {
  if (flags.length === 0) return null;
  return (
    <span className="chip-row">
      {flags.map((flag) => (
        <span key={flag} className="chip" data-flag={flag} title={flag}>
          {muteFlagLabel(flag)}
        </span>
      ))}
    </span>
  );
}
