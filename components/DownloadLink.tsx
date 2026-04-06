import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { isExternalStoreUrl } from '@/lib/download-links';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function DownloadLink({ href, children, className, ...rest }: Props) {
  if (isExternalStoreUrl(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
