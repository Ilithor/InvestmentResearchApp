import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from './Layout';

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Layout', () => {
  it('renders navigation links and children via outlet', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/watchlist']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/watchlist" element={<div>Watchlist Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Investment Research App/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /watchlist/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /research/i })).toBeInTheDocument();
    expect(screen.getByText(/Watchlist Content/i)).toBeInTheDocument();
  });

  it('toggles theme mode label', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /dark mode/i });
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/light mode/i);
  });
});
