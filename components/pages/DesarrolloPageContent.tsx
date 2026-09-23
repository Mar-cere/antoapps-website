'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getDesarrolloPageCopy } from '@/lib/i18n/copy/pages/desarrollo';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/development.css';

type DesarrolloPageContentProps = {
  locale: Locale;
};

const FIGURE_ALT = {
  es: 'Manos con el teléfono abierto a un chat sin respuesta y, al lado, un cuaderno con preguntas escritas a mano',
  en: 'Hands holding a phone open to an unanswered chat, beside a notebook with handwritten questions',
} as const;

export default function DesarrolloPageContent({ locale }: DesarrolloPageContentProps) {
  const copy = getDesarrolloPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.';

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="home-v2-shell development-shell">
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
          ctaAria={nav.ctaAria}
        />
        <main id="main-content" className="home-landing-page home-landing-page--v2 development-page" lang={locale}>
          <header className="development-masthead">
            <div className="home-landing-container development-masthead__grid">
              <div className="development-masthead__copy">
                <h1 className="development-masthead__title">{copy.hero.title}</h1>
                <p className="development-masthead__support">{copy.hero.subtitle}</p>
              </div>
              <figure className="development-masthead__figure">
                <div className="development-masthead__frame">
                  <Image
                    src={getEditorialImagePath('thoughtLoop')}
                    alt={FIGURE_ALT[locale]}
                    width={1536}
                    height={1024}
                    className="development-masthead__img"
                    sizes="(max-width: 959px) 100vw, 34rem"
                    priority
                  />
                </div>
              </figure>
            </div>
          </header>

        <section className="tech-stack-section tech-stack-section--featured" data-fade-section>
          <div className="container">
            <div className="tech-stack">
              <h2 className="section-title">{copy.techStack.title}</h2>
              <p className="tech-stack-intro">{copy.techStack.intro}</p>
              <pre className="development-stack-line" aria-label={copy.hero.stackLine}>
                <code>{copy.hero.stackLine}</code>
              </pre>
              <div className="tech-grid tech-grid--detailed" data-stagger>
                {copy.techStack.categories.map((category) => (
                  <div key={category.title} className="tech-category reveal-on-scroll" data-stagger-item>
                    <h3>
                      <span className="tech-category-icon" aria-hidden="true">
                        {category.icon}
                      </span>
                      {category.title}
                    </h3>
                    <ul className="tech-item-list">
                      {category.items.map((item) => (
                        <li key={item.name} className="tech-item-row">
                          <span className="tech-item-name">{item.name}</span>
                          <span className="tech-item-spec">{item.spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="development-overview" data-fade-section>
          <div className="container">
            <div className="development-intro">
              <h2 className="section-title reveal-on-scroll">{copy.architecture.sectionTitle}</h2>
              <p className="reveal-on-scroll">{copy.architecture.intro}</p>
            </div>

            <div className="architecture-diagram" data-stagger>
              {copy.architecture.layers.map((layer) => (
                <div key={layer.title} className="arch-layer reveal-on-scroll" data-stagger-item>
                  <div className="arch-icon">{layer.icon}</div>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <div className="tech-tags">
                    {layer.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="challenges-section" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.challenges.sectionTitle}</h2>

            <div className="challenges-grid" data-stagger>
              {copy.challenges.items.map((item) => (
                <div key={item.title} className="challenge-card reveal-on-scroll" data-stagger-item>
                  <div className="challenge-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>
                    <strong>{copy.challenges.challengeLabel}</strong> {item.challenge}
                  </p>
                  <p>
                    <strong>{copy.challenges.solutionLabel}</strong> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="development-process" data-fade-section>
          <div className="container">
            <h2 className="section-title reveal-on-scroll">{copy.process.sectionTitle}</h2>
            <p className="section-subtitle reveal-on-scroll">{copy.process.sectionSubtitle}</p>

            <div className="process-timeline" data-stagger>
              {copy.process.steps.map((step, index) => (
                <div key={step.title} className="timeline-item reveal-on-scroll" data-stagger-item>
                  <div className="timeline-number">{index + 1}</div>
                  <div className="timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <ul className="timeline-details">
                      {step.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="developer-info" data-fade-section>
          <div className="container">
            <div className="developer-card">
              <div className="developer-header">
                <div className="developer-avatar">👨‍💻</div>
                <div className="developer-details">
                  <h2 className="reveal-on-scroll">{copy.developer.sectionTitle}</h2>
                  <h3 className="reveal-on-scroll">{copy.developer.name}</h3>
                  <p className="reveal-on-scroll">{copy.developer.bio}</p>
                </div>
              </div>
              <div className="developer-contact">
                <a href={`mailto:${copy.developer.email}`} className="developer-email">
                  <span>📧</span>
                  <span>{copy.developer.email}</span>
                </a>
                <div className="developer-social">
                  <a
                    href={copy.developer.githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={copy.developer.githubAriaLabel}
                  >
                    <span>💻</span>
                    <span>{copy.developer.githubLabel}</span>
                  </a>
                  <a
                    href={copy.developer.linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={copy.developer.linkedinAriaLabel}
                  >
                    <span>🔗</span>
                    <span>{copy.developer.linkedinLabel}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="development-cta" data-fade-section>
          <div className="container">
            <div className="cta-content">
              <h2 className="reveal-on-scroll">{copy.cta.title}</h2>
              <p className="reveal-on-scroll">{copy.cta.description}</p>
              <div className="cta-buttons reveal-on-scroll">
                <Link href={copy.cta.contactHref} className="btn btn-primary btn-large">
                  {copy.cta.contactLabel}
                </Link>
                <a href={copy.cta.emailHref} className="btn btn-secondary btn-large">
                  {copy.cta.emailLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="development-disclaimer" data-fade-section>
          <div className="container">
            <p className="disclaimer-text reveal-on-scroll">{disclaimer}</p>
          </div>
        </section>
      </main>
      <HomeMinimalFooter locale={locale} switchPath="/desarrollo" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
