import { StarIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaV2HeroReviewProps = {
  copy: BienvenidaCopy;
};

export default function BienvenidaV2HeroReview({ copy }: BienvenidaV2HeroReviewProps) {
  const review = copy.v2.heroReview;

  return (
    <figure className="lad-v2-review">
      <div className="lad-v2-review__stars" aria-label={copy.reviews.starsAria}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <blockquote className="lad-v2-review__quote">&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption className="lad-v2-review__author">
        {review.author} · {review.source}
      </figcaption>
    </figure>
  );
}
