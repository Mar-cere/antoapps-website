'use client';

import AppReviewCard from '@/components/ui/AppReviewCard';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingReviews } from '@/lib/i18n/copy/home/landing-final';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2ReviewsProps = {
  locale?: Locale;
};

/** Reviews con la misma voz editorial; sin eyebrow de plantilla. */
export default function HomeV2Reviews({ locale = 'es' }: HomeV2ReviewsProps) {
  const { reviews: section } = getHomeV2Copy(locale);
  const reviews = getHomeLandingReviews(locale);

  return (
    <section className="home-v2-reviews" aria-labelledby="home-v2-reviews-title" data-fade-section>
      <div className="home-landing-container">
        <div className="home-v2-reviews__head reveal-on-scroll">
          <h2 id="home-v2-reviews-title" className="home-v2-reviews__title">
            {section.title}
          </h2>
          <p className="home-v2-reviews__source">{section.sourceLabel}</p>
        </div>
        <ul className="home-v2-reviews__grid">
          {reviews.map((review) => (
            <li key={review.author} className="reveal-on-scroll" data-stagger-item>
              <AppReviewCard
                quote={review.quote}
                author={review.author}
                source="App Store"
                starsAria={section.starsAria}
                className="home-v2-reviews__card"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
