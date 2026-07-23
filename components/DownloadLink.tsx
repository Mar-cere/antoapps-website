'use client';

import Link from 'next/link';
import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { detectInAppBrowser } from '@/lib/device/in-app-browser';
import {
  appStoreNativeHref,
  isAppStoreUrl,
  isExternalStoreUrl,
} from '@/lib/download-links';
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
  target: targetProp,
  rel: relProp,
  ...rest
}: Props) {
  const external = isExternalStoreUrl(href);
  const appleStore = isAppStoreUrl(href);
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    // Solo tras mount: evita mismatch SSR/hidratación.
    if (appleStore && detectInAppBrowser() === 'ios') {
      setResolvedHref(appStoreNativeHref(href));
      return;
    }
    setResolvedHref(href);
  }, [href, appleStore]);

  const handleStoreClick: AnchorHTMLAttributes<HTMLAnchorElement>['onClick'] = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackStoreClick({
      placement: trackingPlacement || 'unknown',
      page: trackingPage || (typeof window !== 'undefined' ? window.location.pathname : ''),
      label: trackingLabel,
    });
  };

  if (external || resolvedHref.startsWith('itms-apps://')) {
    // App Store: misma pestaña (y itms-apps en IG iOS). _blank suele romper WebViews in-app.
    const openInNewTab = external && !appleStore && targetProp !== '_self';

    return (
      <a
        href={resolvedHref}
        className={className}
        target={openInNewTab ? targetProp || '_blank' : undefined}
        rel={openInNewTab ? relProp || 'noopener noreferrer' : undefined}
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
