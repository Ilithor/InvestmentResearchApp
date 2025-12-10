import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Spinner } from './Spinner';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Spinner', () => {
  it('renders spinner', () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('uses custom aria-label', () => {
    renderWithTheme(<Spinner aria-label="Fetching data" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Fetching data'
    );
  });

  it('applies small size class', () => {
    const { container } = renderWithTheme(<Spinner size="sm" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner.className).toContain('spinner--sm');
  });

  it('applies medium size class by default', () => {
    const { container } = renderWithTheme(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner.className).toContain('spinner--md');
  });

  it('applies large size class', () => {
    const { container } = renderWithTheme(<Spinner size="lg" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner.className).toContain('spinner--lg');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(<Spinner className="custom-class" />);
    const spinner = container.firstChild as HTMLElement;
    expect(spinner.className).toContain('custom-class');
  });

  it('does not render visually-hidden span', () => {
    const { container } = renderWithTheme(<Spinner />);
    const spinner = container.firstChild as HTMLElement;
    const visuallyHidden = spinner.querySelector('.visually-hidden');
    expect(visuallyHidden).toBeNull();
  });

  it('spreads additional props to div', () => {
    const { container } = renderWithTheme(
      <Spinner data-testid="spinner-test" />
    );
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveAttribute('data-testid', 'spinner-test');
  });
});
