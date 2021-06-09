import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Button, Field } from '@/components';
import { useNavigate } from '@/hooks';
import { UserAPI } from '@/api';
import handleError from '@/utils/handleError';

import GoogleAuthButton from '../GoogleAuthButton';
import FacebookAuthButton from '../FacebookAuthButton';

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required('Email is required'),
  name: Yup.string().required('Full name is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters, numbers and special characters'
    )
    .required('Password is required')
});

const SignUpForm = ({ swapSignIn }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await UserAPI.signUp(data);
      setLoading(false);
      navigate('/signin');
    } catch (err) {
      handleError(err, setErrMessage);
      setLoading(false);
    }
  };

  return (
    <div className="signup-form">
      <div className="signup-form__social">
        <GoogleAuthButton size="sm" />
        <FacebookAuthButton size="sm" />
      </div>

      <div className="signup-form__line">
        <span className="signup-form__seperator">&nbsp;</span>
        <p className="signup-form__line-text">or EMAIL</p>
        <span className="signup-form__seperator">&nbsp;</span>
      </div>

      <form className="signup-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          size="lg"
          name="email"
          label="Email address"
          register={register}
          placeholder="Type your email address"
          error={errors.email?.message}
        />
        <Field
          size="lg"
          name="name"
          label="Full name"
          register={register}
          placeholder="Type your full name"
          error={errors.name?.message}
        />
        <Field
          type="password"
          size="lg"
          name="password"
          label="Password"
          register={register}
          placeholder="Type your password"
          error={errors.password?.message}
        />
        <Button loading={loading} type="submit" size="lg" block={true}>
          Sign up
        </Button>
      </form>
      {errMessage && <span className="error-message">{errMessage}</span>}
      <div className="signup-form__bottom">
        <p className="signup-form__bottom-text">Already have account?</p>
        <span className="signup-form__bottom-link" onClick={swapSignIn}>
          Sign in
        </span>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  swapSignIn: PropTypes.func.isRequired
};

export default SignUpForm;
