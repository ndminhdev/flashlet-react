import { SIGN_IN } from '../constants/session';

export const signIn = (dispatch, data) =>
  dispatch({
    type: SIGN_IN,
    payload: data
  });
