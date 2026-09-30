import type { HomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type ProductCopy = HomeV2Copy['product'];

type HomeV2ChatExcerptProps = {
  product: ProductCopy;
};

/** Fragmento de chat en texto. */
export function HomeV2ChatExcerpt({ product }: HomeV2ChatExcerptProps) {
  return (
    <div className="home-v2-excerpt home-v2-excerpt--chat" data-home-reveal>
      <ol className="home-v2-thread">
        {product.chat.map((message) => (
          <li
            key={message.text}
            className={`home-v2-thread__item home-v2-thread__item--${message.role}`}
          >
            <span className="sr-only">
              {message.role === 'user' ? product.youLabel : product.antoLabel}
            </span>
            <p>{message.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

type HomeV2GuideExcerptProps = {
  product: ProductCopy;
};

/** Micro-guía en texto, dentro de la sección de técnicas. */
export function HomeV2GuideExcerpt({ product }: HomeV2GuideExcerptProps) {
  return (
    <div className="home-v2-excerpt home-v2-excerpt--guide" data-home-reveal data-home-delay="1">
      <p className="home-v2-guide__kicker">{product.guideKicker}</p>
      <p className="home-v2-guide__title">{product.guideTitle}</p>
      <p className="home-v2-guide__dek">{product.guideDek}</p>
      <ol className="home-v2-guide__steps">
        {product.guideSteps.map((step, index) => (
          <li key={step.title}>
            <span className="home-v2-guide__index" aria-hidden="true">
              {index + 1}
            </span>
            <span>
              <span className="home-v2-guide__step-title">{step.title}</span>
              <span className="home-v2-guide__step-body">{step.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="home-v2-excerpt__links">
        <a className="home-v2-excerpt__full" href={product.guideRead.href}>
          {product.guideRead.label}
        </a>
      </p>
    </div>
  );
}
