import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import { useNavigate } from '@/hooks';
import { limitString } from '@/utils/string';
import { formatDate } from '@/utils/date';

const Set = ({
  _id,
  title,
  description,
  user,
  termsCount,
  previewTerms,
  createdAt
}) => {
  const navigate = useNavigate();

  const handleUsernameClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="set-item" onClick={() => navigate(`/sets/${_id}`)}>
      <div className="set-item__main">
        <div className="set-item__top">
          <span className="set-item__num-of-terms">
            {termsCount} term{termsCount > 1 ? 's' : ''}
          </span>
          <Link
            to={`/users/${user.username}`}
            className="set-item__user"
            onClick={handleUsernameClick}
          >
            <img
              className="set-item__profile-image"
              src={user.profileImage || user.profileImageDefault}
              alt="profile image"
            />
            <span className="set-item__fullname">{user.name}</span>
          </Link>
          <span className="set-item__date">{formatDate(createdAt)}</span>
        </div>
        <h3 className="set-item__title">{title}</h3>
        <div className="set-item__description">{description}</div>
      </div>
      <div className="set-item__preview-terms">
        {previewTerms.map((t, index) => (
          <div key={index} className="set-item__preview">
            {t.imageUrl && (
              <div className="set-item__image-container">
                <img
                  className="set-item__image"
                  src={t.imageUrl}
                  alt="preview-image"
                />
              </div>
            )}
            <div className="set-item__text">
              <p className="set-item__term">{t.term}</p>
              <span className="set-item__definition">
                {limitString(t.definition, 30)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Set.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  termsCount: PropTypes.number.isRequired,
  previewTerms: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Set;
