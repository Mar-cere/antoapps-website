import type { Metadata } from 'next';
import HomePageContent from '@/components/pages/HomePageContent';

const baseUrl = 'https://antoapps.com';

export const metadata: Metadata = {
  title: 'Anto — Your 24/7 emotional support | Mental wellness with AI',
  description:
    'When you feel overwhelmed, write what you are going through and get clear, practical guidance in seconds. 1-day free trial on iPhone.',
  alternates: {
    canonical: `${baseUrl}/en`,
    languages: {
      es: baseUrl,
      en: `${baseUrl}/en`,
      'x-default': baseUrl,
    },
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/en`,
    title: 'Anto — Your 24/7 emotional support',
    description:
      'Mental wellness app with AI. Available 24/7. Try free for 1 day on iPhone.',
    siteName: 'Anto',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anto — Your 24/7 emotional support',
    description: 'Mental wellness app with AI. Try free for 1 day on iPhone.',
  },
};

export default function HomeEn() {
  return <HomePageContent locale="en" />;
}
