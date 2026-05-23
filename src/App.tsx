import type { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/page/1" replace />} />
        <Route path="page/:page" element={<MainPage />}>
          <Route path="details/:detailsId" element={<CharacterDetail />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
