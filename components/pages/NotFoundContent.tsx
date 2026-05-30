'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LocaleProvider } from '@/lib/i18n/context';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import { getNotFoundCopy } from '@/lib/i18n/copy/not-found';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';

export default function NotFoundContent() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? '/');
  const copy = getNotFoundCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main lang={locale}>
        <section className="error-page">
          <div className="container">
            <div className="error-404-inner">
              <div className="error-404-code">404</div>
              <h1 className="error-404-title">{copy.title}</h1>
              <p className="error-404-lead">{copy.lead}</p>
              <div className="error-404-actions">
                <Link href={copy.homeHref} className="btn btn-primary btn-large">
                  {copy.homeLabel}
                </Link>
                <Link href={copy.downloadHref} className="btn btn-secondary btn-large">
                  {copy.downloadLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
