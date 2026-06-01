import { type JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../store/store';
import { unselectAll } from '../../store/selectedSlice';

import styles from './Flyout.module.css';

const Flyout = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state: RootState) => state.selectedCharacters.items
  );

  if (items.length === 0) {
    return null;
  }

  const handleUnselectAll = (): void => {
    dispatch(unselectAll());
  };

  const handleDownload = (): void => {
    const headers = 'name,status,species,gender,location,url\n';
    const rows = items
      .map(
        (c) =>
          `${c.name},${c.status},${c.species},${c.gender},${c.location.name},https://rickandmortyapi.com/api/character/${c.id}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${items.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.flyout}>
      <p>Selected: {items.length}</p>
      <button onClick={handleUnselectAll}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
