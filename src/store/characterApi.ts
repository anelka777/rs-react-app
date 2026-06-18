import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  Character,
  CharacterDetail,
  CharacterListResponse,
} from '../types/character';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL) || 60;

interface GetCharactersArgs {
  search: string;
  page: number;
}

interface GetCharactersResult {
  characters: Character[];
  totalPages: number;
}

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
  }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<GetCharactersResult, GetCharactersArgs>({
      query: ({ search, page }) => ({
        url: '/character',
        params: {
          page,
          ...(search ? { name: search.toLowerCase() } : {}),
        },
      }),
      transformResponse: (response: CharacterListResponse) => ({
        characters: response.results,
        totalPages: response.info.pages,
      }),
      providesTags: ['Characters'],
    }),
    getCharacterById: builder.query<CharacterDetail, string>({
      query: (id) => `/character/${id}`,
      providesTags: ['Character'],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
