import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const SocialButton = ({ icon: Icon, size, loading, children, ...rest }) => {
  const getSocialButtonClasses = () => {
    return `social-btn social-btn--${size}`;
  };

  const getIconClasses = () => {
    return `social-btn__icon social-btn__icon--${size}`;
  };

  return (
    <button className={getSocialButtonClasses()} {...rest}>
      <Icon className={getIconClasses()} />
      {loading ? 'Loading...' : children}
    </button>
  );
};

SocialButton.propTypes = {
  icon: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
  loading: PropTypes.bool
};

SocialButton.defaultProps = {
  size: 'lg',
  loading: false
};

export default SocialButton;
