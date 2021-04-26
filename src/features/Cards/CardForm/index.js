import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Field, ImageField, Button } from '@/components';

const schema = Yup.object().shape({
  term: Yup.string().required('Title is required'),
  definition: Yup.string().required('Description is required'),
  image: Yup.mixed()
});

const CardForm = ({
  loading,
  isEditing,
  setIsEditing,
  card,
  title,
  onSubmit,
  onCancel
}) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      term: card?.term || '',
      definition: card?.definition || ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmitWithCallback = isEditing
    ? (data) => {
        onSubmit(data);
        setIsEditing(false);
      }
    : onSubmit;

  return (
    <div className="card-form">
      <div className="card-form__top">{title}</div>
      <form
        className="card-form__form"
        onSubmit={handleSubmit(onSubmitWithCallback)}
      >
        <div className="card-form__fields">
          <Field
            name="term"
            label="Term"
            register={register}
            placeholder="Enter term"
            error={errors.term?.message}
          />
          <Field
            name="definition"
            label="Definition"
            register={register}
            placeholder="Enter definition"
            error={errors.definition?.message}
          />
          <ImageField
            name="image"
            register={register}
            imageUrl={card?.imageUrl}
          />
        </div>
        <div className="card-form__buttons">
          <Button loading={loading} size="sm" type="submit">
            {isEditing ? 'Save' : 'Add'}
          </Button>
          <Button size="sm" variant="neutral" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

CardForm.propTypes = {
  loading: PropTypes.bool,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    imageUrl: PropTypes.string
  }),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

CardForm.defaultProps = {
  loading: false,
  isEditing: false
};

export default CardForm;
