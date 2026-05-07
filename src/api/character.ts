import type { Character, CharacterListResponse } from '../types/character.ts';

const BASE_URL = 'https://rickandmortyapi.com/api';

const fetchCharacters = async (searchTerm: string): Promise<Character[]> => {
  const url = searchTerm
    ? `${BASE_URL}/character?name=${searchTerm.toLowerCase()}`
    : `${BASE_URL}/character?page=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data: CharacterListResponse = await response.json();
  return data.results;
};

export default fetchCharacters;
