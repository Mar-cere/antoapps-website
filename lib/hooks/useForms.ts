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

export type FormMessages = {
  required: string;
  emailInvalid: string;
  minLength: (min: number) => string;
  maxLength: (max: number) => string;
  invalidFormat: string;
  submitError: string;
};

const defaultFormMessages: FormMessages = {
  required: 'Este campo es obligatorio',
  emailInvalid: 'Por favor ingresa un email válido',
  minLength: (min) => `Este campo debe tener al menos ${min} caracteres`,
  maxLength: (max) => `Este campo no puede tener más de ${max} caracteres`,
  invalidFormat: 'El formato ingresado no es válido',
  submitError: 'Hubo un error al enviar el formulario. Por favor intenta nuevamente.',
};

export function useFormValidation(validations?: FormValidations, messages: FormMessages = defaultFormMessages) {
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
          if (!value.trim()) return messages.required;
          if (!validateEmail(value)) return messages.emailInvalid;
        } else if (name === 'name' || name === 'message') {
          if (!value.trim()) return messages.required;
        }
        return null;
      }

      // Validación personalizada
      if (fieldValidation.required && !value.trim()) {
        return messages.required;
      }

      if (fieldValidation.email && !validateEmail(value)) {
        return messages.emailInvalid;
      }

      if (fieldValidation.minLength && value.length < fieldValidation.minLength) {
        return messages.minLength(fieldValidation.minLength);
      }

      if (fieldValidation.maxLength && value.length > fieldValidation.maxLength) {
        return messages.maxLength(fieldValidation.maxLength);
      }

      if (fieldValidation.pattern && !fieldValidation.pattern.test(value)) {
        return messages.invalidFormat;
      }

      if (fieldValidation.custom) {
        return fieldValidation.custom(value);
      }

      return null;
    },
    [validations, messages]
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
      setErrors({ submit: messages.submitError });
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

