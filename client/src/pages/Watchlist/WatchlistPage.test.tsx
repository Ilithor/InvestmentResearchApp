import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { WatchlistPage } from './WatchlistPage';

describe('WatchlistPage', () => {
  it('renders heading and helper text', () => {
    render(
      <ThemeProvider>
        <WatchlistPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole('heading', { name: /watchlist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Track symbols you care about/i)
    ).toBeInTheDocument();
  });
});
