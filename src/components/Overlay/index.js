import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './style.scss';

import { hideOverlays } from '@/context/actions/ui';
import { useDispatch } from '@/hooks';

const Overlay = ({
  component: OverlayComponent,
  overlayShown,
  showSignInOverlay
}) => {
  const portalOverlay = document.getElementById('portal-overlay');
  const dispatch = useDispatch();

  return overlayShown
    ? ReactDOM.createPortal(
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
    : null;
};

Overlay.propTypes = {
  component: PropTypes.func.isRequired,
  overlayShown: PropTypes.bool.isRequired
};

export default Overlay;
