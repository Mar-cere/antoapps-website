import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaReviewsProps = {
  copy: BienvenidaCopy['reviews'];
};

export default function BienvenidaReviews({ copy }: BienvenidaReviewsProps) {
  return (
    <section className="lad-reviews" aria-labelledby="lad-reviews-title">
      <div className="lad-reviews-header">
        <h2 id="lad-reviews-title" className="lad-reviews-title">
          {copy.sectionTitle}
        </h2>
        <p className="lad-reviews-source">{copy.sourceLabel}</p>
      </div>
      <ul className="lad-reviews-list">
        {copy.items.map((review) => (
          <li key={`${review.author}-${review.quote.slice(0, 24)}`} className="lad-review-card">
            <p className="lad-review-stars" aria-label={copy.starsAria}>
              <span aria-hidden="true">★★★★★</span>
            </p>
            <blockquote cite="https://apps.apple.com">
              <p className="lad-review-quote">&ldquo;{review.quote}&rdquo;</p>
            </blockquote>
            <p className="lad-review-author">{review.author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
