import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import icons from '@/utils/icons';
import { CardForm } from '@/features/Cards';

const DeleteIcon = icons.Delete;
const EditIcon = icons.Edit;

const CardOverviewItem = ({
  id,
  card,
  onCardEdit,
  onCardRemove,
  loading,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onToggleEditting = () => {
    setIsEditing(!isEditing);
  };

  const { _id, term, definition, imageUrl } = card;

  return (
    <React.Fragment>
      {isEditing ? (
        <CardForm
          title={id + 1}
          loading={loading}
          card={card}
          isEditing={true}
          setIsEditing={setIsEditing}
          onSubmit={onCardEdit}
          onCancel={onToggleEditting}
        />
      ) : (
        <div className="card-overview-item" {...rest}>
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
            <div className="card-overview-item__text">
              <span className="card-overview-item__term">{term}:&nbsp;</span>
              {definition}
            </div>
            <span className="card-overview-item__attach">
              {imageUrl ? '+1 Image Attached' : 'No Image Attached'}
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
  onCardEdit: PropTypes.func.isRequired,
  onCardRemove: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

CardOverviewItem.defaultProps = {
  loading: false
};

export default CardOverviewItem;
