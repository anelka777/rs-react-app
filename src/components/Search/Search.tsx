'use client';

import type { JSX } from 'react';
import type React from 'react';

import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search = ({ onSearch }: SearchProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (): void => {
    const trimmed = searchTerm.trim();
    setSearchTerm(trimmed);
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
