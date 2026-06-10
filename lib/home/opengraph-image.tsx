import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export const homeOgImageSize = { width: 1200, height: 630 };
export const homeOgImageContentType = 'image/png';

export function homeOgImageAlt(locale: Locale): string {
  const copy = getHomeLandingFinalCopy(locale);
  const accent = copy.hero.titleAccent.replace(/\.$/, '').trim();
  return locale === 'en'
    ? `Anto — A place for your mind to ${accent}`
    : `Anto — Tu mente tiene un lugar donde ${accent}`;
}

export function renderHomeOpenGraphImage(locale: Locale) {
  const copy = getHomeLandingFinalCopy(locale);
  const trial = getTrialCopy(locale);
  const hero = copy.hero;
  const headline = `${hero.titleLine1} ${hero.titleLine2}`;
  const accent = hero.titleAccent;
  const trustLine =
    locale === 'en'
      ? '8 clinical protocols · PHQ-9/GAD-7 · Crisis detection'
      : '8 protocolos clínicos · PHQ-9/GAD-7 · Detección de crisis';

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
            'radial-gradient(ellipse 90% 70% at 80% 0%, rgba(91,143,255,0.35) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(167,139,250,0.2) 0%, transparent 50%), linear-gradient(160deg, #050d1f 0%, #0a1835 55%, #050d1f 100%)',
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
              background: 'rgba(91,143,255,0.18)',
              border: '1px solid rgba(127,166,255,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#7fa6ff',
            }}
          >
            A
          </div>
          <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Anto</span>
          <span
            style={{
              marginLeft: 12,
              fontSize: 18,
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 500,
            }}
          >
            {hero.kicker}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {headline}{' '}
            <span style={{ color: '#7fa6ff' }}>{accent}</span>
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 900,
            }}
          >
            {hero.subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 600,
            color: '#7fa6ff',
          }}
        >
          <span>{trustLine}</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
          <span>{trial.short}</span>
        </div>
      </div>
    ),
    { ...homeOgImageSize }
  );
}
