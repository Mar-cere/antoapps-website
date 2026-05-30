import type { Metadata } from 'next';
import AppPageContent from '@/components/pages/AppPageContent';
import { appPageMetadata } from '@/lib/i18n/copy/app';
import { APP_VERSION_LABEL } from '@/lib/app-version';

const meta = appPageMetadata('en');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description.replace('{versionLabel}', APP_VERSION_LABEL),
  alternates: {
    canonical: 'https://antoapps.com/en/app',
    languages: {
      es: 'https://antoapps.com/app',
      en: 'https://antoapps.com/en/app',
      'x-default': 'https://antoapps.com/app',
    },
  },
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
    locale: 'en_US',
  },
};

export default function AppPageEn() {
  return <AppPageContent locale="en" />;
}
