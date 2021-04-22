import { SIGN_IN, SIGN_OUT } from '../constants/session';

export const signIn = (dispatch, data) =>
  dispatch({
    type: SIGN_IN,
    payload: data
  });

export const signOut = (dispatch, token) =>
  dispatch({
    type: SIGN_OUT
  });
