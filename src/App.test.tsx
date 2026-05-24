import { screen } from '@testing-library/react';

import App from './App';
import renderWithProviders from './test-utils/renderWithProviders';

vi.mock('./api/character');

describe('App', () => {
  it('renders main page by default', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Rick and Morty Characters')).toBeInTheDocument();
  });

  it('renders about page', () => {
    renderWithProviders(<App />, { initialEntries: ['/about'] });
    expect(screen.getByText('Author: Alena Danilchenko')).toBeInTheDocument();
  });

  it('renders 404 page for unknown route', () => {
    renderWithProviders(<App />, { initialEntries: ['/unknown'] });
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
