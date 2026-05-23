import type { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';
import { ROUTES } from './routes';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={ROUTES.HOME} replace />} />
        <Route path={ROUTES.PAGE} element={<MainPage />}>
          <Route path={ROUTES.DETAILS} element={<CharacterDetail />} />
        </Route>
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
