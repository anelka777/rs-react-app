import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { server } from '../../test-utils/server';
import CharacterDetail from '../CharacterDetail/CharacterDetail';
import ThemeProvider from '../../context/ThemeProvider';
import { createTestStore } from '../../test-utils/renderWithProviders';

import MainPage from './MainPage';

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
  return render(
    <Provider store={createTestStore()}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MainPage', () => {
  it('fetches and displays characters on mount', async () => {
    renderMainPage();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows spinner while loading', async () => {
    renderMainPage();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('loads with search term from URL', async () => {
    renderMainPage('/page/1?search=Rick');
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows error message when API fails', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
      })
    );
    renderMainPage();
    await waitFor(() => {
      expect(
        screen.getByText('Unexpected error. Please try again!')
      ).toBeInTheDocument();
    });
  });

  it('throws error when Simulate Error button is clicked', async () => {
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
    render(
      <Provider store={createTestStore()}>
        <RouterProvider router={router} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Simulate Error')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Simulate Error'));
    expect(screen.getByText('Something went wrong 😢')).toBeInTheDocument();
  });

  it('navigates to details when card is clicked', async () => {
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
    renderMainPage('/page/1/details/1');
    await waitFor(() => {
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('✕'));
    await waitFor(() => {
      expect(screen.queryByText('✕')).not.toBeInTheDocument();
    });
  });

  it('invalidates cache and refetches on Refresh click', async () => {
    renderMainPage();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Refresh'));
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });
});
