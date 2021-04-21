import { SIGN_IN } from '../constants/session';

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

    default:
      return state;
  }
};

export default sessionReducer;
