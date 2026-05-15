import type React from 'react';
import { useState, useEffect } from 'react';

import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import fetchCharacters from './api/character';
import useLocalStorage from './hooks/useLocalStorage';
import type { Character } from './types/character';
import styles from './App.module.css';

const App = (): React.ReactElement => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);
  const [storedTerm] = useLocalStorage('searchTerm', '');

  const loadCharacters = async (searchTerm: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCharacters(searchTerm);
      setCharacters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(storedTerm);
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [storedTerm]);

  if (shouldThrow) {
    throw new Error('Test error!');
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>Rick and Morty Characters</h1>
      <section className={styles.search_section}>
        <Search onSearch={loadCharacters} />
      </section>
      <section className={styles.results_section}>
        <CardList characters={characters} isLoading={isLoading} error={error} />
      </section>
      <button
        className={styles.error_button}
        onClick={() => setShouldThrow(true)}
      >
        Simulate Error
      </button>
    </div>
  );
};

export default App;
