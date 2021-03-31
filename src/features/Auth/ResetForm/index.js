import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Button, Field } from '@/components';

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

const ResetForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="reset-form">
      <h1>Reset Your Password</h1>
      <p>
        Enter your new password and confirm. Then you can sign in with your new
        password
      </p>
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
        <Button type="submit">Reset My Password</Button>
      </form>
    </div>
  );
};

export default ResetForm;
