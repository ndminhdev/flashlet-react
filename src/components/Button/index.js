import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = ({ children, variant, size, block, loading, ...rest }) => {
  const getButtonClassNames = () => {
    let base = `btn btn--${variant} btn--${size}`;

    if (block) {
      base += ' btn--block';
    }

    return base;
  };

  return (
    <button className={getButtonClassNames()} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['cyan', 'gold', 'neutral', 'ink', 'none']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  block: PropTypes.bool,
  loading: PropTypes.bool
};

Button.defaultProps = {
  variant: 'cyan',
  size: 'md',
  block: false,
  loading: false
};

export default Button;
