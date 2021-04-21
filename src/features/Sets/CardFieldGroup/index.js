import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Field } from '@/components';

const CardFieldGroup = ({
  id,
  onTermChange,
  onDefinitionChange,
  onImageChange,
  ...rest
}) => {
  return (
    <div className="card-field-group" {...rest}>
      <div className="card-field-group__top">{id + 1}</div>
      <div className="card-field-group__form">
        <Field
          name="term"
          label="Term"
          placeholder="Enter term"
          onChange={(event) => onTermChange(event, id)}
        />
        <Field
          name="definition"
          label="Definition"
          placeholder="Enter definition"
          onChange={(event) => onDefinitionChange(event, id)}
        />
        <Field
          type="file"
          name="image"
          label="image"
          placeholder="Enter definition"
          onChange={(event) => onImageChange(event, id)}
        />
      </div>
    </div>
  );
};

CardFieldGroup.propTypes = {
  id: PropTypes.number.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onDefinitionChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired
};

export default CardFieldGroup;
