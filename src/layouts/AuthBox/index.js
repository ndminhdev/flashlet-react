import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import './style.scss';
import icons from '@/utils/icons';

const CloseIcon = icons.Close;

const AuthBox = ({ children, title, handleClose }) => {
  const props = useSpring({
    from: { transform: 'translateY(-100px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  });

  return (
    <animated.div style={props} className="authbox">
      <div className="authbox__header">
        <h1 className="authbox__title">{title}</h1>
        <button className="authbox__close-btn" onClick={handleClose}>
          <CloseIcon className="authbox__close-icon" />
        </button>
      </div>
      <div className="authbox__body">{children}</div>
    </animated.div>
  );
};

AuthBox.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AuthBox;
