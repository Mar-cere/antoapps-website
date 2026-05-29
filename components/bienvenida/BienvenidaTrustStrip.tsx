import { APP_STORE_RATING_SHORT } from '@/lib/app-store-social-proof';

export default function BienvenidaTrustStrip() {
  return (
    <p className="lad-trust-strip" aria-label="Señales de confianza">
      <span>{APP_STORE_RATING_SHORT}</span>
      <span className="lad-trust-strip-sep" aria-hidden="true">
        ·
      </span>
      <span>Disponible en iPhone</span>
    </p>
  );
}
