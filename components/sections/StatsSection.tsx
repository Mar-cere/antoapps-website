'use client';

import { useCounter } from '@/lib/hooks/useCounter';
import type { Locale } from '@/lib/i18n/config';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home';

interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
  decimals?: number;
  locale: Locale;
}

function StatCard({ target, suffix, label, decimals = 0, locale }: StatCardProps) {
  const [count, setRef] = useCounter(target, { duration: 2000, decimals });

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    if (num >= 1000) {
      return num.toLocaleString(locale === 'en' ? 'en-US' : 'es-ES');
    }
    return num.toString();
  };

  return (
    <div className="stat-card reveal-on-scroll stagger-item" data-stagger-item>
      <div className="stat-number" ref={setRef}>
        {formatNumber(count)}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

type StatsSectionProps = {
  locale?: Locale;
};

export default function StatsSection({ locale = 'es' }: StatsSectionProps) {
  const { stats } = getHomeSectionsCopy(locale);
  const statItems = [
    { target: 24, suffix: '/7', label: stats.hoursAvailable },
    { target: 2.5, suffix: 's', label: stats.responseTime, decimals: 1 },
    { target: 97, suffix: '%', label: stats.testCoverage },
  ] as const;

  return (
    <section className="stats" data-fade-section>
      <div className="container">
        <div className="stats-grid" data-stagger>
          {statItems.map((stat) => (
            <StatCard
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              decimals={'decimals' in stat ? stat.decimals : 0}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
