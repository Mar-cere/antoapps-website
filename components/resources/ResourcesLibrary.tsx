'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';

type ResourcesLibraryProps = {
  library: ResourcesPageCopy['library'];
};

function getResourceIcon(type: string): string {
  const icons: Record<string, string> = {
    psicoeducacion: '🧠',
    ebook: '📚',
    pdf: '📄',
    video: '🎥',
    podcast: '🎙️',
    checklist: '✅',
    template: '📋',
    guia: '📄',
  };
  return icons[type] || '📄';
}

export default function ResourcesLibrary({ library }: ResourcesLibraryProps) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = library.resources.filter((resource) => {
    const matchesFilter =
      filter === 'all' ||
      resource.type === filter ||
      resource.category === filter;
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="resources-filters" data-fade-section>
      <div className="container">
        <div className="filter-tabs">
          {library.filters.map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="search"
            id="resource-search"
            placeholder={library.searchPlaceholder}
            aria-label={library.searchAriaLabel}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="resources-grid">
          {filteredResources.length === 0 ? (
            <div className="resources-empty" id="resources-empty">
              <p>{library.emptyMessage}</p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card reveal-on-scroll">
                <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href={resource.link} className="btn btn-secondary">
                  {library.viewResourceLabel}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
