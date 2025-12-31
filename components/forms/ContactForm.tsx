'use client';

import { useState, FormEvent } from 'react';
import { useFormValidation } from '@/lib/hooks/useForms';
import { trackFormSubmit } from '@/lib/hooks/useAnalytics';
import { useToast } from '@/components/ui/ToastContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ContactForm() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { errors, touched, isSubmitting, handleFieldBlur, handleFieldChange, handleSubmit } =
    useFormValidation({
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      message: { required: true, minLength: 10 },
    });

  const onSubmit = async (data: Record<string, string>) => {
    try {
      // Aquí puedes agregar la lógica para enviar el formulario
      // Por ejemplo, usando Fetch API o un servicio de backend
      console.log('Formulario enviado:', data);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 1000));

      trackFormSubmit('contact');
      toast.success('¡Mensaje enviado exitosamente! Te responderemos pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form
      id="contactForm"
      className="contact-form"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, formData, onSubmit)
      }
      noValidate
    >
      <div className="form-group">
        <label htmlFor="name">
          Nombre completo <span className="required">*</span>
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
          Email <span className="required">*</span>
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
          Mensaje <span className="required">*</span>
          <span className="char-count">
            {formData.message.length}/500
          </span>
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
        ></textarea>
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
            <span>Enviando...</span>
          </>
        ) : (
          'Enviar Mensaje'
        )}
      </button>
    </form>
  );
}

