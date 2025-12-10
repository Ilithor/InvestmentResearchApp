import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import { Alert } from './Alert';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Alert', () => {
  it('renders alert message', () => {
    renderWithTheme(<Alert>Alert message</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent(/alert message/i);
  });

  it('renders with title', () => {
    renderWithTheme(<Alert title="Alert Title">Alert message</Alert>);
    expect(screen.getByText(/alert title/i)).toBeInTheDocument();
    expect(screen.getByText(/alert message/i)).toBeInTheDocument();
  });

  it('applies info variant class by default', () => {
    const { container } = renderWithTheme(<Alert>Info alert</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('alert--info');
  });

  it('applies info variant class', () => {
    const { container } = renderWithTheme(
      <Alert variant="info">Info alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('alert--info');
  });

  it('applies success variant class', () => {
    const { container } = renderWithTheme(
      <Alert variant="success">Success alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('alert--success');
  });

  it('applies warning variant class', () => {
    const { container } = renderWithTheme(
      <Alert variant="warning">Warning alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('alert--warning');
  });

  it('applies error variant class', () => {
    const { container } = renderWithTheme(
      <Alert variant="error">Error alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('alert--error');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <Alert className="custom-class">Alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain('custom-class');
  });

  it('handles close button click', async () => {
    const handleClose = jest.fn();
    renderWithTheme(<Alert onClose={handleClose}>Dismissible alert</Alert>);

    const closeButton = screen.getByLabelText(/close alert/i);
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when onClose is not provided', () => {
    renderWithTheme(<Alert>Non-dismissible alert</Alert>);
    expect(screen.queryByLabelText(/close alert/i)).not.toBeInTheDocument();
  });

  it('spreads additional props to div', () => {
    const { container } = renderWithTheme(
      <Alert data-testid="alert-test">Alert</Alert>
    );
    const alert = container.firstChild as HTMLElement;
    expect(alert).toHaveAttribute('data-testid', 'alert-test');
  });

  it('forwards ref to div element', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithTheme(<Alert ref={ref}>Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'alert');
  });
});
