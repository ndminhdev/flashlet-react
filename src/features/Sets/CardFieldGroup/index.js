import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Field, ImageField } from '@/components';
import icons from '@/utils/icons';

const DeleteIcon = icons.Close;

const CardFieldGroup = ({
  id,
  onTermChange,
  onDefinitionChange,
  onImageChange,
  onDeleteCard
}) => {
  return (
    <div className="card-field-group">
      <div className="card-field-group__top">
        <span>{id + 1}</span>
        <button
          className="card-field-group__delete-btn"
          type="button"
          onClick={() => onDeleteCard(id)}
        >
          <DeleteIcon className="card-field-group__delete-icon" />
        </button>
      </div>
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
        <ImageField
          id={id}
          name="image"
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
  onImageChange: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired
};

export default CardFieldGroup;
