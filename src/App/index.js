import React from 'react';
import PropTypes from 'prop-types';

import SignInBox from '@/features/Auth/SignInBox';
import { Overlay } from '@/components';
import { useOverlay } from '@/hooks';

import './style.scss';

const App = () => {
  const [show, toggleShow] = useOverlay();

  return (
    <div className="App">
      <button onClick={toggleShow}>Show</button>
      <Overlay component={SignInBox} show={show} toggleShow={toggleShow} />
    </div>
  );
};

export default App;
