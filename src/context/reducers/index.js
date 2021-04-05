import userReducer from './user';
import uiReducer from './ui';

const appReducer = (state, action) => ({
  ui: uiReducer(state.ui, action),
  user: userReducer(state.user, action)
});

export default appReducer;
