import { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Card.css';

/**
 * Card variant styles
 */
export type CardVariant = 'default' | 'outlined' | 'elevated';

/**
 * Card padding options
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Card Component Props
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: React.ReactNode;
  /** Visual style variant of the card */
  variant?: CardVariant;
  /** Padding size for the card */
  padding?: CardPadding;
  /** Click handler - when provided, card becomes clickable with keyboard navigation */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** If true, disables the card interaction (only applies when onClick is provided) */
  disabled?: boolean;
}

/**
 * Card Component
 *
 * A flexible container component with support for variants, padding options,
 * and optional clickable behavior with keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Card>Card content</Card>
 *
 * // With variant
 * <Card variant="outlined">Outlined card</Card>
 * <Card variant="elevated">Elevated card</Card>
 *
 * // With padding
 * <Card padding="lg">Large padding</Card>
 * <Card padding="none">No padding</Card>
 *
 * // Clickable card
 * <Card onClick={() => console.log('Clicked')}>Clickable card</Card>
 *
 * // Combined props
 * <Card variant="elevated" padding="lg" onClick={handleClick}>
 *   Full featured card
 * </Card>
 *
 * // Disabled clickable card
 * <Card onClick={handleClick} disabled>
 *   Disabled card
 * </Card>
 * ```
 *
 * @remarks
 * - Clickable cards support keyboard navigation (Enter and Space keys)
 * - Disabled cards are not focusable and prevent click/keyboard interactions
 * - Uses theme context for styling (no inline styles)
 * - Accessible: clickable cards have proper ARIA roles and keyboard support
 * - Focus styles use theme-aware CSS variables (adapts to light/dark mode)
 * - Shadows use theme-aware CSS variables (adapts to light/dark mode)
 * - Clickable cards should have accessible names via children content or aria-label
 * - Focus ring remains visible when card is hovered (accessibility best practice)
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      padding = 'md',
      onClick,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { getClassName } = useTheme();
    const cardClassName = getClassName('card');
    const baseClass = 'card';

    // Build className string with all modifiers
    const classes = [
      cardClassName,
      `${baseClass}--${variant}`,
      `${baseClass}--padding-${padding}`,
      onClick && !disabled && `${baseClass}--clickable`,
      onClick && disabled && `${baseClass}--disabled`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    /**
     * Handles keyboard events for clickable cards.
     * Supports Enter and Space keys for accessibility.
     * Prevents default scroll behavior when Space is pressed.
     * Does nothing if card is disabled.
     *
     * @param e - Keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Trigger onClick handler - cast keyboard event as mouse event for type compatibility
        // This is safe because we're only calling the handler, not using mouse-specific properties
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    /**
     * Handles click events, preventing action if card is disabled.
     *
     * @param e - Mouse event
     */
    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    // Build card props with conditional accessibility attributes
    // role, tabIndex, onKeyDown, and aria-disabled: only set when onClick is provided
    const cardProps: React.HTMLAttributes<HTMLDivElement> = {
      className: classes,
      ...(onClick
        ? {
            role: 'button',
            tabIndex: disabled ? -1 : 0,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            ...(disabled ? { 'aria-disabled': true } : {}),
          }
        : {}),
      ...props,
    };

    return (
      <div ref={ref} {...cardProps}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
