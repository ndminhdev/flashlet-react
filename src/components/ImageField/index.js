import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';
const ImageIcon = icons.Image;

const ImageField = ({ name, register, imageUrl, ...rest }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="image-field">
      <div className="image-field__preview">
        {previewUrl || imageUrl ? (
          <img
            className="image-field__image"
            src={previewUrl || imageUrl}
            atl="preview-image"
          />
        ) : (
          <ImageIcon className="image-field__icon" />
        )}
      </div>
      <input
        className="image-field__field"
        id="image"
        type="file"
        name={name}
        ref={register}
        onChange={onImageChange}
        {...rest}
      />
      <label className="image-field__label" htmlFor="image">
        Change
      </label>
    </div>
  );
};

ImageField.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  imageUrl: PropTypes.string
};

export default ImageField;
