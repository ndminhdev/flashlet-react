import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './style.scss';

const Overlay = ({ component: OverlayComponent, show, toggleShow }) =>
  show
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="overlay__backdrop"></div>
          <div className="overlay__box">
            <OverlayComponent toggleShow={toggleShow} />
          </div>
        </React.Fragment>,
        document.getElementById('portal-overlay')
      )
    : null;

Overlay.propTypes = {
  component: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired
};

export default Overlay;
