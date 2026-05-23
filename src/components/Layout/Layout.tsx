import { Outlet, NavLink } from 'react-router';

import styles from './Layout.module.css';

const Layout = (): React.ReactElement => {
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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
