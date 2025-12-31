'use client';

import { ReactNode } from 'react';
import '@/styles/components/cards.css';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  interactive?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
}

interface CardContentProps {
  children: ReactNode;
}

interface CardFooterProps {
  children: ReactNode;
}

interface CardActionsProps {
  children: ReactNode;
}

export function Card({
  variant = 'default',
  size = 'md',
  interactive = false,
  children,
  className = '',
  onClick,
}: CardProps) {
  const cardClasses = `card card-${variant} card-${size} ${interactive ? 'card-interactive' : ''} ${className}`.trim();

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, children }: CardHeaderProps) {
  if (children) {
    return <div className="card-header">{children}</div>;
  }

  return (
    <div className="card-header">
      <div>
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children }: CardContentProps) {
  return <div className="card-content">{children}</div>;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className="card-footer">{children}</div>;
}

export function CardActions({ children }: CardActionsProps) {
  return <div className="card-actions">{children}</div>;
}

