import { SIGN_IN, SIGN_OUT, CHANGE_PROFILE } from '../constants/session';

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

    case CHANGE_PROFILE: {
      return {
        ...state,
        user: payload.user
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
