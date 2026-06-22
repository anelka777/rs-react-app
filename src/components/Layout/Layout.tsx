'use client';

import { type JSX } from 'react';
import { useTranslations } from 'next-intl';

import Flyout from '../Flyout/Flyout';
import useTheme from '../../hooks/useTheme';
import { Link, usePathname, useRouter } from '../../i18n/navigation';

import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string): boolean => pathname === href;

  const switchLocale = (locale: 'en' | 'ru'): void => {
    router.replace(pathname, { locale });
    router.refresh();
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.nav__link} ${isActive('/') ? styles.active : ''}`}
          >
            {t('home')}
          </Link>
          <Link
            href="/about"
            className={`${styles.nav__link} ${isActive('/about') ? styles.active : ''}`}
          >
            {t('about')}
          </Link>
        </nav>
        <div className={styles.controls}>
          <button
            className={styles.theme__toggle}
            onClick={toggleTheme}
            suppressHydrationWarning
          >
            {theme === 'dark' ? tTheme('light') : tTheme('dark')}
          </button>
          <div className={styles.lang__switcher}>
            <button onClick={() => switchLocale('en')}>EN</button>
            {' | '}
            <button onClick={() => switchLocale('ru')}>RU</button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};

export default Layout;
