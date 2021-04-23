import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { CardOverviewItem, CardForm } from '@/features/Sets';
import { useToken } from '@/hooks';
import { SetAPI } from '@/api';

const AddCardsPage = () => {
  const { setId } = useParams();
  const token = useToken();
  const [set, setSet] = useState(null);

  const onCardAdd = async (data) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
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
            <div className="add-cards__cards-title">Cards</div>
            <div className="add-cards__cards-list">
              {set.cards.map((card, index) => (
                <CardOverviewItem
                  key={card._id}
                  id={index}
                  card={card}
                  onCardAdd={onCardAdd}
                  onCardRemove={onCardRemove}
                />
              ))}
            </div>
            <CardForm
              title="Add a new card"
              onSubmit={onCardAdd}
              onCancel={() => console.log('cancel')}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AddCardsPage;
