import Link from 'next/link';
import { ReactNode } from 'react';

interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

/**
 * Componente Link optimizado con prefetching inteligente
 * Prefetch automático para enlaces internos en viewport
 */
export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  ariaLabel,
  onClick,
}: OptimizedLinkProps) {
  // Solo prefetch para enlaces internos
  const isInternal = href.startsWith('/') || href.startsWith('#');
  
  return (
    <Link
      href={href}
      className={className}
      prefetch={isInternal && prefetch ? undefined : false}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

