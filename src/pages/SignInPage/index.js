import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import { SignInForm } from '@/features/Auth';

const SignInPage = () => (
  <div className="signin">
    <Link className="signin__logo" to="/landing">
      Flashlet
    </Link>
    <h1 className="signin__title">Sign in</h1>
    <SignInForm />
    <div className="signin__bottom">
      <p className="signin__bottom-text">Have not an account yet?</p>
      <Link to="/signup" className="signin__bottom-link">
        Create account
      </Link>
    </div>
  </div>
);

export default SignInPage;
