import { render, screen, fireEvent } from '@testing-library/react';
import type { JSX } from 'react';
import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';
import ThemeProvider from './ThemeProvider';

const TestComponent = (): JSX.Element => {
  const ctx = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{ctx?.theme}</span>
      <button onClick={ctx?.toggleTheme}>Toggle</button>
    </div>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe('ThemeProvider', () => {
  it('defaults to dark theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('dark');
  });

  it('reads theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('toggles theme and saves to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
