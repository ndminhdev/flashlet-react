import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import icons from '@/utils/icons';
import { Button, Field, SocialButton } from '@/components';

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

  const onSubmit = (data) => console.log(data);

  return (
    <div className="signup-form">
      <div className="signup-form__social">
        <SocialButton size="sm" icon={icons.Google}>
          Continue with Google
        </SocialButton>
        <SocialButton size="sm" icon={icons.Facebook}>
          Continue with Facebook
        </SocialButton>
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
        <Button type="submit" size="lg" block={true}>
          Sign up
        </Button>
      </form>

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
