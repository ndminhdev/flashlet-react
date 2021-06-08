import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Field, Button, Checkbox } from '@/components';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  isPublic: Yup.bool()
});

const SetForm = ({ loading, set, onSubmit, onCancel, error }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      title: set?.title || '',
      description: set?.description || ''
    }
  });

  return (
    <div className="set-form">
      <h3>{set ? 'Edit study set' : 'Create a new study set'}</h3>
      <form className="set-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="title"
          label="Title"
          register={register}
          placeholder="Enter a title, like 'English phrasal verbs'"
          error={errors.title?.message}
        />
        <Field
          name="description"
          label="Description"
          register={register}
          placeholder="Add a description"
          error={errors.description?.message}
        />
        <Checkbox
          name="isPublic"
          label="Privacy"
          optionWhenCheck="Public"
          optionWhenUncheck="Only me"
          register={register}
          defaultChecked={set?.isPublic || false}
        />
        <div className="set-form__buttons">
          <Button loading={loading} size="sm" type="submit">
            {set ? 'Change' : 'Create'}
          </Button>
          <Button size="sm" variant="none" type="button" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
      {error && <div className="set-form__error">{error}</div>}
    </div>
  );
};

SetForm.propTypes = {
  loading: PropTypes.bool,
  set: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      profileImageDefault: PropTypes.string.isRequired
    }).isRequired,
    cards: PropTypes.array,
    createdAt: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

SetForm.defaultProps = {
  loading: false,
  error: ''
};

export default SetForm;
