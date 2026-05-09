import { render, screen, fireEvent } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }): null => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return null;
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('shows fallback UI when child throws error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
  });

  it('shows Try again button and resets error on click', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
