'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { ResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';

type ResourcesLibraryProps = {
  library: ResourcesPageCopy['library'];
};

export default function ResourcesLibrary({ library }: ResourcesLibraryProps) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchId = useId();

  const filteredResources = library.resources.filter((resource) => {
    const matchesFilter =
      filter === 'all' || resource.type === filter || resource.category === filter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="resources-library" data-fade-section aria-label={library.searchAriaLabel}>
      <div className="container container--resources">
        <div className="resources-toolbar">
          <div className="filter-tabs" role="group" aria-label={library.filtersAriaLabel}>
            {library.filters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-tab${filter === tab.id ? ' is-active' : ''}`}
                aria-pressed={filter === tab.id}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <label className="visually-hidden" htmlFor={searchId}>
              {library.searchAriaLabel}
            </label>
            <input
              type="search"
              id={searchId}
              placeholder={library.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredResources.length === 0 ? (
          <p className="resources-empty">{library.emptyMessage}</p>
        ) : (
          <ul className="resources-list">
            {filteredResources.map((resource) => (
              <li key={resource.id} className="resources-list__item">
                <Link href={resource.link} className="resources-list__link">
                  <span className="resources-list__title">{resource.title}</span>
                  <span className="resources-list__desc">{resource.description}</span>
                  <span className="resources-list__cta">{library.viewResourceLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
