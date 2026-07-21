'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2FaqProps = {
  locale?: Locale;
};

export default function HomeV2Faq({ locale = 'es' }: HomeV2FaqProps) {
  const faq = getHomeV2Copy(locale).faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="home-v2-faq" aria-labelledby="home-v2-faq-title" data-fade-section>
      <div className="home-landing-container">
        <h2 id="home-v2-faq-title" className="home-v2-faq__title">
          {faq.title}
        </h2>
        <div className="home-v2-faq__list">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `home-v2-faq-panel-${index}`;
            const buttonId = `home-v2-faq-button-${index}`;

            return (
              <div key={item.question} className={`home-v2-faq__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  id={buttonId}
                  className="home-v2-faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="home-v2-faq__chevron" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="home-v2-faq__answer"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link href={faq.moreHref} className="home-v2-faq__more">
          {faq.moreLabel}
        </Link>
      </div>
    </section>
  );
}
