import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Field = ({ size, name, label, type, error, ...rest }) => {
  return (
    <div className="field-group">
      <input
        className={`field-group__field field-group__field--${size}`}
        id={label}
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
  type: PropTypes.oneOf(['text', 'password']),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

Field.defaultProps = {
  size: 'md',
  type: 'text'
};

export default Field;
