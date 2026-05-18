import { fetchCharacters, fetchCharacterById } from './character';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockClear();
});

describe('fetchCharacters', () => {
  it('fetches characters without search term', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ info: { pages: 42 }, results: [] }),
    });

    await fetchCharacters('');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?page=1'
    );
  });
  it('fetches characters with search term', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ info: { pages: 1 }, results: [] }),
    });

    await fetchCharacters('rick');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=rick&page=1'
    );
  });
  it('throws error when response is not ok', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchCharacters('unknown')).rejects.toThrow('Error: 404');
  });
  it('returns characters from response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          info: { pages: 42 },
          results: [{ id: 1, name: 'Rick Sanchez' }],
        }),
    });

    const result = await fetchCharacters('');

    expect(result).toEqual({
      characters: [{ id: 1, name: 'Rick Sanchez' }],
      totalPages: 42,
    });
  });
  it('fetches character by id', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth' },
          location: { name: 'Earth' },
          image: 'img.jpg',
          episode: [],
        }),
    });

    const result = await fetchCharacterById(1);
    expect(result.name).toBe('Rick Sanchez');
  });
});
