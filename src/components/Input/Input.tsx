import { forwardRef, useId } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Input.css';

/**
 * Input Component Props
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input (takes precedence over helperText) */
  error?: string;
  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string;
  /** If true, input takes full width of container */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * A flexible, accessible input component with support for labels, error messages,
 * helper text, and full-width layout.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your email" />
 *
 * // With label
 * <Input label="Email" type="email" />
 *
 * // With error
 * <Input label="Email" error="This field is required" />
 *
 * // With helper text
 * <Input label="Password" type="password" helperText="Must be at least 8 characters" />
 *
 * // Full width
 * <Input label="Full Name" fullWidth />
 *
 * // Disabled state
 * <Input label="Email" disabled value="user@example.com" />
 *
 * // Different input types
 * <Input label="Email" type="email" />
 * <Input label="Password" type="password" />
 * <Input label="Number" type="number" />
 * <Input label="Date" type="date" />
 *
 * // Required field (shows asterisk in label)
 * <Input label="Email" type="email" required />
 * ```
 *
 * @remarks
 * - Uses React's `useId` hook for stable, unique IDs (SSR-safe)
 * - Automatically links label to input via htmlFor/id
 * - Required fields show an asterisk (*) in the label
 * - Conditionally includes aria-invalid, aria-required, and aria-describedby attributes
 * - Error messages take precedence over helper text
 * - Uses theme context for styling (no inline styles)
 * - Error focus ring uses theme-aware CSS variable (adapts to light/dark mode)
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const { getClassName } = useTheme();
    const inputClassName = getClassName('input');
    const baseClass = 'input';

    // Generate stable ID using React's useId hook (SSR-safe)
    // Falls back to provided id prop if present
    const generatedId = useId();
    const inputId = id ?? `${baseClass}-${generatedId}`;

    // Build className string with all modifiers
    const classes = [
      inputClassName,
      error && `${baseClass}--error`,
      fullWidth && `${baseClass}--full-width`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Extract required prop to handle separately
    const { required, ...restProps } = props;

    // Build input props with conditional accessibility attributes
    // aria-invalid: only set when error exists (true), otherwise omitted
    // aria-required: set when required prop is true
    // aria-describedby: only set when error or helperText exists
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      id: inputId,
      className: classes,
      required,
      ...(error ? { 'aria-invalid': true } : {}),
      ...(required ? { 'aria-required': true } : {}),
      ...(error || helperText
        ? {
            'aria-describedby': `${inputId}-${error ? 'error' : 'helper'}`,
          }
        : {}),
      ...restProps,
    };

    return (
      <div className={`${baseClass}-wrapper`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${baseClass}-label${required ? ` ${baseClass}-label--required` : ''}`}
          >
            {label}
          </label>
        )}
        <input ref={ref} {...inputProps} />
        {error && (
          <span
            id={`${inputId}-error`}
            className={`${baseClass}-error-text`}
            role="alert"
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} className={`${baseClass}-helper-text`}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
