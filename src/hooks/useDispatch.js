import useStore from './useStore';

const useDispatch = () => {
  return useStore().dispatch;
};

export default useDispatch;
