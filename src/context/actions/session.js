import {
  SIGN_IN,
  SIGN_OUT,
  CHANGE_PROFILE,
  SET_PREFERENCES
} from '../constants/session';

export const signIn = (dispatch, data) =>
  dispatch({
    type: SIGN_IN,
    payload: data
  });

export const signOut = (dispatch) =>
  dispatch({
    type: SIGN_OUT
  });

export const changeProfile = (dispatch, data) =>
  dispatch({
    type: CHANGE_PROFILE,
    payload: data
  });

export const setPreferences = (dispatch, data) =>
  dispatch({
    type: SET_PREFERENCES,
    payload: data
  });
