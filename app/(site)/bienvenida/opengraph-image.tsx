import { ImageResponse } from 'next/og';
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export const runtime = 'edge';
export const alt = 'Anto — Calma mental en minutos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function BienvenidaOpenGraphImage() {
  const copy = getBienvenidaCopy('es');
  const trial = getTrialCopy('es');

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
          background: 'linear-gradient(145deg, #030a24 0%, #0d2240 55%, #13407e 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            🧠
          </div>
          <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.03em' }}>Anto</span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            maxWidth: 920,
            marginBottom: 28,
          }}
        >
          Apoyo emocional con IA cuando tu mente no para
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: 'rgba(255,255,255,0.82)', maxWidth: 860 }}>
          {copy.meta.ogSubline}
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 20,
            color: '#1adddb',
            fontWeight: 600,
          }}
        >
          <span>Basado en evidencia clínica</span>
          <span>·</span>
          <span>{trial.short}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
