'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/lib/hooks/useCookieConsent';
import { localePath, type Locale } from '@/lib/i18n/config';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';
import '@/styles/components/cookie-consent.css';

type CookieConsentProps = {
  compact?: boolean;
  bannerDelayMs?: number;
  showAfterScrollPx?: number;
};

function resolveLocale(pathname: string): Locale {
  return localeFromPathname(pathname);
}

export default function CookieConsent({
  compact = false,
  bannerDelayMs,
  showAfterScrollPx,
}: CookieConsentProps) {
  const pathname = usePathname();
  const locale = resolveLocale(pathname ?? '');
  const copy = getSiteLayoutCopy(locale).cookies;
  const privacyHref = localePath(locale, '/privacidad');

  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent({
    bannerDelayMs,
    showAfterScrollPx,
  });

  if (!showBanner) return null;

  return (
    <div
      id="cookieConsent"
      className={`cookie-consent ${showBanner ? 'show' : ''} ${compact ? 'cookie-consent--compact' : ''}`}
    >
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          {!compact && <h4>{copy.title}</h4>}
          <p>
            {compact ? (
              <>
                {copy.compact}{' '}
                <Link href={privacyHref} target="_blank">
                  {copy.privacy}
                </Link>
                .
              </>
            ) : (
              <>
                {copy.full}{' '}
                <Link href={privacyHref} target="_blank">
                  {copy.privacy}
                </Link>
                .
              </>
            )}
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button className="btn btn-secondary" onClick={rejectCookies}>
            {copy.reject}
          </button>
          <button className="btn btn-primary" onClick={acceptCookies}>
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
