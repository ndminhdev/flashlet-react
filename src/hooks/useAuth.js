import useStore from './useStore';

const useAuth = () => {
  const { state } = useStore();
  const auth = state.user;
  console.log(state);
  return { auth };
};

export default useAuth;
