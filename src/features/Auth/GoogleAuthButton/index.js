import React from 'react';
import PropTypes from 'prop-types';

import { SocialButton } from '@/components';
import icons from '@/utils/icons';

const GoogleAuthButton = ({ size }) => {
  return (
    <SocialButton size={size} icon={icons.Google}>
      Continue with Google
    </SocialButton>
  );
};

GoogleAuthButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
};

GoogleAuthButton.defaultProps = {
  size: 'lg'
};

export default GoogleAuthButton;
