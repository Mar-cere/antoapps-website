import Image from 'next/image';

export default function BienvenidaAppPreview() {
  return (
    <div className="lad-app-preview" aria-label="Vista previa de la app Anto">
      <p className="lad-app-preview-kicker">Así se ve por dentro</p>

      <div className="lad-app-screen">
        <div className="lad-app-screen-status" aria-hidden="true">
          <span>Anto</span>
        </div>

        <header className="lad-app-screen-header">
          <Image
            src="/assets/images/antoIcon.png"
            alt=""
            width={24}
            height={24}
            className="lad-app-screen-logo"
          />
          <span className="lad-app-screen-title">Anto</span>
        </header>

        <div className="lad-app-screen-body">
          <div className="lad-app-msg lad-app-msg--user">
            <p>no puedo parar de pensar en todo malo</p>
          </div>
          <div className="lad-app-msg lad-app-msg--anto">
            <p>
              Suena agotador. ¿Qué pesa más ahora: el miedo, la culpa o la incertidumbre?
            </p>
          </div>
          <div className="lad-app-action" aria-hidden="true">
            <span className="lad-app-action-icon">✦</span>
            <span>Un micro-paso concreto para hoy</span>
          </div>
        </div>

        <div className="lad-app-screen-input" aria-hidden="true">
          <span className="lad-app-screen-input-placeholder">Escribe un mensaje…</span>
          <span className="lad-app-screen-input-send">↑</span>
        </div>
      </div>
    </div>
  );
}
