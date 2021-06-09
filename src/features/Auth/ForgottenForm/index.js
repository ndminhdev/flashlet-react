import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.scss';
import { Button, Field } from '@/components';

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required('Email is required')
});

const ForgottenForm = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="forgotten-form">
      <h1>Forgotten Your Password</h1>
      <p>
        Enter your email address you signed up with. We&apos;ll send you a email
        that you can reset your password.
      </p>
      <form className="forgotten-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          size="lg"
          name="email"
          label="Email address"
          register={register}
          placeholder="Type your email address"
          error={errors.email?.message}
        />
        <Button type="submit" size="sm">Submit</Button>
      </form>
    </div>
  );
};

export default ForgottenForm;
