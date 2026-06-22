import { type JSX } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

const renderWithProviders = (
  ui: JSX.Element,
  options?: RenderOptions & { store?: AppStore }
): ReturnType<typeof render> => {
  const { store = makeStore(), ...rest } = options ?? {};

  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>,
    rest
  );
};

export default renderWithProviders;
