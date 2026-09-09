'use client';

import { useState } from 'react';
import Image from 'next/image';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2InPhoneProps = {
  locale?: Locale;
};

/** Sector producto "En el teléfono": tabs + captura en device + badges. */
export default function HomeV2InPhone({ locale = 'es' }: HomeV2InPhoneProps) {
  const copy = getHomeV2Copy(locale);
  const { inPhone, hero } = copy;
  const [activeIndex, setActiveIndex] = useState(0);
  const pagePath = locale === 'en' ? '/en' : '/';

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const lastIndex = inPhone.tabs.length - 1;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        setActiveIndex(index < lastIndex ? index + 1 : 0);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        setActiveIndex(index > 0 ? index - 1 : lastIndex);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(lastIndex);
        break;
    }
  };

  const activeTab = inPhone.tabs[activeIndex];

  return (
    <section className="home-v2-in-phone" data-fade-section aria-labelledby="home-v2-in-phone-title">
      <div className="home-landing-container">
        {/* Kicker + Title + Dek */}
        <div className="home-v2-in-phone__header">
          <p className="home-v2-in-phone__kicker">{inPhone.kicker}</p>
          <h2 id="home-v2-in-phone-title" className="home-v2-in-phone__title">
            {inPhone.title}
          </h2>
          <p className="home-v2-in-phone__dek">{inPhone.dek}</p>
        </div>

        {/* Grid: tabs + phone */}
        <div className="home-v2-in-phone__grid">
          {/* Tabs list */}
          <div
            className="home-v2-in-phone__tabs"
            role="tablist"
            aria-label={inPhone.kicker}
          >
            {inPhone.tabs.map((tab, index) => (
              <button
                key={tab.index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`home-v2-in-phone-panel-${index}`}
                id={`home-v2-in-phone-tab-${index}`}
                tabIndex={activeIndex === index ? 0 : -1}
                className={`home-v2-in-phone__tab ${
                  activeIndex === index ? 'home-v2-in-phone__tab--active' : ''
                }`}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <span className="home-v2-in-phone__tab-index">{tab.index}</span>
                <span className="home-v2-in-phone__tab-content">
                  <span className="home-v2-in-phone__tab-label">{tab.label}</span>
                  <span className="home-v2-in-phone__tab-body">{tab.body}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Phone device with screenshot */}
          <div
            className="home-v2-in-phone__device"
            role="tabpanel"
            id={`home-v2-in-phone-panel-${activeIndex}`}
            aria-labelledby={`home-v2-in-phone-tab-${activeIndex}`}
            aria-live="polite"
          >
            <div className="home-v2-in-phone__device-frame">
              <Image
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt}
                width={390}
                height={844}
                className="home-v2-in-phone__device-screenshot"
                sizes="(max-width: 899px) 80vw, 320px"
                quality={90}
              />
            </div>
          </div>
        </div>

        {/* Store badges + micro CTA */}
        <div className="home-v2-in-phone__cta">
          <PremiumStoreCtaPair
            locale={locale}
            copy={hero}
            trackingPage={pagePath}
            trackingPlacementPrefix="home_in_phone"
            trackingLabel="home_in_phone"
          />
          <p className="home-v2-in-phone__micro">{hero.ctaMicro}</p>
        </div>
      </div>
    </section>
  );
}
