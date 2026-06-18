import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import type { CharacterDetail } from '../types/character';

import { mockFetchResult } from './mockData';

const mockCharacterDetail: CharacterDetail = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Earth' },
  episode: ['https://rickandmortyapi.com/api/episode/1'],
};

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json({
      info: { pages: mockFetchResult.totalPages },
      results: mockFetchResult.characters,
    });
  }),

  http.get('https://rickandmortyapi.com/api/character/:id', () => {
    return HttpResponse.json(mockCharacterDetail);
  }),
];

export const server = setupServer(...handlers);
