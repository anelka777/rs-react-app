import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore } from '@reduxjs/toolkit';

import submissionsReducer from '../../store/submissionsSlice';
import type { Submission } from '../../types';

import SubmissionCard from './SubmissionCard';

const makeStore = (): EnhancedStore =>
  configureStore({ reducer: { submissions: submissionsReducer } });

const mockSubmission: Submission = {
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

describe('SubmissionCard', () => {
  it('renders submission data', () => {
    render(
      <Provider store={makeStore()}>
        <SubmissionCard submission={mockSubmission} />
      </Provider>
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const withImage = { ...mockSubmission, image: 'data:image/png;base64,abc' };
    render(
      <Provider store={makeStore()}>
        <SubmissionCard submission={withImage} />
      </Provider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('does not render image when empty', () => {
    render(
      <Provider store={makeStore()}>
        <SubmissionCard submission={mockSubmission} />
      </Provider>
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('dispatches markAsOld after 3 seconds when isNew is true', async () => {
    vi.useFakeTimers();
    const store = makeStore();
    store.dispatch({
      type: 'submissions/addSubmission',
      payload: { ...mockSubmission, isNew: true },
    });

    render(
      <Provider store={store}>
        <SubmissionCard submission={{ ...mockSubmission, isNew: true }} />
      </Provider>
    );

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    const state = store.getState();
    expect(state.submissions.submissions[0].isNew).toBe(false);

    vi.useRealTimers();
  });
});
