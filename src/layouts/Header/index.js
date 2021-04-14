import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';

import './style.scss';
import { Button } from '@/components';
import icons from '@/utils/icons';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { Overlay } from '@/components';
import { useDispatch, useOverlay, useAuth, useNavigate } from '@/hooks';
import {
  showSignInOverlay,
  showSignUpOverlay,
  hideOverlays
} from '@/context/actions/ui';

const SearchIcon = icons.Search;
const ClearIcon = icons.Close;

const Header = () => {
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const dispatch = useDispatch();
  const { signInOverlayShown, signUpOverlayShown } = useOverlay();
  const [showUserList, setShowUserList] = useState(false);
  const springProps = useSpring({
    from: { transform: 'translateY(-20px)', opacity: 0.6 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: { duration: 200 }
  });
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();

  const infoDropdownRef = useRef(null);

  const onSubmit = (data) => {
    navigate(`/subject/${data.keyword}`);
  };

  const clearSearchInput = () => {
    setValue('keyword', '');
  };

  const handleOutsideClick = (event) => {
    if (showUserList && !infoDropdownRef.current.contains(event.target)) {
      setShowUserList(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showUserList]);

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
        </form>
        {watch('keyword') && (
          <button className="header__clear-btn" onClick={clearSearchInput}>
            <ClearIcon className="header__clear-icon" />
          </button>
        )}
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
              <animated.div
                style={springProps}
                ref={infoDropdownRef}
                className="header__dropdown"
              >
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
                  <Link to="/me" className="header__link">
                    Profile
                  </Link>
                  <Link to="/me" className="header__link">
                    Profile
                  </Link>
                  <Link to="/me" className="header__link">
                    Profile
                  </Link>
                </div>
              </animated.div>
            )}
          </div>
        ) : (
          <div className="header__buttons">
            <Button variant="none" onClick={() => showSignInOverlay(dispatch)}>
              Sign in
            </Button>
            <Button variant="gold" onClick={() => showSignUpOverlay(dispatch)}>
              Get started
            </Button>
          </div>
        )}
      </div>
      <Overlay component={SignInBox} overlayShown={signInOverlayShown} />
      <Overlay
        component={SignUpBox}
        overlayShown={signUpOverlayShown}
        showSignInOverlay={() => showSignInOverlay(dispatch)}
      />
    </React.Fragment>
  );
};

export default Header;
