'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { isExternalStoreUrl } from '@/lib/download-links';
import { trackStoreClick } from '@/lib/analytics/store-click';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  className?: string;
  trackingPlacement?: string;
  trackingPage?: string;
  trackingLabel?: string;
};

export default function DownloadLink({
  href,
  children,
  className,
  trackingPlacement,
  trackingPage,
  trackingLabel,
  onClick,
  ...rest
}: Props) {
  const handleStoreClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackStoreClick({
      placement: trackingPlacement || 'unknown',
      page: trackingPage || (typeof window !== 'undefined' ? window.location.pathname : ''),
      label: trackingLabel,
    });
  };

  if (isExternalStoreUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleStoreClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
