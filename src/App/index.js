import React, { useState } from 'react';

import SignInBox from '@/features/Auth/SignInBox';
import { Overlay, Button } from '@/components';
import { useOverlay } from '@/hooks';

import './style.scss';

const App = () => {
  const [show, toggleShow] = useOverlay();
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        Click loading
      </Button>
      <button onClick={toggleShow}>Show</button>
      <Overlay component={SignInBox} show={show} toggleShow={toggleShow} />
    </div>
  );
};

export default App;
