import React from 'react';
import PropTypes from 'prop-types';

import SignUpForm from '@/features/Auth/SignUpForm';
import { Overlay } from '@/components';
import { useOverlay } from '@/hooks';

import './style.scss';

const MyOverlay = ({ toggleShow }) => {
  return (
    <div>
      <button onClick={toggleShow}>Close Overlay</button>
    </div>
  );
};

MyOverlay.propTypes = {
  toggleShow: PropTypes.func.isRequired
};

const App = () => {
  const [show, toggleShow] = useOverlay();

  return (
    <div className="App">
      <button onClick={toggleShow}>Show</button>
      <Overlay component={MyOverlay} show={show} toggleShow={toggleShow} />
    </div>
  );
};

export default App;
