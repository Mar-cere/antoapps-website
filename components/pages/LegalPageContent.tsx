'use client';

import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import type { LegalPageCopy } from '@/lib/i18n/copy/legal-shared';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import { LegalDocument } from '@/components/legal/LegalDocument';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/privacy.css';

type LegalPageContentProps = {
  locale: Locale;
  copy: LegalPageCopy;
};

export default function LegalPageContent({ locale, copy }: LegalPageContentProps) {
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';
  const nav = getHomeV2Copy(locale).nav;
  const isPrivacy = copy.breadcrumbs.currentLabel.toLowerCase().includes('privacidad') ||
                    copy.breadcrumbs.currentLabel.toLowerCase().includes('privacy');
  const switchPath = isPrivacy ? '/privacidad' : '/terminos';

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="home-v2-shell legal-shell">
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
          ctaAria={nav.ctaAria}
        />
        <main className="home-landing-page home-landing-page--v2 legal-page" lang={locale}>
          <LegalDocument copy={copy} />

        <section className="legal-disclaimer" data-fade-section>
          <div className="container">
            <p className="disclaimer-text reveal-on-scroll">{disclaimer}</p>
          </div>
        </section>
      </main>
      <HomeMinimalFooter locale={locale} switchPath={switchPath} />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
