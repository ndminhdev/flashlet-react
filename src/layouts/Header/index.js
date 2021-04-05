import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';

import './style.scss';
import { Button } from '@/components';
import icons from '@/utils/icons';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { Overlay } from '@/components';
import { useOverlay, useAuth } from '@/hooks';

const SearchIcon = icons.Search;
const ClearIcon = icons.Close;

const Header = () => {
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const [showSignInOverlay, toggleShowSignInOverlay] = useOverlay();
  const [showSignUpOverlay, toggleShowSignUpOverlay] = useOverlay();
  const [showUserList, setShowUserList] = useState(false);
  const springProps = useSpring({
    from: { transform: 'translateY(-20px)', opacity: 0.6 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { duration: 200 }
  });

  const { isAuth, user } = useAuth();

  const onSubmit = (data) => console.log(data);

  const clearSearchInput = () => {
    setValue('keyword', '');
  };

  return (
    <React.Fragment>
      <div className="header">
        <Link to="/" className="header__logo">
          Flashlet
        </Link>
        <form className="header__search" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="header__search-input"
            type="text"
            name="keyword"
            placeholder="Search"
            onBlur={clearSearchInput}
            ref={register}
          />
          <SearchIcon className="header__search-icon" />
          {watch('keyword') && (
            <button className="header__clear-btn" onClick={clearSearchInput}>
              <ClearIcon className="header__clear-icon" />
            </button>
          )}
        </form>
        {isAuth ? (
          <div className="header__user">
            <div
              style={{
                borderColor: showUserList ? 'var(--neutral-100)' : null
              }}
              className="header__profile-image"
              onClick={() => setShowUserList(!showUserList)}
            >
              <img
                className="header__image"
                src={user.profileImage || user.profileImageDefault}
                alt="profile"
              />
            </div>
            {showUserList && (
              <animated.div style={springProps} className="header__dropdown">
                <div className="header__info">
                  <img
                    className="header__info-image"
                    src={user.profileImage || user.profileImageDefault}
                    alt="profile-image"
                  />
                  <div className="header__info-text">
                    <span className="header__info-name">{user.name}</span>
                    <span className="header__info-email">{user.email}</span>
                  </div>
                </div>

                <div className="header__options">
                  <Link className="header__link">Profile</Link>
                  <Link className="header__link">Profile</Link>
                  <Link className="header__link">Profile</Link>
                </div>
              </animated.div>
            )}
          </div>
        ) : (
          <div className="header__buttons">
            <Button variant="none" onClick={toggleShowSignInOverlay}>
              Sign in
            </Button>
            <Button variant="gold" onClick={toggleShowSignUpOverlay}>
              Get started
            </Button>
          </div>
        )}
      </div>
      <Overlay
        component={SignInBox}
        show={showSignInOverlay}
        toggleShow={toggleShowSignInOverlay}
      />
      <Overlay
        component={SignUpBox}
        show={showSignUpOverlay}
        toggleShow={toggleShowSignUpOverlay}
        showSignInOverlay={toggleShowSignInOverlay}
      />
    </React.Fragment>
  );
};

export default Header;
