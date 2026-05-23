import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { fetchCharacters } from '../../api/character';
import { mockFetchResult } from '../../test-utils/mockData';
import CharacterDetail from '../CharacterDetail/CharacterDetail';

import MainPage from './MainPage';

vi.mock('../../api/character');

const mockFetchCharacters = vi.mocked(fetchCharacters);

const renderMainPage = (path = '/page/1'): ReturnType<typeof render> => {
  const router = createMemoryRouter(
    [
      {
        path: '/page/:page',
        element: <MainPage />,
        children: [
          { path: 'details/:detailsId', element: <CharacterDetail /> },
        ],
      },
    ],
    { initialEntries: [path] }
  );
  return render(<RouterProvider router={router} />);
};

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
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows spinner while loading', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('loads with search term from URL', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage('/page/1?search=Rick');
    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith('Rick', 1);
    });
  });

  it('shows error message when API fails', async () => {
    mockFetchCharacters.mockRejectedValue(new Error('Error: 404'));
    renderMainPage();
    await waitFor(() => {
      expect(
        screen.getByText('Character not found. Try another name!')
      ).toBeInTheDocument();
    });
  });

  it('throws error when Simulate Error button is clicked', () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    const router = createMemoryRouter(
      [
        {
          path: '/page/:page/*',
          element: (
            <ErrorBoundary>
              <MainPage />
            </ErrorBoundary>
          ),
        },
      ],
      { initialEntries: ['/page/1'] }
    );
    render(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText('Simulate Error'));
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
  });

  it('calls fetchCharacters with search term when user searches', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(mockFetchCharacters).toHaveBeenCalledWith('Morty', 1);
    });
  });

  it('handles non-Error exception', async () => {
    mockFetchCharacters.mockRejectedValue('string error');
    renderMainPage();
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('handles non-Error exception when searching', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage();
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

  it('navigates to details when card is clicked', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage('/page/1');
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Rick Sanchez'));
    await waitFor(() => {
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
  });

  it('closes detail panel when close button is clicked', async () => {
    mockFetchCharacters.mockResolvedValue(mockFetchResult);
    renderMainPage('/page/1/details/1');
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('✕'));
    await waitFor(() => {
      expect(screen.queryByText('✕')).not.toBeInTheDocument();
    });
  });
});
