import { useContext } from 'react';
import StateContext from '@/context';

const useStore = () => {
  const { state, dispatch } = useContext(StateContext);

  return { state, dispatch };
};

export default useStore;
