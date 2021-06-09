import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Button, Field } from '@/components';
import { useNavigate } from '@/hooks';
import { UserAPI } from '@/api';
import handleError from '@/utils/handleError';

const schema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters a-z (including upppercase), numbers or special characters.'
    )
    .required('Password is required'),
  password2: Yup.string()
    .test('password-match', 'Passwords do not match', function (value) {
      return value === this.parent.password;
    })
    .required('Please confirm your password')
});

const ResetForm = ({ token }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await UserAPI.resetPassword(data, token);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      handleError(err, setErrMessage);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate('/signin'), 5000);
    }
  }, [success]);

  return (
    <div className="reset-form">
      <h1>Reset Your Password</h1>
      <p>
        Enter your new password and confirm. Then you can sign in with your new
        password
      </p>
      {success ? (
        <p className="reset-form__message">
          You can sign in now with your new password. Redirect to Sign In in 5
          seconds.
        </p>
      ) : (
        <>
          <form className="reset-form__form" onSubmit={handleSubmit(onSubmit)}>
            <Field
              size="lg"
              type="password"
              name="password"
              label="Password"
              register={register}
              placeholder="Type your new password"
              error={errors.email?.password}
            />
            <Field
              size="lg"
              type="password"
              name="password2"
              label="Confirm password"
              register={register}
              placeholder="Confirm your new password"
              error={errors.email?.password2}
            />
            <Button type="submit" loading={loading} size="sm">
              Reset My Password
            </Button>
          </form>
          {errMessage && <span className="error-message">{errMessage}</span>}
        </>
      )}
    </div>
  );
};

ResetForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default ResetForm;
