import React from 'react';

import './style.scss';
import { ForgottenForm } from '@/features/Auth';
import { Layout } from '@/layouts';

const ForgottenPage = () => (
  <Layout>
    <div className="forgotten">
      <ForgottenForm />
    </div>
  </Layout>
);

export default ForgottenPage;
