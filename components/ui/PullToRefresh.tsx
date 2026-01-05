'use client';

import { usePullToRefresh } from '@/lib/hooks/usePullToRefresh';
import '@/styles/components/pull-to-refresh.css';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  disabled?: boolean;
  threshold?: number;
  children: React.ReactNode;
}

export default function PullToRefresh({
  onRefresh,
  disabled = false,
  threshold = 80,
  children,
}: PullToRefreshProps) {
  const { elementRef, isPulling, pullDistance, isRefreshing } = usePullToRefresh({
    onRefresh,
    threshold,
    disabled,
  });

  return (
    <>
      {/* Indicador de pull-to-refresh */}
      {isPulling && (
        <div
          className={`pull-to-refresh-indicator ${isPulling ? 'active' : ''}`}
          style={{
            transform: `translateX(-50%) translateY(${Math.min(pullDistance / 2, 60)}px)`,
          }}
        >
          {isRefreshing ? (
            <>
              <div className="pull-to-refresh-spinner" />
              <span>Actualizando...</span>
            </>
          ) : (
            <>
              <span>↓</span>
              <span>Desliza para actualizar</span>
            </>
          )}
        </div>
      )}

      {/* Contenido */}
      <div ref={elementRef as React.RefObject<HTMLDivElement>}>{children}</div>
    </>
  );
}

