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

  // Capture button initial dimensions
  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

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
      disabled={loading}
      {...rest}
    >
      {loading ? <Loader /> : children}
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
