'use client';

import { useState, useRef, useEffect, KeyboardEvent, forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { NexusProductProofCopy, NexusTabId } from '@/lib/i18n/copy/pages/nexus';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';

type NexusProductProofProps = {
  locale: Locale;
  copy: NexusProductProofCopy;
  storeApp: string;
  storeGoogle: string;
  tryOutline: string;
  tryHref: string;
  micro: string;
};

const NexusProductProof = forwardRef<HTMLElement, NexusProductProofProps>(
  ({ locale, copy, storeApp, storeGoogle, tryOutline, tryHref, micro }, ref) => {
    const [activeTab, setActiveTab] = useState<NexusTabId>('with-memory');
    const tabRefs = useRef<Map<NexusTabId, HTMLButtonElement>>(new Map());

    const handleTabClick = (tabId: NexusTabId) => {
      setActiveTab(tabId);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const tabs = copy.tabs;
      let nextIndex = index;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = index > 0 ? index - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = index < tabs.length - 1 ? index + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      const nextTabId = tabs[nextIndex].id;
      setActiveTab(nextTabId);
      tabRefs.current.get(nextTabId)?.focus();
    };

    const phoneImageSrc =
      locale === 'es'
        ? '/assets/images/product/anto-phone-chat-es.webp'
        : '/assets/images/product/anto-phone-chat-en.webp';

    return (
      <section
        ref={ref}
        id={locale === 'es' ? 'mismo-mensaje' : 'same-message'}
        className="nexus-product-proof"
        aria-labelledby="nexus-product-proof-title"
      >
        <div className="nexus-product-proof__content">
          <div className="nexus-product-proof__copy">
            <p className="nexus-product-proof__kicker">{copy.kicker}</p>
            <h2 id="nexus-product-proof-title" className="nexus-product-proof__title">
              {copy.title}
            </h2>
            <p className="nexus-product-proof__dek">{copy.dek}</p>

            <div className="nexus-product-proof__tabs">
              <div role="tablist" aria-label={copy.title} className="nexus-product-proof__tablist">
                {copy.tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      if (el) tabRefs.current.set(tab.id, el);
                    }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => handleTabClick(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`nexus-product-proof__tab${activeTab === tab.id ? ' is-active' : ''}`}
                  >
                    <span className="nexus-product-proof__tab-label">{tab.label}</span>
                    <span className="nexus-product-proof__tab-desc">{tab.description}</span>
                  </button>
                ))}
              </div>

              <div className="nexus-product-proof__panels">
                {copy.tabs.map((tab, index) => (
                  <div
                    key={tab.id}
                    role="tabpanel"
                    id={`tabpanel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    hidden={activeTab !== tab.id}
                    className="nexus-product-proof__panel"
                  >
                    <div className="nexus-product-proof__conversation">
                      <div className="nexus-product-proof__message-user">
                        <div className="nexus-product-proof__bubble nexus-product-proof__bubble--user">
                          {copy.userMessage}
                        </div>
                      </div>
                      <div className="nexus-product-proof__message-anto">
                        <div className="nexus-product-proof__bubble nexus-product-proof__bubble--anto">
                          {copy.replies[index]}
                        </div>
                      </div>
                    </div>
                    <div className="nexus-product-proof__phone">
                      <Image
                        src={phoneImageSrc}
                        alt=""
                        width={390}
                        height={844}
                        className="nexus-product-proof__phone-img"
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nexus-product-proof__cta-section">
          <div className="nexus-product-proof__stores">
            <PremiumStoreCta
              store="apple"
              storeHref={appStoreHref()}
              storeLabel={locale === 'es' ? 'Descargar en' : 'Download on the'}
              storeName="App Store"
              badge={locale === 'es' ? '1 día gratis' : '1 day free'}
              ariaLabel={storeApp}
              trackingPlacement="nexus_product_proof_app_store"
              trackingPage="/nexus"
              trackingLabel="nexus_product_proof_ios"
              className="nexus-store-cta"
            />
            <PremiumStoreCta
              store="google"
              storeHref={googlePlayHref(locale)}
              storeLabel={locale === 'es' ? 'Disponible en' : 'Get it on'}
              storeName="Google Play"
              badge={locale === 'es' ? '1 día gratis' : '1 day free'}
              ariaLabel={storeGoogle}
              trackingPlacement="nexus_product_proof_play_store"
              trackingPage="/nexus"
              trackingLabel="nexus_product_proof_android"
              className="nexus-store-cta"
            />
          </div>
          <Link href={tryHref} className="nexus-product-proof__try">
            {tryOutline}
          </Link>
          <p className="nexus-product-proof__micro">{micro}</p>
        </div>
      </section>
    );
  }
);

NexusProductProof.displayName = 'NexusProductProof';

export default NexusProductProof;
