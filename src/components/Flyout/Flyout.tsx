'use client';

import { type JSX } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { unselectAll } from '../../store/selectedSlice';
import { generateCsvAction } from '../../actions/csvActions';

import styles from './Flyout.module.css';

const Flyout = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedCharacters.items);

  if (items.length === 0) {
    return null;
  }

  const handleUnselectAll = (): void => {
    dispatch(unselectAll());
  };

  const handleDownload = async (): Promise<void> => {
    const csv = await generateCsvAction(items);
    const blob = new Blob([csv], { type: 'text/csv' });
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
      <button onClick={handleUnselectAll} disabled={!items.length}>
        Unselect All
      </button>
      <button onClick={handleDownload} disabled={!items.length}>
        Download
      </button>
    </div>
  );
};

export default Flyout;
