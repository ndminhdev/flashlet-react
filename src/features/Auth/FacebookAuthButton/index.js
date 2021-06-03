import React from 'react';
import PropTypes from 'prop-types';

import { SocialButton } from '@/components';
import icons from '@/utils/icons';

const FacebookAuthButton = ({ size }) => {
  return (
    <SocialButton size={size} icon={icons.Facebook}>
      Continue with Facebook
    </SocialButton>
  );
};

FacebookAuthButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
};

FacebookAuthButton.defaultProps = {
  size: 'lg'
};

export default FacebookAuthButton;
