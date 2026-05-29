import { APP_STORE_RATING_LINE, APP_STORE_RATING_SHORT } from '@/lib/app-store-social-proof';

export default function BienvenidaStoreRating() {
  return (
    <div className="lad-store-rating" aria-label="Valoración en App Store">
      <p className="lad-store-rating-stars">{APP_STORE_RATING_SHORT}</p>
      <p className="lad-store-rating-line">{APP_STORE_RATING_LINE}</p>
    </div>
  );
}
