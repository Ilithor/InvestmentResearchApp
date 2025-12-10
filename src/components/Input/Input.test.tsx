import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ThemeContext';
import { Input } from './Input';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Input', () => {
  it('renders input element', () => {
    renderWithTheme(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    renderWithTheme(<Input error="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when no error', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('displays helper text', () => {
    renderWithTheme(<Input helperText="Enter your email address" />);
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    renderWithTheme(<Input error="Error message" helperText="Helper text" />);
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
    expect(screen.queryByText(/helper text/i)).not.toBeInTheDocument();
  });

  it('handles user input', async () => {
    renderWithTheme(<Input />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('applies disabled state', () => {
    renderWithTheme(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies fullWidth class', () => {
    renderWithTheme(<Input fullWidth />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('input--full-width');
  });

  it('applies required attribute', () => {
    renderWithTheme(<Input required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('sets aria-required when required', () => {
    renderWithTheme(<Input label="Email" required />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-required',
      'true'
    );
  });

  it('shows required indicator in label', () => {
    const { container } = renderWithTheme(<Input label="Email" required />);
    const label = container.querySelector('.input-label--required');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Email');
    // The asterisk is added via CSS ::after pseudo-element
    expect(label).toHaveClass('input-label--required');
  });

  it('does not show required indicator when not required', () => {
    const { container } = renderWithTheme(<Input label="Email" />);
    const label = container.querySelector('.input-label--required');
    expect(label).not.toBeInTheDocument();
  });
});
