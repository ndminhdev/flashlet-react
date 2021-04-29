import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Toggle = ({ name, checked, icons, ...rest }) => {
  return (
    <div className="toggle">
      <input
        id={name}
        name={name}
        type="checkbox"
        className="toggle__input"
        defaultChecked={checked}
        {...rest}
      />
      <label className="toggle__label" htmlFor={name}>
        <div className="toggle__track">
          {icons && (
            <React.Fragment>
              <span className="toggle__icon">{icons.checked}</span>
              <span className="toggle__icon">{icons.unchecked}</span>
            </React.Fragment>
          )}
          <span className="toggle__thumb">&nbsp;</span>
        </div>
      </label>
    </div>
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  icons: PropTypes.shape({
    checked: PropTypes.string.isRequired,
    unchecked: PropTypes.string.isRequired
  })
};

Toggle.defaultProps = {
  checked: false
};

export default Toggle;
