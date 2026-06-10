'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { getAndroidFormCopy } from '@/lib/i18n/copy/android-form';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import '@/styles/components/android-early-access.css';

type AndroidEarlyAccessFormProps = {
  locale?: Locale;
  id?: string;
  placement: string;
  page: string;
  landingVariant?: BienvenidaVariant;
  className?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  incentiveLine?: string;
  compact?: boolean;
  autoFocus?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AndroidEarlyAccessForm({
  locale = 'es',
  id,
  placement,
  page,
  landingVariant,
  className,
  title,
  subtitle,
  buttonLabel,
  incentiveLine,
  compact = false,
  autoFocus = false,
}: AndroidEarlyAccessFormProps) {
  const defaults = getAndroidFormCopy(locale);
  const resolvedTitle = title ?? defaults.title;
  const resolvedSubtitle = subtitle ?? defaults.subtitle;
  const resolvedButtonLabel = buttonLabel ?? defaults.buttonLabel;

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
      setMessage(defaults.invalidEmail);
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
      const pageUrl =
        typeof window !== 'undefined'
          ? `${window.location.pathname}${window.location.search}`
          : page;

      const response = await fetch('/api/android-early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          placement,
          page,
          pageUrl,
          locale,
          landingVariant,
          source: 'website',
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
        }),
      });

      if (!response.ok) {
        throw new Error('submit failed');
      }

      setStatus('success');
      setMessage(defaults.success);
      setEmail('');
      setShowEmailError(false);

      trackCustomEvent(
        'android_early_access_submit_success',
        withAttribution({ placement, page }, attribution)
      );
    } catch {
      setStatus('error');
      setMessage(defaults.error);
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
      {incentiveLine && <p className="android-early-access-incentive">{incentiveLine}</p>}
      {!compact && <p className="android-early-access-title">{resolvedTitle}</p>}
      {!compact && <p className="android-early-access-subtitle">{resolvedSubtitle}</p>}
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
          placeholder={compact ? defaults.compactPlaceholder : defaults.fullPlaceholder}
          aria-label={defaults.inputAria}
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
          {isSubmitting ? defaults.submitting : resolvedButtonLabel}
        </button>
      </form>
      {compact && (
        <p className="android-early-access-footnote android-early-access-footnote--compact">
          {defaults.compactFootnote}
        </p>
      )}
      {!compact && (
        <p className="android-early-access-footnote">
          {defaults.fullFootnoteBefore}{' '}
          <Link href={defaults.privacyHref}>{defaults.privacyLink}</Link>.
        </p>
      )}
      {message && (
        <p className={`android-early-access-feedback android-early-access-feedback--${status}`}>
          {message}
        </p>
      )}
      {status === 'success' && compact && (
        <p className="android-early-access-feedback android-early-access-feedback--hint">
          {defaults.successHint}
        </p>
      )}
    </div>
  );
}
