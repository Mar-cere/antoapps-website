import Link from 'next/link';

export default function CTA() {
  return (
    <section id="descargar" className="cta" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">¿Listo para comenzar?</h2>
        <p className="section-subtitle reveal-on-scroll">
          Descarga Anto ahora y comienza tu viaje hacia el bienestar mental
        </p>
        <div className="cta-buttons">
          <Link href="#" className="btn btn-primary btn-large">
            Descargar Ahora
          </Link>
          <Link href="/privacidad" className="btn btn-secondary btn-large">
            Ver Política de Privacidad
          </Link>
        </div>
      </div>
    </section>
  );
}

