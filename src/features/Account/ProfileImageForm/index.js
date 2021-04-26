import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './style.scss';
import { useToken, useDispatch } from '@/hooks';
import { changeProfile } from '@/context/actions/session';
import { UserAPI } from '@/api';

const ProfileImageForm = ({ image }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange'
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profileImage', data.profileImage[0]);
      const responseData = await UserAPI.changeProfile(formData, token);
      changeProfile(dispatch, responseData);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const profileImage = watch('profileImage');

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [profileImage, handleSubmit]);

  return (
    <div className="profile-image-form">
      <div className="profile-image-form__container">
        <img
          className="profile-image-form__image"
          src={image}
          alt="profile-image-form"
        />
      </div>
      <form className="profile-image-form__form">
        <input
          id="profileImage"
          className="profile-image-form__input"
          type="file"
          name="profileImage"
          ref={register}
        />
        <label className="profile-image-form__label" htmlFor="profileImage">
          {loading ? 'Changing...' : 'Change'}
        </label>
      </form>
      <span className="profile-image-form__error">
        {errors.profileImage?.message}
      </span>
    </div>
  );
};

ProfileImageForm.propTypes = {
  image: PropTypes.string.isRequired
};

export default ProfileImageForm;
