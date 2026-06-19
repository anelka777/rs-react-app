'use client';

import { type JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

import Flyout from '../Flyout/Flyout';
import useTheme from '../../hooks/useTheme';

import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string): boolean => pathname === href;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link
            href={`/${locale}`}
            className={`${styles.nav__link} ${isActive(`/${locale}`) ? styles.active : ''}`}
          >
            {t('home')}
          </Link>
          <Link
            href={`/${locale}/about`}
            className={`${styles.nav__link} ${isActive(`/${locale}/about`) ? styles.active : ''}`}
          >
            {t('about')}
          </Link>
        </nav>
        <div className={styles.controls}>
          <button className={styles.theme__toggle} onClick={toggleTheme}>
            {theme === 'dark' ? tTheme('light') : tTheme('dark')}
          </button>
          <div className={styles.lang__switcher}>
            <Link href={pathname.replace(`/${locale}`, '/en')}>EN</Link>
            {' | '}
            <Link href={pathname.replace(`/${locale}`, '/ru')}>RU</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};

export default Layout;
