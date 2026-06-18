import { type JSX } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import useCsvExport from '../../hooks/useCsvExport';
import { unselectAll } from '../../store/selectedSlice';

import styles from './Flyout.module.css';

const Flyout = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedCharacters.items);

  const { handleDownload } = useCsvExport(items);

  if (items.length === 0) {
    return null;
  }

  const handleUnselectAll = (): void => {
    dispatch(unselectAll());
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
