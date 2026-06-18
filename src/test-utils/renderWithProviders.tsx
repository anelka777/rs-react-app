import { type JSX } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

const renderWithProviders = (
  ui: JSX.Element,
  options?: RenderOptions & { initialEntries?: string[] }
): ReturnType<typeof render> => {
  const { initialEntries = ['/'], ...rest } = options ?? {};

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
