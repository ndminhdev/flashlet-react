import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './style.scss';
import { Button } from '@/components';
import icons from '@/utils/icons';
import { SignInBox, SignUpBox } from '@/features/Auth';
import { Overlay } from '@/components';
import { useOverlay } from '@/hooks';

const SearchIcon = icons.Search;
const ClearIcon = icons.Close;

const Header = () => {
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const [showSignInOverlay, toggleShowSignInOverlay] = useOverlay();
  const [showSignUpOverlay, toggleShowSignUpOverlay] = useOverlay();

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
