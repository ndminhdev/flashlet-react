import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import './style.scss';
import { Layout } from '@/layouts';
import { SetForm } from '@/features/Sets';
import { CardOverviewItem, CardForm } from '@/features/Cards';
import { IconButton } from '@/components';
import { useToken, useNavigate } from '@/hooks';
import { SetAPI } from '@/api';
import handleError from '@/utils/handleError';
import icons from '@/utils/icons';

const EditSetPage = () => {
  const { setId } = useParams();
  const token = useToken();
  const navigate = useNavigate();

  // current user owns this set?
  (async () => {
    try {
      const responseData = await SetAPI.checkOwner(setId, token);
      if (!responseData.result) {
        navigate('/404');
      }
    } catch (err) {
      console.log(err);
    }
  })();

  const [set, setSet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSetEdit = async (data) => {
    try {
      setLoading(true);
      await SetAPI.updateSet(set._id, data, token);
      setSet({ ...set, ...data });
      setLoading(false);
      setEditMode(false);
    } catch (err) {
      setLoading(false);
      handleError(err, setErrMessage);
    }
  };

  const onSetCancel = () => {
    setEditMode(false);
  }

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

  useEffect(() => {
    (async () => {
      try {
        const responseData = await SetAPI.getSetById(setId);
        setSet(responseData.set);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>{`${set && set.title} - Edit | Flashlet`}</title>
      </Helmet>
      {set && (
        <div className="edit-set">
          <div className="edit-set__edit">
            {
              editMode ? (
                <SetForm
                  loading={loading}
                  set={set}
                  onSubmit={onSetEdit}
                  onCancel={onSetCancel}
                  error={errMessage}
                />
              ) : (
                <div className="edit-set__set">
                  <div className="edit-set__set-top">
                    <h3 className="edit-set__title">{set.title}</h3>
                    <IconButton
                      size="sm"
                      icon={icons.Edit}
                      label="Edit set"
                      onClick={() => setEditMode(true)}
                    />
                  </div>
                  <p>{set.description}</p>
                  <p>Privary: <span className="edit-set__privacy">{set.isPublic ? 'Public' : 'Only me'}</span></p>
                </div>
              )
            }
          </div>
          <div className="edit-set__cards">
            <div className="edit-set__cards-title">
              Cards{' '}
              <span className="edit-set__count">({set.cards.length})</span>
            </div>
            <div className="edit-set__cards-list">
              {set.cards.map((card, index) => (
                <CardOverviewItem
                  key={card._id}
                  id={index}
                  card={card}
                  onCardEdit={onCardEdit(card._id)}
                  onCardRemove={onCardRemove}
                  loading={editLoading}
                />
              ))}
            </div>
            <div className="edit-set__add-card">
              <CardForm
                loading={addLoading}
                title="Add a new card"
                onSubmit={onCardAdd}
                onCancel={onCardAddCancel}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EditSetPage;
