'use client';

import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { localePath, type Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeMinimalFooterProps = {
  locale: Locale;
};

export default function HomeMinimalFooter({ locale }: HomeMinimalFooterProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const { minimalFooter } = copy;
  const homeHref = localePath(locale, '/');

  return (
    <footer className="home-landing-footer" role="contentinfo">
      <div className="home-landing-footer__inner">
        <Link href={homeHref} className="home-landing-footer__brand" aria-label={copy.minimalNav.logoAria}>
          <span className="home-landing-footer__icon" aria-hidden="true">
            <Image
              src="/assets/images/antoIcon.png"
              alt=""
              width={28}
              height={28}
              className="home-landing-footer__logo"
            />
          </span>
          <span className="home-landing-footer__name">Anto</span>
        </Link>
        <nav className="home-landing-footer__links" aria-label={minimalFooter.linksAria}>
          {minimalFooter.links.map((link) => (
            <Link key={link.href} href={link.href} className="home-landing-footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} path="/" className="home-landing-footer__lang" />
        <p className="home-landing-footer__copy">{minimalFooter.copyright}</p>
      </div>
    </footer>
  );
}
