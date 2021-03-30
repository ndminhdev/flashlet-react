import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './style.scss';

const Overlay = ({
  component: OverlayComponent,
  show,
  toggleShow,
  showSignInOverlay
}) => {
  const portalOverlay = document.getElementById('portal-overlay');

  return show
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="overlay__backdrop" onClick={toggleShow}></div>
          <div className="overlay__box">
            <OverlayComponent
              toggleShow={toggleShow}
              showSignInOverlay={showSignInOverlay}
            />
          </div>
        </React.Fragment>,
        portalOverlay
      )
    : null;
};

Overlay.propTypes = {
  component: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  showSignInOverlay: PropTypes.func
};

export default Overlay;
