import fetchCharacters from './character';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockClear();
});

describe('fetchCharacters', () => {
  it('fetches characters without search term', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    await fetchCharacters('');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?page=1'
    );
  });
  it('fetches characters with search term', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    await fetchCharacters('rick');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=rick'
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
        Promise.resolve({ results: [{ id: 1, name: 'Rick Sanchez' }] }),
    });

    const result = await fetchCharacters('');

    expect(result).toEqual([{ id: 1, name: 'Rick Sanchez' }]);
  });
});
