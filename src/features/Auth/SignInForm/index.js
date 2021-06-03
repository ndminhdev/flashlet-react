import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import handleError from '@/utils/handleError';
import { Button, Field } from '@/components';
import { useDispatch, useNavigate } from '@/hooks';
import { UserAPI, PreferenceAPI } from '@/api';
import { signIn, setPreferences } from '@/context/actions/session';
import { hideOverlays } from '@/context/actions/ui';

import GoogleAuthButton from '../GoogleAuthButton';
import FacebookAuthButton from '../FacebookAuthButton';

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters, numbers and special characters'
    )
    .required('Password is required')
});

const SignInForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const signInData = await UserAPI.signIn(data);
      const preferencesData = await PreferenceAPI.getPreferences(
        signInData.token
      );
      setPreferences(dispatch, preferencesData);
      signIn(dispatch, signInData);
      setLoading(false);
      hideOverlays(dispatch);
      navigate('/dashboard');
    } catch (err) {
      handleError(err, setErrMessage);
      setLoading(false);
    }
  };

  return (
    <div className="signin-form">
      <div className="signin-form__social">
        <GoogleAuthButton />
        <FacebookAuthButton />
      </div>

      <form className="signin-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          size="lg"
          name="email"
          label="Email address"
          register={register}
          placeholder="Type your email address"
          error={errors.email?.message}
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
          Continue
        </Button>
      </form>
      {errMessage && <span className="signin-form__error">{errMessage}</span>}
      <Link
        className="signin-form__link"
        to="/forgotten"
        onClick={() => hideOverlays(dispatch)}
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default SignInForm;
