import type { Locale } from '@/lib/i18n/config';
import { googlePlayBadgePath } from '@/lib/download-links';

type GooglePlayBadgeProps = {
  locale?: Locale;
  className?: string;
  priority?: boolean;
};

export default function GooglePlayBadge({
  locale = 'es',
  className = 'store-badge-img',
  priority = false,
}: GooglePlayBadgeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={googlePlayBadgePath(locale)}
      alt=""
      width={135}
      height={40}
      className={className}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
