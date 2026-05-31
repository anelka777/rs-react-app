import { type JSX } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';

import { characterApi } from '../store/characterApi';
import selectedReducer from '../store/selectedSlice';
import type { store as globalStore } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

type StoreType = typeof globalStore;

export const createTestStore = (): StoreType =>
  configureStore({
    reducer: {
      selected: selectedReducer,
      [characterApi.reducerPath]: characterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterApi.middleware),
  }) as StoreType;

const renderWithProviders = (
  ui: JSX.Element,
  options?: RenderOptions & { initialEntries?: string[]; store?: StoreType }
): ReturnType<typeof render> => {
  const {
    initialEntries = ['/'],
    store = createTestStore(),
    ...rest
  } = options ?? {};

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
      </ThemeProvider>
    </Provider>,
    rest
  );
};

export default renderWithProviders;
