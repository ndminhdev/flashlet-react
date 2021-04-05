import { SIGN_IN } from '../constants/user';

export const signIn = (dispatch, data) =>
  dispatch({
    type: SIGN_IN,
    payload: data
  });
