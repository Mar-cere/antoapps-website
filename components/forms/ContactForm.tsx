'use client';

import { useState, FormEvent, useMemo, useRef, useEffect } from 'react';
import { useFormValidation, type FormMessages } from '@/lib/hooks/useForms';
import { trackFormSubmit } from '@/lib/hooks/useAnalytics';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { ContactFormCopy } from '@/lib/i18n/copy/contact';
import type { Locale } from '@/lib/i18n/config';

type ContactFormProps = {
  copy: ContactFormCopy;
  locale?: Locale;
};

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactForm({ copy, locale = 'es' }: ContactFormProps) {
  const successRef = useRef<HTMLDivElement>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const formMessages = useMemo<FormMessages>(
    () => ({
      required: copy.validation.required,
      emailInvalid: copy.validation.emailInvalid,
      minLength: copy.validation.minLength,
      maxLength: (max) =>
        locale === 'en'
          ? `This field cannot exceed ${max} characters`
          : `Este campo no puede tener más de ${max} caracteres`,
      invalidFormat:
        locale === 'en' ? 'The entered format is not valid' : 'El formato ingresado no es válido',
      submitError: copy.toast.error,
    }),
    [copy, locale]
  );

  const { errors, touched, isSubmitting, handleFieldBlur, handleFieldChange, handleSubmit } =
    useFormValidation(
      {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        message: { required: true, minLength: 10 },
      },
      formMessages
    );

  useEffect(() => {
    if (submitStatus === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submitStatus]);

  const resetSuccess = () => {
    setSubmitStatus('idle');
  };

  const onSubmit = async (data: Record<string, string>) => {
    setSubmitStatus('idle');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        locale,
      }),
    });

    if (!response.ok) {
      setSubmitStatus('error');
      throw new Error('contact_submit_failed');
    }

    trackFormSubmit('contact');
    setFormData({ name: '', email: '', message: '' });
    setSubmitStatus('success');
  };

  const showFormFields = submitStatus !== 'success';

  return (
    <form
      id="contactForm"
      className={`contact-form${submitStatus === 'success' ? ' contact-form--submitted' : ''}`}
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, formData, onSubmit)}
      noValidate
    >
      {submitStatus === 'success' && (
        <div
          ref={successRef}
          className="contact-form-feedback contact-form-feedback--success"
          role="status"
          aria-live="polite"
        >
          <div className="contact-form-feedback__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="contact-form-feedback__body">
            <p className="contact-form-feedback__title">{copy.success.title}</p>
            <p className="contact-form-feedback__message">{copy.success.message}</p>
          </div>
          <button type="button" className="contact-form-feedback__dismiss" onClick={resetSuccess}>
            {copy.success.dismiss}
          </button>
        </div>
      )}

      {submitStatus === 'error' && errors.submit && (
        <div className="contact-form-feedback contact-form-feedback--error" role="alert">
          <div className="contact-form-feedback__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <p className="contact-form-feedback__message">{errors.submit}</p>
        </div>
      )}

      {showFormFields && (
        <>
          <div className="form-group">
            <label htmlFor="name">
              {copy.labels.name}{' '}
              <span className="required" aria-hidden="true">
                {copy.labels.requiredMark}
              </span>
            </label>
            <div
              className={`form-field${touched.name && errors.name ? ' error' : touched.name && !errors.name && formData.name ? ' valid' : ''}`}
            >
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                aria-required="true"
                aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  handleFieldChange('name', e.target.value);
                }}
                onBlur={(e) => handleFieldBlur('name', e.target.value)}
              />
            </div>
            {touched.name && errors.name && (
              <span id="name-error" className="error-message" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              {copy.labels.email}{' '}
              <span className="required" aria-hidden="true">
                {copy.labels.requiredMark}
              </span>
            </label>
            <div
              className={`form-field${touched.email && errors.email ? ' error' : touched.email && !errors.email && formData.email ? ' valid' : ''}`}
            >
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                aria-required="true"
                aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  handleFieldChange('email', e.target.value);
                }}
                onBlur={(e) => handleFieldBlur('email', e.target.value)}
              />
            </div>
            {touched.email && errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group form-group--message">
            <label htmlFor="message">
              <span>
                {copy.labels.message}{' '}
                <span className="required" aria-hidden="true">
                  {copy.labels.requiredMark}
                </span>
              </span>
              <span className="char-count" aria-live="polite">
                {formData.message.length}/500
              </span>
            </label>
            <div
              className={`form-field${touched.message && errors.message ? ' error' : touched.message && !errors.message && formData.message ? ' valid' : ''}`}
            >
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                aria-required="true"
                aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                maxLength={500}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  handleFieldChange('message', e.target.value);
                }}
                onBlur={(e) => handleFieldBlur('message', e.target.value)}
              />
            </div>
            {touched.message && errors.message && (
              <span id="message-error" className="error-message" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <div className="contact-form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-large contact-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>{copy.sending}</span>
                </>
              ) : (
                copy.submit
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
