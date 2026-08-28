import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n/config';
import { getNexusPageCopy } from '@/lib/i18n/copy/pages/nexus';

export const NEXUS_OG_SIZE = { width: 1200, height: 630 };
export const NEXUS_OG_CONTENT_TYPE = 'image/png';

export function nexusOpenGraphImage(locale: Locale) {
  const copy = getNexusPageCopy(locale);
  const headline = `${copy.hero.line1} ${copy.hero.line2} ${copy.hero.line3Prefix}${copy.hero.highlight}`;

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
          background: '#02040C',
          color: '#f4f7fb',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.04em', color: '#ffffff' }}>
            anto.
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(244,247,251,0.55)',
            }}
          >
            {copy.hero.eyebrow}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 780 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 22, lineHeight: 1.45, color: 'rgba(244,247,251,0.62)', maxWidth: 640 }}>
            {copy.hero.supportLines.join(' ')}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 18,
            color: '#22D3EE',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: '#22D3EE',
            }}
          />
          <span>{copy.status.active}</span>
        </div>
      </div>
    ),
    { ...NEXUS_OG_SIZE }
  );
}
