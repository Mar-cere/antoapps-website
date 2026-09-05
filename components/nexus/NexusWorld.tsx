'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { NexusActiveBeat, NexusBeatId, NexusPageCopy } from '@/lib/i18n/copy/pages/nexus';
import { NEXUS_CONSTELLATION_PLATE, NEXUS_CONSTELLATION_PLATE_PNG } from '@/lib/nexus/field';
import NexusEventMark from '@/components/nexus/NexusEventMark';

const NexusOrganism = dynamic(() => import('@/components/nexus/NexusOrganism'), {
  ssr: false,
  loading: () => (
    <div className="nexus-organism">
      <div className="nexus-organism__field" aria-hidden="true">
        <picture>
          <source srcSet={NEXUS_CONSTELLATION_PLATE} type="image/webp" />
          <img className="nexus-organism__plate" src={NEXUS_CONSTELLATION_PLATE_PNG} alt="" />
        </picture>
      </div>
    </div>
  ),
});

type NexusWorldProps = {
  copy: NexusPageCopy;
};

const SEQUENCE_BEATS: readonly NexusBeatId[] = ['memory', 'pattern', 'strategy'];

export default function NexusWorld({ copy }: NexusWorldProps) {
  const [activeBeat, setActiveBeat] = useState<NexusActiveBeat>('hero');
  const [released, setReleased] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const beatRefs = useRef<Partial<Record<NexusBeatId, HTMLElement | null>>>({});
  const afterRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items: { id: NexusActiveBeat; el: HTMLElement }[] = [];
    if (heroRef.current) {
      items.push({ id: 'hero', el: heroRef.current });
    }
    for (const id of SEQUENCE_BEATS) {
      const el = beatRefs.current[id];
      if (el) {
        items.push({ id, el });
      }
    }
    if (afterRef.current) {
      items.push({ id: 'after', el: afterRef.current });
    }

    const visible = new Set<NexusActiveBeat>();
    const pick = () => {
      const targetY = window.innerHeight * 0.32;
      let containing: NexusActiveBeat | null = null;
      let best: NexusActiveBeat = 'hero';
      let bestDist = Number.POSITIVE_INFINITY;
      let found = false;
      for (const { id, el } of items) {
        if (!visible.has(id)) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetY && rect.bottom >= targetY) {
          containing = id;
        }
        const dist = Math.abs(rect.top + Math.min(rect.height * 0.18, 72) - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
          found = true;
        }
      }
      const next = containing ?? (found ? best : null);
      if (next) {
        setActiveBeat((prev) => (prev === next ? prev : next));
      }
      const end = endRef.current;
      if (end) {
        const gonePast = end.getBoundingClientRect().bottom < window.innerHeight * 0.38;
        setReleased((prev) => (prev === gonePast ? prev : gonePast));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-nexus-beat') as NexusActiveBeat | null;
          if (!id) {
            continue;
          }
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }
        pick();
      },
      { threshold: [0.08, 0.2, 0.35, 0.5, 0.7] }
    );

    for (const { el } of items) {
      io.observe(el);
    }
    if (endRef.current) {
      io.observe(endRef.current);
    }

    return () => io.disconnect();
  }, []);

  return (
    <div className={`nexus-world${released ? ' is-released' : ''}`} data-beat={activeBeat}>
      <div className="nexus-stage">
        <NexusOrganism events={copy.events} label={copy.organismAria} activeBeat={activeBeat} />
      </div>
      <section
        ref={heroRef}
        className="nexus-hero"
        data-nexus-beat="hero"
        aria-labelledby="nexus-title"
      >
        <div className="nexus-copy">
          <p className="nexus-eyebrow">{copy.hero.eyebrow}</p>
          <h1 id="nexus-title" className="nexus-title">
            <span className="nexus-title__line">{copy.hero.line1}</span>
            <span className="nexus-title__line">{copy.hero.line2}</span>
            <span className="nexus-title__line">
              {copy.hero.line3Prefix}
              <span className="nexus-highlight">{copy.hero.highlight}</span>
            </span>
          </h1>
          <p className="nexus-support">
            {copy.hero.supportLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </section>
      <section className="nexus-sequence" aria-label={copy.sequence.aria}>
        {copy.sequence.beats.map((beat) => (
          <article
            key={beat.id}
            ref={(el) => {
              beatRefs.current[beat.id] = el;
            }}
            className="nexus-beat"
            data-nexus-beat={beat.id}
            data-event={beat.id}
            aria-labelledby={`nexus-beat-${beat.id}`}
          >
            <div className="nexus-beat__copy">
              <p className="nexus-beat__mark" aria-hidden="true">
                <NexusEventMark id={beat.id} className="nexus-beat__icon" />
              </p>
              <h2 id={`nexus-beat-${beat.id}`} className="nexus-beat__title">
                {beat.title}
              </h2>
              <p className="nexus-beat__body">{beat.body}</p>
            </div>
          </article>
        ))}
        <div ref={afterRef} className="nexus-bridge" data-nexus-beat="after">
          <div className="nexus-bridge__copy">
            <p className="nexus-bridge__lead">{copy.bridge.lead}</p>
            <p className="nexus-bridge__promise">{copy.bridge.promise}</p>
          </div>
        </div>
        <div ref={endRef} className="nexus-world__end" aria-hidden="true" />
      </section>
    </div>
  );
}
