import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { useToken, useNavigate } from '@/hooks';
import { Field, Button, Checkbox } from '@/components';
import { SetAPI } from '@/api';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  isPublic: Yup.bool()
});

const SetForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const token = useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const responseData = await SetAPI.createSet(data, token);
      setLoading(false);
      navigate(`/sets/${responseData.set._id}/cards`);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="set-form">
      <h3>Create a new study set</h3>
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
          label="Share it with everyone"
          optionWhenCheck="Yes"
          optionWhenUncheck="No"
          register={register}
        />
        <Button loading={loading} size="sm" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default SetForm;
