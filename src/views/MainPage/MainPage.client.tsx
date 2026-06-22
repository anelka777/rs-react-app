'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

import type { Character } from '../../types/character';
import SearchForm from '../../components/SearchForm/SearchForm';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';

import styles from './MainPage.module.css';

interface MainPageClientProps {
  characters: Character[];
  totalPages: number;
  error: string | null;
  page: number;
  search: string;
  detailsId?: string;
  children?: React.ReactNode;
}

const MainPageClient = ({
  characters,
  totalPages,
  error,
  page,
  search,
  detailsId,
  children,
}: MainPageClientProps): JSX.Element => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('search');
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);

  const handleCardClick = (id: number): void => {
    router.push(`/${locale}?page=${page}&search=${search}&details=${id}`);
  };

  const handleRefresh = (): void => {
    router.refresh();
  };

  const handleCloseDetail = (): void => {
    router.push(`/${locale}?page=${page}&search=${search}`);
  };

  if (shouldThrow) {
    throw new Error('Test error!');
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>{t('title')}</h1>
      <section className={styles.search_section}>
        <SearchForm initialValue={search} />
        <button className={styles.refresh_button} onClick={handleRefresh}>
          {t('refresh')}
        </button>
      </section>

      <div className={detailsId ? styles.split_layout : ''}>
        <section className={styles.results_section}>
          <CardList
            characters={characters}
            isLoading={false}
            error={error}
            onCardClick={handleCardClick}
          />
        </section>
        {detailsId && (
          <section className={styles.detail_section}>
            <button className={styles.close_button} onClick={handleCloseDetail}>
              ✕
            </button>
            {children}
          </section>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) =>
          router.push(`/${locale}?page=${newPage}&search=${search}`)
        }
      />
      <button
        className={styles.error_button}
        onClick={() => setShouldThrow(true)}
      >
        {t('simulateError')}
      </button>
    </div>
  );
};

export default MainPageClient;
