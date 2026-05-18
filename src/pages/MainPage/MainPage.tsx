import type React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';

import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { fetchCharacters } from '../../api/character';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Character } from '../../types/character';

import styles from './MainPage.module.css';

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
  const details = searchParams.get('details');
  const navigate = useNavigate();

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

  const handleCardClick = (id: number): void => {
    setSearchParams({ page: String(page), search, details: String(id) });
    navigate(`/details?page=${page}&search=${search}&details=${id}`);
  };

  const handleCloseDetail = (): void => {
    setSearchParams({ page: String(page), search });
    navigate(`/?page=${page}&search=${search}`);
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

      <div className={details ? styles.split_layout : ''}>
        <section className={styles.results_section}>
          <CardList
            characters={characters}
            isLoading={isLoading}
            error={error}
            onCardClick={handleCardClick}
          />
        </section>
        {details && (
          <section className={styles.detail_section}>
            <button className={styles.close_button} onClick={handleCloseDetail}>
              ✕
            </button>
            <Outlet />
          </section>
        )}
      </div>

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
