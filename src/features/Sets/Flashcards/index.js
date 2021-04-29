import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from '@react-spring/web';

import './style.scss';
import { IconButton } from '@/components';
import { AdaptableCard } from '@/features/Cards';
import icons from '@/utils/icons';

const Flashcards = ({ set }) => {
  const [currentCardId, setCurrentCardId] = useState(0);
  const [springs, api] = useSprings(set.cards.length, (i) =>
    currentCardId === i
      ? {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)',
          config: {
            duration: 250
          }
        }
      : {
          display: 'none',
          config: {
            duration: 250
          }
        }
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
          transform: 'perspective(600px) scale(0.2) rotateY(60deg)',
          config: {
            duration: 250
          }
        };
      } else if (currentCardId > i) {
        return {
          display: 'none',
          transform: 'perspective(600px) scale(0.2) rotateY(-60deg)',
          config: {
            duration: 250
          }
        };
      } else {
        return {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)',
          config: {
            duration: 250
          }
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
        <IconButton
          icon={icons.ArrowBack}
          onClick={onCardPrevClick}
          disabled={currentCardId < 1}
        />
        <div className="flashcards__number">
          {currentCardId + 1}/{set.cards.length}
        </div>
        <IconButton
          icon={icons.ArrowForward}
          onClick={onCardNextClick}
          disabled={currentCardId >= set.cards.length - 1}
        />
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
      name: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
      profileImageDefault: PropTypes.string.isRequired
    }).isRequired,
    cards: PropTypes.array,
    createdAt: PropTypes.string.isRequired
  })
};

export default Flashcards;
