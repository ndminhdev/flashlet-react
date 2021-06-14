import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { SocialButton } from '@/components';
import icons from '@/utils/icons';
import { FACEBOOK_APP_ID } from '@/utils/secrets';
import { useDispatch } from '@/hooks';
import { signIn, setPreferences } from '@/context/actions/session';
import { hideOverlays } from '@/context/actions/ui';
import { UserAPI, PreferenceAPI } from '@/api';

const FacebookAuthButton = ({ size }) => {
  const dispatch = useDispatch();

  const onFacebookAuthSuccess = async (data) => {
    try {
      const signInData = await UserAPI.signInWithFacebook({
        facebookId: data.id,
        facebookAccessToken: data.accessToken,
        facebookProfile: {
          email: data.email,
          name: data.name,
          imageUrl: data.picture.data.url
        }
      });
      console.log(signInData);
      const preferencesData = await PreferenceAPI.getPreferences(
        signInData.token
      );
      console.log(preferencesData);
      setPreferences(dispatch, preferencesData);
      signIn(dispatch, signInData);
      hideOverlays(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  const onFacebookAuthFailure = (error) => {
    console.log(error);
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      callback={onFacebookAuthSuccess}
      onFailure={onFacebookAuthFailure}
      fields="name,email,picture"
      render={(renderProps) => (
        <SocialButton
          size={size}
          icon={icons.Facebook}
          onClick={renderProps.onClick}
          disabled={renderProps.isDisabled}
        >
          Continue with Facebook
        </SocialButton>
      )}
    />
  );
};

FacebookAuthButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
};

FacebookAuthButton.defaultProps = {
  size: 'lg'
};

export default FacebookAuthButton;
