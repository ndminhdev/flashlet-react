import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Field, Button } from '@/components';
import { useToken } from '@/hooks';
import { UserAPI } from '@/api';
import handleError from '@/utils/handleError';

export const schema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters a-z (including upppercase), numbers or special characters.'
    )
    .required('Old password is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters a-z (including upppercase), numbers or special characters.'
    )
    .required('New password is required'),
  password2: Yup.string()
    .test('password-match', 'Passwords do not match', function (value) {
      return value === this.parent.password;
    })
    .required('Please confirm your password')
});

const PasswordForm = () => {
  const token = useToken();
  const { register, errors, reset, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    error: false
  });

  const showErrorMessage = (errMessage) => {
    setMessage({ text: errMessage, error: true });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await UserAPI.changePassword(data, token);
      setLoading(false);
      reset();
      setMessage({ text: 'Your password has been changed', error: false });
    } catch (err) {
      handleError(err, showErrorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="password-form">
      <form className="password-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          size="md"
          type="password"
          name="oldPassword"
          label="Old password"
          placeholder="Enter your old password"
          register={register}
          error={errors.oldPassword?.message}
        />
        <Field
          size="md"
          type="password"
          name="password"
          label="New password"
          placeholder="Enter your new password"
          register={register}
          error={errors.password?.message}
        />
        <Field
          size="md"
          type="password"
          name="password2"
          label="Confirm password"
          placeholder="Confirm your new password"
          register={register}
          error={errors.password2?.message}
        />
        <div className={`password-form__message${message.error && '--error'}`}>
          {message.text}
        </div>
        <Button loading={loading} type="submit" size="sm">
          Change
        </Button>
      </form>
    </div>
  );
};

export default PasswordForm;
