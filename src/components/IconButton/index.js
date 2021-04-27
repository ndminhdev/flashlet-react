import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const IconButton = ({ size, icon: Icon, ...rest }) => (
  <button className={`button-icon button-icon__${size}`} {...rest}>
    <Icon className="button-icon__icon" />
  </button>
);

IconButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  icon: PropTypes.func.isRequired
};

IconButton.defaultProps = {
  size: 'lg'
};

export default IconButton;
