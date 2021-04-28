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
  onSubmit,
  ...rest
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange'
  });
  const [answerShown, setAnswerShown] = useState(false);

  const onShowAnswer = () => {
    setAnswerShown(true);
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
        <form className="writable-card__form" onSubmit={handleSubmit(onSubmit)}>
          <Field
            register={register}
            size="lg"
            name="answer"
            label="Your answer"
            placeholder={answerShown ? 'Copy answer' : 'Type your answer'}
            error={errors.answer?.message}
          />
          <Button type="submit">Next</Button>
        </form>
      </div>
    </a.div>
  );
};

WritableCard.propTypes = {
  _id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default WritableCard;
