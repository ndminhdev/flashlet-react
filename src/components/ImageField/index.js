import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';
const ImageIcon = icons.Image;

const ImageField = ({ name, register, ...rest }) => (
  <div className="image-field">
    <input
      className="image-field__field"
      id="image"
      type="file"
      name={name}
      ref={register}
      {...rest}
    />
    <label className="image-field__label" htmlFor="image">
      <ImageIcon className="image-field__icon" />
    </label>
  </div>
);

ImageField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func
};

export default ImageField;
