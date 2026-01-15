'use client';

import { useCounter } from '@/lib/hooks/useCounter';

interface StatCardProps {
  target: number;
  suffix: string;
  label: string;
  decimals?: number;
}

function StatCard({ target, suffix, label, decimals = 0 }: StatCardProps) {
  const [count, setRef] = useCounter(target, { duration: 2000, decimals });

  
  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    if (num >= 1000) {
      return num.toLocaleString('es-ES');
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

export default function StatsSection() {
  return (
    <section className="stats" data-fade-section>
      <div className="container">
        <div className="stats-grid" data-stagger>
          <StatCard target={24} suffix="/7" label="Horas Disponibles" />
          <StatCard target={2.5} suffix="s" label="Tiempo de Respuesta" decimals={1} />
          <StatCard target={95} suffix="%" label="Cobertura de Tests" />
        </div>
      </div>
    </section>
  );
}
