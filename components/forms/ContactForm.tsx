'use client';

import { useState, FormEvent } from 'react';
import { useFormValidation } from '@/lib/hooks/useForms';
import { trackFormSubmit } from '@/lib/hooks/useAnalytics';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { errors, isSubmitting, handleSubmit } = useFormValidation();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ejemplo, usando Fetch API o un servicio de backend
    console.log('Formulario enviado:', data);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000));

    trackFormSubmit('contact');
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
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
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
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
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">
          Mensaje <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-required="true"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
        {errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      {submitSuccess && (
        <div className="form-success">
          ¡Gracias por tu mensaje! Te contactaremos pronto.
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-large"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}

