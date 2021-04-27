import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const IconButton = ({ size, label, icon: Icon, ...rest }) => (
  <button className={`button-icon button-icon__${size}`} {...rest}>
    <Icon className="button-icon__icon" />
    {label && <div className="button-icon__tooltip">{label}</div>}
  </button>
);

IconButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  label: PropTypes.string,
  icon: PropTypes.func.isRequired
};

IconButton.defaultProps = {
  size: 'lg'
};

export default IconButton;
