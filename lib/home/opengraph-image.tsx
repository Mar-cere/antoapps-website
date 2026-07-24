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

/** OG home alineado a la voz editorial publicada (home-v2). */
export function renderHomeOpenGraphImage(locale: Locale) {
  const { hero, foundation } = getHomeV2Copy(locale);
  const trial = getTrialCopy(locale);
  const headline = `${hero.titleLine1} ${hero.titleAccent}`;
  const trustLine = foundation.proofSignals
    .map((signal) => `${signal.value} ${signal.label}`)
    .join(' · ');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background:
            'radial-gradient(ellipse 80% 60% at 85% 10%, rgba(26,221,219,0.22) 0%, transparent 55%), linear-gradient(165deg, #030a24 0%, #071433 50%, #030a24 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(26,221,219,0.16)',
              border: '1px solid rgba(26,221,219,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#1adddb',
            }}
          >
            A
          </div>
          <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Anto</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 860,
            }}
          >
            {hero.support}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            fontSize: 18,
            fontWeight: 500,
            color: '#1adddb',
          }}
        >
          <span>{trustLine}</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
          <span style={{ color: 'rgba(255,255,255,0.88)' }}>{trial.short}</span>
        </div>
      </div>
    ),
    { ...homeOgImageSize }
  );
}
