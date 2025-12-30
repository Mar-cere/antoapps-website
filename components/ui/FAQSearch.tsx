'use client';

import { useState, useMemo } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQSearchProps {
  faqItems: FAQItem[];
  onItemClick?: (item: FAQItem) => void;
}

export default function FAQSearch({ faqItems, onItemClick }: FAQSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(faqItems.map((item) => item.category));
    return Array.from(cats);
  }, [faqItems]);

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqItems, searchQuery, selectedCategory]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="faq-search-container">
      <div className="faq-search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="faq-search-input"
            aria-label="Buscar preguntas frecuentes"
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="search-results-count">
            {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'} encontrado
            {filteredItems.length === 1 ? '' : 's'}
          </div>
        )}
      </div>

      <div className="faq-categories">
        <button
          className={`faq-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
          data-category="all"
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`faq-category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            data-category={category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && searchQuery && (
        <div className="no-results">
          <p>No se encontraron resultados para &quot;{searchQuery}&quot;</p>
          <button onClick={() => setSearchQuery('')} className="btn btn-secondary">
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
}

// Hook para usar el highlight en componentes externos
export function useFAQHighlight(query: string) {
  return (text: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
}

