import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (searchTerm: string): Promise<Pokemon[]> => {
  if (searchTerm) {
    const response = await fetch(
      `${BASE_URL}/pokemon/${searchTerm.toLowerCase().trim()}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const pokemon: Pokemon = await response.json();
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
      return res.json() as Promise<Pokemon>;
    })
  );

  return pokemons;
};
