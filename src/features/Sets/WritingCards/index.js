import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSprings } from '@react-spring/web';

import './style.scss';
import { ProgressBar } from '@/components';
import { WritableCard } from '@/features/Cards';

const WritingCards = ({ set }) => {
  const [currentCardId, setCurrentCardId] = useState(0);
  const [springs, api] = useSprings(set.cards.length, (i) =>
    currentCardId === i
      ? {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)'
        }
      : { display: 'none' }
  );
  const total = set.cards.length;
  const [remainingProgress, setRemainingProgress] = useState(total);
  const [correctProgress, setCorrectProgress] = useState(0);
  const [incorrectProgress, setIncorrectProgress] = useState(0);

  const onCardAnswerSubmit = (data) => {
    setCurrentCardId((id) => (id + 1 > total - 1 ? id : id + 1));
    setRemainingProgress((state) => (state - 1 < 0 ? state : state - 1));
    if (data.answer === set.cards[currentCardId].term) {
      setCorrectProgress((state) => (state + 1 > total ? state : state + 1));
    } else {
      setIncorrectProgress((state) => (state + 1 > total ? state : state + 1));
    }
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
    <div className="writing-cards">
      <div className="writing-cards__stack">
        {springs.map((styles, i) => (
          <WritableCard
            style={styles}
            key={set.cards[i]._id}
            {...set.cards[i]}
            onSubmit={onCardAnswerSubmit}
          />
        ))}
      </div>

      <div className="writing-cards__progress-bar">
        <span
          className="writing-cards__progress-inner"
          style={{
            width: `${((currentCardId + 1) / set.cards.length) * 100}%`
          }}
        >
          &nbsp;
        </span>
      </div>

      <div className="writing-cards__results">
        <ProgressBar
          label="Remaining"
          variant="ink"
          progress={remainingProgress}
          total={total}
        />
        <ProgressBar
          label="Correct"
          variant="cyan"
          progress={correctProgress}
          total={total}
        />
        <ProgressBar
          label="Incorrect"
          variant="coral"
          progress={incorrectProgress}
          total={total}
        />
      </div>
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
