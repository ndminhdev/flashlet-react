import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { a } from '@react-spring/web';
import { useForm } from 'react-hook-form';

import './style.scss';
import { IconButton, Field, Button } from '@/components';
import icons from '@/utils/icons';

const WritableCard = ({
  _id,
  term,
  definition,
  imageUrl,
  onCardAnswerSubmit,
  autoFocus,
  ...rest
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange'
  });
  const [answerShown, setAnswerShown] = useState(false);

  const onShowAnswer = () => {
    setAnswerShown(true);
  };

  const onSubmit = (data) => {
    if (data.answer !== term) {
      return setAnswerShown(true);
    }

    onCardAnswerSubmit(data, false);
  };

  const onCopyChange = (event) => {
    const answer = event.target.value;
    if (answer === term) {
      onCardAnswerSubmit({ answer }, answerShown);
    }
  };

  return (
    <a.div className="writable-card" {...rest}>
      <div className="writable-card__top">
        <div className="writable-card__prompt">
          <div className="writable-card__definition">{definition}</div>
          <IconButton
            icon={icons.Idea}
            label="Forget?"
            onClick={onShowAnswer}
            disabled={answerShown}
          />
        </div>
        {answerShown && (
          <div className="writable-card__answer">
            <span className="writable-card__answer-title">Correct</span>
            <span className="writable-card__answer-text">{term}</span>
          </div>
        )}
      </div>
      <div className="writable-card__bottom">
        {answerShown ? (
          <div className="writable-card__copy-form">
            <Field
              size="lg"
              name="answer"
              label="Your answer"
              placeholder={answerShown ? 'Copy answer' : 'Type your answer'}
              error={errors.answer?.message}
              autoFocus
              onChange={onCopyChange}
            />
          </div>
        ) : (
          <form
            className="writable-card__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Field
              register={register}
              size="lg"
              name="answer"
              label="Your answer"
              placeholder="Type your answer here"
              error={errors.answer?.message}
              autoFocus
            />
            <Button type="submit">Next</Button>
          </form>
        )}
      </div>
    </a.div>
  );
};

WritableCard.propTypes = {
  _id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onCardAnswerSubmit: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool
};

export default WritableCard;
