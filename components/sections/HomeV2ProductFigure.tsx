import { productScreenSrc, type ProductScreenKind } from '@/lib/assets/product-screens';
import type { Locale } from '@/lib/i18n/config';
import type { HomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type ProductCopy = HomeV2Copy['product'];

function FullScreenLink({
  locale,
  kind,
  label,
}: {
  locale: Locale;
  kind: ProductScreenKind;
  label: string;
}) {
  return (
    <a
      className="home-v2-excerpt__full"
      href={productScreenSrc(locale, kind)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

type HomeV2ChatExcerptProps = {
  locale: Locale;
  product: ProductCopy;
  showScreen: boolean;
};

/** Fragmento de chat en texto. La captura real es un enlace, no el diseño. */
export function HomeV2ChatExcerpt({ locale, product, showScreen }: HomeV2ChatExcerptProps) {
  return (
    <div className="home-v2-excerpt home-v2-excerpt--chat">
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
      {showScreen ? (
        <FullScreenLink locale={locale} kind="chat" label={product.fullScreen} />
      ) : null}
    </div>
  );
}

type HomeV2GuideExcerptProps = {
  locale: Locale;
  product: ProductCopy;
  showScreen: boolean;
};

/** Micro-guía en texto, dentro de la sección de técnicas. */
export function HomeV2GuideExcerpt({ locale, product, showScreen }: HomeV2GuideExcerptProps) {
  return (
    <div className="home-v2-excerpt home-v2-excerpt--guide">
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
      {showScreen ? (
        <FullScreenLink locale={locale} kind="guide" label={product.fullScreen} />
      ) : null}
    </div>
  );
}
