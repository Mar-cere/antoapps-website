'use client';

import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import '@/styles/components/button-variants.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'disabled' | 'className' | 'children'> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & {
    as: 'link';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  const baseClasses = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${loading ? 'btn-loading' : ''} ${className}`.trim();

  const content = (
    <>
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && <span className="btn-icon btn-icon-left">{icon}</span>}
      <span className="btn-text">{children}</span>
      {icon && iconPosition === 'right' && !loading && <span className="btn-icon btn-icon-right">{icon}</span>}
    </>
  );

  if (props.as === 'link' && 'href' in props) {
    const { as, href, target, rel, ...linkProps } = props;
    return (
      <Link href={href} className={baseClasses} target={target} rel={rel} {...(linkProps as any)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled || loading} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
