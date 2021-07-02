import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import './style.scss';
import { SignInForm } from '@/features/Auth';

const SignInPage = () => (
  <div className="signin">
    <Helmet>
      <title>Sign in | Flashlet</title>
    </Helmet>
    <Link className="signin__logo" to="/landing">
      Flashlet
    </Link>
    <h1 className="signin__title">Sign in</h1>
    <SignInForm />
  </div>
);

export default SignInPage;
