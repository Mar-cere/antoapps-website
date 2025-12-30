'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import Tabs from '@/components/ui/Tabs';

export default function Benefits() {
  useScrollAnimations();

  const benefits = {
    usuarios: [
      {
        title: 'Acceso Inmediato 24/7',
        description:
          'Sin esperas, sin citas, disponible cuando lo necesites. El asistente AI está siempre disponible, incluso en horarios nocturnos o fines de semana cuando otros servicios no están disponibles.',
      },
      {
        title: 'Privacidad Garantizada',
        description:
          'Tus conversaciones son completamente confidenciales con encriptación de extremo a extremo. Nunca compartimos tu información y cumplimos con todas las regulaciones de protección de datos.',
      },
      {
        title: 'Personalización Total',
        description:
          'Respuestas adaptadas a tu situación y necesidades específicas. El sistema aprende de ti y se adapta a tu estilo de comunicación, historial emocional y preferencias personales.',
      },
      {
        title: 'Herramientas Prácticas',
        description:
          'Más de 100 ejercicios y técnicas que puedes aplicar en tu día a día, incluyendo mindfulness, meditación, técnicas de respiración y ejercicios de relajación diseñados por profesionales.',
      },
      {
        title: 'Seguimiento de Progreso',
        description:
          'Visualiza tu bienestar emocional a lo largo del tiempo con gráficos detallados, reportes semanales y mensuales, e insights personalizados sobre tu progreso.',
      },
      {
        title: 'Detección Proactiva de Crisis',
        description:
          'El sistema identifica señales de riesgo y te ofrece recursos inmediatos, líneas de ayuda, y apoyo de emergencia cuando lo necesites.',
      },
    ],
    profesionales: [
      {
        title: 'Complemento Terapéutico',
        description:
          'Herramienta de apoyo entre sesiones para tus pacientes. Permite que tus pacientes tengan acceso a apoyo continuo y herramientas de bienestar cuando no están en sesión contigo.',
      },
      {
        title: 'Seguimiento Continuo',
        description:
          'Monitoreo del progreso emocional de tus pacientes con reportes agregados y anonimizados. Visualiza tendencias y patrones que pueden enriquecer tus sesiones.',
      },
      {
        title: 'Alertas de Crisis',
        description:
          'Notificaciones tempranas para intervención oportuna. Recibe alertas cuando el sistema detecta señales de riesgo en tus pacientes, permitiéndote intervenir proactivamente.',
      },
      {
        title: 'Dashboard Profesional',
        description:
          'Accede a un panel de control completo con analytics, reportes detallados, y herramientas de gestión para múltiples pacientes de forma segura y privada.',
      },
      {
        title: 'Integración con Práctica',
        description:
          'Los pacientes pueden compartir sus reportes y análisis contigo de forma segura, enriqueciendo vuestras sesiones con datos objetivos sobre su bienestar.',
      },
    ],
    organizaciones: [
      {
        title: 'Bienestar Corporativo Integral',
        description:
          'Mejora el bienestar mental de tu equipo con acceso 24/7 a apoyo emocional. Ofrece a tus empleados una herramienta discreta y accesible para gestionar su salud mental.',
      },
      {
        title: 'Reducción de Ausentismo',
        description:
          'Estudios muestran que el acceso a herramientas de salud mental reduce significativamente los días de baja. Organizaciones que usan Anto reportan hasta un 30% de reducción en ausentismo relacionado con salud mental.',
      },
      {
        title: 'Dashboard de Analytics',
        description:
          'Insights agregados y anonimizados sobre el bienestar de tu organización. Identifica tendencias, áreas de mejora, y el impacto de tus programas de bienestar sin comprometer la privacidad individual.',
      },
      {
        title: 'Gestión Centralizada',
        description:
          'Administra usuarios, configura políticas de uso, y gestiona suscripciones desde un panel centralizado. Ideal para departamentos de RRHH y programas de bienestar corporativo.',
      },
      {
        title: 'ROI Medible',
        description:
          'Mide el retorno de inversión de tus programas de bienestar con métricas claras: reducción de ausentismo, mejora de productividad, y satisfacción de empleados.',
      },
      {
        title: 'Privacidad Garantizada',
        description:
          'Los datos individuales nunca son accesibles. Solo recibes reportes agregados y anonimizados que respetan completamente la privacidad de tus empleados.',
      },
    ],
  };

  const tabs = [
    {
      id: 'usuarios',
      label: 'Para Usuarios',
      content: (
        <div className="benefits-list">
          {benefits.usuarios.map((benefit, index) => (
            <div key={index} className="benefit-item" data-stagger-item>
              <span className="check-icon">✓</span>
              <div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'profesionales',
      label: 'Para Profesionales',
      content: (
        <div className="benefits-list">
          {benefits.profesionales.map((benefit, index) => (
            <div key={index} className="benefit-item" data-stagger-item>
              <span className="check-icon">✓</span>
              <div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'organizaciones',
      label: 'Para Organizaciones',
      content: (
        <div className="benefits-list">
          {benefits.organizaciones.map((benefit, index) => (
            <div key={index} className="benefit-item" data-stagger-item>
              <span className="check-icon">✓</span>
              <div>
                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="beneficios" className="benefits" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Beneficios para Todos</h2>
        <p className="section-subtitle reveal-on-scroll">
          Anto ofrece beneficios únicos según tus necesidades. Descubre cómo podemos ayudarte.
        </p>
        <Tabs tabs={tabs} defaultTab="usuarios" />
      </div>
    </section>
  );
}

