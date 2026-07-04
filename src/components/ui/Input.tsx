import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="field__control">
        {leftIcon && <span className="field__icon">{leftIcon}</span>}
        <input
          id={inputId}
          className={`field__input ${leftIcon ? 'field__input--icon' : ''}`.trim()}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
      </div>
      {hint && !error && (
        <p className="field__hint" id={`${inputId}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
