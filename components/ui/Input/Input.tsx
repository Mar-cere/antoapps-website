'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, ReactNode } from 'react';
import '@/styles/components/input-variants.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

interface InputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  as?: 'input';
  multiline?: false;
}

interface TextareaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  as: 'textarea';
  multiline: true;
  rows?: number;
}

type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = props.id || `input-${Math.random().toString(36).substring(7)}`;
    const hasError = !!error;
    const isTextarea = props.as === 'textarea' && props.multiline;

    const inputClasses = `input input-${size} input-${variant} ${hasError ? 'input-error' : ''} ${fullWidth ? 'input-full-width' : ''} ${leftIcon ? 'input-with-left-icon' : ''} ${rightIcon ? 'input-with-right-icon' : ''} ${className}`.trim();

    const inputElement = isTextarea ? (
      <textarea
        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        id={inputId}
        className={inputClasses}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...(props as InputHTMLAttributes<HTMLInputElement>)}
      />
    );

    return (
      <div className={`input-wrapper ${fullWidth ? 'input-wrapper-full-width' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <div className="input-container">
          {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
          {inputElement}
          {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
          {!hasError && !error && props.value && !props.disabled && (
            <span className="input-success-icon" aria-hidden="true">
              ✓
            </span>
          )}
          {hasError && (
            <span className="input-error-icon" aria-hidden="true">
              ✕
            </span>
          )}
        </div>
        {error && (
          <span id={`${inputId}-error`} className="input-error-message" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="input-helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

