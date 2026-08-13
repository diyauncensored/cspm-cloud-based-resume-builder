import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue, onSaveCallback) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (onSaveCallback) onSaveCallback('saving');
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      
      const timer = setTimeout(() => {
        if (onSaveCallback) onSaveCallback('saved');
      }, 300);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
