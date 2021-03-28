import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import icons from '@/utils/icons';
import { Button, Field, SocialButton } from '@/components';
import { AuthBox } from '@/layouts';

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters, numbers and special characters'
    )
    .required('Password is required')
});

const SignInBox = ({ toggleShow }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <AuthBox title="Sign in" handleClose={toggleShow}>
      <div className="signin-box">
        <div className="signin-box__social">
          <SocialButton icon={icons.Google}>Sign in with Google</SocialButton>
          <SocialButton icon={icons.Facebook}>
            Sign in with Facebook
          </SocialButton>
        </div>

        <form className="signin-box__form" onSubmit={handleSubmit(onSubmit)}>
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
        <Link className="signin-box__link" to="/forgotten">
          Forgot password?
        </Link>
      </div>
    </AuthBox>
  );
};

SignInBox.propTypes = {
  toggleShow: PropTypes.func.isRequired
};

export default SignInBox;
