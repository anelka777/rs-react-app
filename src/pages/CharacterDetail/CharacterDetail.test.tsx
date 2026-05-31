import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';

import { createTestStore } from '../../test-utils/renderWithProviders';
import { server } from '../../test-utils/server';

import CharacterDetail from './CharacterDetail';

const renderCharacterDetail = (
  detailsId?: string
): ReturnType<typeof render> => {
  const path = detailsId ? `/page/1/details/${detailsId}` : '/page/1';
  const router = createMemoryRouter(
    [
      { path: '/page/:page/details/:detailsId', element: <CharacterDetail /> },
      { path: '/page/:page', element: <CharacterDetail /> },
    ],
    { initialEntries: [path] }
  );
  return render(
    <Provider store={createTestStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
};

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CharacterDetail', () => {
  it('shows spinner while loading', () => {
    renderCharacterDetail('1');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays character details after loading', async () => {
    renderCharacterDetail('1');
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character/:id', () => {
        return HttpResponse.json({ error: 'Not found' }, { status: 404 });
      })
    );
    renderCharacterDetail('1');
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });

  it('returns nothing when no id in URL', () => {
    renderCharacterDetail();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.getByText('No character found')).toBeInTheDocument();
  });
});
