'use client';

import { useCounter } from '@/lib/hooks/useCounter';

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setRef] = useCounter(target, { duration: 2000 });

  return (
    <div className="stat-card reveal-on-scroll" data-stagger-item>
      <div className="stat-number" ref={setRef}>
        {count}
        {suffix}
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
          <StatCard target={100} suffix="%" label="Privacidad Garantizada" />
          <StatCard target={2.5} suffix="s" label="Tiempo de Respuesta" />
        </div>
      </div>
    </section>
  );
}

