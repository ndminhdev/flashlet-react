import {
  SHOW_SIGN_IN_OVERLAY,
  SHOW_SIGN_UP_OVERLAY,
  HIDE_OVERLAYS
} from '../constants/ui';

const uiReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case SHOW_SIGN_IN_OVERLAY:
      return {
        ...state,
        signInOverlayShown: true,
        signUpOverlayShown: false
      };

    case SHOW_SIGN_UP_OVERLAY:
      return {
        ...state,
        signInOverlayShown: false,
        signUpOverlayShown: true
      };

    case HIDE_OVERLAYS:
      return {
        ...state,
        signInOverlayShown: false,
        signUpOverlayShown: false
      };

    default:
      return state;
  }
};

export default uiReducer;
