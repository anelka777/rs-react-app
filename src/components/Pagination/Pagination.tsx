import type React from 'react';

import styles from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps): React.ReactElement => {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span className={styles.info}>
        Page {page} of {totalPages}
      </span>
      <button
        className={styles.button}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
