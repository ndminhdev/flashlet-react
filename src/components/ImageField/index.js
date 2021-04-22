import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';
const ImageIcon = icons.Image;

const ImageField = ({ id, register, ...rest }) => (
  <div className="image-field">
    <input
      className="image-field__field"
      id={`image${id}`}
      type="file"
      register={register}
      {...rest}
    />
    <label className="image-field__label" htmlFor={`image${id}`}>
      <ImageIcon className="image-field__icon" />
    </label>
  </div>
);

ImageField.propTypes = {
  id: PropTypes.number.isRequired,
  register: PropTypes.func
};

export default ImageField;
