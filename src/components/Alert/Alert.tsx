import React, { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Alert.css';

/**
 * Alert variant styles
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 */
type AlertProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> & {
  /** Visual style variant of the alert */
  variant?: AlertVariant;
  /** Optional title displayed above the message */
  title?: string;
  /** Alert message content */
  children: React.ReactNode;
  /** Callback function called when close button is clicked */
  onClose?: () => void;
  /** Custom CSS class name */
  className?: string;
};

/**
 * Alert Component
 *
 * A flexible, accessible alert component for displaying informational messages,
 * success confirmations, warnings, and errors. Supports optional titles and
 * dismissible functionality.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Alert>This is an informational message</Alert>
 *
 * // With title
 * <Alert title="Success!" variant="success">
 *   Your changes have been saved.
 * </Alert>
 *
 * // Dismissible alert
 * <Alert variant="warning" onClose={() => console.log('Closed')}>
 *   This alert can be dismissed
 * </Alert>
 *
 * // All variants
 * <Alert variant="info">Information message</Alert>
 * <Alert variant="success">Success message</Alert>
 * <Alert variant="warning">Warning message</Alert>
 * <Alert variant="error">Error message</Alert>
 *
 * // With title and close button
 * <Alert
 *   variant="error"
 *   title="Error"
 *   onClose={handleClose}
 * >
 *   Something went wrong. Please try again.
 * </Alert>
 *
 * // With custom className
 * <Alert className="my-custom-alert">Custom styled alert</Alert>
 * ```
 *
 * @remarks
 * - Uses `role="alert"` for accessibility (announces to screen readers)
 * - Close button has proper `aria-label` for accessibility
 * - Uses theme context for styling (no inline styles)
 * - Supports forwardRef for imperative access
 * - Close button has visible focus styles for keyboard navigation
 * - Variant colors use theme-aware CSS variables
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { variant = 'info', title, children, onClose, className = '', ...props },
    ref
  ) => {
    const { getClassName } = useTheme();
    const alertClassName = getClassName('alert');
    const baseClass = 'alert';

    const classes = [alertClassName, `${baseClass}--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        <div className={`${baseClass}__content`}>
          {title && <div className={`${baseClass}__title`}>{title}</div>}
          <div className={`${baseClass}__message`}>{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className={`${baseClass}__close`}
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
