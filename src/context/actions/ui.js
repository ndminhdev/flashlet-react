import {
  SHOW_SIGN_IN_OVERLAY,
  SHOW_SIGN_UP_OVERLAY,
  HIDE_OVERLAYS
} from '../constants/ui';

export const showSignInOverlay = (dispatch) =>
  dispatch({
    type: SHOW_SIGN_IN_OVERLAY
  });

export const showSignUpOverlay = (dispatch) =>
  dispatch({
    type: SHOW_SIGN_UP_OVERLAY
  });

export const hideOverlays = (dispatch) =>
  dispatch({
    type: HIDE_OVERLAYS
  });
