import React from 'react';
import PropTypes from 'prop-types';

import { AuthBox } from '@/layouts';
import SignInForm from '../SignInForm';

const SignInBox = ({ hideOverlay, swap }) => {
  return (
    <AuthBox title="Sign in" handleClose={hideOverlay}>
      <SignInForm swap={swap} />
    </AuthBox>
  );
};

SignInBox.propTypes = {
  hideOverlay: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired
};

export default SignInBox;
