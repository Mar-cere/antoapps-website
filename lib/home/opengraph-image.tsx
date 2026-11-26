import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export const homeOgImageSize = { width: 1200, height: 630 };
export const homeOgImageContentType = 'image/png';

export function homeOgImageAlt(locale: Locale): string {
  const hero = getHomeV2Copy(locale).hero;
  return `${hero.brand} — ${hero.titleLine1} ${hero.titleAccent}`.replace(/\s+/g, ' ').trim();
}

/** OG home alineado a Anto Nexus esencial (carbón + firma anto). */
export function renderHomeOpenGraphImage(locale: Locale) {
  const { hero, explore } = getHomeV2Copy(locale);
  const trial = getTrialCopy(locale);
  const headline = `${hero.titleLine1} ${hero.titleAccent}`;
  const trustLine = explore.coda.trust.join(' · ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 72px',
          background: '#101216',
          color: '#F4F6FC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.04em',
            color: '#F4F6FC',
            marginBottom: 36,
          }}
        >
          anto
        </span>
        <div
          style={{
            fontSize: 56,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            maxWidth: 980,
            marginBottom: 28,
          }}
        >
          {headline}
        </div>
        <div style={{ fontSize: 26, lineHeight: 1.4, color: 'rgba(244,246,252,0.72)', maxWidth: 860 }}>
          {hero.support}
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 20,
            color: 'rgba(244,246,252,0.55)',
            fontWeight: 500,
          }}
        >
          <span>{trustLine}</span>
          <span>·</span>
          <span>{trial.short}</span>
        </div>
      </div>
    ),
    { ...homeOgImageSize }
  );
}
