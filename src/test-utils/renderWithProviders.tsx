import { type JSX } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { characterApi } from '../store/characterApi';
import selectedReducer from '../store/selectedSlice';
import type { store as globalStore } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

type StoreType = typeof globalStore;

export const createTestStore = (): StoreType =>
  configureStore({
    reducer: {
      selectedCharacters: selectedReducer,
      [characterApi.reducerPath]: characterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterApi.middleware),
  }) as StoreType;

const renderWithProviders = (
  ui: JSX.Element,
  options?: RenderOptions & { store?: StoreType }
): ReturnType<typeof render> => {
  const { store = createTestStore(), ...rest } = options ?? {};

  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>,
    rest
  );
};

export default renderWithProviders;
