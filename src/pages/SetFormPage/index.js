import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { Layout } from '@/layouts';
import { SetForm } from '@/features/Sets';

const SetFormPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Create a new study set | Flashlet</title>
      </Helmet>
      <div className="create-set-page">
        <SetForm />
      </div>
    </Layout>
  );
};

export default SetFormPage;
