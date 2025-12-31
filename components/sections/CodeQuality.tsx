'use client';

import '@/styles/components/code-quality.css';

interface QualityMetric {
  category: string;
  metrics: {
    label: string;
    value: string;
    description: string;
    icon: string;
  }[];
}

const qualityMetrics: QualityMetric[] = [
  {
    category: 'Testing y Cobertura',
    metrics: [
      {
        label: 'Cobertura de Tests',
        value: '95%+',
        description: 'Tests unitarios, de integración y E2E cubriendo funcionalidades críticas',
        icon: '✅'
      },
      {
        label: 'Tests Automatizados',
        value: '97%+',
        description: 'CI/CD con ejecución automática de tests en cada commit',
        icon: '🤖'
      },
      {
        label: 'Validación de Inputs',
        value: '100%',
        description: 'Todos los inputs validados con Joi y sanitizados con DOMPurify',
        icon: '🛡️'
      }
    ]
  },
  {
    category: 'Arquitectura y Estructura',
    metrics: [
      {
        label: 'Componentes Reutilizables',
        value: '50+',
        description: 'Arquitectura modular con componentes reutilizables y bien documentados',
        icon: '🧩'
      },
      {
        label: 'Separación de Concerns',
        value: 'MVC',
        description: 'Arquitectura clara: Modelos, Vistas, Controladores bien separados',
        icon: '📐'
      },
      {
        label: 'Type Safety',
        value: 'TypeScript',
        description: '100% TypeScript con tipos estrictos y sin any explícitos',
        icon: '🔷'
      }
    ]
  },
  {
    category: 'Buenas Prácticas',
    metrics: [
      {
        label: 'Code Review',
        value: '100%',
        description: 'Todos los cambios revisados antes de merge a main',
        icon: '👁️'
      },
      {
        label: 'Documentación',
        value: 'Completa',
        description: 'README detallado, comentarios en código complejo, JSDoc en funciones públicas',
        icon: '📚'
      },
      {
        label: 'Linting y Formatting',
        value: 'ESLint + Prettier',
        description: 'Código consistente con reglas estrictas y formato automático',
        icon: '✨'
      }
    ]
  },
  {
    category: 'Seguridad y Performance',
    metrics: [
      {
        label: 'Security Score',
        value: 'A+',
        description: 'Lighthouse Security Score, cero vulnerabilidades críticas',
        icon: '🔒'
      },
      {
        label: 'Performance Score',
        value: '95+',
        description: 'Lighthouse Performance Score, optimizaciones aplicadas',
        icon: '⚡'
      },
      {
        label: 'Bundle Size',
        value: 'Optimizado',
        description: 'Code splitting, tree shaking, lazy loading para mínimo bundle size',
        icon: '📦'
      }
    ]
  }
];

export default function CodeQuality() {
  return (
    <section id="calidad-codigo" className="code-quality" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Calidad de Código y Buenas Prácticas</h2>
        <p className="section-subtitle reveal-on-scroll">
          Compromiso con código limpio, mantenible y escalable siguiendo estándares de la industria
        </p>

        <div className="quality-grid" data-stagger>
          {qualityMetrics.map((category, categoryIndex) => (
            <div key={categoryIndex} className="quality-category reveal-on-scroll" data-stagger-item>
              <h3 className="quality-category-title">{category.category}</h3>
              <div className="quality-metrics">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="quality-metric">
                    <div className="quality-metric-header">
                      <span className="quality-metric-icon">{metric.icon}</span>
                      <div className="quality-metric-info">
                        <div className="quality-metric-label">{metric.label}</div>
                        <div className="quality-metric-value">{metric.value}</div>
                      </div>
                    </div>
                    <p className="quality-metric-description">{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="code-quality-cta reveal-on-scroll">
          <a 
            href="https://github.com/Mar-cere/Anto" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            Ver Código en GitHub →
          </a>
          <a href="/desarrollo" className="btn btn-secondary">
            Conocer Arquitectura Completa →
          </a>
        </div>
      </div>
    </section>
  );
}

