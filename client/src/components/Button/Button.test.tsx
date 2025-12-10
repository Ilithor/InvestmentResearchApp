import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import { Button } from './Button';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Button', () => {
  it('renders with children', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    renderWithTheme(<Button variant="secondary">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--secondary');
  });

  it('applies size classes', () => {
    renderWithTheme(<Button size="lg">Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--lg');
  });

  it('defaults type to button', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('accepts custom type prop', () => {
    renderWithTheme(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    renderWithTheme(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has aria-busy when loading', () => {
    renderWithTheme(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not have aria-busy when not loading', () => {
    renderWithTheme(<Button>Not Loading</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('shows loading spinner when isLoading is true', () => {
    const { container } = renderWithTheme(<Button isLoading>Loading</Button>);
    const spinner = container.querySelector('.button__spinner');
    expect(spinner).not.toBeNull();
  });

  it('shows loading text by default', () => {
    renderWithTheme(<Button isLoading>Original Text</Button>);
    expect(screen.getByText(/original text/i)).toBeInTheDocument();
  });

  it('shows custom loading text when provided', () => {
    renderWithTheme(
      <Button isLoading loadingText="Processing...">
        Original Text
      </Button>
    );
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
    expect(screen.queryByText(/original text/i)).not.toBeInTheDocument();
  });

  it('shows only spinner when showSpinnerOnly is true', () => {
    const { container } = renderWithTheme(
      <Button isLoading showSpinnerOnly>
        Original Text
      </Button>
    );
    expect(screen.queryByText(/original text/i)).not.toBeInTheDocument();
    const spinner = container.querySelector('.button__spinner');
    expect(spinner).not.toBeNull();
  });

  it('renders icon on the left by default', () => {
    const { container } = renderWithTheme(
      <Button icon={<span data-testid="icon">Icon</span>}>Text</Button>
    );
    const icon = container.querySelector('[data-testid="icon"]');
    expect(icon).toBeInTheDocument();
    const button = screen.getByRole('button');
    const iconWrapper = container.querySelector('.button__icon');
    expect(button.firstChild).toBe(iconWrapper);
  });

  it('renders icon on the right when iconPosition is right', () => {
    const { container } = renderWithTheme(
      <Button icon={<span data-testid="icon">Icon</span>} iconPosition="right">
        Text
      </Button>
    );
    const icon = container.querySelector('[data-testid="icon"]');
    expect(icon).toBeInTheDocument();
    const button = screen.getByRole('button');
    const iconWrapper = container.querySelector('.button__icon');
    expect(button.lastChild).toBe(iconWrapper);
  });

  it('applies fullWidth class when fullWidth is true', () => {
    renderWithTheme(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--full-width');
  });

  it('applies no-hover-transform class when enableHoverTransform is false', () => {
    renderWithTheme(<Button enableHoverTransform={false}>Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--no-hover-transform');
  });

  it('does not apply no-hover-transform class when enableHoverTransform is true', () => {
    renderWithTheme(<Button enableHoverTransform={true}>Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).not.toContain('button--no-hover-transform');
  });
});
