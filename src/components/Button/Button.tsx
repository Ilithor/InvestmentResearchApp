import { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Button.css';

/**
 * Button variant styles
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

/**
 * Button size options
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Base button props without aria-busy to allow conditional typing
 */
type BaseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-busy'
> & {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Custom text to display when loading (overrides children) */
  loadingText?: string;
  /** If true, shows only spinner when loading (hides text) */
  showSpinnerOnly?: boolean;
  /** If true, button takes full width of container */
  fullWidth?: boolean;
  /** Icon element to display (works with future Icon registry) */
  icon?: React.ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
  /** If false, disables the hover lift transform effect */
  enableHoverTransform?: boolean;
  /** Button content/text */
  children: React.ReactNode;
};

/**
 * Button props with conditional aria-busy typing using a discriminated union.
 *
 * This advanced TypeScript pattern ensures type safety:
 * - When isLoading is true, aria-busy can be set to true (or omitted, defaults to true)
 * - When isLoading is false/undefined, aria-busy cannot be set (never type prevents it)
 *
 * This prevents invalid combinations like `isLoading={false}` with `aria-busy={true}`,
 * while still allowing conditional attribute inclusion at runtime via prop spreading.
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions | TypeScript Discriminated Unions}
 */
type ButtonProps = BaseButtonProps &
  (
    | { isLoading: true; 'aria-busy'?: true }
    | { isLoading?: false | undefined; 'aria-busy'?: never }
  );

/**
 * Button Component
 *
 * A flexible, accessible button component with support for variants, sizes,
 * loading states, icons, and customizable behavior.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With icon
 * <Button icon={<SearchIcon />}>Search</Button>
 *
 * // Loading state
 * <Button isLoading>Processing...</Button>
 *
 * // Custom variant and size
 * <Button variant="danger" size="lg">Delete</Button>
 *
 * // Loading with custom text
 * <Button isLoading loadingText="Saving...">Save</Button>
 *
 * // Loading with spinner only (no text)
 * <Button isLoading showSpinnerOnly>Submit</Button>
 *
 * // Icon with loading (icon is hidden during loading)
 * <Button icon={<SaveIcon />} isLoading>Save</Button>
 *
 * // Icon on the right
 * <Button icon={<ArrowIcon />} iconPosition="right">Next</Button>
 *
 * // All variants
 * <Button variant="primary">Primary</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="danger">Danger</Button>
 *
 * // All sizes
 * <Button size="sm">Small</Button>
 * <Button size="md">Medium</Button>
 * <Button size="lg">Large</Button>
 *
 * // Disabled state
 * <Button disabled>Disabled</Button>
 *
 * // Full width
 * <Button fullWidth>Full Width Button</Button>
 *
 * // Without hover transform
 * <Button enableHoverTransform={false}>Static</Button>
 * ```
 *
 * @remarks
 * - Uses theme context for styling (no inline styles)
 * - Supports forwardRef for focus management
 * - Conditionally includes aria-busy attribute when loading
 * - Icon support ready for future Icon registry system
 * - Focus ring remains visible when button is hovered (accessibility best practice)
 * - Hover transform is disabled when button is focused to maintain focus ring visibility
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      showSpinnerOnly = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      enableHoverTransform = true,
      className = '',
      disabled,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const { getClassName } = useTheme();
    const buttonClassName = getClassName('button');
    const baseClass = 'button';

    // Build className string with all modifiers
    const classes = [
      buttonClassName,
      `${baseClass}--${variant}`,
      `${baseClass}--${size}`,
      fullWidth && `${baseClass}--full-width`,
      isLoading && `${baseClass}--loading`,
      !enableHoverTransform && `${baseClass}--no-hover-transform`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    /**
     * Renders the button content based on current state.
     * Handles loading states, icons, and default content.
     *
     * @returns React node representing the button's inner content
     */
    const renderContent = (): React.ReactNode => {
      // Loading state: show spinner with optional text
      // Icons are hidden during loading state
      if (isLoading) {
        if (showSpinnerOnly) {
          return <span className={`${baseClass}__spinner`} />;
        }
        return (
          <>
            <span className={`${baseClass}__spinner`} />
            <span className={`${baseClass}__text`}>
              {loadingText ?? children}
            </span>
          </>
        );
      }

      // Icon state: wrap icon and position it relative to text
      // Only create icon element when not loading (optimization)
      if (icon) {
        const iconElement = (
          <span className={`${baseClass}__icon`}>{icon}</span>
        );
        return (
          <>
            {iconPosition === 'left' && iconElement}
            <span className={`${baseClass}__text`}>{children}</span>
            {iconPosition === 'right' && iconElement}
          </>
        );
      }

      // Default: just render children
      return children;
    };

    // Build button props object with conditional aria-busy
    // Using conditional prop spreading: only includes aria-busy when isLoading is true
    // This prevents the attribute from appearing in the DOM when not needed
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
      type,
      className: classes,
      disabled: disabled || isLoading,
      ...(isLoading ? { 'aria-busy': true } : {}),
      ...props,
    };

    return (
      <button ref={ref} {...buttonProps}>
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
