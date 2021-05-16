import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Toggle = ({ name, checked, icons, ...rest }) => {
  const { checked: Checked, unchecked: Unchecked } = icons;

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
              <Checked className="toggle__icon" />
              <Unchecked className="toggle__icon" />
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
    checked: PropTypes.func.isRequired,
    unchecked: PropTypes.func.isRequired
  })
};

Toggle.defaultProps = {
  checked: false
};

export default Toggle;
