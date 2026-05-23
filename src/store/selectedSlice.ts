import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Character } from '../types/character';

interface SelectedState {
  items: Character[];
}

const initialState: SelectedState = {
  items: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleCharacter(state, action: PayloadAction<Character>) {
      const exists = state.items.find(
        (c: Character) => c.id === action.payload.id
      );
      if (exists) {
        state.items = state.items.filter(
          (c: Character) => c.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll(state) {
      state.items = [];
    },
  },
});

export const { toggleCharacter, unselectAll } = selectedSlice.actions;
export default selectedSlice.reducer;
