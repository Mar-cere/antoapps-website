import { AppleIcon, PlayIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import type { PremiumStoreKind } from '@/components/ui/PremiumStoreCta';

export type PremiumStoreCtaLinkProps = {
  storeHref: string;
  storeLabel: string;
  storeName: string;
  badge: string;
  ariaLabel: string;
  store?: PremiumStoreKind;
  className?: string;
};

/** CTA de tienda renderizable en servidor (sin tracking client-side). */
export default function PremiumStoreCtaLink({
  storeHref,
  storeLabel,
  storeName,
  badge,
  ariaLabel,
  store = 'apple',
  className = '',
}: PremiumStoreCtaLinkProps) {
  const Icon = store === 'google' ? PlayIcon : AppleIcon;

  return (
    <a
      href={storeHref}
      className={`premium-store-cta ${store === 'google' ? 'premium-store-cta--google' : ''} ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="premium-store-cta__left">
        <span className="premium-store-cta__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="premium-store-cta__text">
          <span className="premium-store-cta__label">{storeLabel}</span>
          <span className="premium-store-cta__name">{storeName}</span>
        </span>
      </span>
      <span className="premium-store-cta__badge">{badge}</span>
    </a>
  );
}
