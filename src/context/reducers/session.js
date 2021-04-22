import { SIGN_IN, SIGN_OUT } from '../constants/session';

const sessionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        isAuth: true,
        user: payload.user,
        token: payload.token
      };

    case SIGN_OUT: {
      return {
        ...state,
        isAuth: false,
        user: null,
        token: ''
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
