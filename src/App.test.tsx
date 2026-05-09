import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import fetchCharacters from './api/character';

vi.mock('./api/character');

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    location: { name: 'Earth' },
  },
];

const mockFetchCharacters = vi.mocked(fetchCharacters);

beforeEach(() => {
  localStorage.clear();
  mockFetchCharacters.mockClear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('fetches and displays characters on mount', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows spinner while loading', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('loads with search term from localStorage', async () => {
    localStorage.setItem('searchTerm', 'Rick');
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(<App />);
    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith('Rick');
    });
  });

  it('shows error message when API fails', async () => {
    mockFetchCharacters.mockRejectedValue(new Error('Error: 404'));
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText('Character not found. Try another name!')
      ).toBeInTheDocument();
    });
  });

  it('throws error when Simulate Error button is clicked', () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText('Simulate Error'));
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
  });
  it('calls fetchCharacters with search term when user searches', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith('Morty');
    });
  });
  it('handles non-Error exception', async () => {
    mockFetchCharacters.mockRejectedValue('string error');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
