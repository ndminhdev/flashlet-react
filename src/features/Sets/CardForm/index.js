import React from 'react';
// import PropTypes from 'prop-types';
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

const CardForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card-field-group">
      <div className="card-field-group__top">Add new card</div>
      <form
        className="card-field-group__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="card-field-group__fields">
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
          <ImageField name="image" register={register} />
        </div>
        <Button size="sm" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CardForm;
