import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Submission } from '../types';

interface SubmissionsState {
  submissions: Submission[];
}

const initialState: SubmissionsState = {
  submissions: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.unshift(action.payload);
    },
    markAsOld: (state, action: PayloadAction<string>) => {
      const submission = state.submissions.find((s) => s.id === action.payload);
      if (submission) {
        submission.isNew = false;
      }
    },
  },
});

export const { addSubmission, markAsOld } = submissionsSlice.actions;
export default submissionsSlice.reducer;
