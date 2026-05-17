import type { Character, CharacterListResponse } from '../types/character.ts';

const BASE_URL = 'https://rickandmortyapi.com/api';

interface FetchResult {
  characters: Character[];
  totalPages: number;
}

const fetchCharacters = async (
  searchTerm: string,
  page = 1
): Promise<FetchResult> => {
  const url = searchTerm
    ? `${BASE_URL}/character?name=${searchTerm.toLowerCase()}&page=${page}`
    : `${BASE_URL}/character?page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data: CharacterListResponse = await response.json();
  return {
    characters: data.results,
    totalPages: data.info.pages,
  };
};

export default fetchCharacters;
