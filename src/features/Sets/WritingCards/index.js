import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { ProgressBar, Button } from '@/components';
import { WritableCard } from '@/features/Cards';

const WritingCards = ({ set }) => {
  const [currentCardId, setCurrentCardId] = useState(0);

  const total = set.cards.length;
  const [isLastCard, setIsLastCard] = useState(false);
  const [remainingProgress, setRemainingProgress] = useState(total);
  const [correctProgress, setCorrectProgress] = useState(0);
  const [incorrectProgress, setIncorrectProgress] = useState(0);

  const onCardAnswerSubmit = (data, answerShown) => {
    setCurrentCardId((id) => (id + 1 > total - 1 ? id : id + 1));
    setRemainingProgress((state) => (state - 1 < 0 ? state : state - 1));
    if (data.answer === set.cards[currentCardId].term && !answerShown) {
      setCorrectProgress((state) => (state + 1 > total ? state : state + 1));
    } else {
      setIncorrectProgress((state) => (state + 1 > total ? state : state + 1));
    }

    if (remainingProgress === 1) {
      setIsLastCard(true);
    }
  };

  const onResetClick = () => {
    setIsLastCard(false);
    setCurrentCardId(0);
    setRemainingProgress(total);
    setCorrectProgress(0);
    setIncorrectProgress(0);
  };

  return (
    <div className="writing-cards">
      {isLastCard ? (
        <div className="writing-cards__done">
          <h1 className="writing-cards__done-text">Done!</h1>
          <div className="writing-cards__result writing-cards__result--correct">
            <span className="writing-cards__result-title">Correct</span>
            <span className="writing-cards__result-progress">
              {Math.floor((correctProgress / total) * 100)}%
            </span>
          </div>
          <div className="writing-cards__result writing-cards__result--incorrect">
            <span className="writing-cards__result-title">Incorrect</span>
            <span className="writing-cards__result-progress">
              {Math.floor((incorrectProgress / total) * 100)}%
            </span>
          </div>
          <Button variant="ink" onClick={onResetClick}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="writing-cards__stack">
          <WritableCard
            key={set.cards[currentCardId]._id}
            {...set.cards[currentCardId]}
            onCardAnswerSubmit={onCardAnswerSubmit}
          />
        </div>
      )}

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
