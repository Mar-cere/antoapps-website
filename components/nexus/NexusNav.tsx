'use client';

import { useState } from 'react';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import type { NexusPageCopy } from '@/lib/i18n/copy/pages/nexus';

type NexusNavProps = {
  locale: Locale;
  copy: NexusPageCopy['nav'];
};

export default function NexusNav({ locale, copy }: NexusNavProps) {
  const [open, setOpen] = useState(false);
  const homeHref = localePath(locale, '/');

  return (
    <header className="nexus-nav">
      <nav className="nexus-nav__inner" aria-label={copy.aria}>
        <Link href={homeHref} className="nexus-nav__brand" aria-label={copy.logoAria}>
          {copy.wordmark}
        </Link>
        <div id="nexus-nav-links" className={`nexus-nav__links${open ? ' is-open' : ''}`}>
          {copy.items.map((item) => (
            <Link key={item.href} href={item.href} className="nexus-nav__link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="nexus-nav__end">
          <button
            type="button"
            className="nexus-nav__toggle"
            aria-expanded={open}
            aria-controls="nexus-nav-links"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? copy.menuClose : copy.menuLabel}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5h12M3 9h12M3 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
          <Link href={copy.ctaHref} className="nexus-nav__cta">
            {copy.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
