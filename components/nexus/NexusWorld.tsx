'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { NexusActiveBeat, NexusPageCopy } from '@/lib/i18n/copy/pages/nexus';
import { NEXUS_CONSTELLATION_PLATE, NEXUS_CONSTELLATION_PLATE_PNG } from '@/lib/nexus/field';
import NexusProductProof from '@/components/nexus/NexusProductProof';

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
  locale: Locale;
  copy: NexusPageCopy;
};

export default function NexusWorld({ locale, copy }: NexusWorldProps) {
  const [activeBeat, setActiveBeat] = useState<NexusActiveBeat>('hero');
  const [released, setReleased] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [inviting, setInviting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const productProofRef = useRef<HTMLElement>(null);
  const inviteRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTracking(true);
    const items: { id: NexusActiveBeat; el: HTMLElement }[] = [];
    if (heroRef.current) {
      items.push({ id: 'hero', el: heroRef.current });
    }
    if (productProofRef.current) {
      items.push({ id: 'product-proof', el: productProofRef.current });
    }
    if (inviteRef.current) {
      items.push({ id: 'after', el: inviteRef.current });
    }

    const visibleEls = new Set<HTMLElement>();
    const pick = () => {
      const targetY = window.innerHeight * 0.36;
      let containing: NexusActiveBeat | null = null;
      let best: NexusActiveBeat = 'hero';
      let bestDist = Number.POSITIVE_INFINITY;
      let found = false;
      for (const { id, el } of items) {
        if (!visibleEls.has(el)) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetY && rect.bottom >= targetY) {
          containing = id;
        }
        const dist = Math.abs(rect.top + Math.min(rect.height * 0.22, 88) - targetY);
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
      const invite = inviteRef.current;
      if (invite) {
        const rect = invite.getBoundingClientRect();
        const nextInviting = rect.top <= targetY && rect.bottom >= targetY;
        setInviting((prev) => (prev === nextInviting ? prev : nextInviting));
      }
      const end = endRef.current;
      if (end) {
        const gonePast = end.getBoundingClientRect().bottom < window.innerHeight * 0.55;
        setReleased((prev) => (prev === gonePast ? prev : gonePast));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleEls.add(el);
          } else {
            visibleEls.delete(el);
          }
        }
        pick();
      },
      {
        threshold: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.62, 0.75, 0.88, 1],
        rootMargin: '-14% 0px -46% 0px',
      }
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
    <div
      className={`nexus-world${released ? ' is-released' : ''}${tracking ? ' is-tracking' : ''}${
        inviting ? ' is-inviting' : ''
      }`}
      data-beat={activeBeat}
    >
      <div className="nexus-stage">
        <NexusOrganism
          label={copy.organismAria}
          activeBeat={activeBeat}
          released={released}
        />
      </div>
      <section
        ref={heroRef}
        className="nexus-hero"
        data-nexus-beat="hero"
        aria-labelledby="nexus-title"
      >
        <div className="nexus-copy">
          <h1 id="nexus-title" className="nexus-title">
            {copy.hero.title}
          </h1>
          <p className="nexus-support">{copy.hero.dek}</p>

          <div className="nexus-hero__ctas">
            <div className="nexus-hero__stores">
              <a
                href="https://apps.apple.com/app/anto/id6756631911"
                className="nexus-hero__store-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="visually-hidden">{copy.hero.storeApp}</span>
                <svg
                  className="nexus-hero__store-icon"
                  viewBox="0 0 120 40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M110.135 0H9.865C9.425 0 8.99 0 8.55 0.002 8.185 0.005 7.822 0.011 7.455 0.019 6.632 0.034 5.812 0.096 5 0.205 4.189 0.317 3.395 0.54 2.642 0.868 1.891 1.199 1.196 1.643 0.582 2.185 0.064 2.625 0.002 3.105 0.002 3.592V36.408c0 0.487 0.062 0.967 0.58 1.407 0.614 0.542 1.309 0.986 2.06 1.317 0.753 0.328 1.547 0.551 2.358 0.663 0.812 0.109 1.632 0.171 2.455 0.186 0.367 0.008 0.73 0.014 1.095 0.017 0.44 0.002 0.875 0.002 1.315 0.002h100.27c0.435 0 0.865 0 1.3-0.002 0.361-0.003 0.73-0.009 1.09-0.017 0.822-0.015 1.642-0.077 2.455-0.186 0.81-0.112 1.604-0.335 2.355-0.663 0.753-0.331 1.448-0.775 2.065-1.317 0.518-0.44 0.58-0.92 0.58-1.407V3.592c0-0.487-0.062-0.967-0.58-1.407-0.617-0.542-1.312-0.986-2.065-1.317-0.751-0.328-1.545-0.551-2.355-0.663-0.813-0.109-1.633-0.171-2.455-0.186-0.36-0.008-0.729-0.014-1.09-0.017C111 0 110.57 0 110.135 0z" />
                </svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.anto.app"
                className="nexus-hero__store-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="visually-hidden">{copy.hero.storeGoogle}</span>
                <svg
                  className="nexus-hero__store-icon"
                  viewBox="0 0 135 40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M130 40H5c-2.8 0-5-2.2-5-5V5c0-2.8 2.2-5 5-5h125c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
                </svg>
              </a>
            </div>
            <Link href={copy.hero.tryHref} className="nexus-hero__try">
              {copy.hero.tryOutline}
            </Link>
            <p className="nexus-hero__micro">{copy.hero.micro}</p>
            <a href={copy.hero.demoHref} className="nexus-hero__demo-link">
              {copy.hero.demoLink}
            </a>
          </div>
        </div>
      </section>
      <NexusProductProof
        ref={productProofRef}
        locale={locale}
        copy={copy.productProof}
        storeApp={copy.invite.storeApp}
        storeGoogle={copy.invite.storeGoogle}
        tryOutline={copy.invite.tryOutline}
        tryHref={copy.invite.tryHref}
        micro={copy.invite.micro}
      />
      <section
        ref={inviteRef}
        className="nexus-invite"
        data-nexus-beat="after"
        aria-labelledby="nexus-invite-title"
      >
        <div className="nexus-invite__inner">
          <h2 id="nexus-invite-title" className="nexus-invite__title">
            {copy.invite.title}
          </h2>
          <div className="nexus-invite__ctas">
            <div className="nexus-invite__stores">
              <a
                href="https://apps.apple.com/app/anto/id6756631911"
                className="nexus-invite__store-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="visually-hidden">{copy.invite.storeApp}</span>
                <svg
                  className="nexus-invite__store-icon"
                  viewBox="0 0 120 40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M110.135 0H9.865C9.425 0 8.99 0 8.55 0.002 8.185 0.005 7.822 0.011 7.455 0.019 6.632 0.034 5.812 0.096 5 0.205 4.189 0.317 3.395 0.54 2.642 0.868 1.891 1.199 1.196 1.643 0.582 2.185 0.064 2.625 0.002 3.105 0.002 3.592V36.408c0 0.487 0.062 0.967 0.58 1.407 0.614 0.542 1.309 0.986 2.06 1.317 0.753 0.328 1.547 0.551 2.358 0.663 0.812 0.109 1.632 0.171 2.455 0.186 0.367 0.008 0.73 0.014 1.095 0.017 0.44 0.002 0.875 0.002 1.315 0.002h100.27c0.435 0 0.865 0 1.3-0.002 0.361-0.003 0.73-0.009 1.09-0.017 0.822-0.015 1.642-0.077 2.455-0.186 0.81-0.112 1.604-0.335 2.355-0.663 0.753-0.331 1.448-0.775 2.065-1.317 0.518-0.44 0.58-0.92 0.58-1.407V3.592c0-0.487-0.062-0.967-0.58-1.407-0.617-0.542-1.312-0.986-2.065-1.317-0.751-0.328-1.545-0.551-2.355-0.663-0.813-0.109-1.633-0.171-2.455-0.186-0.36-0.008-0.729-0.014-1.09-0.017C111 0 110.57 0 110.135 0z" />
                </svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.anto.app"
                className="nexus-invite__store-badge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="visually-hidden">{copy.invite.storeGoogle}</span>
                <svg
                  className="nexus-invite__store-icon"
                  viewBox="0 0 135 40"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M130 40H5c-2.8 0-5-2.2-5-5V5c0-2.8 2.2-5 5-5h125c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
                </svg>
              </a>
            </div>
            <Link href={copy.invite.tryHref} className="nexus-invite__try">
              {copy.invite.tryOutline}
            </Link>
            <p className="nexus-invite__micro">{copy.invite.micro}</p>
          </div>
          <p className="nexus-invite__limit">{copy.invite.limit}</p>
        </div>
      </section>
      <div ref={endRef} className="nexus-world__end" aria-hidden="true" />
    </div>
  );
}
