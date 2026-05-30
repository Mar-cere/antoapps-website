'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import Tabs from '@/components/ui/Tabs';
import type { Locale } from '@/lib/i18n/config';
import { getHomeBenefitsCopy } from '@/lib/i18n/copy/home';

type BenefitsProps = {
  locale?: Locale;
};

export default function Benefits({ locale = 'es' }: BenefitsProps) {
  useScrollAnimations();
  const copy = getHomeBenefitsCopy(locale);

  const tabs = copy.tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: (
      <div className="benefits-list">
        {copy.items[tab.id].map((benefit) => (
          <div key={benefit.title} className="benefit-item" data-stagger-item>
            <span className="check-icon">✓</span>
            <div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <section id="beneficios" className="benefits" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">{copy.title}</h2>
        <p className="section-subtitle reveal-on-scroll">{copy.subtitle}</p>
        <Tabs tabs={tabs} defaultTab="usuarios" />
      </div>
    </section>
  );
}
