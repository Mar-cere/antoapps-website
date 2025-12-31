'use client';

import '@/styles/components/tech-challenges.css';

interface Challenge {
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  impact: string;
  icon: string;
}

const challenges: Challenge[] = [
  {
    title: 'Optimización de Tiempo de Respuesta de IA',
    problem: 'Las respuestas de OpenAI API tomaban 5-8 segundos, afectando la experiencia del usuario.',
    solution: 'Implementé caché inteligente de respuestas similares, optimización de prompts, y procesamiento asíncrono con WebSockets para feedback inmediato.',
    technologies: ['OpenAI API', 'MongoDB', 'Socket.IO', 'Redis Cache'],
    impact: 'Reducción de 5-8s a <2.5s promedio, mejorando significativamente la UX.',
    icon: '⚡'
  },
  {
    title: 'Sistema de Detección de Crisis en Tiempo Real',
    problem: 'Necesidad de detectar patrones de riesgo en conversaciones sin comprometer la privacidad.',
    solution: 'Algoritmo de análisis de sentimiento en tiempo real con procesamiento local, activación automática de protocolos de emergencia vía Twilio y SendGrid.',
    technologies: ['NLP', 'Twilio', 'SendGrid', 'Node.js'],
    impact: 'Detección proactiva de crisis con respuesta automática en <30 segundos.',
    icon: '🚨'
  },
  {
    title: 'Escalabilidad de WebSockets',
    problem: 'Manejo de múltiples conexiones simultáneas sin degradación de performance.',
    solution: 'Implementación de Socket.IO con clustering, balanceo de carga, y gestión eficiente de memoria con cleanup automático de conexiones inactivas.',
    technologies: ['Socket.IO', 'Node.js Clustering', 'PM2', 'MongoDB'],
    impact: 'Soporte para 1000+ conexiones simultáneas sin pérdida de performance.',
    icon: '📡'
  },
  {
    title: 'Seguridad de Datos Sensibles',
    problem: 'Protección de conversaciones terapéuticas con información altamente sensible.',
    solution: 'Encriptación end-to-end con AES-256, autenticación JWT robusta, validación exhaustiva con Joi, y cumplimiento estricto de GDPR/HIPAA.',
    technologies: ['AES-256', 'JWT', 'bcrypt', 'Helmet.js', 'Joi'],
    impact: 'A+ Security Score, cero vulnerabilidades críticas, cumplimiento total de regulaciones.',
    icon: '🔒'
  }
];

export default function TechChallenges() {
  return (
    <section id="desafios-tecnicos" className="tech-challenges" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Desafíos Técnicos Resueltos</h2>
        <p className="section-subtitle reveal-on-scroll">
          Problemas complejos resueltos con soluciones innovadoras y tecnologías modernas
        </p>

        <div className="challenges-grid" data-stagger>
          {challenges.map((challenge, index) => (
            <div key={index} className="challenge-card reveal-on-scroll" data-stagger-item>
              <div className="challenge-header">
                <div className="challenge-icon">{challenge.icon}</div>
                <h3 className="challenge-title">{challenge.title}</h3>
              </div>
              
              <div className="challenge-content">
                <div className="challenge-section">
                  <h4 className="challenge-section-title">Problema</h4>
                  <p className="challenge-text">{challenge.problem}</p>
                </div>
                
                <div className="challenge-section">
                  <h4 className="challenge-section-title">Solución</h4>
                  <p className="challenge-text">{challenge.solution}</p>
                </div>
                
                <div className="challenge-section">
                  <h4 className="challenge-section-title">Tecnologías</h4>
                  <div className="challenge-tech-badges">
                    {challenge.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="challenge-impact">
                  <strong>Impacto:</strong> {challenge.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

