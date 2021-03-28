import React from 'react';

import { socialIcons } from '../utils/icon';
import SocialButton from '@/components/SocialButton';

import './style.scss';

const App = () => {
  return (
    <div className="App">
      <SocialButton icon={socialIcons.Google}>Sign in with Google</SocialButton>
      <SocialButton icon={socialIcons.Facebook}>
        Sign in with Facebook
      </SocialButton>
    </div>
  );
};

export default App;
