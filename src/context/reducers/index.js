import userReducer from './user';

const appReducer = (state, action) => ({
  user: userReducer(state.user, action)
});

export default appReducer;
