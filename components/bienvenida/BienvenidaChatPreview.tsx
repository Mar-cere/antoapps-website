export default function BienvenidaChatPreview() {
  return (
    <div className="lad-chat-preview" aria-label="Ejemplo de conversación en Anto">
      <p className="lad-chat-preview-label">Así se siente por dentro</p>
      <div className="lad-chat-preview-thread">
        <div className="lad-chat-bubble lad-chat-bubble--user">
          <p>no puedo parar de pensar en todo malo</p>
        </div>
        <div className="lad-chat-bubble lad-chat-bubble--anto">
          <p>
            Suena agotador. ¿Qué es lo que más pesa ahora mismo: el miedo, la culpa o la
            incertidumbre?
          </p>
        </div>
      </div>
    </div>
  );
}
