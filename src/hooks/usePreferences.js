import useLocalStorage from './useLocalStorage';

const usePreferences = () => {
  const {
    state: { session }
  } = useLocalStorage();
  const defaultPreferences = {
    darkMode: false
  };

  return session?.preferences ? session.preferences : defaultPreferences;
};

export default usePreferences;
