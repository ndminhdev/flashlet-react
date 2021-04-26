import React from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

import './style.scss';
import { Layout } from '@/layouts';
import { ProfileImageForm, ProfileTextForm } from '@/features/Profile';
import { useAuth } from '@/hooks';

const emailSchema = Yup.object().shape({
  value: Yup.string()
    .email('Email address is incorrect')
    .required('Email is required')
});

const nameSchema = Yup.object().shape({
  value: Yup.string().required('Full name is required')
});

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Account Settings | Flashlet</title>
      </Helmet>
      <div className="account">
        <h1>Account Settings</h1>
        <div className="account__profile">
          <h3>Your profile</h3>
          <div className="account__profile-fields">
            <ProfileImageForm
              currentImageUrl={user.profileImage || user.profileImageDefault}
            />
            <ProfileTextForm
              field="email"
              label="Email address"
              value={user.email}
              validationSchema={emailSchema}
            />
            <ProfileTextForm
              field="name"
              label="Full name"
              value={user.name}
              validationSchema={nameSchema}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
