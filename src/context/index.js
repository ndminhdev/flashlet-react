import React, { useReducer } from 'react';

import appReducer from './reducers';

const StateContext = React.createContext({
  state: {},
  dispatch: () => {}
});

const initialState = {
  user: {
    isAuth: false,
    user: null,
    token: ''
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
