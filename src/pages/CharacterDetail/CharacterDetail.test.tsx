import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { vi } from 'vitest';

import { fetchCharacterById } from '../../api/character';

import CharacterDetail from './CharacterDetail';

vi.mock('../../api/character');

const mockFetchCharacterById = vi.mocked(fetchCharacterById);

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  location: { name: 'Citadel of Ricks' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['ep1', 'ep2', 'ep3'],
};

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
  return render(<RouterProvider router={router} />);
};

beforeEach(() => {
  mockFetchCharacterById.mockClear();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CharacterDetail', () => {
  it('shows spinner while loading', () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);
    renderCharacterDetail('1');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays character details after loading', async () => {
    mockFetchCharacterById.mockResolvedValue(mockCharacter);
    renderCharacterDetail('1');
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    mockFetchCharacterById.mockRejectedValue(new Error('Error: 404'));
    renderCharacterDetail('1');
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });

  it('returns nothing when no id in URL', () => {
    renderCharacterDetail();
    expect(screen.queryByText('No character found')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
