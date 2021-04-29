import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Loader = () => <div className="button-loader" />;

const Button = ({ children, variant, size, block, loading, ...rest }) => {
  const getButtonClassNames = () => {
    let base = `btn btn--${variant} btn--${size}`;

    if (block) {
      base += ' btn--block';
    }

    return base;
  };

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const [showLoader, setShowLoader] = useState(false);

  // Capture button initial dimensions
  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

  // Show loader at least 400ms
  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    }

    // avoid loading flash
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [showLoader, loading]);

  return (
    <button
      className={getButtonClassNames()}
      ref={ref}
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`
            }
          : {}
      }
      disabled={showLoader}
      {...rest}
    >
      {showLoader ? <Loader /> : children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'theme',
    'none',
    'no-outline',
    'coral'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  block: PropTypes.bool,
  loading: PropTypes.bool
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  block: false,
  loading: false
};

export default Button;
