'use client';

import { useEffect, useId, useRef, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import '@/styles/layout/header.css';

type HeaderDownloadChooserProps = {
  locale: Locale;
  downloadLabel: string;
  downloadAria: string;
  appStoreLabel: string;
  playLabel: string;
  appStoreAria: string;
  playAria: string;
  toggleClassName?: string;
  wrapperClassName?: string;
};

export default function HeaderDownloadChooser({
  locale,
  downloadLabel,
  downloadAria,
  appStoreLabel,
  playLabel,
  appStoreAria,
  playAria,
  toggleClassName = 'btn btn-primary nav-download__toggle',
  wrapperClassName,
}: HeaderDownloadChooserProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`nav-download${open ? ' is-open' : ''}${wrapperClassName ? ` ${wrapperClassName}` : ''}`}
      ref={rootRef}
    >
      <button
        type="button"
        className={toggleClassName}
        aria-label={downloadAria}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {downloadLabel}
      </button>
      <div id={menuId} className="nav-download__menu" hidden={!open} role="menu">
        <DownloadLink
          href={appStoreHref()}
          className="nav-download__item"
          role="menuitem"
          trackingPlacement="header_app_store"
          trackingPage="header"
          trackingLabel="header_ios"
          aria-label={appStoreAria}
          onClick={() => setOpen(false)}
        >
          {appStoreLabel}
        </DownloadLink>
        <DownloadLink
          href={googlePlayHref(locale)}
          className="nav-download__item"
          role="menuitem"
          trackingPlacement="header_play_store"
          trackingPage="header"
          trackingLabel="header_android"
          aria-label={playAria}
          onClick={() => setOpen(false)}
        >
          {playLabel}
        </DownloadLink>
      </div>
    </div>
  );
}
