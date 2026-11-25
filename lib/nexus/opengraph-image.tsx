import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n/config';
import { getNexusPageCopy } from '@/lib/i18n/copy/pages/nexus';

export const NEXUS_OG_SIZE = { width: 1200, height: 630 };
export const NEXUS_OG_CONTENT_TYPE = 'image/png';

export function nexusOpenGraphImage(locale: Locale) {
  const copy = getNexusPageCopy(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#101216',
          color: '#F4F6FC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em', color: '#F4F6FC' }}>
          anto
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 780 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
            }}
          >
            {copy.hero.title}
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.45, color: 'rgba(244,246,252,0.72)', maxWidth: 640 }}>
            {copy.hero.dek}
          </div>
        </div>
      </div>
    ),
    { ...NEXUS_OG_SIZE }
  );
}
