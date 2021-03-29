import React, { useEffect, useState } from 'react';

import SignInBox from '@/features/Auth/SignInBox';
import { Overlay, Button } from '@/components';
import { useOverlay } from '@/hooks';
import { UserAPI } from '@/api';

import './style.scss';

const App = () => {
  const [show, toggleShow] = useOverlay();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(async () => {
    const data = await UserAPI.signUp({
      email: 'test@gmail.com',
      name: 'Dang Minh',
      password: '@6991hnim'
    });

    setUser(data.user);
  });

  return (
    <div className="App">
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        Click loading
      </Button>
      <button onClick={toggleShow}>Show</button>
      <Overlay component={SignInBox} show={show} toggleShow={toggleShow} />
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};

export default App;
