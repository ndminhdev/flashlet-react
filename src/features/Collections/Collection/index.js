import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';
import { useNavigate } from '@/hooks';

const Collection = ({
  _id,
  title,
  user,
  numOfTerms,
  previewTerms,
  createdAt,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="collection"
      {...rest}
      onClick={() => navigate(`/collections/${_id}`)}
    >
      <div className="collection__main">
        <div className="collection__top">
          <span className="collection__num-of-terms">{numOfTerms} terms</span>
          <Link to={`/users/${user._id}`} className="collection__user">
            <img
              className="collection__profile-image"
              src={user.profileImage || user.profileImageDefault}
              alt="profile image"
            />
            <span className="collection__fullname">{user.name}</span>
          </Link>
        </div>
        <h3 className="collection__title">{title}</h3>
      </div>
      <div className="collection__preview-terms">
        {previewTerms.map((t) => (
          <div key={t._id} className="collection__term">
            <p className="collection__text">{t.text}</p>
            <span className="collection__description">{t.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Collection.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  numOfTerms: PropTypes.number.isRequired,
  previewTerms: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default Collection;
