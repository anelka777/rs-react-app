import { configureStore, type EnhancedStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import selectedReducer from './selectedSlice';
import { characterApi } from './characterApi';

export type AppStore = EnhancedStore;

export const makeStore = (): AppStore =>
  configureStore({
    reducer: {
      selectedCharacters: selectedReducer,
      [characterApi.reducerPath]: characterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterApi.middleware),
  });

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const store = makeStore();
