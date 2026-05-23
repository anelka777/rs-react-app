import type { JSX } from 'react';
import { Link } from 'react-router';

import { ROUTES } from '../../routes';

import styles from './AboutPage.module.css';

const AboutPage = (): JSX.Element => {
  return (
    <main className={styles.about}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.info}>Author: Alena Danilchenko</p>
      <p className={styles.info}>
        This app was built as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          RS School React Course
        </a>
      </p>
      <Link to={ROUTES.HOME} className={styles.back}>
        ← Back to Home
      </Link>
    </main>
  );
};

export default AboutPage;
