import type React from 'react';
import { useState } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: SearchProps): React.ReactElement => {
  const [storedTerm, setStoredTerm] = useLocalStorage('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(storedTerm);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (): void => {
    const trimmed: string = searchTerm.trim();
    if (trimmed === storedTerm) {
      return;
    }
    setStoredTerm(trimmed);
    onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Search character... "
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.search__button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
