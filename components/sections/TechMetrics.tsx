'use client';

import { useCounter } from '@/lib/hooks/useCounter';
import Link from 'next/link';
import '@/styles/components/tech-metrics.css';

function TechMetricCard({ 
  target, 
  suffix, 
  label, 
  description,
  icon 
}: { 
  target: number; 
  suffix: string; 
  label: string;
  description?: string;
  icon?: string;
}) {
  const [count, setRef] = useCounter(target, { duration: 2000 });

  return (
    <div className="tech-metric-card reveal-on-scroll" data-stagger-item>
      {icon && <div className="tech-metric-icon">{icon}</div>}
      <div className="tech-metric-value" ref={setRef}>
        {count}
        {suffix}
      </div>
      <div className="tech-metric-label">{label}</div>
      {description && <div className="tech-metric-description">{description}</div>}
    </div>
  );
}

export default function TechMetrics() {
  return (
    <section id="metricas-tecnicas" className="tech-metrics" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Métricas Técnicas</h2>
        <p className="section-subtitle reveal-on-scroll">
          Números que demuestran la calidad y el compromiso con la excelencia técnica
        </p>

        <div className="tech-metrics-grid" data-stagger>
          <TechMetricCard 
            target={15000} 
            suffix="+" 
            label="Líneas de Código"
            description="Código limpio y bien estructurado"
            icon="💻"
          />
          <TechMetricCard 
            target={50} 
            suffix="+" 
            label="Componentes Reutilizables"
            description="Arquitectura modular y escalable"
            icon="🧩"
          />
          <TechMetricCard 
            target={97} 
            suffix="%" 
            label="Cobertura de Tests"
            description="Calidad garantizada con testing exhaustivo"
            icon="✅"
          />
          <TechMetricCard 
            target={2.5} 
            suffix="s" 
            label="Tiempo de Respuesta"
            description="Respuestas rápidas y eficientes"
            icon="⚡"
          />
          <TechMetricCard 
            target={99.9} 
            suffix="%" 
            label="Uptime"
            description="Disponibilidad y confiabilidad"
            icon="🚀"
          />
          <TechMetricCard 
            target={100} 
            suffix="+" 
            label="Commits"
            description="Desarrollo activo y constante"
            icon="📝"
          />
        </div>

        <div className="tech-metrics-cta reveal-on-scroll">
          <Link href="https://github.com/Mar-cere/Anto" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Ver Código en GitHub →
          </Link>
          <Link href="/desarrollo" className="btn btn-primary">
            Conocer el Proceso de Desarrollo →
          </Link>
        </div>
      </div>
    </section>
  );
}

