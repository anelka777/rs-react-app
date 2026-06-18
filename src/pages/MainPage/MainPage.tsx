import type { JSX } from 'react';
import { useState } from 'react';
import { useSearchParams, Outlet, useNavigate, useParams } from 'react-router';

import { useAppDispatch } from '../../store/store';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useGetCharactersQuery } from '../../store/characterApi';
import { characterApi } from '../../store/characterApi';

import styles from './MainPage.module.css';

const MainPage = (): JSX.Element => {
  const { page: pageParam, detailsId } = useParams();
  const page = Number(pageParam) || 1;

  const [shouldThrow, setShouldThrow] = useState<boolean>(false);
  const [storedTerm] = useLocalStorage('searchTerm', '');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const search = searchParams.get('search') ?? storedTerm;

  const { data, isLoading, isFetching, error } = useGetCharactersQuery({
    search,
    page,
  });

  const characters = data?.characters ?? [];
  const totalPages = data?.totalPages ?? 1;

  const errorMessage = error ? 'Something went wrong. Please try again.' : null;

  const handleSearch = (searchTerm: string): void => {
    navigate(`/page/1?search=${searchTerm}`);
  };

  const handleCardClick = (id: number): void => {
    navigate(`/page/${page}/details/${id}?search=${search}`);
  };

  const handleCloseDetail = (): void => {
    navigate(`/page/${page}?search=${search}`);
  };

  const handleRefresh = (): void => {
    dispatch(characterApi.util.invalidateTags(['Characters']));
  };

  if (shouldThrow) {
    throw new Error('Test error!');
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>Rick and Morty Characters</h1>
      <section className={styles.search_section}>
        <Search onSearch={handleSearch} />
        <button className={styles.refresh_button} onClick={handleRefresh}>
          Refresh
        </button>
      </section>

      <div className={detailsId ? styles.split_layout : ''}>
        <section className={styles.results_section}>
          <CardList
            characters={characters}
            isLoading={isLoading || isFetching}
            error={errorMessage}
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
