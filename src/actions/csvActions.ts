'use server';

import type { Character } from '../types/character';

export async function generateCsvAction(items: Character[]): Promise<string> {
  const headers = 'name,status,species,gender,location,url';
  const rows = items.map(
    (c) =>
      `${c.name},${c.status},${c.species},${c.gender},${c.location.name},https://rickandmortyapi.com/api/character/${c.id}`
  );
  return [headers, ...rows].join('\n');
}
