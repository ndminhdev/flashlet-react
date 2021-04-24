import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { CardOverviewItem, CardForm } from '@/features/Sets';
import { useToken, useNavigate } from '@/hooks';
import { SetAPI } from '@/api';

const AddCardsPage = () => {
  const { setId } = useParams();
  const token = useToken();
  const navigate = useNavigate();
  const [set, setSet] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const onCardAdd = async (data) => {
    try {
      setAddLoading(true);
      const formData = new FormData();
      formData.append('term', data.term);
      formData.append('definition', data.definition);
      formData.append('image', data.image[0]);
      const responseData = await SetAPI.addCard(setId, formData, token);
      const { card } = responseData;
      setSet({
        ...set,
        cards: [...set.cards, card]
      });
      setAddLoading(false);
    } catch (err) {
      console.log(err);
      setAddLoading(false);
    }
  };

  const onCardEdit = (cardId) => (data) => {
    setEditLoading(true);
    const formData = new FormData();
    formData.append('term', data.term);
    formData.append('definition', data.definition);
    formData.append('image', data.image[0]);
    SetAPI.editCard(cardId, formData, token)
      .then((responseData) => {
        const { card } = responseData;
        setSet({
          ...set,
          cards: set.cards.map((c) => (c._id === cardId ? card : c))
        });
        setEditLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setEditLoading(false);
      });
  };

  const onCardRemove = async (cardId) => {
    try {
      await SetAPI.removeCard(cardId, token);
      setSet({
        ...set,
        cards: set.cards.filter(({ _id }) => _id !== cardId)
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onCardAddCancel = () => {
    navigate(`/sets/${set._id}`);
  };

  useEffect(async () => {
    try {
      const responseData = await SetAPI.getSetById(setId);
      setSet(responseData.set);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{`${set && set.title} - Add cards | Flashlet`}</title>
      </Helmet>
      {set && (
        <div className="add-cards">
          <div className="add-cards__set">
            <h1>{set.title}</h1>
            <span className="add-cards__description">{set.description}</span>
          </div>
          <div className="add-cards__cards">
            <div className="add-cards__cards-title">
              Cards{' '}
              <span className="add-cards__count">({set.cards.length})</span>
            </div>
            <div className="add-cards__cards-list">
              {set.cards.map((card, index) => (
                <CardOverviewItem
                  key={card._id}
                  id={index}
                  card={card}
                  onCardEdit={onCardEdit(card._id)}
                  onCardRemove={onCardRemove}
                />
              ))}
            </div>
            <CardForm
              loading={addLoading}
              title="Add a new card"
              onSubmit={onCardAdd}
              onCancel={onCardAddCancel}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AddCardsPage;
