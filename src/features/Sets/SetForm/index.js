import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { useToken } from '@/hooks';
import { Field, Button } from '@/components';
import CardFieldGroup from '../CardFieldGroup';
import { SetAPI } from '@/api';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required')
});

const SetForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [cards, setCards] = useState([]);
  const token = useToken();

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(cards);
  };

  const onTermChange = (event, id) => {
    let newCards = [...cards];

    if (!newCards[id]) {
      return setCards([...cards, { term: event.target.value }]);
    }

    newCards[id].term = event.target.value;
    setCards(cards);
  };

  const onDefinitionChange = (event, id) => {
    let newCards = [...cards];

    if (!newCards[id]?.term) {
      throw new Error('Term is required');
    }

    newCards[id].definition = event.target.value;
    setCards(cards);
  };

  const onImageChange = async (event, id) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    const data = await SetAPI.uploadImage(formData, token);
    console.log(data.imageUrl);
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
        <CardFieldGroup
          id={0}
          onTermChange={onTermChange}
          onDefinitionChange={onDefinitionChange}
          onImageChange={onImageChange}
        />
        <Button size="sm" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default SetForm;
