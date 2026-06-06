import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaTestimonialProps = {
  copy: BienvenidaCopy['testimonial'];
};

export default function BienvenidaTestimonial({ copy }: BienvenidaTestimonialProps) {
  return (
    <figure className="lad-testimonial">
      <blockquote cite="https://apps.apple.com">
        <p className="lad-testimonial-quote">&ldquo;{copy.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="lad-testimonial-author">{copy.attribution}</figcaption>
    </figure>
  );
}
