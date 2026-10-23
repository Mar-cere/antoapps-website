'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCookieConsent } from '@/lib/hooks/useCookieConsent';
import { localePath, type Locale } from '@/lib/i18n/config';
import { pathLocaleFromPathname } from '@/lib/i18n/path-from-pathname';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';
import '@/styles/components/cookie-consent.css';

type CookieConsentProps = {
  compact?: boolean;
  bannerDelayMs?: number;
  showAfterScrollPx?: number;
  mobileBannerDelayMs?: number;
  mobileShowAfterScrollPx?: number;
  mobileMaxWidthPx?: number;
};

const cookieCopyPt = {
  title: 'Uso de cookies',
  compact: 'Usamos cookies para análise.',
  full: 'Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar o conteúdo. Ao clicar em "Aceitar", você concorda com o uso de cookies de acordo com nossa',
  privacy: 'Política de Privacidade',
  reject: 'Recusar',
  accept: 'Aceitar',
};

function resolveLocale(pathname: string): Locale {
  const locale = pathLocaleFromPathname(pathname);
  return locale === 'pt' ? 'es' : locale;
}

export default function CookieConsent({
  compact = false,
  bannerDelayMs,
  showAfterScrollPx,
  mobileBannerDelayMs,
  mobileShowAfterScrollPx,
  mobileMaxWidthPx,
}: CookieConsentProps) {
  const pathname = usePathname() ?? '';
  const pathLocale = pathLocaleFromPathname(pathname);
  const locale = resolveLocale(pathname);
  const copy = pathLocale === 'pt' ? cookieCopyPt : getSiteLayoutCopy(locale).cookies;
  const privacyHref = pathLocale === 'pt' ? '/pt/privacidad' : localePath(locale, '/privacidad');

  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent({
    bannerDelayMs,
    showAfterScrollPx,
    mobileBannerDelayMs,
    mobileShowAfterScrollPx,
    mobileMaxWidthPx,
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
