import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = 'https://antoapps.com/assets/images/antoIcon.png',
  type = 'website',
  noindex = false,
}: SEOProps): Metadata {
  const url = `https://antoapps.com${path}`;
  const fullTitle = path ? `${title} - Anto` : title;

  return {
    title: fullTitle,
    description,
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: 'Anto',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}

