'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getCompararPageCopy } from '@/lib/i18n/copy/comparar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/comparison.css';

type CompararPageContentProps = {
  locale: Locale;
};

export default function CompararPageContent({ locale }: CompararPageContentProps) {
  const copy = getCompararPageCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main lang={locale}>
        <Breadcrumbs
          items={[
            { label: copy.breadcrumbs.homeLabel, href: copy.breadcrumbs.homeHref },
            { label: copy.breadcrumbs.currentLabel },
          ]}
        />

        <section className="comparison-hero" data-fade-section>
          <div className="container container--narrow">
            <h1 className="comparison-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="comparison-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="comparison-section" data-fade-section>
          <div className="container container--narrow">
            <p className="comparison-intro reveal-on-scroll">{copy.intro}</p>
          </div>
        </section>

        <section
          className="comparison-section comparison-section--table"
          data-fade-section
          aria-label={copy.table.caption}
        >
          <div className="container">
            <div className="comparison-table-wrapper reveal-on-scroll">
              <table className="comparison-table">
                <caption className="comparison-table-caption">{copy.table.caption}</caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.table.colDimension}</th>
                    <th scope="col" className="comparison-anto-col">
                      {copy.table.colAnto}
                    </th>
                    <th scope="col">{copy.table.colOthers}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.table.rows.map((row) => (
                    <tr key={row.dimension}>
                      <th scope="row">{row.dimension}</th>
                      <td className="comparison-anto-col">{row.anto}</td>
                      <td>{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section
          className="comparison-section comparison-section--diff"
          data-fade-section
          aria-labelledby="comparison-diff-title"
        >
          <div className="container container--narrow">
            <h2 id="comparison-diff-title" className="comparison-diff-title reveal-on-scroll">
              {copy.differentiators.title}
            </h2>
            <ul className="comparison-diff-list">
              {copy.differentiators.items.map((item) => (
                <li key={item.title} className="comparison-diff-item reveal-on-scroll">
                  <h3 className="comparison-diff-item-title">{item.title}</h3>
                  <p className="comparison-diff-item-text">{item.description}</p>
                </li>
              ))}
            </ul>
            <p className="comparison-note reveal-on-scroll">{copy.note}</p>
          </div>
        </section>

        <section className="comparison-cta" data-fade-section>
          <div className="container">
            <div className="cta-content">
              <h2 className="reveal-on-scroll">{copy.cta.title}</h2>
              <p className="reveal-on-scroll">{copy.cta.subtitle}</p>
              <div className="cta-buttons reveal-on-scroll">
                <Link href={copy.cta.downloadHref} className="btn btn-primary btn-large">
                  {copy.cta.downloadLabel}
                </Link>
                <Link href={copy.cta.secondaryHref} className="btn btn-secondary btn-large">
                  {copy.cta.secondaryLabel}
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
