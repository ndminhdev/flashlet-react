import useAuth from './useAuth';

const useToken = () => {
  return useAuth().token;
};

export default useToken;
