import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders welcome copy', () => {
    render(
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole('heading', { name: /welcome/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Start by exploring market overviews/i)
    ).toBeInTheDocument();
  });
});
