import type React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import fetchCharacters from '../../api/character';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Character } from '../../types/character';
import styles from '../../App.module.css';

const MainPage = (): React.ReactElement => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, setStoredTerm] = useLocalStorage('searchTerm', '');
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(search, page);
        setCharacters(data.characters);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [searchParams]);

  const handleSearch = (searchTerm: string): void => {
    setStoredTerm(searchTerm);
    setSearchParams({ page: '1', search: searchTerm });
  };

  if (shouldThrow) {
    throw new Error('Test error!');
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>Rick and Morty Characters</h1>
      <section className={styles.search_section}>
        <Search onSearch={handleSearch} />
      </section>
      <section className={styles.results_section}>
        <CardList characters={characters} isLoading={isLoading} error={error} />
      </section>
      {!isLoading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setSearchParams({ page: String(newPage), search })
          }
        />
      )}
      <button
        className={styles.error_button}
        onClick={() => setShouldThrow(true)}
      >
        Simulate Error
      </button>
    </div>
  );
};

export default MainPage;
