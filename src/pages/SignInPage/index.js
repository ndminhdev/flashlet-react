import React from 'react';

import './style.scss';
import { SignInBox } from '@/features/Auth';

const SignInPage = () => (
  <div className="signin">
    <h1>Sign in</h1>
    <SignInBox />
  </div>
);

export default SignInPage;
