import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { socialIcons } from '@/utils/icon';
import { Button, Field, SocialButton } from '@/components';

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

  const onSubmit = (data) => console.log(data);

  return (
    <div className="signin-form">
      <div className="signin-form__social">
        <SocialButton icon={socialIcons.Google}>
          Sign in with Google
        </SocialButton>
        <SocialButton icon={socialIcons.Facebook}>
          Sign in with Facebook
        </SocialButton>
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
        <Button type="submit" size="lg" block={true}>
          Continue
        </Button>
      </form>
      <Link className="signin-form__link" to="/forgotten">
        Forgot password?
      </Link>
    </div>
  );
};

export default SignInForm;
