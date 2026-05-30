'use client';

import React, { useState, useMemo } from 'react';
import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import FAQSearch, { useFAQHighlight } from '@/components/ui/FAQSearch';
import type { Locale } from '@/lib/i18n/config';
import { getHomeFaqCopy } from '@/lib/i18n/copy/home';

type FAQProps = {
  locale?: Locale;
};

export default function FAQ({ locale = 'es' }: FAQProps) {
  useScrollAnimations();
  const copy = getHomeFaqCopy(locale);
  const [showMore, setShowMore] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allFAQs = showMore ? [...copy.faqData, ...copy.faqMoreData] : copy.faqData;

  const displayedFAQs = useMemo(() => {
    return allFAQs.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allFAQs, searchQuery, selectedCategory]);

  const highlightText = useFAQHighlight(searchQuery);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const resultLabel =
    displayedFAQs.length === 1 ? copy.ui.resultCount.singular : copy.ui.resultCount.plural;

  return (
    <section id="faq" className="faq" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>

        <div className="faq-search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={copy.ui.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
              aria-label={copy.ui.searchAriaLabel}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label={copy.ui.clearSearchAriaLabel}
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="search-results-count">
              {displayedFAQs.length} {resultLabel}
            </div>
          )}
        </div>

        <div className="faq-categories" data-stagger>
          {copy.categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              data-category={cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {displayedFAQs.length === 0 && searchQuery && (
          <div className="no-results">
            <p>
              {copy.ui.noResultsPrefix} &quot;{searchQuery}&quot;
            </p>
            <button onClick={() => setSearchQuery('')} className="btn btn-secondary">
              {copy.ui.clearSearch}
            </button>
          </div>
        )}

        <div className="faq-list" id="faqList">
          {displayedFAQs.map((faq) => (
            <div key={faq.id} className="faq-item" data-stagger-item data-category={faq.category}>
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{highlightText(faq.question)}</span>
                <span className="faq-icon">{activeFAQ === faq.id ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${activeFAQ === faq.id ? 'active' : ''}`}>
                <p>{highlightText(faq.answer)}</p>
              </div>
            </div>
          ))}
        </div>

        {!showMore && (
          <div className="section-cta-row">
            <button className="btn btn-secondary" onClick={() => setShowMore(true)} id="faqShowMore">
              {copy.ui.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
