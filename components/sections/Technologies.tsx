'use client';

import Image from 'next/image';
import '@/styles/components/technologies.css';

interface TechItem {
  name: string;
  icon: string;
  usage?: number; // Porcentaje de uso (0-100)
  description?: string;
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
      { name: 'OpenAI GPT-5 Mini', icon: '🧠', usage: 100, description: 'API principal para conversaciones' },
      { name: 'NLP Processing', icon: '💬', usage: 95, description: 'Procesamiento de lenguaje natural' },
      { name: 'Sentiment Analysis', icon: '📊', usage: 90, description: 'Análisis emocional en tiempo real' },
      { name: 'Crisis Detection', icon: '🚨', usage: 100, description: 'Detección automática de patrones' },
    ],
  },
  {
    title: 'Frontend',
    icon: '📱',
    color: '#61DAFB',
    items: [
      { name: 'React Native', icon: '⚛️', usage: 100, description: 'Framework multiplataforma' },
      { name: 'Expo SDK', icon: '🚀', usage: 100, description: 'Desarrollo y deployment' },
      { name: 'React Navigation', icon: '🧭', usage: 95, description: 'Navegación fluida' },
      { name: 'AsyncStorage', icon: '💾', usage: 85, description: 'Persistencia local' },
      { name: 'Socket.IO Client', icon: '📡', usage: 100, description: 'Comunicación en tiempo real' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚡',
    color: '#339933',
    items: [
      { name: 'Node.js', icon: '🟢', usage: 100, description: 'Runtime JavaScript' },
      { name: 'Express.js', icon: '🚂', usage: 100, description: 'Framework web' },
      { name: 'MongoDB', icon: '🍃', usage: 100, description: 'Base de datos NoSQL' },
      { name: 'Socket.IO', icon: '🔌', usage: 100, description: 'WebSockets en tiempo real' },
      { name: 'Winston', icon: '📝', usage: 90, description: 'Logging estructurado' },
      { name: 'Sentry', icon: '🛡️', usage: 95, description: 'Error tracking' },
    ],
  },
  {
    title: 'Seguridad',
    icon: '🔒',
    color: '#FF6B6B',
    items: [
      { name: 'JWT', icon: '🔑', usage: 100, description: 'Autenticación segura' },
      { name: 'bcrypt', icon: '🔐', usage: 100, description: 'Hashing de contraseñas' },
      { name: 'Helmet.js', icon: '🪖', usage: 100, description: 'Headers de seguridad' },
      { name: 'Joi', icon: '✅', usage: 100, description: 'Validación robusta' },
      { name: 'DOMPurify', icon: '🧹', usage: 100, description: 'Sanitización XSS' },
    ],
  },
  {
    title: 'Integraciones',
    icon: '💳',
    color: '#9B59B6',
    items: [
      { name: 'Mercado Pago', icon: '💵', usage: 100, description: 'Procesamiento de pagos' },
      { name: 'SendGrid', icon: '📧', usage: 90, description: 'Emails transaccionales' },
      { name: 'Twilio', icon: '📱', usage: 85, description: 'WhatsApp y SMS' },
      { name: 'OpenAI API', icon: '🤖', usage: 100, description: 'IA conversacional' },
    ],
  },
];

const certifications = [
  { name: 'GDPR Compliant', icon: '🇪🇺', description: 'Cumplimiento total GDPR' },
  { name: 'HIPAA Ready', icon: '🇺🇸', description: 'Preparado para HIPAA' },
  { name: 'SSL/HTTPS', icon: '🔐', description: 'Conexiones encriptadas' },
  { name: 'SOC 2', icon: '🛡️', description: 'Estándares de seguridad' },
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
          Tecnologías de vanguardia (2024) seleccionadas por su rendimiento, escalabilidad y ecosistema activo
        </p>

        {/* Certificaciones */}
        <div className="certifications-section reveal-on-scroll">
          <h3 className="certifications-title">Certificaciones y Estándares</h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-badge">
                <span className="certification-icon">{cert.icon}</span>
                <div className="certification-content">
                  <h4 className="certification-name">{cert.name}</h4>
                  <p className="certification-description">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categorías de Tecnologías con Logos y Gráficos */}
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
                        {item.description && (
                          <span className="tech-item-description">{item.description}</span>
                        )}
                      </div>
                      {item.usage !== undefined && (
                        <span className="tech-item-usage">{item.usage}%</span>
                      )}
                    </div>
                    {item.usage !== undefined && (
                      <div className="tech-usage-bar">
                        <div 
                          className="tech-usage-fill" 
                          style={{ 
                            width: `${item.usage}%`,
                            '--category-color': category.color 
                          } as React.CSSProperties}
                        />
                      </div>
                    )}
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
