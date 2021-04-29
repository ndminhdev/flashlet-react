import React, { useEffect, useState, useRef } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSpring, a } from '@react-spring/web';

import './style.scss';
import { Button } from '@/components';
import icons from '@/utils/icons';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { Overlay } from '@/components';
import {
  useDispatch,
  useOverlay,
  useAuth,
  useToken,
  useNavigate
} from '@/hooks';
import { showSignInOverlay, showSignUpOverlay } from '@/context/actions/ui';
import { signOut } from '@/context/actions/session';
import { UserAPI } from '@/api';

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
  const token = useToken();
  const navigate = useNavigate();

  const infoDropdownRef = useRef(null);

  const onSubmit = (data) => {
    navigate(`/subject/${data.keyword}`);
    window.location.reload();
  };

  const clearSearchInput = () => {
    setValue('keyword', '');
  };

  const onOutsideClick = (event) => {
    if (showUserList && !infoDropdownRef?.current?.contains(event.target)) {
      setShowUserList(false);
    }
  };

  const onSignOutClick = async () => {
    try {
      await UserAPI.signOut(token);
      signOut(dispatch);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onOutsideClick);
    return () => window.removeEventListener('click', onOutsideClick);
  }, [showUserList]);

  return (
    <React.Fragment>
      <div
        className={`header ${
          signInOverlayShown || signUpOverlayShown ? 'header--lock' : ''
        }`}
      >
        <Link to="/" className="header__logo">
          Flashlet
        </Link>
        <div className="header__search">
          <form
            className="header__search-form"
            onSubmit={handleSubmit(onSubmit)}
          >
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
        </div>
        {isAuth ? (
          <div className="header__user">
            <div
              style={{
                boxShadow: showUserList ? 'var(--shadow-light)' : null
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
              <a.div
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
                  <Link to="/create-set" className="header__link">
                    Create a study set
                  </Link>
                  <Link to="/dashboard" className="header__link">
                    Dashboard
                  </Link>
                  <Link to="/account" className="header__link">
                    Profile
                  </Link>
                  <Link to="/settings" className="header__link">
                    Settings
                  </Link>
                  <div
                    className="header__link header__link--coral"
                    onClick={onSignOutClick}
                  >
                    Sign out
                  </div>
                </div>
              </a.div>
            )}
          </div>
        ) : (
          <div className="header__buttons">
            <Button variant="none" onClick={() => showSignInOverlay(dispatch)}>
              Sign in
            </Button>
            <Button variant="theme" onClick={() => showSignUpOverlay(dispatch)}>
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
