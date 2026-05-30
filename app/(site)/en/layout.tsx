import type { Metadata } from 'next';
import { manifestPath, siteKeywords } from '@/lib/i18n/copy/seo/site-metadata';

export const metadata: Metadata = {
  keywords: siteKeywords.en,
  manifest: manifestPath.en,
};

export default function EnSiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
