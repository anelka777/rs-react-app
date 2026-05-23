import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, Outlet, useNavigate, useParams } from 'react-router';

import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { fetchCharacters } from '../../api/character';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Character } from '../../types/character';

import styles from './MainPage.module.css';

const MainPage = (): JSX.Element => {
  const { page: pageParam, detailsId } = useParams();
  const page = Number(pageParam) || 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [, setStoredTerm] = useLocalStorage('searchTerm', '');
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
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
  }, [searchParams, page]);

  const handleSearch = (searchTerm: string): void => {
    setStoredTerm(searchTerm);
    navigate(`/page/1?search=${searchTerm}`);
  };

  const handleCardClick = (id: number): void => {
    navigate(`/page/${page}/details/${id}?search=${search}`);
  };

  const handleCloseDetail = (): void => {
    navigate(`/page/${page}?search=${search}`);
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

      <div className={detailsId ? styles.split_layout : ''}>
        <section className={styles.results_section}>
          <CardList
            characters={characters}
            isLoading={isLoading}
            error={error}
            onCardClick={handleCardClick}
          />
        </section>
        {detailsId && (
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
            navigate(`/page/${newPage}?search=${search}`)
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
