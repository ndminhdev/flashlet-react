import {
  SIGN_IN,
  SIGN_OUT,
  CHANGE_PROFILE,
  SET_PREFERENCES
} from '../constants/session';

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
        token: '',
        preferences: null
      };
    }

    case CHANGE_PROFILE: {
      return {
        ...state,
        user: payload.user
      };
    }

    case SET_PREFERENCES: {
      return {
        ...state,
        preferences: payload.preferences
      };
    }

    default:
      return state;
  }
};

export default sessionReducer;
