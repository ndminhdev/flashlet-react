import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const { session } = useLocalStorage();
  return session;
};

export default useAuth;
