import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import HtmlLang from '@/components/i18n/HtmlLang';
import { ToastProvider } from '@/components/ui/ToastContainer';
import ClarityAnalytics from '@/components/Clarity';
import { htmlLanguage, isLegalLocale } from '@/lib/i18n/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/** Metadatos mínimos: la marca Anto vive en `app/(site)/layout.tsx` y en cada página. */
export const metadata: Metadata = {
  title: {
    default: 'Anto',
    template: '%s',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#101216',
  viewportFit: 'cover' as const,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const headerLocale = headersList.get('x-locale') || 'es';
  const locale = isLegalLocale(headerLocale) ? headerLocale : 'es';

  return (
    <html lang={htmlLanguage(locale)} className={inter.variable}>
      <body className={inter.className}>
        <ClarityAnalytics />
        <HtmlLang />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
