import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Field = ({ size, name, label, type, register, error, ...rest }) => {
  return (
    <div className="field-group">
      <input
        type={type}
        className={`field-group__field field-group__field--${size}`}
        name={name}
        ref={register}
        autoCorrect="off"
        autoComplete="off"
        {...rest}
      />
      <label
        className={`field-group__label ${error && 'field-group__label--error'}`}
      >
        {error ? error : label}
      </label>
    </div>
  );
};

Field.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['text', 'password', 'file']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

Field.defaultProps = {
  size: 'md',
  type: 'text'
};

export default Field;
