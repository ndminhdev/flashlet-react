import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Checkbox = ({
  name,
  label,
  optionWhenCheck,
  optionWhenUncheck,
  register
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="checkbox">
      <span className="checkbox__label">{label}:&nbsp;</span>
      <input
        type="checkbox"
        className="checkbox__input"
        id={name}
        name={name}
        ref={register}
        onChange={() => setChecked(!checked)}
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
  register: PropTypes.func
};

export default Checkbox;
