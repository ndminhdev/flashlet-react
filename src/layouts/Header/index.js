import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import { Button } from '@/components';
import icons from '@/utils/icons';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { Overlay } from '@/components';
import { useOverlay } from '@/hooks';

const SearchIcon = icons.Search;
const ClearIcon = icons.Close;

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [showSignInOverlay, toggleShowSignInOverlay] = useOverlay();
  const [showSignUpOverlay, toggleShowSignUpOverlay] = useOverlay();

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const clearSearchInput = () => {
    setKeyword('');
  };

  return (
    <React.Fragment>
      <div className="header">
        <Link to="/" className="header__logo">
          Flashlet
        </Link>
        <div className="header__search">
          <input
            className="header__search-input"
            type="text"
            name="keyword"
            placeholder="Search"
            value={keyword}
            onChange={handleChange}
            onBlur={clearSearchInput}
          />
          <SearchIcon className="header__search-icon" />
          {keyword && (
            <button className="header__clear-btn" onClick={clearSearchInput}>
              <ClearIcon className="header__clear-icon" />
            </button>
          )}
        </div>
        <div className="header__buttons">
          <Button variant="none" onClick={toggleShowSignInOverlay}>
            Sign in
          </Button>
          <Button variant="gold" onClick={toggleShowSignUpOverlay}>
            Get started
          </Button>
        </div>
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
