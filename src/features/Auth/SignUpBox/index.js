import React from 'react';
import PropTypes from 'prop-types';

import { AuthBox } from '@/layouts';
import SignUpForm from '../SignUpForm';

const SignUpBox = ({ hideOverlay, swap }) => {
  return (
    <AuthBox title="Sign up" handleClose={hideOverlay}>
      <SignUpForm swap={swap} />
    </AuthBox>
  );
};

SignUpBox.propTypes = {
  hideOverlay: PropTypes.func.isRequired,
  swap: PropTypes.func.isRequired
};

export default SignUpBox;
