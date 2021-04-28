import React from 'react';

import './style.scss';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="background">
        <div className="main">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
