'use client';

import '@/styles/components/real-impact.css';

interface Impact {
  category: string;
  achievements: {
    title: string;
    metric: string;
    description: string;
    icon: string;
  }[];
}

const impacts: Impact[] = [
  {
    category: 'Impacto Técnico',
    achievements: [
      {
        title: 'Sistema en Producción',
        metric: '99.9% Uptime',
        description: 'Aplicación desplegada y funcionando en producción con alta disponibilidad',
        icon: '🚀'
      },
      {
        title: 'Performance Optimizada',
        metric: '<2.5s Respuesta',
        description: 'Tiempo de respuesta de IA reducido de 5-8s a menos de 2.5s promedio',
        icon: '⚡'
      },
      {
        title: 'Escalabilidad Comprobada',
        metric: '1000+ Conexiones',
        description: 'Sistema probado y optimizado para manejar 1000+ conexiones simultáneas',
        icon: '📈'
      }
    ]
  },
  {
    category: 'Calidad y Confiabilidad',
    achievements: [
      {
        title: 'Código de Producción',
        metric: '15,000+ Líneas',
        description: 'Código limpio, bien estructurado y listo para producción',
        icon: '💻'
      },
      {
        title: 'Tests Exhaustivos',
        metric: '95%+ Cobertura',
        description: 'Suite completa de tests asegurando calidad y confiabilidad',
        icon: '✅'
      },
      {
        title: 'Seguridad Certificada',
        metric: 'A+ Score',
        description: 'Security Score A+ con cero vulnerabilidades críticas',
        icon: '🔒'
      }
    ]
  },
  {
    category: 'Arquitectura y Diseño',
    achievements: [
      {
        title: 'Arquitectura Modular',
        metric: '50+ Componentes',
        description: 'Sistema diseñado con componentes reutilizables y arquitectura escalable',
        icon: '🧩'
      },
      {
        title: 'Multiplataforma',
        metric: 'iOS + Android',
        description: 'Una sola codebase para ambas plataformas con 92% de código compartido',
        icon: '📱'
      },
      {
        title: 'Stack Moderno',
        metric: '2024 Tech',
        description: 'Tecnologías de vanguardia: Next.js 14, React Native, Node.js, MongoDB',
        icon: '🛠️'
      }
    ]
  },
  {
    category: 'Integraciones y Servicios',
    achievements: [
      {
        title: 'IA Integrada',
        metric: 'OpenAI GPT-5',
        description: 'Integración exitosa con OpenAI API para conversaciones inteligentes',
        icon: '🤖'
      },
      {
        title: 'Pagos Funcionales',
        metric: 'Mercado Pago',
        description: 'Sistema de suscripciones completo con procesamiento de pagos seguro',
        icon: '💳'
      },
      {
        title: 'Comunicación en Tiempo Real',
        metric: 'Socket.IO',
        description: 'Chat en tiempo real con WebSockets y notificaciones push',
        icon: '📡'
      }
    ]
  }
];

export default function RealImpact() {
  return (
    <section id="impacto-real" className="real-impact" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Impacto Real y Logros Concretos</h2>
        <p className="section-subtitle reveal-on-scroll">
          Resultados medibles y logros técnicos que demuestran competencia y capacidad de ejecución
        </p>

        <div className="impact-grid" data-stagger>
          {impacts.map((impact, categoryIndex) => (
            <div key={categoryIndex} className="impact-category reveal-on-scroll" data-stagger-item>
              <h3 className="impact-category-title">{impact.category}</h3>
              <div className="impact-achievements">
                {impact.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="impact-achievement">
                    <div className="impact-achievement-header">
                      <span className="impact-achievement-icon">{achievement.icon}</span>
                      <div className="impact-achievement-content">
                        <h4 className="impact-achievement-title">{achievement.title}</h4>
                        <div className="impact-achievement-metric">{achievement.metric}</div>
                      </div>
                    </div>
                    <p className="impact-achievement-description">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="real-impact-summary reveal-on-scroll">
          <div className="summary-card">
            <h3 className="summary-title">Resumen de Logros</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-value">1</div>
                <div className="summary-label">Aplicación Completa</div>
                <div className="summary-description">De idea a producción</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">15K+</div>
                <div className="summary-label">Líneas de Código</div>
                <div className="summary-description">Código limpio y mantenible</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">10+</div>
                <div className="summary-label">Integraciones</div>
                <div className="summary-description">APIs y servicios externos</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">100%</div>
                <div className="summary-label">Funcional</div>
                <div className="summary-description">Listo para producción</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

