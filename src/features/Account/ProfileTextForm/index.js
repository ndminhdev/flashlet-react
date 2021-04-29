import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import './style.scss';
import { Field, Button } from '@/components';
import { useToken, useDispatch } from '@/hooks';
import { changeProfile } from '@/context/actions/session';
import { UserAPI } from '@/api';

const ProfileTextForm = ({ field, label, value, validationSchema }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      value
    },
    resolver: yupResolver(validationSchema)
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onToggleEditing = () => {
    setEditing(!editing);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const responseData = await UserAPI.changeProfile(
        { [field]: data.value },
        token
      );
      changeProfile(dispatch, responseData);
      setLoading(false);
      onToggleEditing();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="profile-text-form">
      {editing ? (
        <form
          className="profile-text-form__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field
            size="sm"
            name="value"
            label={label}
            register={register}
            placeholder="Type your password"
            error={errors[field]?.message}
          />
          <div className="profile-text-form__buttons">
            <Button loading={loading} type="submit" size="xs">
              Save
            </Button>
            <Button
              type="button"
              variant="none"
              size="xs"
              onClick={onToggleEditing}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="profile-text-form__field">
          <span className="profile-text-form__label">{label}:</span>
          <span className="profile-text-form__value">{value}</span>
          <Button size="xs" variant="no-outline" onClick={onToggleEditing}>
            Change
          </Button>
        </div>
      )}
    </div>
  );
};

ProfileTextForm.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired
};

export default ProfileTextForm;
