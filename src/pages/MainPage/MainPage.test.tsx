import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import fetchCharacters from '../../api/character';
import mockCharacters from '../../test-utils/mockData';

import MainPage from './MainPage';

vi.mock('../../api/character');

const mockFetchCharacters = vi.mocked(fetchCharacters);

beforeEach(() => {
  localStorage.clear();
  mockFetchCharacters.mockClear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MainPage', () => {
  it('fetches and displays characters on mount', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows spinner while loading', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('loads with search term from localStorage', async () => {
    localStorage.setItem('searchTerm', 'Rick');
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith('Rick');
    });
  });

  it('shows error message when API fails', async () => {
    mockFetchCharacters.mockRejectedValue(new Error('Error: 404'));
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText('Character not found. Try another name!')
      ).toBeInTheDocument();
    });
  });

  it('throws error when Simulate Error button is clicked', () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <MainPage />
        </ErrorBoundary>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Simulate Error'));
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
  });

  it('calls fetchCharacters with search term when user searches', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
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
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
  it('handles non-Error exception when searching', async () => {
    mockFetchCharacters.mockResolvedValue(mockCharacters);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    mockFetchCharacters.mockRejectedValue('string error');
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
