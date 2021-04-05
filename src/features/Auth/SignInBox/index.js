import React from 'react';
import PropTypes from 'prop-types';

import { AuthBox } from '@/layouts';
import SignInForm from '../SignInForm';

const SignInBox = ({ hideOverlay }) => {
  return (
    <AuthBox title="Sign in" handleClose={hideOverlay}>
      <SignInForm />
    </AuthBox>
  );
};

SignInBox.propTypes = {
  hideOverlay: PropTypes.func.isRequired
};

export default SignInBox;
