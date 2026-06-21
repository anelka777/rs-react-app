import type { JSX } from 'react';
import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFound(): JSX.Element {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link href="/" className={styles.back}>
        ← Back to Home
      </Link>
    </div>
  );
}
