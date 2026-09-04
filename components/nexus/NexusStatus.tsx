'use client';

import { useEffect, useRef } from 'react';
import type { NexusPageCopy } from '@/lib/i18n/copy/pages/nexus';

type NexusStatusProps = {
  copy: NexusPageCopy['status'];
};

export default function NexusStatus({ copy }: NexusStatusProps) {
  const pathRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const line = pathRef.current;
    if (!line) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = 54;
    const height = 14;
    const samples = 28;

    const draw = (time: number) => {
      const points: string[] = [];
      for (let i = 0; i < samples; i += 1) {
        const x = (i / (samples - 1)) * width;
        const t = reduced ? 1.2 : time * 0.0022;
        const along = i / (samples - 1);
        const packet = (t * 0.34) % 1;
        let span = Math.abs(along - packet);
        span = Math.min(span, 1 - span);
        const current = Math.exp(-span * span * 56);
        const y =
          height / 2 +
          Math.sin(i * 0.62 + t * 2.6) * 3.6 +
          Math.sin(i * 1.15 + t * 4.1) * 1.7 +
          current * 3.1;
        points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
      }
      line.setAttribute('points', points.join(' '));
    };

    draw(1200);
    if (reduced) {
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      draw(now);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="nexus-status" role="status" aria-label={copy.liveAria}>
      <span className="nexus-status__dot" aria-hidden="true" />
      <span>{copy.active}</span>
      <span className="nexus-status__rule" aria-hidden="true" />
      <span>{copy.thinking}</span>
      <svg className="nexus-status__wave" viewBox="0 0 54 14" aria-hidden="true">
        <polyline
          ref={pathRef}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
      </svg>
    </div>
  );
}
