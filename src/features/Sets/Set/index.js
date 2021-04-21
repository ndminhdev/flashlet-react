import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import { limitString } from '@/utils/string';
import { useNavigate } from '@/hooks';

const Set = ({
  _id,
  title,
  description,
  user,
  termsCount,
  previewTerms,
  createdAt,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleUsernameClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="set" onClick={() => navigate(`/sets/${_id}`)}>
      <div className="set__main">
        <div className="set__top">
          <span className="set__num-of-terms">{termsCount} terms</span>
          <Link
            to={`/users/${user._id}`}
            className="set__user"
            onClick={handleUsernameClick}
          >
            <img
              className="set__profile-image"
              src={user.profileImage || user.profileImageDefault}
              alt="profile image"
            />
            <span className="set__fullname">{user.name}</span>
          </Link>
        </div>
        <h3 className="set__title">{title}</h3>
      </div>
      <div className="set__preview-terms">
        {previewTerms.map((t, index) => (
          <div key={index} className="set__term">
            <p className="set__text">{t.term}</p>
            <span className="set__description">
              {limitString(t.definition, 45)}
            </span>
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
