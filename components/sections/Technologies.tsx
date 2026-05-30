'use client';

import '@/styles/components/technologies.css';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

const CATEGORY_ICONS = ['🤖', '📱', '⚡', '🔒', '💳'] as const;

const ITEM_ICONS = [
  ['🧠', '💬', '📊'],
  ['⚛️', '🚀', '🧭'],
  ['🟢', '🚂', '🍃', '🔌'],
  ['🔑', '🔐', '🪖'],
  ['💵', '📧', '🤖'],
] as const;

type TechnologiesProps = {
  locale?: Locale;
};

export default function Technologies({ locale = 'es' }: TechnologiesProps) {
  const copy = getHomeSectionsCopy(locale).technologies;

  return (
    <section id="tecnologias" className="technologies" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>

        <div className="tech-grid" data-stagger>
          {copy.categories.map((category, categoryIndex) => (
            <div key={category.title} className="tech-category reveal-on-scroll stagger-item" data-stagger-item>
              <div className="tech-category-header">
                <div className="tech-category-icon">
                  {CATEGORY_ICONS[categoryIndex]}
                </div>
                <h3>{category.title}</h3>
              </div>

              <div className="tech-items">
                {category.items.map((item, itemIndex) => (
                  <div key={item.name} className="tech-item">
                    <div className="tech-item-header">
                      <span className="tech-item-icon">{ITEM_ICONS[categoryIndex][itemIndex]}</span>
                      <div className="tech-item-info">
                        <span className="tech-item-name">{item.name}</span>
                        <span className="tech-item-description">{item.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
