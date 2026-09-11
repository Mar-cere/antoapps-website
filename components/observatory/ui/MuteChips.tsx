import { MUTE_FLAG_LABELS } from '@/lib/observatory/copy/labels';

export function MuteChips({ flags }: { flags: string[] }) {
  if (flags.length === 0) {
    return <span className="s">Sin muteFlags</span>;
  }
  return (
    <span className="chip-row">
      {flags.map((flag) => (
        <span key={flag} className="chip" data-flag={flag}>
          {MUTE_FLAG_LABELS[flag] ?? flag}
        </span>
      ))}
    </span>
  );
}
