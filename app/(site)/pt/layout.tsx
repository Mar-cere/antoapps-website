import type { Metadata, Viewport } from 'next';
import { manifestPath, siteKeywords } from '@/lib/i18n/copy/seo/site-metadata';

export const metadata: Metadata = {
  keywords: siteKeywords.pt,
  manifest: manifestPath.pt,
};

export const viewport: Viewport = {
  themeColor: '#101216',
};

export default function PtSiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
