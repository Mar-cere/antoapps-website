import { StarIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';

type AppReviewCardProps = {
  quote: string;
  author: string;
  source: string;
  starsAria: string;
  className?: string;
};

export default function AppReviewCard({
  quote,
  author,
  source,
  starsAria,
  className = '',
}: AppReviewCardProps) {
  return (
    <figure className={`app-review-card ${className}`.trim()}>
      <div className="app-review-card__stars" aria-label={starsAria}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <blockquote className="app-review-card__quote">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="app-review-card__author">
        {author} · {source}
      </figcaption>
    </figure>
  );
}
