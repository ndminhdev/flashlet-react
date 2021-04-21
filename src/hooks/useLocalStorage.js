import { useState } from 'react';

const useLocalStorage = (key) => {
  const state = JSON.parse(localStorage.getItem('state'));

  const [storedValue, setStoredValue] = useState(() => state[key] || null);

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    state[key] = valueToStore;
    localStorage.setItem('state', JSON.stringify(state));
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return { value: storedValue, setValue, clearStorage };
};

export default useLocalStorage;
