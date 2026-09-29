import Image from 'next/image';
import { productScreenSrc, type ProductScreenKind } from '@/lib/assets/product-screens';
import type { Locale } from '@/lib/i18n/config';

type HomeV2ProductFigureProps = {
  locale: Locale;
  kind: ProductScreenKind;
  caption: string;
  alt: string;
  frameClassName?: string;
};

/** Captura actual, sin marco de marketing. El borde lo pone la página. */
export default function HomeV2ProductFigure({
  locale,
  kind,
  caption,
  alt,
  frameClassName = '',
}: HomeV2ProductFigureProps) {
  return (
    <figure className={`home-v2-product ${frameClassName}`.trim()} data-home-reveal="image">
      <div className="home-v2-product__frame">
        <Image
          src={productScreenSrc(locale, kind)}
          alt={alt}
          fill
          className="home-v2-product__img"
          sizes="(max-width: 959px) 86vw, 26rem"
          quality={90}
        />
      </div>
      <figcaption className="home-v2-product__caption">{caption}</figcaption>
    </figure>
  );
}
