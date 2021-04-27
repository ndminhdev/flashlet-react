import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSprings } from '@react-spring/web';

import './style.scss';
import { IconButton } from '@/components';
import { AdaptableCard } from '@/features/Cards';
import { useAuth, useNavigate, useClipboard } from '@/hooks';
import icons from '@/utils/icons';

const Flashcards = ({ set }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentCardId, setCurrentCardId] = useState(0);
  const [springs, api] = useSprings(set.cards.length, (i) =>
    currentCardId === i
      ? {
          display: 'block',
          transform: 'perspective(600px) scale(1) rotateY(0)'
        }
      : { display: 'none' }
  );
  const linkRef = useRef(null);
  const [success, copy] = useClipboard(linkRef);

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
        <IconButton icon={icons.ArrowBack} onClick={onCardPrevClick} />
        <div className="flashcards__number">
          {currentCardId + 1}/{set.cards.length}
        </div>
        <IconButton icon={icons.ArrowForward} onClick={onCardNextClick} />
      </div>
      <div className="flashcards__bottom">
        <Link className="flashcards__user" to={`/users/${set.user.username}`}>
          <div className="flashcards__image-container">
            <img
              className="flashcards__image"
              src={set.user.profileImage || set.user.profileImageDefault}
              alt="profile-image"
            />
          </div>
          <div className="flashcards__text">
            <span className="flashcards__created-by">Create by</span>
            <span className="flashcards__name">{set.user.name}</span>
          </div>
        </Link>
        <div className="flashcards__tools">
          {set.user._id === user._id && (
            <IconButton
              icon={icons.Edit}
              onClick={() => navigate(`/sets/${set._id}/cards`)}
            />
          )}
          <IconButton icon={icons.GetLink} onClick={() => copy()} />
        </div>
      </div>
      <textarea
        className="flashcards__hidden"
        value={`http://localhost:8080/sets/${set._id}`}
        name="link"
        ref={linkRef}
      />
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
