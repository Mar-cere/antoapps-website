import { AppleIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';

export type PremiumStoreCtaLinkProps = {
  storeHref: string;
  storeLabel: string;
  storeName: string;
  badge: string;
  ariaLabel: string;
  className?: string;
};

/** CTA de App Store renderizable en servidor (sin tracking client-side). */
export default function PremiumStoreCtaLink({
  storeHref,
  storeLabel,
  storeName,
  badge,
  ariaLabel,
  className = '',
}: PremiumStoreCtaLinkProps) {
  return (
    <a
      href={storeHref}
      className={`premium-store-cta ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="premium-store-cta__left">
        <span className="premium-store-cta__icon" aria-hidden="true">
          <AppleIcon />
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
