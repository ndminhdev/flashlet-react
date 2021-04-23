import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';
import CardForm from '../CardForm';

const DeleteIcon = icons.Delete;
const EditIcon = icons.Edit;

const CardOverviewItem = ({ id, card, onCardAdd, onCardRemove }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onToggleEditting = () => {
    setIsEditing(!isEditing);
  };

  const { _id, term, definition, imageUrl } = card;

  return (
    <React.Fragment>
      {isEditing ? (
        <CardForm
          title="title"
          onSubmit={onCardAdd}
          onCancel={onToggleEditting}
        />
      ) : (
        <div className="card-overview-item">
          <div className="card-overview-item__top">
            <div className="card-overview-item__id">{id + 1}</div>
            <div className="card-overview-item__tools">
              <button
                className="card-overview-item__button"
                onClick={onToggleEditting}
              >
                <EditIcon className="card-overview-item__icon" />
              </button>
              <button
                className="card-overview-item__button"
                onClick={() => onCardRemove(_id)}
              >
                <DeleteIcon className="card-overview-item__icon" />
              </button>
            </div>
          </div>
          <div className="card-overview-item__main">
            <span className="card-overview-item__term">{term}</span>
            <span className="card-overview-item__definition">{definition}</span>
            <span className="card-overview-item__image-attach">
              {imageUrl ? '+1 image' : 'No image'}
            </span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

CardOverviewItem.propTypes = {
  id: PropTypes.number.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    imageUrl: PropTypes.string
  }),
  onCardAdd: PropTypes.func.isRequired,
  onCardRemove: PropTypes.func.isRequired
};

export default CardOverviewItem;
