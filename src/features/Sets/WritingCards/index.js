import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const WritingCards = ({ set }) => {
  return (
    <div className="writing-cards">
      {set && <div className="writing-cards__cards">{set._id}</div>}
    </div>
  );
};

WritingCards.propTypes = {
  set: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      profileImageDefault: PropTypes.string.isRequired
    }).isRequired,
    cards: PropTypes.array,
    createdAt: PropTypes.string.isRequired
  })
};

export default WritingCards;
