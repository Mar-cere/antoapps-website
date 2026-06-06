'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import { isAppStoreUrl } from '@/lib/download-links';

type AppStoreQrProps = {
  storeHref: string;
  label: string;
  hint: string;
  fallbackLink: string;
};

type QrStatus = 'loading' | 'ready' | 'failed';

export default function AppStoreQr({
  storeHref,
  label,
  hint,
  fallbackLink,
}: AppStoreQrProps) {
  const [status, setStatus] = useState<QrStatus>('loading');
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isAppStoreUrl(storeHref)) {
      setStatus('failed');
      setDataUrl(null);
      return;
    }

    let cancelled = false;
    setStatus('loading');

    import('qrcode')
      .then((QRCode) =>
        QRCode.toDataURL(storeHref, {
          width: 160,
          margin: 1,
          color: { dark: '#030a24', light: '#ffffff' },
          errorCorrectionLevel: 'M',
        })
      )
      .then((url) => {
        if (cancelled) return;
        setDataUrl(url);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setDataUrl(null);
        setStatus('failed');
      });

    return () => {
      cancelled = true;
    };
  }, [storeHref]);

  return (
    <div className="lad-desktop-qr" aria-label={label}>
      {status === 'ready' && dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dataUrl}
          alt=""
          width={160}
          height={160}
          className="lad-desktop-qr-image"
          decoding="async"
        />
      ) : (
        <div
          className={`lad-desktop-qr-placeholder ${
            status === 'failed' ? 'lad-desktop-qr-placeholder--failed' : ''
          }`}
          aria-hidden="true"
        />
      )}
      <p className="lad-desktop-qr-hint">{hint}</p>
      {status === 'failed' && (
        <p className="lad-desktop-qr-fallback">
          <DownloadLink
            href={storeHref}
            className="lad-desktop-qr-fallback-link"
            trackingPlacement="bienvenida_desktop_qr_fallback"
            trackingLabel="desktop_qr_fallback"
          >
            {fallbackLink}
          </DownloadLink>
        </p>
      )}
    </div>
  );
}
