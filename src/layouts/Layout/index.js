import React, { useEffect } from 'react';

import './style.scss';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <React.Fragment>
      <Header />
        <div className="main">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
