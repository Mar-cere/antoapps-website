'use client';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  animated?: boolean;
}

export default function Skeleton({
  width,
  height,
  className = '',
  variant = 'rectangular',
  lines = 1,
  animated = true,
}: SkeletonProps) {
  const baseClasses = `skeleton ${variant} ${animated ? 'animated' : ''} ${className}`.trim();

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="skeleton-text-container">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={baseClasses}
            style={{
              ...style,
              width: index === lines - 1 ? '80%' : '100%',
              marginBottom: index < lines - 1 ? '0.5rem' : 0,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return <div className={baseClasses} style={style} aria-hidden="true" />;
}

// Skeleton específicos para diferentes casos de uso
export function ImageSkeleton({ className = '' }: { className?: string }) {
  return <Skeleton variant="rectangular" width="100%" height="100%" className={className} />;
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton-card ${className}`}>
      <Skeleton variant="rectangular" width="100%" height="200px" />
      <div style={{ padding: '1rem' }}>
        <Skeleton variant="text" width="60%" height="1.5rem" lines={1} />
        <Skeleton variant="text" width="100%" height="1rem" lines={2} />
      </div>
    </div>
  );
}

export function StudyCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton-study-card ${className}`}>
      <Skeleton variant="rectangular" width="120px" height="32px" />
      <Skeleton variant="text" width="80%" height="1.5rem" lines={1} />
      <Skeleton variant="text" width="60%" height="1rem" lines={1} />
      <Skeleton variant="text" width="100%" height="1rem" lines={3} />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Skeleton variant="rectangular" width="80px" height="24px" />
        <Skeleton variant="rectangular" width="100px" height="24px" />
      </div>
    </div>
  );
}

