'use client';

import { useState, useRef, useEffect, KeyboardEvent, forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { NexusProductProofCopy, NexusTabId } from '@/lib/i18n/copy/pages/nexus';

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
            <a
              href="https://apps.apple.com/app/anto/id6670394042"
              className="nexus-product-proof__store-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="visually-hidden">{storeApp}</span>
              <svg
                className="nexus-product-proof__store-icon"
                viewBox="0 0 120 40"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M110.135 0H9.865C9.425 0 8.99 0 8.55 0.002 8.185 0.005 7.822 0.011 7.455 0.019 6.632 0.034 5.812 0.096 5 0.205 4.189 0.317 3.395 0.54 2.642 0.868 1.891 1.199 1.196 1.643 0.582 2.185 0.064 2.625 0.002 3.105 0.002 3.592V36.408c0 0.487 0.062 0.967 0.58 1.407 0.614 0.542 1.309 0.986 2.06 1.317 0.753 0.328 1.547 0.551 2.358 0.663 0.812 0.109 1.632 0.171 2.455 0.186 0.367 0.008 0.73 0.014 1.095 0.017 0.44 0.002 0.875 0.002 1.315 0.002h100.27c0.435 0 0.865 0 1.3-0.002 0.361-0.003 0.73-0.009 1.09-0.017 0.822-0.015 1.642-0.077 2.455-0.186 0.81-0.112 1.604-0.335 2.355-0.663 0.753-0.331 1.448-0.775 2.065-1.317 0.518-0.44 0.58-0.92 0.58-1.407V3.592c0-0.487-0.062-0.967-0.58-1.407-0.617-0.542-1.312-0.986-2.065-1.317-0.751-0.328-1.545-0.551-2.355-0.663-0.813-0.109-1.633-0.171-2.455-0.186-0.36-0.008-0.729-0.014-1.09-0.017C111 0 110.57 0 110.135 0z" />
              </svg>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.anto.app"
              className="nexus-product-proof__store-badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="visually-hidden">{storeGoogle}</span>
              <svg
                className="nexus-product-proof__store-icon"
                viewBox="0 0 135 40"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M130 40H5c-2.8 0-5-2.2-5-5V5c0-2.8 2.2-5 5-5h125c2.8 0 5 2.2 5 5v30c0 2.8-2.2 5-5 5z" />
              </svg>
            </a>
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
