'use client';

import { ReactNode } from 'react';
import '@/styles/components/empty-states.css';

interface EmptyStateProps {
  icon?: string | ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-content">
        {typeof icon === 'string' ? (
          <div className="empty-state-icon" aria-hidden="true">
            {icon}
          </div>
        ) : (
          <div className="empty-state-icon-custom">{icon}</div>
        )}
        <h3 className="empty-state-title">{title}</h3>
        {description && <p className="empty-state-description">{description}</p>}
        {action && <div className="empty-state-action">{action}</div>}
      </div>
    </div>
  );
}

