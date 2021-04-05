import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import { useNavigate } from '@/hooks';
import { SignUpForm } from '@/features/Auth';

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signup">
      <Link className="signup__logo" to="/landing">
        Flashlet
      </Link>
      <h1 className="signup__title">Sign up</h1>
      <SignUpForm swapSignIn={() => navigate('/signin')} />
    </div>
  );
};

export default SignUpPage;
