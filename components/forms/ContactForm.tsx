'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useFormValidation, type FormMessages } from '@/lib/hooks/useForms';
import { trackFormSubmit } from '@/lib/hooks/useAnalytics';
import { useToast } from '@/components/ui/ToastContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { ContactFormCopy } from '@/lib/i18n/copy/contact';
import type { Locale } from '@/lib/i18n/config';

type ContactFormProps = {
  copy: ContactFormCopy;
  locale?: Locale;
};

export default function ContactForm({ copy, locale = 'es' }: ContactFormProps) {
  const toast = useToast();
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

  const onSubmit = async (data: Record<string, string>) => {
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
      throw new Error('contact_submit_failed');
    }

    trackFormSubmit('contact');
    toast.success(copy.toast.success);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form
      id="contactForm"
      className="contact-form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, formData, onSubmit)}
      noValidate
    >
      <div className="form-group">
        <label htmlFor="name">
          {copy.labels.name} <span className="required">{copy.labels.requiredMark}</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          aria-invalid={touched.name && errors.name ? 'true' : 'false'}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            handleFieldChange('name', e.target.value);
          }}
          onBlur={(e) => handleFieldBlur('name', e.target.value)}
          className={`form-field ${touched.name && errors.name ? 'error' : touched.name && !errors.name ? 'valid' : ''}`}
        />
        {touched.name && errors.name && (
          <span id="name-error" className="error-message" role="alert">
            {errors.name}
          </span>
        )}
        {touched.name && !errors.name && formData.name && (
          <span className="success-message">✓</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          {copy.labels.email} <span className="required">{copy.labels.requiredMark}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-invalid={touched.email && errors.email ? 'true' : 'false'}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            handleFieldChange('email', e.target.value);
          }}
          onBlur={(e) => handleFieldBlur('email', e.target.value)}
          className={`form-field ${touched.email && errors.email ? 'error' : touched.email && !errors.email ? 'valid' : ''}`}
        />
        {touched.email && errors.email && (
          <span id="email-error" className="error-message" role="alert">
            {errors.email}
          </span>
        )}
        {touched.email && !errors.email && formData.email && (
          <span className="success-message">✓</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">
          {copy.labels.message} <span className="required">{copy.labels.requiredMark}</span>
          <span className="char-count">{formData.message.length}/500</span>
        </label>
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
          className={`form-field ${touched.message && errors.message ? 'error' : touched.message && !errors.message ? 'valid' : ''}`}
        />
        {touched.message && errors.message && (
          <span id="message-error" className="error-message" role="alert">
            {errors.message}
          </span>
        )}
        {touched.message && !errors.message && formData.message && (
          <span className="success-message">✓</span>
        )}
      </div>

      {errors.submit && (
        <div className="form-error" role="alert">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-large"
        disabled={isSubmitting || Object.keys(errors).length > 0}
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
    </form>
  );
}
