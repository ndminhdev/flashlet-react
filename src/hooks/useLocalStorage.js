import { useEffect, useState } from 'react';
import useStore from './useStore';

const useLocalStorage = () => {
  const isBrowser = typeof window !== 'undefined';
  const { state: stateFromStore } = useStore();
  const [state, setState] = useState(isBrowser ? JSON.parse(window.localStorage.getItem('state')) || stateFromStore : stateFromStore);

  const setLocalStorage = (state) => {
    if (isBrowser) {
      window.localStorage.setItem(state, JSON.stringify(state));
    }
  }

  useEffect(() => {
    setLocalStorage(stateFromStore);
    setState(stateFromStore);
  }, [stateFromStore]);

  return state;
};

export default useLocalStorage;
