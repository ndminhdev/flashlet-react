import sessionReducer from './session';
import uiReducer from './ui';

const appReducer = (state, action) => ({
  ui: uiReducer(state.ui, action),
  session: sessionReducer(state.session, action)
});

export default appReducer;
