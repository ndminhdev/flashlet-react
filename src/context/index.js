import React, { useReducer, useEffect } from 'react';

import appReducer from './reducers';
import { useLocalStorage } from '@/hooks';

const StateContext = React.createContext({
  state: {},
  dispatch: () => {}
});

const initialState = {
  ui: {
    signInOverlayShown: false,
    signUpOverlayShown: false
  },
  session: {
    isAuth: false,
    user: null,
    token: '',
    preferences: null
  }
};

export const StateProvider = ({ children }) => {
  const { state: localState } = useLocalStorage();
  const [state, dispatch] = useReducer(appReducer, localState || initialState);

  // save state to local storage in the first rendering
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    window.localStorage.setItem('state', JSON.stringify(state));
  }

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
