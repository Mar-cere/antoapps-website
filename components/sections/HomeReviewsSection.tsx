'use client';

import AppReviewCard from '@/components/ui/AppReviewCard';
import type { Locale } from '@/lib/i18n/config';
import {
  getHomeLandingFinalCopy,
  getHomeLandingReviews,
} from '@/lib/i18n/copy/home/landing-final';

type HomeReviewsSectionProps = {
  locale?: Locale;
};

export default function HomeReviewsSection({ locale = 'es' }: HomeReviewsSectionProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const reviews = getHomeLandingReviews(locale);
  const { reviews: section } = copy;

  return (
    <section className="home-landing-reviews" aria-labelledby="home-reviews-title" data-fade-section>
      <div className="home-landing-reviews__head reveal-on-scroll">
        <p className="home-landing-eyebrow">{section.eyebrow}</p>
        <h2 id="home-reviews-title" className="home-landing-reviews__title">
          {section.title}
        </h2>
        <p className="home-landing-reviews__source">{section.sourceLabel}</p>
      </div>
      <ul className="home-landing-reviews__grid">
        {reviews.map((review) => (
          <li key={review.author} className="reveal-on-scroll" data-stagger-item>
            <AppReviewCard
              quote={review.quote}
              author={review.author}
              source="App Store"
              starsAria={section.starsAria}
              className="home-landing-reviews__card"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
