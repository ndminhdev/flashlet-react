import useStore from './useStore';

const useAuth = () => {
  const {
    state: { user }
  } = useStore();
  return user;
};

export default useAuth;
