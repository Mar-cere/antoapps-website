'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { htmlLanguage, localePath } from '@/lib/i18n/config';
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
import '@/styles/components/development-readability.css';

type DesarrolloPageContentProps = {
  locale: Locale;
};

const FIGURE_ALT = {
  es: 'Manos con el teléfono abierto a un chat sin respuesta y, al lado, un cuaderno con preguntas escritas a mano',
  en: 'Hands holding a phone open to an unanswered chat, beside a notebook with handwritten questions',
  pt: 'Mãos com o celular aberto num chat sem resposta e, ao lado, um caderno com perguntas escritas à mão',
} as const;

const iconStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function LineIcon({ glyph }: { glyph: string }) {
  let body: ReactNode = null;
  switch (glyph) {
    case '📱':
      body = (
        <>
          <rect x="7" y="2.5" width="10" height="19" rx="2" {...iconStroke} />
          <path d="M11 18.5h2" {...iconStroke} />
        </>
      );
      break;
    case '🌐':
      body = (
        <>
          <circle cx="12" cy="12" r="9" {...iconStroke} />
          <path d="M3 12h18M12 3c2.4 2.6 2.4 15.4 0 18M12 3c-2.4 2.6-2.4 15.4 0 18" {...iconStroke} />
        </>
      );
      break;
    case '⚙️':
      body = (
        <>
          <circle cx="12" cy="12" r="3" {...iconStroke} />
          <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" {...iconStroke} />
        </>
      );
      break;
    case '🤖':
      body = (
        <>
          <rect x="7" y="7" width="10" height="10" rx="2" {...iconStroke} />
          <path d="M12 3.5V7M12 17v3.5M3.5 12H7M17 12h3.5M9.5 12h5" {...iconStroke} />
        </>
      );
      break;
    case '💾':
      body = (
        <>
          <ellipse cx="12" cy="7" rx="7" ry="3" {...iconStroke} />
          <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" {...iconStroke} />
        </>
      );
      break;
    case '⚡':
      body = <path d="M13 3 6 13h5l-1 8 8-11h-5l0-7z" {...iconStroke} />;
      break;
    case '🔒':
      body = (
        <>
          <rect x="5" y="10" width="14" height="10" rx="2" {...iconStroke} />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" {...iconStroke} />
        </>
      );
      break;
    case '🚀':
      body = (
        <>
          <path d="M4 15v4h16v-4" {...iconStroke} />
          <path d="M12 15V4M8 8l4-4 4 4" {...iconStroke} />
        </>
      );
      break;
    case '📊':
      body = (
        <>
          <path d="M4 19h16" {...iconStroke} />
          <path d="M7 16v-5M12 16V8M17 16v-8" {...iconStroke} />
        </>
      );
      break;
    case '🎨':
      body = (
        <>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" {...iconStroke} />
          <path d="M3.5 9h17" {...iconStroke} />
        </>
      );
      break;
    case '👨‍💻':
      body = (
        <>
          <circle cx="12" cy="8" r="3.2" {...iconStroke} />
          <path d="M5.5 19.2c1.2-3 3.4-4.4 6.5-4.4s5.3 1.4 6.5 4.4" {...iconStroke} />
        </>
      );
      break;
    case '📧':
      body = (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" {...iconStroke} />
          <path d="M4 7.5 12 13l8-5.5" {...iconStroke} />
        </>
      );
      break;
    case '💻':
      body = <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" {...iconStroke} />;
      break;
    case '🔗':
      body = (
        <>
          <path d="M10 13a5 5 0 0 0 7.1.7l1.8-1.8a5 5 0 0 0-7.1-7.1L10.5 6" {...iconStroke} />
          <path d="M14 11a5 5 0 0 0-7.1-.7l-1.8 1.8a5 5 0 0 0 7.1 7.1L13.5 18" {...iconStroke} />
        </>
      );
      break;
    default:
      return null;
  }

  return (
    <svg viewBox="0 0 24 24" className="dev-line-icon" aria-hidden="true">
      {body}
    </svg>
  );
}

export default function DesarrolloPageContent({ locale }: DesarrolloPageContentProps) {
  const copy = getDesarrolloPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;
  const disclaimer =
    locale === 'en'
      ? 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.'
      : locale === 'pt'
        ? 'A Anto não substitui terapia nem atendimento clínico profissional. Se você estiver em crise, procure ajuda de emergência no seu país.'
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
        <main id="main-content" className="home-landing-page home-landing-page--v2 development-page" lang={htmlLanguage(locale)}>
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
                        <LineIcon glyph={category.icon} />
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
                  <div className="arch-icon" aria-hidden="true">
                    <LineIcon glyph={layer.icon} />
                  </div>
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
                  <div className="challenge-icon" aria-hidden="true">
                    <LineIcon glyph={item.icon} />
                  </div>
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
                <div className="developer-avatar" aria-hidden="true">
                  <LineIcon glyph="👨‍💻" />
                </div>
                <div className="developer-details">
                  <h2 className="reveal-on-scroll">{copy.developer.sectionTitle}</h2>
                  <h3 className="reveal-on-scroll">{copy.developer.name}</h3>
                  <p className="reveal-on-scroll">{copy.developer.bio}</p>
                </div>
              </div>
              <div className="developer-contact">
                <a href={`mailto:${copy.developer.email}`} className="developer-email">
                  <LineIcon glyph="📧" />
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
                    <LineIcon glyph="💻" />
                    <span>{copy.developer.githubLabel}</span>
                  </a>
                  <a
                    href={copy.developer.linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={copy.developer.linkedinAriaLabel}
                  >
                    <LineIcon glyph="🔗" />
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
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
      </div>
    </LocaleProvider>
  );
}
