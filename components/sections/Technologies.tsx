'use client';

import '@/styles/components/technologies.css';

interface TechItem {
  name: string;
  icon: string;
  description: string;
}

interface TechCategory {
  title: string;
  icon: string;
  items: TechItem[];
  color?: string;
}

const techCategories: TechCategory[] = [
  {
    title: 'Inteligencia Artificial',
    icon: '🤖',
    color: '#1ADDDB',
    items: [
      { name: 'OpenAI GPT-5 Mini', icon: '🧠', description: 'API principal para conversaciones inteligentes' },
      { name: 'NLP Processing', icon: '💬', description: 'Procesamiento de lenguaje natural' },
      { name: 'Sentiment Analysis', icon: '📊', description: 'Análisis emocional en tiempo real' },
    ],
  },
  {
    title: 'Frontend',
    icon: '📱',
    color: '#61DAFB',
    items: [
      { name: 'React Native', icon: '⚛️', description: 'Framework multiplataforma iOS/Android' },
      { name: 'Expo SDK', icon: '🚀', description: 'Desarrollo y deployment rápido' },
      { name: 'React Navigation', icon: '🧭', description: 'Navegación fluida' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚡',
    color: '#339933',
    items: [
      { name: 'Node.js', icon: '🟢', description: 'Runtime JavaScript' },
      { name: 'Express.js', icon: '🚂', description: 'Framework web' },
      { name: 'MongoDB', icon: '🍃', description: 'Base de datos NoSQL' },
      { name: 'Socket.IO', icon: '🔌', description: 'WebSockets en tiempo real' },
    ],
  },
  {
    title: 'Seguridad',
    icon: '🔒',
    color: '#FF6B6B',
    items: [
      { name: 'JWT', icon: '🔑', description: 'Autenticación segura' },
      { name: 'bcrypt', icon: '🔐', description: 'Hashing de contraseñas' },
      { name: 'Helmet.js', icon: '🪖', description: 'Headers de seguridad' },
    ],
  },
  {
    title: 'Integraciones',
    icon: '💳',
    color: '#9B59B6',
    items: [
      { name: 'Mercado Pago', icon: '💵', description: 'Procesamiento de pagos' },
      { name: 'SendGrid', icon: '📧', description: 'Emails transaccionales' },
      { name: 'OpenAI API', icon: '🤖', description: 'IA conversacional' },
    ],
  },
];

const techComparison = [
  { category: 'Performance', score: 95, description: 'Tiempo de respuesta <2.5s' },
  { category: 'Escalabilidad', score: 90, description: '1000+ conexiones simultáneas' },
  { category: 'Seguridad', score: 98, description: 'A+ Security Score' },
  { category: 'Mantenibilidad', score: 92, description: 'Código limpio y documentado' },
];

export default function Technologies() {
  return (
    <section id="tecnologias" className="technologies" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Stack Tecnológico Moderno</h2>
        <p className="section-subtitle reveal-on-scroll">
          Tecnologías de vanguardia (2025) seleccionadas por su rendimiento, escalabilidad y ecosistema activo
        </p>

        {/* Categorías de Tecnologías Simplificadas */}
        <div className="tech-grid" data-stagger>
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="tech-category reveal-on-scroll stagger-item" data-stagger-item>
              <div className="tech-category-header">
                <div className="tech-category-icon" style={{ '--category-color': category.color } as React.CSSProperties}>
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="tech-items">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="tech-item">
                    <div className="tech-item-header">
                      <span className="tech-item-icon">{item.icon}</span>
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

        {/* Comparativa Visual de Métricas */}
        <div className="tech-comparison-section reveal-on-scroll">
          <h3 className="comparison-title">Métricas de Calidad del Stack</h3>
          <div className="comparison-grid">
            {techComparison.map((metric, index) => (
              <div key={index} className="comparison-card">
                <div className="comparison-header">
                  <h4 className="comparison-category">{metric.category}</h4>
                  <span className="comparison-score">{metric.score}%</span>
                </div>
                <div className="comparison-bar">
                  <div 
                    className="comparison-fill" 
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <p className="comparison-description">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="tech-cta reveal-on-scroll">
          <a href="/desarrollo" className="btn btn-primary btn-large">
            Ver detalles técnicos completos →
          </a>
        </div>
      </div>
    </section>
  );
}
