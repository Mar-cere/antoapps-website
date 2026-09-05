import type { NexusEventCopy } from '@/lib/i18n/copy/pages/nexus';

type NexusEventMarkProps = {
  id: NexusEventCopy['id'];
  className?: string;
};

export default function NexusEventMark({ id, className = 'nexus-event__icon' }: NexusEventMarkProps) {
  if (id === 'memory') {
    return (
      <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2.1" fill="currentColor" />
        <path
          d="M8 3.2v1.6M8 11.2v1.6M3.2 8h1.6M11.2 8h1.6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (id === 'pattern') {
    return (
      <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M3 11.5l3.2-7 3.1 4.4L13 4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === 'knowledge') {
    return (
      <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="5" cy="8" r="1.5" fill="currentColor" />
        <circle cx="11" cy="6.2" r="1.5" fill="currentColor" />
        <path d="M6.4 7.6l3.2-1.1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4 11.5L8 4.5l4 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.2 9.4h3.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
