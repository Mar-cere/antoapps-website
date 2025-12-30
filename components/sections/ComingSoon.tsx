'use client';

export default function ComingSoon() {
  return (
    <section id="proximamente" className="coming-soon" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Próximamente</h2>
        <p className="section-subtitle reveal-on-scroll">
          Estamos trabajando constantemente para mejorar Anto. Estas son algunas funcionalidades que llegarán
          pronto:
        </p>

        <div className="coming-soon-grid" data-stagger>
          <div className="coming-soon-card reveal-on-scroll" data-stagger-item>
            <div className="coming-soon-icon">📴</div>
            <h3>Modo Offline</h3>
            <p>
              Usa Anto sin conexión a internet. Guarda conversaciones localmente y sincroniza cuando tengas
              conexión.
            </p>
          </div>

          <div className="coming-soon-card reveal-on-scroll" data-stagger-item>
            <div className="coming-soon-icon">⌚</div>
            <h3>Integración con Wearables</h3>
            <p>
              Conecta con Apple Watch, Fitbit y otros dispositivos para monitoreo continuo de bienestar.
            </p>
          </div>

          <div className="coming-soon-card reveal-on-scroll" data-stagger-item>
            <div className="coming-soon-icon">👥</div>
            <h3>Comunidad de Usuarios</h3>
            <p>Conecta con otros usuarios en un espacio seguro y moderado (opcional).</p>
          </div>

          <div className="coming-soon-card reveal-on-scroll" data-stagger-item>
            <div className="coming-soon-icon">🎁</div>
            <h3>Sistema de Referidos</h3>
            <p>Invita amigos y obtén beneficios. Programa de fidelización con recompensas.</p>
          </div>

          <div className="coming-soon-card reveal-on-scroll" data-stagger-item>
            <div className="coming-soon-icon">👨‍⚕️</div>
            <h3>Integración con Profesionales</h3>
            <p>Conecta directamente con terapeutas y profesionales de salud mental licenciados.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

