import { ImageResponse } from 'next/og';
import type { Locale } from '@/lib/i18n/config';
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export const BIENVENIDA_OG_SIZE = { width: 1200, height: 630 };
export const BIENVENIDA_OG_CONTENT_TYPE = 'image/png';

const platformLine: Record<Locale, string> = {
  es: 'App para iPhone y Android',
  en: 'iPhone and Android app',
  pt: 'App para iPhone e Android',
};

export function bienvenidaOgImageAlt(locale: Locale): string {
  return getBienvenidaCopy(locale).meta.ogAlt;
}

/** OG de /bienvenida alineado a Anto Nexus esencial (carbón + firma anto). */
export function bienvenidaOpenGraphImage(locale: Locale) {
  const copy = getBienvenidaCopy(locale);
  const trial = getTrialCopy(locale);

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
            fontSize: 52,
            fontWeight: 500,
            lineHeight: 1.12,
            letterSpacing: '-0.035em',
            maxWidth: 920,
            marginBottom: 28,
          }}
        >
          {copy.meta.ogHeadline}
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.4, color: 'rgba(244,246,252,0.72)', maxWidth: 860 }}>
          {copy.meta.ogSubline}
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
          <span>{platformLine[locale]}</span>
          <span>·</span>
          <span>{trial.short}</span>
        </div>
      </div>
    ),
    { ...BIENVENIDA_OG_SIZE }
  );
}
