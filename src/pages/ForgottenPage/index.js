import React from 'react';
import { Helmet } from 'react-helmet';

import './style.scss';
import { ForgottenForm } from '@/features/Auth';
import { Layout } from '@/layouts';
import { illustrations } from '@/utils/images';

const LeftImage = illustrations.left;
const RightImage = illustrations.right;

const ForgottenPage = () => (
  <Layout>
    <Helmet>
      <title>Forgot your password | Flashlet</title>
    </Helmet>
    <div className="forgotten">
      <ForgottenForm />
      <LeftImage className="forgotten__left" />
      <RightImage className="forgotten__right" />
    </div>
  </Layout>
);

export default ForgottenPage;
