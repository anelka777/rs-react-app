import { describe, it, expect } from 'vitest';

import type { Submission } from '../types';

import reducer, { addSubmission, markAsOld } from './submissionsSlice';

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
  image: 'data:image/png;base64,abc',
  submittedAt: '2026-01-01T00:00:00.000Z',
  isNew: true,
};

describe('submissionsSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state.submissions).toEqual([]);
  });

  it('addSubmission adds to the beginning', () => {
    const state = reducer(undefined, addSubmission(mockSubmission));
    expect(state.submissions).toHaveLength(1);
    expect(state.submissions[0]).toEqual(mockSubmission);
  });

  it('addSubmission prepends new submissions', () => {
    const second: Submission = { ...mockSubmission, id: '2', name: 'Bob' };
    let state = reducer(undefined, addSubmission(mockSubmission));
    state = reducer(state, addSubmission(second));
    expect(state.submissions[0].id).toBe('2');
    expect(state.submissions[1].id).toBe('1');
  });

  it('markAsOld sets isNew to false', () => {
    let state = reducer(undefined, addSubmission(mockSubmission));
    state = reducer(state, markAsOld('1'));
    expect(state.submissions[0].isNew).toBe(false);
  });

  it('markAsOld does nothing for unknown id', () => {
    let state = reducer(undefined, addSubmission(mockSubmission));
    state = reducer(state, markAsOld('999'));
    expect(state.submissions[0].isNew).toBe(true);
  });
});
