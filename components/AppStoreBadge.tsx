import type { Locale } from '@/lib/i18n/config';
import { appStoreBadgePath } from '@/lib/download-links';

type AppStoreBadgeProps = {
  locale?: Locale;
  className?: string;
  priority?: boolean;
};

export default function AppStoreBadge({
  locale = 'es',
  className = 'store-badge-img',
  priority = false,
}: AppStoreBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={appStoreBadgePath(locale)}
      alt=""
      width={120}
      height={40}
      className={className}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
