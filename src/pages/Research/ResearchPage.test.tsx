import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ResearchPage } from './ResearchPage';

describe('ResearchPage', () => {
  it('renders heading and helper text', () => {
    render(
      <ThemeProvider>
        <ResearchPage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole('heading', { name: /research/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Deep dives, screeners, and signals/i)
    ).toBeInTheDocument();
  });
});
