import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Button, Field } from '@/components';
import { UserAPI } from '@/api';
import handleError from '@/utils/handleError';

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required('Email is required')
});

const ForgottenForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await UserAPI.forgotPassword(data);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      handleError(err, setErrMessage);
    }
  };

  return (
    <div className="forgotten-form">
      <h1>Forgotten Your Password</h1>
      <p>
        Enter your email address you signed up with. We&apos;ll send you a email
        that you can reset your password.
      </p>
      {
        success
          ? (
            <p className="forgotten-form__message">Please check your inbox and follow the instructions.</p>
          ) : (
            <p>
              <form className="forgotten-form__form" onSubmit={handleSubmit(onSubmit)}>
                <Field
                  size="lg"
                  name="email"
                  label="Email address"
                  register={register}
                  placeholder="Type your email address"
                  error={errors.email?.message}
                />
                <Button type="submit" loading={loading} size="sm">Submit</Button>
              </form>
              { errMessage && <span className="error-message">{errMessage}</span>}
            </p>
          )
      }
    </div >
  );
};

export default ForgottenForm;
