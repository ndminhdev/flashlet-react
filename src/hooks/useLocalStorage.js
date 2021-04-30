import { useEffect, useState } from 'react';
import useStore from './useStore';

const useLocalStorage = () => {
  const { state } = useStore();
  const [storage, setStorage] = useState(state);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    setStorage(JSON.parse(localStorage.getItem('state')));
  }, [state]);

  return storage;
};

export default useLocalStorage;
