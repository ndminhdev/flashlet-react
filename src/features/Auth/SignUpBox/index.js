import React from 'react';
import PropTypes from 'prop-types';

import { AuthBox } from '@/layouts';
import SignUpForm from '../SignUpForm';

const SignUpBox = ({ hideOverlay, showSignInOverlay }) => {
  return (
    <AuthBox title="Sign up" handleClose={hideOverlay}>
      <SignUpForm swapSignIn={showSignInOverlay} />
    </AuthBox>
  );
};

SignUpBox.propTypes = {
  hideOverlay: PropTypes.func.isRequired,
  showSignInOverlay: PropTypes.func.isRequired
};

export default SignUpBox;
