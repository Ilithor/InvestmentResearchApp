import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import { Card } from './Card';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Card', () => {
  it('renders children', () => {
    renderWithTheme(<Card>Card content</Card>);
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = renderWithTheme(
      <Card variant="outlined">Content</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card--outlined');
  });

  it('applies padding classes', () => {
    const { container } = renderWithTheme(<Card padding="lg">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card--padding-lg');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    renderWithTheme(<Card onClick={handleClick}>Clickable card</Card>);

    const card = screen.getByRole('button');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation with Enter key', async () => {
    const handleClick = jest.fn();
    renderWithTheme(<Card onClick={handleClick}>Clickable card</Card>);

    const card = screen.getByRole('button');
    card.focus();
    await userEvent.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation with Space key', async () => {
    const handleClick = jest.fn();
    renderWithTheme(<Card onClick={handleClick}>Clickable card</Card>);

    const card = screen.getByRole('button');
    card.focus();
    await userEvent.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have clickable role when onClick is not provided', () => {
    renderWithTheme(<Card>Non-clickable card</Card>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has tabIndex when clickable', () => {
    const { container } = renderWithTheme(
      <Card onClick={() => {}}>Clickable card</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('does not have tabIndex when not clickable', () => {
    const { container } = renderWithTheme(<Card>Non-clickable card</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).not.toHaveAttribute('tabIndex');
  });

  it('passes event to onClick handler', async () => {
    const handleClick = jest.fn((e: React.MouseEvent<HTMLDivElement>) => {
      expect(e).toBeDefined();
    });
    renderWithTheme(<Card onClick={handleClick}>Clickable card</Card>);

    const card = screen.getByRole('button');
    await userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled class when disabled', () => {
    const { container } = renderWithTheme(
      <Card onClick={() => {}} disabled>
        Disabled card
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('card--disabled');
  });

  it('does not apply clickable class when disabled', () => {
    const { container } = renderWithTheme(
      <Card onClick={() => {}} disabled>
        Disabled card
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('card--clickable');
  });

  it('has aria-disabled when disabled', () => {
    renderWithTheme(
      <Card onClick={() => {}} disabled>
        Disabled card
      </Card>
    );
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-disabled', 'true');
  });

  it('has tabIndex -1 when disabled', () => {
    const { container } = renderWithTheme(
      <Card onClick={() => {}} disabled>
        Disabled card
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute('tabIndex', '-1');
  });

  it('prevents click when disabled', async () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Card onClick={handleClick} disabled>
        Disabled card
      </Card>
    );

    const card = screen.getByRole('button');
    await userEvent.click(card);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents keyboard interaction when disabled', async () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Card onClick={handleClick} disabled>
        Disabled card
      </Card>
    );

    const card = screen.getByRole('button');
    card.focus();
    await userEvent.keyboard('{Enter}');

    expect(handleClick).not.toHaveBeenCalled();
  });
});
