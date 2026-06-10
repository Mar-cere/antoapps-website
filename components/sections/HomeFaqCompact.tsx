'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeFaqCompactProps = {
  locale?: Locale;
};

export default function HomeFaqCompact({ locale = 'es' }: HomeFaqCompactProps) {
  const faq = getHomeLandingFinalCopy(locale).faqLite;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="home-landing-faq" aria-labelledby="home-faq-title" data-fade-section>
      <div className="home-landing-faq__head reveal-on-scroll">
        <p className="home-landing-eyebrow">{faq.eyebrow}</p>
        <h2 id="home-faq-title" className="home-landing-cred__title">
          {faq.title}
        </h2>
      </div>
      <div className="home-landing-faq__list">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `home-faq-panel-${index}`;
          const buttonId = `home-faq-button-${index}`;

          return (
            <div
              key={item.question}
              className={`home-landing-faq__item reveal-on-scroll ${isOpen ? 'is-open' : ''}`}
              data-stagger-item
            >
              <button
                type="button"
                id={buttonId}
                className="home-landing-faq__question"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="home-landing-faq__chevron" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="home-landing-faq__answer"
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Link href={faq.moreHref} className="home-landing-faq__more reveal-on-scroll">
        {faq.moreLabel}
      </Link>
    </section>
  );
}
