'use client';

import { useState, FormEvent } from 'react';

interface FormErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateForm = (formData: Record<string, string>): boolean => {
    const newErrors: FormErrors = {};

    // Validar campos requeridos
    Object.entries(formData).forEach(([key, value]) => {
      if (key.includes('email') && !validateEmail(value)) {
        newErrors[key] = 'Por favor ingresa un email válido';
      } else if (key.includes('required') || key === 'name' || key === 'message') {
        if (!validateRequired(value)) {
          newErrors[key] = 'Este campo es obligatorio';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: Record<string, string>,
    onSubmit: (data: Record<string, string>) => Promise<void>
  ) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    isSubmitting,
    validateForm,
    handleSubmit,
    setErrors,
  };
}

