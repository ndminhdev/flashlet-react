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
  name: Yup.string().required('Full name is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gi,
      'Password must contain letters, numbers and special characters'
    )
    .required('Password is required')
});

const SignUpBox = ({ toggleShow, showSignInOverlay }) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  const handleSwapSignInClick = () => {
    toggleShow();
    showSignInOverlay();
  };

  return (
    <AuthBox title="Sign up" handleClose={toggleShow}>
      <div className="signup-box">
        <div className="signup-box__social">
          <SocialButton size="sm" icon={icons.Google}>
            Continue with Google
          </SocialButton>
          <SocialButton size="sm" icon={icons.Facebook}>
            Continue with Facebook
          </SocialButton>
        </div>

        <div className="signup-box__line">
          <span className="signup-box__seperator">&nbsp;</span>
          <p className="signup-box__line-text">or EMAIL</p>
          <span className="signup-box__seperator">&nbsp;</span>
        </div>

        <form className="signup-box__form" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="signup-box__bottom">
          <p className="signup-box__bottom-text">Already have account?</p>
          <span
            className="signup-box__bottom-link"
            onClick={handleSwapSignInClick}
          >
            Sign in
          </span>
        </div>
      </div>
    </AuthBox>
  );
};

SignUpBox.propTypes = {
  toggleShow: PropTypes.func.isRequired,
  showSignInOverlay: PropTypes.func.isRequired
};

export default SignUpBox;
