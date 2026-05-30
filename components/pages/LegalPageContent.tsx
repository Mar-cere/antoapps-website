'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import type { LegalPageCopy } from '@/lib/i18n/copy/legal-shared';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LegalDocument } from '@/components/legal/LegalDocument';
import '@/styles/components/privacy.css';

type LegalPageContentProps = {
  locale: Locale;
  copy: LegalPageCopy;
};

export default function LegalPageContent({ locale, copy }: LegalPageContentProps) {
  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main className="legal-page" lang={locale}>
        <Breadcrumbs
          items={[
            { label: copy.breadcrumbs.homeLabel, href: copy.breadcrumbs.homeHref },
            { label: copy.breadcrumbs.currentLabel },
          ]}
        />
        <LegalDocument copy={copy} />
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
