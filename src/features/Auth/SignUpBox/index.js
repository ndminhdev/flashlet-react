import React from 'react';
import PropTypes from 'prop-types';

import { AuthBox } from '@/layouts';
import SignUpForm from '../SignUpForm';

const SignUpBox = ({ toggleShow, showSignInOverlay }) => {
  const handleSwapSignIn = () => {
    toggleShow();
    showSignInOverlay();
  };

  return (
    <AuthBox title="Sign up" handleClose={toggleShow}>
      <SignUpForm swapSignIn={handleSwapSignIn} />
    </AuthBox>
  );
};

SignUpBox.propTypes = {
  toggleShow: PropTypes.func.isRequired,
  showSignInOverlay: PropTypes.func.isRequired
};

export default SignUpBox;
