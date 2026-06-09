import type { BienvenidaV2FeatureIcon, BienvenidaV2TrustIcon } from '@/lib/i18n/copy/bienvenida';
import { FeatureIcon, SecurityIcon } from '@/components/icons/FeatureIcons';

type IconProps = { size?: number };

function Svg({ size = 20, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function BienvenidaV2FeatureIcon({ id }: { id: BienvenidaV2FeatureIcon }) {
  switch (id) {
    case 'privacy':
      return <SecurityIcon id="encryption" size={18} />;
    case 'clock':
      return <FeatureIcon id="clock" size={18} />;
    case 'evidence':
      return (
        <Svg size={18}>
          <path
            d="M6 18h12M8 18V8l4-3 4 3v10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 12h4M10 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </Svg>
      );
    case 'crisis':
      return <FeatureIcon id="crisis" size={18} />;
  }
}

export function BienvenidaV2TrustIcon({ id }: { id: BienvenidaV2TrustIcon }) {
  switch (id) {
    case 'lock':
      return (
        <Svg size={12}>
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </Svg>
      );
    case 'no-card':
      return (
        <Svg size={12}>
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </Svg>
      );
    case 'chile':
      return (
        <Svg size={12}>
          <path
            d="M12 21s6-4.35 6-10a6 6 0 0 0-12 0c0 5.65 6 10 6 10z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.75" />
        </Svg>
      );
  }
}

export function AppleIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function StarIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
