'use client';

export default function Values() {
  return (
    <section id="valores" className="values" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Nuestros Valores</h2>
        <p className="section-subtitle reveal-on-scroll">
          Los principios que guían todo lo que hacemos en Anto
        </p>
        <div className="values-grid" data-stagger>
          <div className="value-card" data-stagger-item data-magnetic="0.1">
            <div className="value-icon">💚</div>
            <h3>Empatía</h3>
            <p>
              Entendemos que cada persona es única. Nuestro asistente AI está entrenado para reconocer y
              responder a las emociones humanas con genuina empatía, validando las experiencias emocionales
              de cada usuario.
            </p>
          </div>
          <div className="value-card" data-stagger-item data-magnetic="0.1">
            <div className="value-icon">🛡️</div>
            <h3>Privacidad</h3>
            <p>
              Tu información es sagrada. Encriptación de extremo a extremo, cumplimiento estricto de GDPR y
              HIPAA, y política de cero compartir datos. Tu privacidad no es negociable.
            </p>
          </div>
          <div className="value-card" data-stagger-item data-magnetic="0.1">
            <div className="value-icon">💡</div>
            <h3>Innovación</h3>
            <p>
              Utilizamos tecnología de vanguardia para ofrecerte la mejor experiencia. Mejoras constantes del
              asistente AI y aplicación de los últimos avances en tecnología de salud mental.
            </p>
          </div>
          <div className="value-card" data-stagger-item data-magnetic="0.1">
            <div className="value-icon">🤝</div>
            <h3>Accesibilidad</h3>
            <p>
              El bienestar mental debe estar al alcance de todos. Planes accesibles e interfaz intuitiva
              para usuarios de todos los niveles.
            </p>
          </div>
        </div>
        <div className="home-callout home-callout--accent">
          <h3 className="home-callout__title">Nuestra Misión</h3>
          <p className="home-callout__text home-callout__text--narrow">
            Democratizar el acceso a la salud mental de calidad. Utilizamos la tecnología para amplificar
            nuestra capacidad de ayudar a más personas, más rápido, y de manera más accesible. Cada
            conversación nos acerca más a un mundo donde la salud mental es una prioridad, no un lujo.
          </p>
        </div>
      </div>
    </section>
  );
}

