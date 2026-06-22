'use client';

import { useRef, type JSX } from 'react';
import { Provider } from 'react-redux';

import { makeStore, type AppStore } from './store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current == null) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
