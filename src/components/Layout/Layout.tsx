import { type JSX } from 'react';
import { Outlet, NavLink } from 'react-router';

import Flyout from '../Flyout/Flyout';
import useTheme from '../../hooks/useTheme';

import styles from './Layout.module.css';

const Layout = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles.active}`
                : styles.nav__link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles.active}`
                : styles.nav__link
            }
          >
            About
          </NavLink>
        </nav>
        <button className={styles.theme__toggle} onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
      <Flyout />
    </div>
  );
};

export default Layout;
