import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

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
    try {
      const signInData = await UserAPI.signInWithGoogle({
        googleId: data.googleId,
        googleAccessToken: data.accessToken,
        googleProfile: data.profileObj
      });
      const preferencesData = await PreferenceAPI.getPreferences(
        signInData.token
      );
      setPreferences(dispatch, preferencesData);
      signIn(dispatch, signInData);
      hideOverlays(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleAuthFailure = (error) => {
    console.log('failure');
    console.log(error);
  }

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <SocialButton
          size={size}
          icon={icons.Google}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Continue with Google
        </SocialButton >
      )}
      onSuccess={onGoogleAuthSuccess}
      onFailure={onGoogleAuthFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

GoogleAuthButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
};

GoogleAuthButton.defaultProps = {
  size: 'lg'
};

export default GoogleAuthButton;
