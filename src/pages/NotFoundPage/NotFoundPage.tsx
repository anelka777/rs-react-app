import type React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

const NotFoundPage = (): React.ReactElement => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found</p>
      <Link to="/" className={styles.back}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
