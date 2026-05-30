'use client';

import { useState } from 'react';
import '@/styles/components/resources-library.css';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Guía de Manejo de Ansiedad',
    description: 'Estrategias prácticas para manejar la ansiedad en el día a día',
    type: 'pdf',
    category: 'ansiedad',
    link: '#',
  },
  {
    id: '2',
    title: 'Técnicas de Mindfulness',
    description: 'Aprende técnicas de atención plena para reducir el estrés',
    type: 'ebook',
    category: 'mindfulness',
    link: '#',
  },
  {
    id: '3',
    title: 'Podcast: Salud Mental Digital',
    description: 'Episodio sobre el futuro de la salud mental con IA',
    type: 'podcast',
    category: 'tecnologia',
    link: '#',
  },
];

export default function ResourcesLibrary() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter((resource) => {
    const matchesFilter = filter === 'all' || resource.type === filter;
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
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={`filter-tab ${filter === 'ebook' ? 'active' : ''}`}
            onClick={() => setFilter('ebook')}
          >
            Ebooks
          </button>
          <button
            className={`filter-tab ${filter === 'pdf' ? 'active' : ''}`}
            onClick={() => setFilter('pdf')}
          >
            Guías PDF
          </button>
          <button
            className={`filter-tab ${filter === 'video' ? 'active' : ''}`}
            onClick={() => setFilter('video')}
          >
            Videos
          </button>
          <button
            className={`filter-tab ${filter === 'podcast' ? 'active' : ''}`}
            onClick={() => setFilter('podcast')}
          >
            Podcasts
          </button>
        </div>

        <div className="search-box">
          <input
            type="search"
            id="resource-search"
            placeholder="Buscar recursos..."
            aria-label="Buscar recursos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="resources-grid">
          {filteredResources.length === 0 ? (
            <div className="resources-empty" id="resources-empty">
              <p>No se encontraron recursos con los filtros actuales.</p>
            </div>
          ) : (
            filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card reveal-on-scroll">
                <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} className="btn btn-secondary">
                  Ver Recurso
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function getResourceIcon(type: string): string {
  const icons: Record<string, string> = {
    ebook: '📚',
    pdf: '📄',
    video: '🎥',
    podcast: '🎙️',
    checklist: '✅',
    template: '📋',
  };
  return icons[type] || '📄';
}

