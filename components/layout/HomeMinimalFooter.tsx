'use client';

import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { localePath, type LegalLocale, type Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeMinimalFooterProps = {
  locale: LegalLocale;
  /** Path lógico sin prefijo /en (p. ej. `/` o `/home-v2`). */
  switchPath?: string;
  developerHref?: string;
  developerLabel?: string;
};

export default function HomeMinimalFooter({
  locale,
  switchPath = '/',
  developerHref,
  developerLabel,
}: HomeMinimalFooterProps) {
  const copyLocale: Locale = locale === 'pt' ? 'es' : locale;
  const copy = getHomeLandingFinalCopy(copyLocale);
  const { minimalFooter } = copy;
  const links =
    locale === 'pt'
      ? minimalFooter.links.map((link) => {
          if (link.href === '/privacidad') return { href: '/pt/privacidad', label: 'Privacidade' };
          if (link.href === '/terminos') return { href: '/pt/terminos', label: 'Termos' };
          return link;
        })
      : minimalFooter.links;
  const homeHref = locale === 'pt' ? '/' : localePath(locale, '/');

  return (
    <footer className="home-landing-footer" role="contentinfo">
      <div className="home-landing-footer__inner">
        <Link
          href={homeHref}
          className="home-landing-footer__brand"
          aria-label={locale === 'pt' ? 'Anto - Ir ao início' : copy.minimalNav.logoAria}
        >
          <span className="home-landing-footer__icon" aria-hidden="true">
            <Image
              src="/assets/images/brand/anto-icon-loop.png"
              alt=""
              width={28}
              height={28}
              className="home-landing-footer__logo"
            />
          </span>
          <span className="home-landing-footer__name">anto.</span>
        </Link>
        <nav
          className="home-landing-footer__links"
          aria-label={locale === 'pt' ? 'Links do site' : minimalFooter.linksAria}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="home-landing-footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} path={switchPath} className="home-landing-footer__lang" />
        <p className="home-landing-footer__copy">
          {locale === 'pt' ? '© 2026 Anto · Feito com cuidado no Chile' : minimalFooter.copyright}
        </p>
      </div>
      {developerHref && developerLabel ? (
        <Link href={developerHref} className="home-landing-footer__dev">
          {developerLabel}
        </Link>
      ) : null}
    </footer>
  );
}
