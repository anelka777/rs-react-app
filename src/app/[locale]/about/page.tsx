import type { JSX } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import styles from '../../../pages/AboutPage/AboutPage.module.css';

const AboutPage = async (): Promise<JSX.Element> => {
  const t = await getTranslations('about');

  return (
    <main className={styles.about}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.info}>{t('author')}</p>
      <p className={styles.info}>
        {t('description')}{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('course')}
        </a>
      </p>
      <Link href="/" className={styles.back}>
        {t('back')}
      </Link>
    </main>
  );
};

export default AboutPage;
