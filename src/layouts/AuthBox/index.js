import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';

const CloseIcon = icons.Close;

const AuthBox = ({ children, title, handleClose }) => (
  <div className="authbox">
    <div className="authbox__header">
      <h1 className="authbox__title">{title}</h1>
      <button className="authbox__close-btn" onClick={handleClose}>
        <CloseIcon className="authbox__close-icon" />
      </button>
    </div>
    <div className="authbox__body">{children}</div>
  </div>
);

AuthBox.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AuthBox;
