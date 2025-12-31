'use client';

import '@/styles/utilities/enhanced-microinteractions.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`spinner-elegant ${sizeClasses[size]} ${className}`} aria-label="Cargando">
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

interface DotsLoaderProps {
  className?: string;
}

export function DotsLoader({ className = '' }: DotsLoaderProps) {
  return (
    <div className={`dots-loader ${className}`} aria-label="Cargando">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export function SkeletonLoader({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  rounded = true 
}: SkeletonLoaderProps) {
  return (
    <div
      className={`skeleton-loader ${rounded ? 'rounded' : ''} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`progress-bar-elegant ${className}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div
        style={{ width: `${progress}%` }}
        className="progress-fill"
      />
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay-elegant">
      {children || <LoadingSpinner size="lg" />}
    </div>
  );
}

