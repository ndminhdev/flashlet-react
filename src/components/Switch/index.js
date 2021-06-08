import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Switch = ({ name, checked, icons, ...rest }) => {
  const { checked: Checked, unchecked: Unchecked } = icons;

  return (
    <div className="switch">
      <input
        id={name}
        name={name}
        type="checkbox"
        className="switch__input"
        defaultChecked={checked}
        {...rest}
      />
      <label className="switch__label" htmlFor={name}>
        <div className="switch__track">
          {icons && (
            <React.Fragment>
              <Checked className="switch__icon" />
              <Unchecked className="switch__icon" />
            </React.Fragment>
          )}
          <span className="switch__thumb">&nbsp;</span>
        </div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  icons: PropTypes.shape({
    checked: PropTypes.func.isRequired,
    unchecked: PropTypes.func.isRequired
  })
};

Switch.defaultProps = {
  checked: false
};

export default Switch;
