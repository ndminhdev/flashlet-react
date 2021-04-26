import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Checkbox = ({
  name,
  label,
  optionWhenCheck,
  optionWhenUncheck,
  register,
  defaultChecked,
  ...rest
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="checkbox">
      <span className="checkbox__label">{label}:&nbsp;</span>
      <input
        type="checkbox"
        className="checkbox__input"
        id={name}
        name={name}
        ref={register}
        checked={checked}
        onChange={() => setChecked(!checked)}
        {...rest}
      />
      <label htmlFor={name} className="checkbox__option">
        {checked ? optionWhenCheck : optionWhenUncheck}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optionWhenCheck: PropTypes.string.isRequired,
  optionWhenUncheck: PropTypes.string.isRequired,
  register: PropTypes.func,
  defaultChecked: PropTypes.bool
};

Checkbox.defaultProps = {
  defaultChecked: false
};

export default Checkbox;
