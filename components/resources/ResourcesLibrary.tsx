'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import type { ResourceGroup, ResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';

type ResourcesLibraryProps = {
  library: ResourcesPageCopy['library'];
};

function filterGroup(group: ResourceGroup, query: string): ResourceGroup {
  if (query === '') return group;
  return {
    ...group,
    items: group.items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    ),
  };
}

export default function ResourcesLibrary({ library }: ResourcesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchId = useId();
  const query = searchQuery.trim().toLowerCase();

  const visibleGroups = library.groups
    .map((group) => filterGroup(group, query))
    .filter((group) => group.items.length > 0);

  return (
    <section className="resources-library" data-fade-section aria-label={library.searchAriaLabel}>
      <div className="home-landing-container">
        <div className="resources-toolbar">
          <div className="resources-search">
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

        {visibleGroups.length === 0 ? (
          <p className="resources-empty">{library.emptyMessage}</p>
        ) : (
          <div className="resources-groups">
            {visibleGroups.map((group) => (
              <section
                key={group.id}
                className="resources-group"
                aria-labelledby={`resources-group-${group.id}`}
              >
                <h2 id={`resources-group-${group.id}`} className="resources-group__title">
                  {group.title}
                </h2>
                <ul className="resources-list">
                  {group.items.map((resource) => (
                    <li key={resource.id}>
                      <Link href={resource.link} className="resources-list__link">
                        <span className="resources-list__title">{resource.title}</span>
                        <span className="resources-list__desc">{resource.description}</span>
                        <span className="resources-list__arrow" aria-hidden="true">
                          →
                        </span>
                        <span className="visually-hidden">{library.viewResourceLabel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
