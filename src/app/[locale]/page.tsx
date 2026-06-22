import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';

import MainPageClient from '@/views/MainPage/MainPage.client';
import CharacterDetailServer from '@/views/CharacterDetail/CharacterDetail.server';

interface HomeProps {
  searchParams: Promise<{ search?: string; page?: string; details?: string }>;
}

export default async function Home({
  searchParams,
}: HomeProps): Promise<JSX.Element> {
  const { search = '', page = '1', details } = await searchParams;
  const pageNum = Number(page) || 1;

  const t = await getTranslations('search');

  const url = `https://rickandmortyapi.com/api/character?page=${pageNum}${search ? `&name=${search.toLowerCase()}` : ''}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = res.ok ? await res.json() : null;

  const characters = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;
  const error = !res.ok ? t('error') : null;

  return (
    <MainPageClient
      characters={characters}
      totalPages={totalPages}
      error={error}
      page={pageNum}
      search={search}
      detailsId={details}
    >
      {details && <CharacterDetailServer id={details} />}
    </MainPageClient>
  );
}
