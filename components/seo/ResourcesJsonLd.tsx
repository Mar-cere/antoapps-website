import type { Locale } from '@/lib/i18n/config';
import { getResourcesCollectionJsonLd } from '@/lib/i18n/copy/seo/resources-json-ld';

type ResourcesJsonLdProps = {
  locale: Locale;
};

export default function ResourcesJsonLd({ locale }: ResourcesJsonLdProps) {
  const block = getResourcesCollectionJsonLd(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
    />
  );
}
