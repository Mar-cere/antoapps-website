import type { Metadata } from 'next';
import AppPageContent from '@/components/pages/AppPageContent';
import { appPageMetadata } from '@/lib/i18n/copy/app';
import { APP_VERSION_LABEL } from '@/lib/app-version';

const meta = appPageMetadata('es');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description.replace('{versionLabel}', APP_VERSION_LABEL),
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
  },
};

export default function AppPage() {
  return <AppPageContent locale="es" />;
}
