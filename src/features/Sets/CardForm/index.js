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

const CardForm = ({ loading, title, onSubmit, onCancel }) => {
  const { register, reset, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const onImageChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <div className="card-form">
      <div className="card-form__top">{title}</div>
      <form className="card-form__form" onSubmit={handleSubmit(onSubmit)}>
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
            onChange={onImageChange}
            previewUrl={previewUrl}
          />
        </div>
        <div className="card-form__buttons">
          <Button loading={loading} size="sm" type="submit">
            Add
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
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

CardForm.defaultProps = {
  loading: false
};

export default CardForm;
