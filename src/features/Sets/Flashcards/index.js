import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from '@react-spring/web';

import './style.scss';
import { AdaptableCard } from '@/features/Cards';
import icons from '@/utils/icons';

const ArrowForwardIcon = icons.ArrowForward;
const ArrowBackIcon = icons.ArrowBack;

const Flashcards = ({ set }) => {
  const [currentCardId, setCurrentCardId] = useState(0);
  const [springs, api] = useSprings(set.cards.length, (i) =>
    currentCardId === i
      ? {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)'
        }
      : { display: 'none' }
  );

  const onCardPrevClick = () => {
    setCurrentCardId((id) => (id - 1 < 0 ? id : id - 1));
  };

  const onCardNextClick = () => {
    setCurrentCardId((id) => (id + 1 > set.cards.length - 1 ? id : id + 1));
  };

  useEffect(() => {
    api.start((i) => {
      if (currentCardId < i) {
        return {
          display: 'none',
          transform: 'perspective(600px) scale(0.2) rotateY(60deg)'
        };
      } else if (currentCardId > i) {
        return {
          display: 'none',
          transform: 'perspective(600px) scale(0.2) rotateY(-60deg)'
        };
      } else {
        return {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)'
        };
      }
    });
  }, [currentCardId]);

  return (
    <div className="flashcards">
      <div className="flashcards__stack">
        {springs.map((styles, i) => (
          <AdaptableCard
            style={styles}
            key={set.cards[i]._id}
            {...set.cards[i]}
          />
        ))}
      </div>
      <div className="flashcards__progress-bar">
        <span
          className="flashcards__progress-inner"
          style={{
            width: `${((currentCardId + 1) / set.cards.length) * 100}%`
          }}
        >
          &nbsp;
        </span>
      </div>
      <div className="flashcards__controls">
        <button className="flashcards__button" onClick={onCardPrevClick}>
          <ArrowBackIcon className="flashcards__button-icon" />
        </button>
        <div className="flashcards__number">
          {currentCardId + 1}/{set.cards.length}
        </div>
        <button className="flashcards__button" onClick={onCardNextClick}>
          <ArrowForwardIcon className="flashcards__button-icon" />
        </button>
      </div>
    </div>
  );
};

Flashcards.propTypes = {
  set: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      profileImageDefault: PropTypes.string.isRequired
    }).isRequired,
    cards: PropTypes.array,
    createdAt: PropTypes.string.isRequired
  })
};

export default Flashcards;
