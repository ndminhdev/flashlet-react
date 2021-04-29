import useLocalStorage from './useLocalStorage';

const usePreferences = () => {
  const { session } = useLocalStorage();
  return session.preferences;
};

export default usePreferences;
