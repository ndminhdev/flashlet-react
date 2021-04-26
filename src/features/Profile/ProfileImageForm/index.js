import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './style.scss';
import { useToken } from '@/hooks';
import { UserAPI } from '@/api';

const ProfileImageForm = ({ currentImageUrl }) => {
  const token = useToken();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange'
  });
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profileImage', data.profileImage[0]);
      const responseData = await UserAPI.changeProfile(formData, token);
      setImageUrl(responseData.user.profileImage);
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
          src={imageUrl}
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
  currentImageUrl: PropTypes.string.isRequired
};

export default ProfileImageForm;
