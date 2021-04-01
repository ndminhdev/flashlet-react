import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import './style.scss';

const Collection = ({
  _id,
  title,
  user,
  numOfTerms,
  previewTerms,
  ...rest
}) => {
  const history = useHistory();

  const navigateToCollection = () => {
    history.push(`/collections/${_id}`);
  };

  return (
    <div className="collection" {...rest} onClick={navigateToCollection}>
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
  previewTerms: PropTypes.array.isRequired
};

export default Collection;
