'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { NexusActiveBeat, NexusPageCopy } from '@/lib/i18n/copy/pages/nexus';
import { NEXUS_CONSTELLATION_PLATE, NEXUS_CONSTELLATION_PLATE_PNG } from '@/lib/nexus/field';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
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
              <PremiumStoreCta
                store="apple"
                storeHref={appStoreHref()}
                storeLabel={locale === 'es' ? 'Descargar en' : 'Download on the'}
                storeName="App Store"
                badge={locale === 'es' ? '1 día gratis' : '1 day free'}
                ariaLabel={copy.hero.storeApp}
                trackingPlacement="nexus_hero_app_store"
                trackingPage="/nexus"
                trackingLabel="nexus_hero_ios"
                className="nexus-store-cta"
              />
              <PremiumStoreCta
                store="google"
                storeHref={googlePlayHref(locale)}
                storeLabel={locale === 'es' ? 'Disponible en' : 'Get it on'}
                storeName="Google Play"
                badge={locale === 'es' ? '1 día gratis' : '1 day free'}
                ariaLabel={copy.hero.storeGoogle}
                trackingPlacement="nexus_hero_play_store"
                trackingPage="/nexus"
                trackingLabel="nexus_hero_android"
                className="nexus-store-cta"
              />
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
              <PremiumStoreCta
                store="apple"
                storeHref={appStoreHref()}
                storeLabel={locale === 'es' ? 'Descargar en' : 'Download on the'}
                storeName="App Store"
                badge={locale === 'es' ? '1 día gratis' : '1 day free'}
                ariaLabel={copy.invite.storeApp}
                trackingPlacement="nexus_invite_app_store"
                trackingPage="/nexus"
                trackingLabel="nexus_invite_ios"
                className="nexus-store-cta"
              />
              <PremiumStoreCta
                store="google"
                storeHref={googlePlayHref(locale)}
                storeLabel={locale === 'es' ? 'Disponible en' : 'Get it on'}
                storeName="Google Play"
                badge={locale === 'es' ? '1 día gratis' : '1 day free'}
                ariaLabel={copy.invite.storeGoogle}
                trackingPlacement="nexus_invite_play_store"
                trackingPage="/nexus"
                trackingLabel="nexus_invite_android"
                className="nexus-store-cta"
              />
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
