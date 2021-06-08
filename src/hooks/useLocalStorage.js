import { useEffect, useState } from 'react';
import useStore from './useStore';

const useLocalStorage = () => {
  const isBrowser = typeof window !== 'undefined';
  const { state: stateFromStore } = useStore();
  const [state, setState] = useState(
    isBrowser
      ? JSON.parse(window.localStorage.getItem('state')) || stateFromStore
      : stateFromStore
  );

  const setLocalStorage = (newState) => {
    if (isBrowser) {
      window.localStorage.setItem(newState, JSON.stringify(state));
    }
    setState(newState);
    const isBrowser = typeof window !== 'undefined';
  };

  useEffect(() => {
    setLocalStorage(stateFromStore);
  }, [stateFromStore]);

  return { state, setLocalStorage };
};

export default useLocalStorage;
