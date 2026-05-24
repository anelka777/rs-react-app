import { describe, it, expect } from 'vitest';

import mockCharacters from '../test-utils/mockData';

import selectedReducer, { toggleCharacter, unselectAll } from './selectedSlice';

describe('selectedSlice', () => {
  it('returns initial state', () => {
    expect(selectedReducer(undefined, { type: '' })).toEqual({ items: [] });
  });

  it('adds character when toggled', () => {
    const state = selectedReducer(
      undefined,
      toggleCharacter(mockCharacters[0])
    );
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
  });

  it('removes character when toggled twice', () => {
    let state = selectedReducer(undefined, toggleCharacter(mockCharacters[0]));
    state = selectedReducer(state, toggleCharacter(mockCharacters[0]));
    expect(state.items).toHaveLength(0);
  });

  it('unselects all characters', () => {
    let state = selectedReducer(undefined, toggleCharacter(mockCharacters[0]));
    state = selectedReducer(state, toggleCharacter(mockCharacters[1]));
    state = selectedReducer(state, unselectAll());
    expect(state.items).toHaveLength(0);
  });
});
