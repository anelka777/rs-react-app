import { useState } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(
    () => localStorage.getItem(key) || initialValue
  );

  const setValue = (value: string): void => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
