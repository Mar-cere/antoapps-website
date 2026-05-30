'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getContactPageCopy } from '@/lib/i18n/copy/contact';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/forms/ContactForm';
import '@/styles/components/contact.css';

type ContactPageContentProps = {
  locale: Locale;
};

export default function ContactPageContent({ locale }: ContactPageContentProps) {
  const copy = getContactPageCopy(locale);

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

        <section className="contact-hero">
          <div className="container">
            <h1 className="contact-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="contact-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
          </div>
        </section>

        <section className="contact-section" data-fade-section>
          <div className="container">
            <div className="contact-grid">
              <div className="contact-form-container">
                <h2 className="section-title reveal-on-scroll">{copy.formSection.title}</h2>
                <ContactForm copy={copy.formSection.form} locale={locale} />
              </div>

              <div className="contact-info reveal-on-scroll">
                <h2 className="section-title">{copy.contactInfo.title}</h2>

                <div className="contact-methods">
                  {copy.contactInfo.methods.map((method) => (
                    <div key={method.title} className="contact-method">
                      <div className="contact-icon">{method.icon}</div>
                      <h3>{method.title}</h3>
                      <p>{method.description}</p>
                      {method.email && (
                        <a href={`mailto:${method.email}`}>{method.email}</a>
                      )}
                      {method.githubLinks && (
                        <div className="developer-github-links">
                          {method.githubLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="contact-social">
                  <h3>{copy.social.title}</h3>
                  <div className="social-links">
                    {copy.social.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link href="#contactForm" className="quick-contact-cta" aria-label={copy.quickCtaAria}>
        <div className="quick-contact-btn">💬</div>
      </Link>

      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
