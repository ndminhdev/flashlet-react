import React from 'react';
import PropTypes from 'prop-types';
import { useTransition, a } from '@react-spring/web';

import './style.scss';
import { useOverlay } from '@/hooks';
import icons from '@/utils/icons';

const CloseIcon = icons.Close;

const AuthBox = ({ children, title, handleClose }) => {
  const { signInOverlayShown, signUpOverlayShown } = useOverlay();
  const isShown = signInOverlayShown || signUpOverlayShown;

  const transitions = useTransition(isShown, {
    from: { transform: 'translateY(-20px)' },
    enter: { transform: 'translateY(0)' },
    leave: { transform: 'translateY(-20px)' },
    reverse: isShown,
    config: { duration: 250 }
  });

  return transitions(
    (styles, item) =>
      item && (
        <a.div style={styles} className="authbox">
          <div className="authbox__header">
            <h1 className="authbox__title">{title}</h1>
            <button className="authbox__close-btn" onClick={handleClose}>
              <CloseIcon className="authbox__close-icon" />
            </button>
          </div>
          <div className="authbox__body">{children}</div>
        </a.div>
      )
  );
};

AuthBox.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AuthBox;
