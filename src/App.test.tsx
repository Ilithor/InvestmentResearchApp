import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App routing', () => {
  it('renders Home page on root path', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /welcome/i })
    ).toBeInTheDocument();
  });

  it('renders Watchlist page on /watchlist', () => {
    window.history.pushState({}, '', '/watchlist');
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /watchlist/i })
    ).toBeInTheDocument();
  });
});
