import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
} from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchDescription = async (id: number): Promise<string> => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!response.ok) return '';
  const data: PokemonSpecies = await response.json();
  const entry = data.flavor_text_entries.find((e) => e.language.name === 'en');
  return entry ? entry.flavor_text.replace(/\f/g, ' ') : '';
};

export const fetchPokemons = async (searchTerm: string): Promise<Pokemon[]> => {
  if (searchTerm) {
    const response = await fetch(
      `${BASE_URL}/pokemon/${searchTerm.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const pokemon: Pokemon = await response.json();
    pokemon.description = await fetchDescription(pokemon.id);
    return [pokemon];
  }

  const response = await fetch(`${BASE_URL}/pokemon?limit=20`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data: PokemonListResponse = await response.json();

  const pokemons = await Promise.all(
    data.results.map(async (item) => {
      const res = await fetch(item.url);
      const pokemon = (await res.json()) as Pokemon;
      pokemon.description = await fetchDescription(pokemon.id);
      return pokemon;
    })
  );

  return pokemons;
};
