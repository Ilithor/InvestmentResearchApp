import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe('ThemeContext', () => {
  it('uses stored mode when available', () => {
    localStorage.setItem('themeMode', 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.mode).toBe('dark');
  });

  it('toggles mode and updates classnames', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    const initialClass = result.current.getClassName('test');
    expect(initialClass).toBe('test test--light');

    act(() => {
      result.current.toggleMode();
    });

    const toggledClass = result.current.getClassName('test');
    expect(toggledClass).toBe('test test--dark');
    expect(result.current.mode).toBe('dark');
  });
});
