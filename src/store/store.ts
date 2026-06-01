import { configureStore } from '@reduxjs/toolkit';

import selectedReducer from './selectedSlice';
import { characterApi } from './characterApi';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
