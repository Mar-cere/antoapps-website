'use client';

import { useState, FormEvent, useCallback } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface FieldValidation {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormValidations {
  [key: string]: FieldValidation;
}

export function useFormValidation(validations?: FormValidations) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const fieldValidation = validations?.[name];
      if (!fieldValidation) {
        // Validación por defecto basada en el nombre del campo
        if (name.includes('email')) {
          if (!value.trim()) return 'Este campo es obligatorio';
          if (!validateEmail(value)) return 'Por favor ingresa un email válido';
        } else if (name === 'name' || name === 'message') {
          if (!value.trim()) return 'Este campo es obligatorio';
        }
        return null;
      }

      // Validación personalizada
      if (fieldValidation.required && !value.trim()) {
        return 'Este campo es obligatorio';
      }

      if (fieldValidation.email && !validateEmail(value)) {
        return 'Por favor ingresa un email válido';
      }

      if (fieldValidation.minLength && value.length < fieldValidation.minLength) {
        return `Este campo debe tener al menos ${fieldValidation.minLength} caracteres`;
      }

      if (fieldValidation.maxLength && value.length > fieldValidation.maxLength) {
        return `Este campo no puede tener más de ${fieldValidation.maxLength} caracteres`;
      }

      if (fieldValidation.pattern && !fieldValidation.pattern.test(value)) {
        return 'El formato ingresado no es válido';
      }

      if (fieldValidation.custom) {
        return fieldValidation.custom(value);
      }

      return null;
    },
    [validations]
  );

  const validateForm = useCallback(
    (formData: Record<string, string>): boolean => {
      const newErrors: FormErrors = {};

      Object.entries(formData).forEach(([key, value]) => {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateField]
  );

  const handleFieldBlur = useCallback(
    (name: string, value: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  const handleFieldChange = useCallback(
    (name: string, value: string) => {
      // Solo validar si el campo ya fue tocado
      if (touched[name]) {
        const error = validateField(name, value);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
      }
    },
    [touched, validateField]
  );

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: Record<string, string>,
    onSubmit: (data: Record<string, string>) => Promise<void>
  ) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Limpiar errores y touched después de envío exitoso
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setErrors({ submit: 'Hubo un error al enviar el formulario. Por favor intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    touched,
    isSubmitting,
    validateForm,
    validateField,
    handleFieldBlur,
    handleFieldChange,
    handleSubmit,
    setErrors,
  };
}

