import React from 'react';

import GoogleIcon from '@/assets/icons/google.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import SocialButton from '@/components/SocialButton';

import './style.scss';

const App = () => {
  return (
    <div className="App">
      <SocialButton icon={GoogleIcon}>Sign in with Google</SocialButton>
      <SocialButton icon={FacebookIcon}>Sign in with Facebook</SocialButton>
    </div>
  );
};

export default App;
