import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { AuthBox } from '@/layouts';
import SignInForm from '../SignInForm';

const SignInBox = ({ toggleShow }) => (
  <AuthBox title="Sign in" handleClose={toggleShow}>
    <SignInForm />
  </AuthBox>
);

SignInBox.propTypes = {
  toggleShow: PropTypes.func.isRequired
};

export default SignInBox;
