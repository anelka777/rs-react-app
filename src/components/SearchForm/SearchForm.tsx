'use client';

import type { JSX } from 'react';
import { useActionState } from 'react';
import { useLocale } from 'next-intl';

import { searchAction } from '../../actions/searchActions';
import styles from '../Search/Search.module.css';

const SearchForm = ({
  initialValue,
}: {
  initialValue: string;
}): JSX.Element => {
  const locale = useLocale();
  const boundAction = searchAction.bind(null, locale);
  const [, dispatch] = useActionState(boundAction, null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const formData = new FormData(e.currentTarget);
    const search = (formData.get('search') as string).trim();

    if (search === initialValue.trim()) {
      e.preventDefault();
    }
  };

  return (
    <form action={dispatch} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          className={styles.search__input}
          placeholder="Search character..."
          defaultValue={initialValue}
        />
        <button type="submit" className={styles.search__button}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
