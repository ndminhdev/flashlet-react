import React from 'react';

import './style.scss';
import ReactLogo from '../../assets/logo.svg';

const App = () => {
  return (
    <div className="App">
      <ReactLogo className="logo" />
      <p className="desc">
        Create Your React App with React Starter Kit <br />
        React 17+, Webpack 5, Babel, ESLint, Prettier Full Setup
      </p>
      <p className="sub-desc">By Dang Minh Ngo | ndminhdev@gmail.com </p>
    </div>
  );
};

export default App;
