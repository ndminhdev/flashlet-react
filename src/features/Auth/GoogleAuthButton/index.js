import React from 'react';
import PropTypes from 'prop-types';
import { useGoogleLogin, GoogleLogin } from 'react-google-login';

import { SocialButton } from '@/components';
import { useDispatch } from '@/hooks';
import { signIn, setPreferences } from '@/context/actions/session';
import { hideOverlays } from '@/context/actions/ui';
import icons from '@/utils/icons';
import { GOOGLE_CLIENT_ID } from '@/utils/secrets';
import { UserAPI, PreferenceAPI } from '@/api';

const GoogleAuthButton = ({ size }) => {
  const dispatch = useDispatch();

  const onGoogleAuthSuccess = async (data) => {
    const googleId = data.googleId;
    const googleAccessToken = data.accessToken;
    const googleProfile = data.profileObj;
    console.log(googleAccessToken);
    const signInData = await UserAPI.signInWithGoogle({
      googleId,
      googleAccessToken,
      googleProfile
    });
    const preferencesData = await PreferenceAPI.getPreferences(
      signInData.token
    );
    setPreferences(dispatch, preferencesData);
    signIn(dispatch, signInData);
    hideOverlays(dispatch);
  };

  const onGoogleAuthFailure = (error) => {
    console.log('failure');
    console.log(error);
  }

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: onGoogleAuthSuccess,
    onFailure: onGoogleAuthFailure,
    cookiePolicy: 'single_host_origin'
  });

  return (
    <SocialButton
      size={size}
      icon={icons.Google}
      onClick={signIn}
    >
      Continue with Google
    </SocialButton >
  );
};

GoogleAuthButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
};

GoogleAuthButton.defaultProps = {
  size: 'lg'
};

export default GoogleAuthButton;
