import useLocalStorage from './useLocalStorage';

const useToken = () => {
  const {
    session: { token }
  } = useLocalStorage();
  return token;
};

export default useToken;
