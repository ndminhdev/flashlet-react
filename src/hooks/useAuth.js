import useLocalStorage from './useLocalStorage';

const useAuth = () => {
  const { value } = useLocalStorage('session');
  return value;
};

export default useAuth;
