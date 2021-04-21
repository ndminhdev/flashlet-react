import React, { useReducer, useEffect } from 'react';

import appReducer from './reducers';

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
    token: ''
  }
};

export const StateProvider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem('state'));
  const [state, dispatch] = useReducer(appReducer, localState || initialState);
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    console.log('Storage saved', JSON.parse(localStorage.getItem('state')));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
