import useLocalStorage from './useLocalStorage';

const useToken = () => {
  const {
    value: { token }
  } = useLocalStorage('session');
  return token;
};

export default useToken;
