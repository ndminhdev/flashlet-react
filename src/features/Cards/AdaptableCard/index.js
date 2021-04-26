import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, a } from '@react-spring/web';

import './style.scss';

const AdaptableCard = ({ _id, term, definition, imageUrl }) => {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
    <div className="adaptable-card" onClick={() => setFlipped(!flipped)}>
      <a.div
        className="adaptable-card__front"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <div className="adaptable-card__term">{term}</div>
      </a.div>
      <a.div
        className="adaptable-card__back"
        style={{ opacity, transform, rotateX: '180deg' }}
      >
        {imageUrl && (
          <div className="adaptable-card__image-container">
            <img
              className="adaptable-card__image"
              src={imageUrl}
              alt="card-image"
            />
          </div>
        )}
        <div className="adaptable-card__definition">{definition}</div>
      </a.div>
    </div>
  );
};

AdaptableCard.propTypes = {
  _id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default AdaptableCard;
