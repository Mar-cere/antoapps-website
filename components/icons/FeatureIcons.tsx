import type { FeatureIconId, SecurityIconId } from '@/lib/types/feature-icons';

export type { FeatureIconId, SecurityIconId };

type IconProps = {
  size?: number;
  children: React.ReactNode;
};

function IconSvg({ size = 24, children }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function FeatureIcon({ id, size = 24 }: { id: FeatureIconId; size?: number }) {
  switch (id) {
    case 'ai':
      return (
        <IconSvg size={size}>
          <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="9" cy="12" r="1.25" fill="currentColor" />
          <circle cx="15" cy="12" r="1.25" fill="currentColor" />
          <path d="M12 3v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </IconSvg>
      );
    case 'scales':
      return (
        <IconSvg size={size}>
          <path
            d="M12 3v18M7 7h10M7 7l-3 5h6M17 7l-3 5h6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconSvg>
      );
    case 'protocols':
      return (
        <IconSvg size={size}>
          <path
            d="M8 4h11v16H5V7l3-3z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </IconSvg>
      );
    case 'brain':
      return (
        <IconSvg size={size}>
          <path
            d="M9 5a3 3 0 0 0-3 3v1a2 2 0 0 0 0 4v1a3 3 0 0 0 3 3M15 5a3 3 0 0 1 3 3v1a2 2 0 0 1 0 4v1a3 3 0 0 1-3 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path d="M9 8h6M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </IconSvg>
      );
    case 'crisis':
      return (
        <IconSvg size={size}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 7v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </IconSvg>
      );
    case 'tasks':
      return (
        <IconSvg size={size}>
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M8 12l2.5 2.5L16 9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconSvg>
      );
    case 'language':
      return (
        <IconSvg size={size}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </IconSvg>
      );
    case 'clock':
      return (
        <IconSvg size={size}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </IconSvg>
      );
  }
}

export function SecurityIcon({ id, size = 24 }: { id: SecurityIconId; size?: number }) {
  switch (id) {
    case 'encryption':
      return (
        <IconSvg size={size}>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M8 11V8a4 4 0 0 1 8 0v3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16" r="1.25" fill="currentColor" />
        </IconSvg>
      );
    case 'compliance':
      return (
        <IconSvg size={size}>
          <path
            d="M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </IconSvg>
      );
    case 'auth':
      return (
        <IconSvg size={size}>
          <circle cx="10" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path d="M17 8v4M19 10h-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </IconSvg>
      );
  }
}
