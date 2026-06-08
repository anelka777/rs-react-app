import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

import App from './App';
import submissionsReducer from './store/submissionsSlice';
import countriesReducer from './store/countriesSlice';
import type { Submission } from './types';

const makeStore = (): EnhancedStore =>
  configureStore({
    reducer: {
      submissions: submissionsReducer,
      countries: countriesReducer,
    },
  });

describe('App', () => {
  it('renders heading and buttons', () => {
    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );
    expect(screen.getByText('React Forms')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('React Hook Form')).toBeInTheDocument();
  });

  it('shows empty state when no submissions', () => {
    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );
    expect(screen.getByText('No submissions yet.')).toBeInTheDocument();
  });

  it('opens uncontrolled form modal on button click', () => {
    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );
    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens hook form modal on button click', () => {
    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );
    fireEvent.click(screen.getByText('React Hook Form'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal on ESC key', () => {
    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );
    fireEvent.click(screen.getByText('Uncontrolled Form'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders submission cards when submissions exist', () => {
    const store = makeStore();
    const submission: Submission = {
      id: '1',
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      gender: 'female',
      termsAccepted: true,
      password: 'Password1!',
      confirmPassword: 'Password1!',
      country: 'France',
      image: '',
      submittedAt: '2026-01-01T00:00:00.000Z',
      isNew: false,
    };
    store.dispatch({ type: 'submissions/addSubmission', payload: submission });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
