import useLocalStorage from './useLocalStorage';

const useToken = () => {
  return useLocalStorage().state.session.token;
};

export default useToken;
