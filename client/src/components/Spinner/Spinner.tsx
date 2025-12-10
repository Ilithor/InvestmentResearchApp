import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Spinner.scss';

/**
 * Spinner size options
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Spinner component
 */
type SpinnerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'aria-label' | 'role'
> & {
  /** Size variant of the spinner */
  size?: SpinnerSize;
  /** Custom CSS class name */
  className?: string;
  /** Accessible label for screen readers (defaults to "Loading") */
  'aria-label'?: string;
};

/**
 * Spinner Component
 *
 * A simple, accessible loading spinner with size variants and theme-aware styling.
 * Uses CSS animation for smooth rotation and provides proper ARIA attributes
 * for screen reader accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // Custom size
 * <Spinner size="lg" />
 *
 * // Custom aria-label
 * <Spinner aria-label="Fetching user data" />
 *
 * // All size variants
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * // With custom className
 * <Spinner className="my-custom-class" />
 * ```
 *
 * @remarks
 * - Uses theme context for styling (no inline styles)
 * - Automatically applies `role="status"` for accessibility
 * - Default `aria-label` is "Loading" if not provided
 * - The spinner is a visual indicator only; text content should be provided
 *   separately if needed for context
 */
const Spinner = ({
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: SpinnerProps) => {
  const { getClassName } = useTheme();
  const spinnerClassName = getClassName('spinner');
  const baseClass = 'spinner';

  const classes = [spinnerClassName, `${baseClass}--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-label={ariaLabel} {...props} />
  );
};

export { Spinner };
