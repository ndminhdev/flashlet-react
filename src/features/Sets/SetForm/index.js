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

  const [cards, setCards] = useState(Array.from({ length: 4 }, (v, k) => null));
  const token = useToken();

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(cards);

    try {
      const responseData = await SetAPI.createSet(
        { ...data, isPublic: true, cards },
        token
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  const onTermChange = (event, id) => {
    if (!cards[id]) {
      return setCards([...cards, { term: event.target.value }]);
    }

    cards[id].term = event.target.value;
    setCards(cards);
  };

  const onDefinitionChange = (event, id) => {
    if (!cards[id]?.term) {
      throw new Error('Term is required');
    }

    cards[id].definition = event.target.value;
    setCards(cards);
  };

  const onImageChange = async (event, id) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    const data = await SetAPI.uploadImage(formData, token);

    if (!cards[id]) {
      throw new Error('Term is required');
    }

    cards[id].imageUrl = data.imageUrl;
    setCards(cards);
  };

  const onDeleteCard = (id) => {
    let newCards = cards.splice(id, 1);
    setCards(newCards);
  };

  const onAddCardClick = () => {
    console.log('Add card');
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
        <div className="set-form__cards">
          {cards.map((card, index) => (
            <CardFieldGroup
              key={index}
              id={index}
              onTermChange={onTermChange}
              onDefinitionChange={onDefinitionChange}
              onImageChange={onImageChange}
              onDeleteCard={onDeleteCard}
            />
          ))}
          <button
            className="set-form__add-card-btn"
            type="button"
            onClick={onAddCardClick}
          >
            + Add card
          </button>
        </div>
        <Button size="sm" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default SetForm;
