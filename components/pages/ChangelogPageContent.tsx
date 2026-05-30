'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import {
  getChangelogPageCopy,
  type ChangelogChangeType,
  type ChangelogVersionStatus,
} from '@/lib/i18n/copy/pages/changelog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/changelog.css';

type ChangelogPageContentProps = {
  locale: Locale;
};

function getChangeIcon(type: ChangelogChangeType): string {
  const icons: Record<ChangelogChangeType, string> = {
    feature: '✨',
    improvement: '⚡',
    fix: '🐛',
    security: '🔒',
    breaking: '⚠️',
  };
  return icons[type];
}

function getStatusLabel(
  status: ChangelogVersionStatus | undefined,
  labels: ReturnType<typeof getChangelogPageCopy>['versionLabels'],
): string | null {
  if (status === 'current') return labels.statusCurrent;
  if (status === 'stable') return labels.statusStable;
  if (status === 'beta') return labels.statusBeta;
  if (status === 'deprecated') return labels.statusDeprecated;
  return null;
}

export default function ChangelogPageContent({ locale }: ChangelogPageContentProps) {
  const copy = getChangelogPageCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main id="main-content" role="main" className="changelog-page" lang={locale}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: copy.breadcrumbs.homeLabel, href: copy.breadcrumbs.homeHref },
              { label: copy.breadcrumbs.currentLabel },
            ]}
          />

          <div className="changelog-container">
            <div className="changelog-header">
              <h1 className="changelog-title">{copy.header.title}</h1>
              <p className="changelog-subtitle">{copy.header.subtitle}</p>
              <div className="changelog-status-note">
                <span className="status-badge status-badge-current-banner">
                  {copy.header.storeVersionBadge}
                </span>
                <p className="status-text">
                  {copy.header.statusNoteBefore}{' '}
                  <a
                    href={copy.header.repoLinkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy.header.repoLinkLabel}
                  </a>
                  {copy.header.statusNoteAfter}
                </p>
              </div>
            </div>

            <div className="changelog-timeline">
              {copy.versions.map((version, index) => {
                const statusLabel = getStatusLabel(version.status, copy.versionLabels);

                return (
                  <div
                    key={version.version}
                    className={`version-card ${version.status === 'current' ? 'version-current' : ''}`}
                    data-stagger-item
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="version-header">
                      <div className="version-info">
                        <div className="version-number-wrapper">
                          <span className="version-number">{version.version}</span>
                          {statusLabel && version.status && (
                            <span className={`version-badge version-badge-${version.status}`}>
                              {statusLabel}
                            </span>
                          )}
                        </div>
                        <span className="version-date">
                          {new Date(version.date).toLocaleDateString(copy.dateLocale, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {version.highlights && version.highlights.length > 0 && (
                      <div className="version-highlights">
                        <h3 className="highlights-title">{copy.versionLabels.highlightsTitle}</h3>
                        <ul className="highlights-list">
                          {version.highlights.map((highlight) => (
                            <li key={highlight} className="highlight-item">
                              <span className="highlight-icon">✨</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="version-changes">
                      <h3 className="changes-title">{copy.versionLabels.changesTitle}</h3>
                      <ul className="changes-list">
                        {version.changes.map((change) => (
                          <li key={change.description} className={`change-item change-${change.type}`}>
                            <span className={`change-icon change-icon-${change.type}`}>
                              {getChangeIcon(change.type)}
                            </span>
                            <span className="change-description">{change.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="changelog-footer">
              <p className="changelog-note">
                {copy.footer.textBeforeContact}{' '}
                <Link href={copy.footer.contactHref} className="changelog-link">
                  {copy.footer.contactLinkLabel}
                </Link>{' '}
                {copy.footer.textBetweenLinks}{' '}
                <a
                  href={copy.footer.githubLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="changelog-link"
                >
                  {copy.footer.githubLinkLabel}
                </a>{' '}
                {copy.footer.textAfterGithub}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
