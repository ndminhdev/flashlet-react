import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';
import { SignUpForm } from '@/features/Auth';

const SignUpPage = () => {
  const history = useHistory();

  const navigateToSignIn = () => {
    history.push('/signin');
  };

  return (
    <div className="signup">
      <Link className="signup__logo" to="/landing">
        Flashlet
      </Link>
      <h1 className="signup__title">Sign in</h1>
      <SignUpForm swapSignIn={navigateToSignIn} />
    </div>
  );
};

export default SignUpPage;
