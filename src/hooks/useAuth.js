import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  return useLocalStorage().state.session;
};

export default useAuth;
