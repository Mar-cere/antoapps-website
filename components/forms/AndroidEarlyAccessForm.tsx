'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import '@/styles/components/android-early-access.css';

type AndroidEarlyAccessFormProps = {
  id?: string;
  placement: string;
  page: string;
  className?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  compact?: boolean;
  autoFocus?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AndroidEarlyAccessForm({
  id,
  placement,
  page,
  className,
  title = 'Acceso anticipado Android',
  subtitle = 'Únete a la lista prioritaria y recibe invitación antes del lanzamiento público.',
  buttonLabel = 'Quiero acceso anticipado',
  compact = false,
  autoFocus = false,
}: AndroidEarlyAccessFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);

  const isValidEmail = useMemo(() => EMAIL_RE.test(email), [email]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail) {
      setShowEmailError(true);
      setStatus('error');
      setMessage('Ingresa un correo valido con formato nombre@dominio.com.');
      return;
    }
    if (isSubmitting) return;

    const attribution = getAttributionContext();
    setIsSubmitting(true);
    setStatus('idle');
    setMessage('');

    trackCustomEvent(
      'android_early_access_submit_attempt',
      withAttribution({ placement, page }, attribution)
    );

    try {
      const response = await fetch('/api/android-early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          placement,
          page,
          source: 'website',
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar el correo');
      }

      setStatus('success');
      setMessage('Listo. Te avisaremos por correo cuando se abra tu acceso anticipado.');
      setEmail('');
      setShowEmailError(false);

      trackCustomEvent(
        'android_early_access_submit_success',
        withAttribution({ placement, page }, attribution)
      );
    } catch {
      setStatus('error');
      setMessage('No pudimos registrar tu correo ahora. Intenta nuevamente en unos minutos.');
      trackCustomEvent(
        'android_early_access_submit_error',
        withAttribution({ placement, page }, attribution)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id} className={className || 'android-early-access'}>
      {!compact && <p className="android-early-access-title">{title}</p>}
      {!compact && <p className="android-early-access-subtitle">{subtitle}</p>}
      <form
        className={`android-early-access-form ${compact ? 'android-early-access-form--compact' : ''}`}
        onSubmit={onSubmit}
        noValidate
      >
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => {
            const nextEmail = e.target.value.trim();
            setEmail(nextEmail);
            if (showEmailError && EMAIL_RE.test(nextEmail)) {
              setShowEmailError(false);
              if (status === 'error') {
                setStatus('idle');
                setMessage('');
              }
            }
          }}
          onBlur={() => {
            if (email.length > 0 && !isValidEmail) {
              setShowEmailError(true);
            }
          }}
          className="android-early-access-input"
          placeholder={
            compact ? 'Tu email para acceso anticipado Android' : 'tuemail@ejemplo.com'
          }
          aria-label="Correo para acceso anticipado Android"
          inputMode="email"
          autoComplete="email"
          pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
          aria-invalid={showEmailError}
          required
        />
        <button
          type="submit"
          className={`btn btn-primary android-early-access-button ${
            compact ? 'android-early-access-button--compact' : ''
          }`}
          disabled={!isValidEmail || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : buttonLabel}
        </button>
      </form>
      {compact && (
        <p className="android-early-access-footnote android-early-access-footnote--compact">
          Usa el mismo correo de tu cuenta de Google Play para recibir el acceso.
        </p>
      )}
      {!compact && (
        <p className="android-early-access-footnote">
          Cupos limitados. Te contactaremos por correo. Al enviar aceptas nuestra{' '}
          <a href="/privacidad">Política de Privacidad</a>.
        </p>
      )}
      {message && (
        <p className={`android-early-access-feedback android-early-access-feedback--${status}`}>
          {message}
        </p>
      )}
      {status === 'success' && compact && (
        <p className="android-early-access-feedback android-early-access-feedback--hint">
          Revisa tu bandeja y carpeta de spam para encontrar la invitacion.
        </p>
      )}
    </div>
  );
}

