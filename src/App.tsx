import type React from 'react';
import { Routes, Route } from 'react-router';

import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail';

const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<MainPage />}>
          <Route index element={null} />
          <Route path="details" element={<CharacterDetail />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
