'use client';

import { useEffect } from 'react';
import '@/styles/components/toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast-content">
        <span className="toast-icon" aria-hidden="true">
          {icons[toast.type]}
        </span>
        <span className="toast-message">{toast.message}</span>
        <button
          className="toast-close"
          onClick={() => onClose(toast.id)}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{
            animationDuration: `${toast.duration || 5000}ms`,
          }}
        />
      </div>
    </div>
  );
}

