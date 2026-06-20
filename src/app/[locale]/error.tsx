'use client';

import type { JSX } from 'react';

import styles from '../../components/ErrorBoundary/ErrorBoundary.module.css';

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  return (
    <div className={styles.error_boundary}>
      <h2>Something went wrong 😢</h2>
      <p>The application encountered an unexpected error.</p>
      <button className={styles.reset_button} onClick={reset}>
        Try again
      </button>
    </div>
  );
}
