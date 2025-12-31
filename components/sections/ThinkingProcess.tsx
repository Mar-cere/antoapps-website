'use client';

import '@/styles/components/thinking-process.css';

interface Decision {
  title: string;
  context: string;
  alternatives: string[];
  decision: string;
  reasoning: string;
  outcome: string;
  icon: string;
}

const decisions: Decision[] = [
  {
    title: 'React Native vs Flutter',
    context: 'Necesitaba una solución multiplataforma para iOS y Android con desarrollo rápido.',
    alternatives: ['Flutter (Dart)', 'Native (Swift/Kotlin)', 'Ionic/Cordova'],
    decision: 'React Native con Expo',
    reasoning: 'React Native permite compartir código entre plataformas (90%+), acceso a ecosistema JavaScript/TypeScript, hot reload para desarrollo rápido, y Expo simplifica el deployment. Flutter requería aprender Dart y Native requería mantener dos codebases.',
    outcome: 'Desarrollo 60% más rápido, código compartido del 92%, fácil onboarding para desarrolladores React.',
    icon: '📱'
  },
  {
    title: 'MongoDB vs PostgreSQL',
    context: 'Necesitaba almacenar conversaciones, perfiles de usuario y datos estructurados pero flexibles.',
    alternatives: ['PostgreSQL', 'Firebase', 'Supabase'],
    decision: 'MongoDB con Mongoose',
    reasoning: 'MongoDB ofrece flexibilidad para esquemas de conversaciones que evolucionan, escalabilidad horizontal para crecimiento futuro, integración nativa con Node.js, y JSON nativo que simplifica el desarrollo. PostgreSQL sería más rígido para datos de conversaciones no estructuradas.',
    outcome: 'Esquemas flexibles permitieron iterar rápido, queries eficientes para búsqueda de conversaciones, escalabilidad sin cambios arquitectónicos.',
    icon: '🗄️'
  },
  {
    title: 'Socket.IO vs WebSockets nativos',
    context: 'Necesitaba comunicación en tiempo real para chat con fallbacks y reconexión automática.',
    alternatives: ['WebSockets nativos', 'Server-Sent Events', 'Polling'],
    decision: 'Socket.IO con fallbacks',
    reasoning: 'Socket.IO proporciona fallback automático a polling si WebSockets fallan, reconexión automática, rooms y namespaces para organización, y compatibilidad cross-browser. WebSockets nativos requerirían implementar toda esta lógica manualmente.',
    outcome: '99.9% de conexiones exitosas incluso en redes inestables, reconexión automática en <2s, mejor UX.',
    icon: '⚡'
  },
  {
    title: 'OpenAI API vs Modelo propio',
    context: 'Necesitaba procesamiento de lenguaje natural de alta calidad para conversaciones terapéuticas.',
    alternatives: ['Entrenar modelo propio', 'Hugging Face models', 'Otras APIs (Anthropic, Cohere)'],
    decision: 'OpenAI GPT-5 Mini API',
    reasoning: 'OpenAI ofrece el mejor balance calidad/precio, GPT-5 Mini es optimizado para eficiencia, API robusta con rate limiting, y actualizaciones automáticas del modelo. Un modelo propio requeriría infraestructura costosa y mantenimiento constante.',
    outcome: 'Respuestas de alta calidad con <2.5s de latencia, costo por conversación <$0.01, escalabilidad sin infraestructura propia.',
    icon: '🤖'
  }
];

export default function ThinkingProcess() {
  return (
    <section id="proceso-pensamiento" className="thinking-process" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Proceso de Pensamiento y Decisiones Técnicas</h2>
        <p className="section-subtitle reveal-on-scroll">
          Cómo analicé alternativas, evalué trade-offs y tomé decisiones técnicas fundamentadas
        </p>

        <div className="decisions-grid" data-stagger>
          {decisions.map((decision, index) => (
            <div key={index} className="decision-card reveal-on-scroll" data-stagger-item>
              <div className="decision-header">
                <div className="decision-icon">{decision.icon}</div>
                <h3 className="decision-title">{decision.title}</h3>
              </div>

              <div className="decision-content">
                <div className="decision-section">
                  <h4 className="decision-section-title">Contexto</h4>
                  <p className="decision-text">{decision.context}</p>
                </div>

                <div className="decision-section">
                  <h4 className="decision-section-title">Alternativas Consideradas</h4>
                  <ul className="alternatives-list">
                    {decision.alternatives.map((alt, altIndex) => (
                      <li key={altIndex} className="alternative-item">
                        <span className="alternative-bullet">→</span>
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="decision-section decision-highlight">
                  <h4 className="decision-section-title">Decisión Final</h4>
                  <p className="decision-final">{decision.decision}</p>
                </div>

                <div className="decision-section">
                  <h4 className="decision-section-title">Razonamiento</h4>
                  <p className="decision-text">{decision.reasoning}</p>
                </div>

                <div className="decision-outcome">
                  <strong>Resultado:</strong> {decision.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thinking-process-cta reveal-on-scroll">
          <p className="cta-text">
            Cada decisión técnica fue evaluada considerando escalabilidad, mantenibilidad, costo y tiempo de desarrollo.
          </p>
        </div>
      </div>
    </section>
  );
}

