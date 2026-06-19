import { useState, useEffect } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setStoredValue(stored);
    }
  }, [key]);

  const setValue = (value: string): void => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
