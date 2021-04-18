import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './style.scss';

import { hideOverlays } from '@/context/actions/ui';
import { useDispatch } from '@/hooks';

const body = document.querySelector('body');
const portalOverlay = document.getElementById('portal-overlay');

const Overlay = ({
  component: OverlayComponent,
  overlayShown,
  showSignInOverlay
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (overlayShown) {
      body.style.overflow = 'hidden';
    }
    return () => {
      body.style.overflow = 'visible';
    };
  }, [overlayShown]);

  return (
    overlayShown &&
    ReactDOM.createPortal(
      <React.Fragment>
        <div
          className="overlay__backdrop"
          onClick={() => hideOverlays(dispatch)}
        ></div>
        <div className="overlay__box">
          <OverlayComponent
            hideOverlay={() => hideOverlays(dispatch)}
            showSignInOverlay={showSignInOverlay}
          />
        </div>
      </React.Fragment>,
      portalOverlay
    )
  );
};

Overlay.propTypes = {
  component: PropTypes.func.isRequired,
  overlayShown: PropTypes.bool.isRequired
};

export default Overlay;
