'use client';

import '@/styles/components/loading-spinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner-wrapper ${className}`}>
      <div className={`loading-spinner loading-spinner-${size}`} aria-label="Cargando">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <p className="loading-spinner-text">{text}</p>}
    </div>
  );
}

