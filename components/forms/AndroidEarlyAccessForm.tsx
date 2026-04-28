'use client';

import { FormEvent, useMemo, useState } from 'react';
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
}: AndroidEarlyAccessFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isValidEmail = useMemo(() => EMAIL_RE.test(email), [email]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail || isSubmitting) return;

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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          className="android-early-access-input"
          placeholder={
            compact ? 'Tu email para acceso anticipado Android' : 'tuemail@ejemplo.com'
          }
          aria-label="Correo para acceso anticipado Android"
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
    </div>
  );
}

